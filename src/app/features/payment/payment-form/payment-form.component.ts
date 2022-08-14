import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import firebase from 'firebase/app';
import {User} from '../../../repository/models/user';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.less'],
})
export class PaymentFormComponent implements OnInit {

  @Input()
  inputValue: any;
  @Output()
  onFormSubmit = new EventEmitter<void>();
  loading: boolean = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private firestore: AngularFirestore,
    private database: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: [null, [Validators.required], []],
      month: [null, [Validators.required], []],
    });
  }

  validateForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  resetForm() {
    this.form.reset();
    for (const i in this.form.controls) {
      this.form.controls[i].markAsUntouched();
    }
  }

  async onSubmit() {
    this.loading = true;
    this.validateForm();
    if (!this.form.invalid) {
      const data = this.form.value;
      const paymentMonth = new Date(data.month);
      const year = paymentMonth.getUTCFullYear();
      const month = paymentMonth.getMonth() + 1;
      const phone = `+94` + data.phone.slice(-9);

      await this.firestore.collection('users').ref.where('phone', '==', phone).get().then(async (value) => {
        if (!value.empty) {
          let user: User;
          let isPaid = false;
          value.docs.forEach(doc => {
            user = doc.data() as User;
            user.paidMonths?.forEach(value1 => {
              if (value1 === `${year}${month}`) {
                isPaid = true;
                this.message.warning('Already Paid for this Month');
                this.loading = false;
                return;
              }
            });
            doc.ref.update({paidMonths: firebase.firestore.FieldValue.arrayUnion(`${year}${month}`)});
            return;
          });
          if (!isPaid) {
            const today = new Date();
            await this.database.list(`payments/${today.getUTCFullYear()}${today.getUTCMonth() + 1}`).push({
              ...data,
              name: user.name,
              month: `${year}${month}`,
              date: today.toDateString(),
            });

            this.message.success('Payment Added');
            this.resetForm();
          }
        } else {
          this.message.error('Invalid Phone Number');
          this.loading = false;
        }
      });

    }
  }

}
