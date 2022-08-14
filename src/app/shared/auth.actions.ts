/**
 * @author Pavith Madusara
 *
 * Created at 20-Jan-2021
 * Wednesday at 3:13 PM
 */
import {User} from '../repository/models/user';

export class TokenRefresh {
  static readonly type = '[Auth] TokenRefresh';

  constructor(public payload: string) {}
}

export class SetTokens {
  static readonly type = '[Auth] SetTokens';

  constructor(public payload: { accessToken: string, refreshToken: string, user: any }) {}
}

export class SignOut {
  static readonly type = '[Auth] LogOut';

  constructor() {}
}

export class ToggleTOTP {
  static readonly type = '[Auth] ToggleTOTP';

  constructor(public payload: { toggleTo: boolean }) {}
}

export class ToggleOTP {
  static readonly type = '[Auth] ToggleOTP';

  constructor(public payload: { toggleTo: boolean }) {}
}

export class UpdateUser {
  static readonly type = '[Auth] UpdateUser';

  constructor(public payload: User) {}
}
