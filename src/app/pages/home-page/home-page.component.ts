import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {AuthState} from '../../shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../../repository/models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  @Select(AuthState.user) user$:Observable<User|null>

  constructor(
    private firestore:AngularFirestore,
    private fireAuth:AngularFireAuth,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  makeMeAdmin() {
    this.fireAuth.user.subscribe(user=>{
      this.firestore.collection('users').doc(user.uid).update({userLevel:"Admin"});
      this.router.navigate(['interceptor'])
    })
  }

  makeMeStudent() {
    this.fireAuth.user.subscribe(user=>{
      this.firestore.collection('users').doc(user.uid).update({userLevel:"Student"});
      this.router.navigate(['interceptor'])
    })
  }
}
