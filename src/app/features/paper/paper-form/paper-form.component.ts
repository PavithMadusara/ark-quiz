import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Paper, PaperMetaData} from '../../../repository/models/paper';
import {AngularFireDatabase} from '@angular/fire/database';
import {finalize} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-paper-form',
  templateUrl: './paper-form.component.html',
  styleUrls: ['./paper-form.component.less'],
})
export class PaperFormComponent implements OnInit {

  @Input()
  inputValue: Paper;
  form: FormGroup;
  fileList: NzUploadFile[][] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  imageList: string[][] = [];
  imageMap = new Map();
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private firestore: AngularFirestore,
    private database: AngularFireDatabase,
    private fireStorage: AngularFireStorage,
  ) {
    window['upload'] = this;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: [this.inputValue?.subject ?? null, [Validators.required], []],
      title: [this.inputValue?.title ?? null, [Validators.required], []],
      description: [this.inputValue?.description ?? null, [], []],
      publishDate: [this.inputValue?.publishDate ?? null, [Validators.required], []],
      expireDate: [this.inputValue?.expireDate ?? null, [Validators.required], []],
      questions: this.fb.array([]),
    });
  }

  addNewQuestionField() {
    const arr: NzUploadFile[] = [];
    this.fileList.push(arr);
    const field = this.fb.group({
      title: [null, [Validators.required], []],
      correctAnswer: [null, [Validators.required], []],
      time: [null, [Validators.required], []],
      images: [[], [], []],
      answers: this.fb.array([]),
    });
    this.getQuestions().push(field);
    this.imageList.push([]);
  }

  addNewAnswerField(questionIndex: number) {
    const answerList = this.getAnswerList(questionIndex);
    const field = this.fb.group({
      index: [answerList.length + 1, [Validators.required], []],
      title: [null, [Validators.required], []],
    });
    answerList.push(field);
  }

  removeQuestion(questionIndex: number) {
    this.getQuestions().removeAt(questionIndex);
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.getAnswerList(questionIndex).removeAt(answerIndex);
  }

  addImageToList(url: string, questionIndex: number) {
    this.imageList[questionIndex].push(url);
    this.imageMap.set(url, questionIndex);
  }

  removeImage(file: NzUploadFile): boolean | Observable<boolean> {
    // Using window['upload'] because this method is called from NzUpload
    const downloadUrl = file.response;
    const questionIndex = window['upload'].imageMap.get(downloadUrl);
    const itemIndex = window['upload'].imageList[questionIndex].indexOf(downloadUrl);
    window['upload'].imageList[questionIndex].splice(itemIndex, 1);
    return true;
  }

  resetForm() {
    this.getQuestions().clear();
    this.form.reset();
  }

  getQuestions() {
    return this.form.get('questions') as FormArray;
  }

  getAnswerList(questionIndex: number) {
    return this.getQuestions().controls[questionIndex].get('answers') as FormArray;
  }

  validateForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    for (const i in this.getQuestions().controls) {
      this.getQuestions().controls[i].markAsDirty();
      this.getQuestions().controls[i].updateValueAndValidity();
    }
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  uploadFile(args: NzUploadXHRArgs): Subscription {
    return window['upload'].handleUpload(args);
  }

  handleUpload(args: NzUploadXHRArgs): Subscription {
    const qIndex = args.data as unknown as number;
    const file = args.file;
    const ref = this.fireStorage.ref(`${file.uid}`);
    const task = this.fireStorage.upload(`${file.uid}`, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(result => {
          this.addImageToList(result, qIndex);
          args.onSuccess(result, args.file, result);
        });
      }),
    ).subscribe(value => {
      const event = {percent: 0};
      event.percent = (value.bytesTransferred / value.totalBytes) * 100;
      args.onProgress(event, args.file);
    }, err => {
      args.onError(err, args.file);
    });
  }

  handleChange({file, fileList}: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`);
    }
  }

  onSubmit() {
    this.loading = true;
    this.validateForm();
    if (!this.form.invalid) {
      const data: Paper = this.form.value;

      const correctAnswers = [];
      let totalTime = 0;
      for (let i = 0; i < data.questions?.length; i++) {
        data.questions[i].images = this.imageList[i];
        correctAnswers.push(data.questions[i].correctAnswer);
        totalTime += data.questions[i].time;
      }
      data.answerSet = correctAnswers;
      data.totalTime = totalTime;
      data.questionCount = data.questions.length;

      this.firestore.collection<Paper>('papers').add(data).then(value => {
        const {questions, description, answerSet, ...metaData} = data;
        const paperMeta: PaperMetaData = metaData;
        paperMeta.documentId = value.id;

        const year = new Date(data.expireDate).getUTCFullYear();
        const month = new Date(data.expireDate).getUTCMonth() + 1;
        let s = `${year}${month}`;

        const dbObject: any = paperMeta;
        dbObject.publishDate = paperMeta.publishDate.toDateString();
        dbObject.expireDate = paperMeta.expireDate.toDateString();

        this.database.object(`papers/${s}/${value.id}`).set(dbObject).then(() => {
          this.message.success('Paper Created');
          this.loading = false;
          this.resetForm();
        });
      }).catch(reason => {
        console.log(reason);
        this.message.error('Something Went Wrong');
        this.loading = false;
      });

    }
  }

}
