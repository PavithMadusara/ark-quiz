import {Component, OnInit} from '@angular/core';
import {Payment} from '../../../repository/models/payment';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.less'],
})
export class PaymentTableComponent implements OnInit {

  isModelVisible: boolean = false;
  modelWidth: string = '600px';
  modelTitle: string = '';

  dataSet: Payment[];
  filteredData: Payment[];

  pageSize: number = 9;
  pageIndex: number = 1;
  isLoading: boolean = true;
  totalDataItems: number;

  filterString: string = '';

  forUpdate = null;

  selectedModelComponent: string = '';

  selectedMonth: Date = new Date();

  constructor(
    private database: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const year = this.selectedMonth.getUTCFullYear();
    const month = this.selectedMonth.getUTCMonth() + 1;
    this.database.list(`payments/${year}${month}`).valueChanges().subscribe(value => {
      this.dataSet = value as Payment[];
      this.isLoading=false;
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

  handleOk() {
    this.isModelVisible = false;
  }

  handleCancel() {
    this.isModelVisible = false;
  }

  showCreateForm() {
    this.isModelVisible = true;
    this.modelWidth = '600px';
    this.modelTitle = 'Create New Payment';
  }

}
