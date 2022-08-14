import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../repository/models/user';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {UpdateUser} from '../../shared/auth.actions';

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.less'],
})
export class InterceptorComponent implements OnInit {

  constructor(
    private store: Store,
    private firestore: AngularFirestore,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.fireAuth.user.subscribe(value => {
      const uid = value.uid;
      this.firestore.collection('users').doc(uid).get().subscribe(value => {
        const userData: User = value.data() as User;
        if (!userData) {
          this.zone.run(() => {
            this.router.navigate(['register']);
          });
        } else {
          userData.uid = uid;
          this.store.dispatch(new UpdateUser(userData)).subscribe(() => {
            this.zone.run(() => {
              this.router.navigate(['home']);
            });
          });
        }
      });
    });
  }

}
