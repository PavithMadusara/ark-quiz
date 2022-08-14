import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../../repository/models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.less'],
})
export class UserTableComponent implements OnInit {

  dataSet: User[];
  filteredData: User[];

  pageSize: number = 9;
  pageIndex: number = 1;
  isLoading: boolean = true;
  totalDataItems: number;

  filterString: string = '';

  forUpdate = null;

  isModelVisible: boolean = false;
  selectedModelComponent: string = '';
  modelWidth: string = '1000px';
  modelTitle: string = '';

  constructor(
    private database: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.database.list(`users`).valueChanges().subscribe(value => {
      this.dataSet = value as User[];
      this.isLoading = false;
      this.onSearch();
    });
  }

  onSearch() {
    if (this.filterString && this.filterString !== '') {
      this.isLoading = true;
      this.filteredData = [];
      const regex = new RegExp(this.filterString + '.+$', 'i');
      this.filteredData = this.dataSet.filter(value => {
        const dataString = value.name + value.phone;
        return dataString.toLowerCase().search(regex) !== -1;
      });
      this.isLoading = false;
    } else {
      this.filteredData = this.dataSet;
    }
  }

}
