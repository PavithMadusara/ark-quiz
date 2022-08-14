import {Component, Input, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthState} from '../../shared/auth.state';
import {Observable} from 'rxjs';
import {User} from '../../repository/models/user';
import {Result} from '../../repository/models/result';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.less'],
})
export class ResultCardComponent implements OnInit {

  @Select(AuthState.user) user$: Observable<User>;

  @Input()
  inputValue: Result;

  isModelVisible: boolean = false;
  modelWidth: string = '600px';
  modelTitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  handleOk() {
    this.isModelVisible = false;
  }

  handleCancel() {
    this.isModelVisible = false;
  }

  showResult() {
    this.isModelVisible = true;
    this.modelWidth = '600px';
    this.modelTitle = 'Result View';
  }
}
