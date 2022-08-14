import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthState} from '../../../shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../../../repository/models/user';
import {AngularFireDatabase} from '@angular/fire/database';
import {Result} from '../../../repository/models/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less'],
})
export class ResultComponent implements OnInit {

  @Select(AuthState.user) user$: Observable<User | null>;

  filterString: string = '';
  filteredData: Result[] = [];
  dataSet: Result[] = [];
  loading: boolean = true;

  constructor(
    private fireDB: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.user$.subscribe(user => {
      this.fireDB.list(`results/${user.uid}`).valueChanges().subscribe(value => {
        this.dataSet = value as Result[];
        this.onSearch();
      });
    });
  }

  onSearch() {
    if (this.filterString && this.filterString !== '') {
      this.loading = true;
      this.filteredData = [];
      const regex = new RegExp(this.filterString + '.+$', 'i');
      this.filteredData = this.dataSet.filter(value => {
        const dataString = value.paper.subject + value.paper.title + value.paper.description;
        return dataString.toLowerCase().search(regex) !== -1;
      });
      this.loading = false;
    } else {
      this.filteredData = this.dataSet;
    }
  }

}
