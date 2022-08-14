import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../repository/models/result';

@Component({
  selector: 'app-result-sheet',
  templateUrl: './result-sheet.component.html',
  styleUrls: ['./result-sheet.component.less'],
})
export class ResultSheetComponent implements OnInit {

  @Input()
  inputValue: Result;
  correctAnswerCount = 0;
  loading = true;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.inputValue.paper.questions.length; i++) {
      if (this.inputValue.paper.questions[i].correctAnswer === this.inputValue.studentAnswers[i]) {
        this.correctAnswerCount++;
      }
    }
    this.loading=false;
  }

}
