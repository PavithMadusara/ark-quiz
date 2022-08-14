import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Store} from '@ngxs/store';
import {AngularFireAnalytics} from '@angular/fire/analytics';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
})
export class SignInFormComponent implements OnInit {

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  phoneForm: FormGroup;
  phoneCodeForm: FormGroup;

  loading: boolean = false;
  selectedForm = 'PHONE_FORM';

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private fireAuth: AngularFireAuth,
    private analytics: AngularFireAnalytics,
    private router: Router,
    private store: Store,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: [null, [Validators.required], []],
    });
    this.phoneCodeForm = this.fb.group({
      code: [null, [Validators.required], []],
    });
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': () => { },
    });
  }

  openPhoneConfirmForm() {
    this.selectedForm = 'PHONE_CONFIRM_CODE';
  }

  onPhoneSubmit() {
    this.loading = true;
    const input = this.phoneForm.value.phone;
    const phone = `+94` + input.slice(-9);
    this.fireAuth.signInWithPhoneNumber(phone, this.recaptchaVerifier).then(value => {
      this.confirmationResult = value;
      this.openPhoneConfirmForm();
      this.loading = false;
    }).catch(reason => {
      this.analytics.logEvent('Phone Sign In Failed', reason);
      this.message.error('Failed to send the SMS');
      this.loading = false;
    });
  }

  onPhoneCodeSubmit() {
    this.loading = true;
    const code = this.phoneCodeForm.value.code;
    this.confirmationResult.confirm(code).then(() => {
      this.zone.run(() => {
        this.router.navigate(['interceptor']);
      });
    }).catch(reason => {
      this.analytics.logEvent('Phone Code Submit Failed', reason);
      this.message.error('Phone Verification Failed');
      setTimeout(() => {
        this.loading = false;
        this.selectedForm = 'PHONE_FORM';
      }, 2000);
    });
  }
}
