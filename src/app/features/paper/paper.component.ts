import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthState} from '../../shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../../repository/models/user';
import {AngularFireDatabase} from '@angular/fire/database';
import {Paper} from '../../repository/models/paper';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.less'],
})
export class PaperComponent implements OnInit {

  @Select(AuthState) user$: Observable<User>;

  filterString: string = '';
  filteredData: Paper[] = [];
  dataSet: Paper[] = [];
  loading: boolean = true;

  constructor(
    private fireDB: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.dataSet = [];
    this.filteredData = [];
    this.fireDB.list('papers').valueChanges().subscribe(value => {
      const data = value as any[];
      data.forEach(month => {
        Object.keys(month).map((index) => {
          this.dataSet.push(month[index] as Paper);
        });
      });
    });
    this.onSearch();
  }

  onSearch() {
    if (this.filterString && this.filterString !== '') {
      this.loading = true;
      this.filteredData = [];
      const regex = new RegExp(this.filterString + '.+$', 'i');
      this.filteredData = this.dataSet.filter(value => {
        const dataString = value.subject + value.title + value.description;
        return dataString.toLowerCase().search(regex) !== -1;
      });
      this.loading = false;
    } else {
      this.filteredData = this.dataSet;
    }
  }

}
