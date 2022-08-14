import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './shared/auth.state';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';
import {AuthModule} from './features/auth/auth.module';
import {PaperModule} from './features/paper/paper.module';
import {PaymentModule} from './features/payment/payment.module';
import {UserModule} from './features/user/user.module';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {StudentResultComponent} from './features/student-result/student-result.component';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzImageModule} from 'ng-zorro-antd/image';
import {UtilModule} from './util/util.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    StudentResultComponent,
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ComponentsModule,
    PagesModule,
    AuthModule,
    PaperModule,
    PaymentModule,
    UserModule,
    NzDropDownModule,
    NzAvatarModule,
    NzIconModule,
    NzImageModule,

    UtilModule,

  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
