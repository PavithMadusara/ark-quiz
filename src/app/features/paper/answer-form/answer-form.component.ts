import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {Paper} from '../../../repository/models/paper';
import {Question} from '../../../repository/models/question';
import {Result} from '../../../repository/models/result';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../shared/auth.state';
import {User} from '../../../repository/models/user';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {NzMessageService} from 'ng-zorro-antd/message';
import firebase from 'firebase/app';
import {UpdateUser} from '../../../shared/auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.less'],
})
export class AnswerFormComponent implements OnInit {

  @Select(AuthState.user) user$: Observable<User | null>;

  paper: Paper;
  currentQuestionIndex = 0;
  currentQuestion: Question;

  imageLoading = true;
  loading = true;
  result: Result;
  user: User;

  constructor(
    private firestore: AngularFirestore,
    private fireDB: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(value => {
      const paperId = value.pop();
      this.firestore.collection('papers').doc<any>(paperId.path).get().subscribe(value => {
        const data = value.data();
        data.publishDate = data.publishDate.toDate();
        data.expireDate = data.expireDate.toDate();
        this.paper = data as Paper;
        this.paper.documentId = paperId.path;

        this.result = new Result();
        this.result.date = new Date();
        this.result.studentAnswers = [];
        this.result.paper = this.paper;

        this.user$.subscribe(user => {
          this.result.studentName = user?.name;
          this.result.uid = user?.uid;

          this.loading = false;
        });

        setInterval(() => {
          if (this.currentQuestion && this.currentQuestion.time > this.currentQuestion.timeTaken && !this.imageLoading) {
            this.currentQuestion.timeTaken++;
          }
        }, 1000);

      });
    });
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  pre(): void {
    this.currentQuestionIndex -= 1;
    this.changeContent();
  }

  next(): void {
    this.currentQuestionIndex += 1;
    this.changeContent();
    if (this.currentQuestionIndex > this.paper?.questions?.length) {
      this.user$.subscribe(value => {
        if (value?.userLevel === 'Student') {
          this.saveResult();
        }
      });
    }
    if (this.currentQuestion?.images?.length > 0) {
      this.imageLoading = true;
    }
  }

  saveResult() {
    this.loading = true;
    const data: any = this.result;
    data.date = new Date(data.date).toDateString();

    let timeRemaining = 0;

    this.paper.questions.forEach(q => {
      timeRemaining += q.time - q.timeTaken;
    });

    data.timeRemaining = timeRemaining;

    const doneBefore = this.user?.papersDone?.find(e => e === this.paper.documentId);
    if (!doneBefore) {
      this.fireDB.list(`results/${this.user.uid}`).push(data).then(() => {
        this.fireDB.list(`studentResults/${this.paper.documentId}`).push(data);
        this.firestore.collection('users').doc(this.user.uid).update({
          papersDone: firebase.firestore.FieldValue.arrayUnion(this.paper.documentId),
        }).then(value => {
          this.store.dispatch(new UpdateUser(value as unknown as User));
        });
        this.message.success('Result Saved');
        this.loading = false;
      });
    } else {
      this.message.info('You have completed this paper before, this result will not be saved');
      this.loading = false;
    }
  }

  done(): void {
    this.router.navigate(['../..']);
  }

  changeContent(): void {
    this.currentQuestion = this.paper.questions[this.currentQuestionIndex - 1];
    if (this.currentQuestion) {
      this.currentQuestion.timeTaken = 0;
    }
  }

  onPagination($event: number) {
    this.currentQuestionIndex = $event;
  }

  imageLoaded() {
    this.imageLoading = false;
  }
}
