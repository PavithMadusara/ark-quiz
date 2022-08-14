import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Result} from '../../repository/models/result';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.less'],
})
export class ResultTableComponent implements OnInit {

  isModelVisible: boolean = false;
  modelWidth: string = '600px';
  modelTitle: string = '';

  dataSet: Result[];
  filteredData: Result[];

  pageSize: number = 9;
  pageIndex: number = 1;
  isLoading: boolean = true;
  totalDataItems: number;

  filterString: string = '';

  forUpdate = null;

  paperId: string;

  constructor(
    private database: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.url.subscribe(value => {
      this.paperId = value[value.length - 1].toString();
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.database.list(`studentResults/${this.paperId}`).valueChanges().subscribe(value => {
      this.dataSet = value as Result[];
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
        const dataString = value.studentName + value.paper.title;
        return dataString.toLowerCase().search(regex) !== -1;
      });
      this.isLoading = false;
    } else {
      this.filteredData = this.dataSet;
    }
  }

  handleOk() {
    this.isModelVisible = false;
    this.forUpdate = null;
  }

  handleCancel() {
    this.isModelVisible = false;
    this.forUpdate = null;
  }

  showCreateForm() {
    this.isModelVisible = true;
    this.modelWidth = '600px';
  }

  viewItem(data: Result) {
    this.forUpdate = data;
    this.showCreateForm();
  }
}
