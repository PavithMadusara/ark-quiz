import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {ProfileComponent} from './profile/profile.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzMessageModule} from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent,
    SignInFormComponent,
    SignUpFormComponent,
  ],
    exports: [
        SignInFormComponent,
        SignUpFormComponent,
    ],
  imports: [
    CommonModule,
    CommonModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzMessageModule,
  ],
})
export class AuthModule {}
