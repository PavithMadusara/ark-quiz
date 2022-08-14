import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AuthModule} from '../features/auth/auth.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { InterceptorComponent } from './interceptor/interceptor.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {RouterModule} from '@angular/router';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {PaperModule} from '../features/paper/paper.module';
import {PaymentModule} from '../features/payment/payment.module';
import {UserModule} from '../features/user/user.module';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {ComponentsModule} from '../components/components.module';
import {NzButtonModule} from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    AuthPageComponent,
    HomePageComponent,
    LandingPageComponent,
    ErrorPageComponent,
    InterceptorComponent,
    RegisterPageComponent
  ],
    imports: [
        CommonModule,
        AuthModule,
        NzIconModule,
        RouterModule,
        NzTabsModule,
        PaperModule,
        PaymentModule,
        UserModule,
        NzImageModule,
        NzDropDownModule,
        NzAvatarModule,
        ComponentsModule,
        NzButtonModule,
    ],
})
export class PagesModule { }
