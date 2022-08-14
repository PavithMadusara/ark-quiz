import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthState} from '../../shared/auth.state';
import {User} from '../../repository/models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.less'],
})
export class ProfileDropdownComponent implements OnInit {

  @Select(AuthState.user) user$: Observable<User | null>;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
