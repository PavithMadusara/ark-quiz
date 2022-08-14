import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthState} from '../../shared/auth.state';
import {User} from '../../repository/models/user';
import {Observable} from 'rxjs';
import {Paper} from '../../repository/models/paper';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-paper-card',
  templateUrl: './paper-card.component.html',
  styleUrls: ['./paper-card.component.less'],
})
export class PaperCardComponent implements OnInit {

  @Select(AuthState.user) user$: Observable<User>;

  @Input()
  inputValue: Paper;
  isPaid = false;

  @Output()
  onDelete = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private fireDB: AngularFireDatabase,
  ) { }

  isPaidForPaper() {
    this.user$.subscribe(user => {
      const paymentMonth = new Date(this.inputValue.publishDate);
      const year = paymentMonth.getUTCFullYear();
      const month = paymentMonth.getMonth() + 1;
      const find = user?.paidMonths?.find(e => e === `${year}${month}`);
      this.isPaid = !!find;
    });
  }

  ngOnInit(): void {
    this.isPaidForPaper();
  }

  deleteItem() {
    const dd = new Date(this.inputValue.publishDate);
    const monthRef = `${dd.getUTCFullYear()}${dd.getUTCMonth() + 1}`;
    this.firestore.collection('papers').doc(this.inputValue.documentId).delete();
    this.fireDB.list(`papers/${monthRef}/${this.inputValue.documentId}`).remove().then(() => {
      this.onDelete.emit();
    });
  }
}
