import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {AuthGuard} from './guards/auth.guard';
import {InterceptorComponent} from './pages/interceptor/interceptor.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {PaperComponent} from './features/paper/paper.component';
import {AnswerFormComponent} from './features/paper/answer-form/answer-form.component';
import {StudentResultComponent} from './features/student-result/student-result.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['interceptor']);

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToItems},
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'interceptor',
    component: InterceptorComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'home/answer/:id',
    component: AnswerFormComponent,
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'home/result/:id',
    component: StudentResultComponent,
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
