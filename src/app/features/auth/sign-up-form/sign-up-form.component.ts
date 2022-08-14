import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.less'],
})
export class SignUpFormComponent implements OnInit {

  @Input()
  inputValue: any;
  @Output()
  onFormSubmit = new EventEmitter<void>();

  form: FormGroup;
  uid: string;
  phone: string;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private firestore: AngularFirestore,
    private database: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.fireAuth.user.subscribe(user => {
      this.uid = user.uid;
      this.phone = user.providerData[0].phoneNumber;
      this.form = this.fb.group({
        uid: [{disabled: true, value: this.uid}, [], []],
        name: [null, [Validators.required], []],
        dob: [null, [Validators.required], []],
        gender: [null, [Validators.required], []],
        phone: [{disabled: true, value: this.phone}, [], []],
        address: [null, [Validators.required], []],
        city: [null, [Validators.required], []],
      });
      this.loading = false;
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
      data.userLevel = 'Student';
      data.phone = this.phone;
      this.firestore.collection('users').doc(this.uid).set(data).then(async () => {
        await this.database.list('users').push(data);
        localStorage.setItem('localUser', data);
        this.router.navigate(['home']);
      }).catch(reason => {
        console.log(reason);
        this.message.error('Registration Failed, Please Try Again or Contact Support');
        this.loading = false;
      });
    }
  }

}
