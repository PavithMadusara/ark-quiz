/**
 * @author Pavith Madusara
 *
 * Created at 20-Jan-2021
 * Wednesday at 2:06 PM
 */
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../repository/models/user';
import {SignOut, UpdateUser} from './auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';

export interface AuthStateModel {
  user: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
})
@Injectable()
export class AuthState {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fireAuth: AngularFireAuth,
  ) {}

  @Selector()
  static user(state: AuthStateModel): any | null {
    return state.user;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state.user.userLevel === 'Admin';
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.user;
  }

  @Action(SignOut)
  logout(ctx: StateContext<AuthStateModel>) {
    this.fireAuth.signOut().then(() => {
      ctx.setState(null);
      this.ngZone.run(() => this.router.navigate(['/']));
    });
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AuthStateModel>, {payload}: UpdateUser) {
    ctx.patchState({user: payload});
  }

}
