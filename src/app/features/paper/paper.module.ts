import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperComponent } from './paper.component';
import { PaperFormComponent } from './paper-form/paper-form.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {ComponentsModule} from '../../components/components.module';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import { ResultComponent } from './result/result.component';
import {UtilModule} from '../../util/util.module';



@NgModule({
    declarations: [
        PaperComponent,
        PaperFormComponent,
        AnswerFormComponent,
        ResultComponent,
    ],
    exports: [
        PaperComponent,
        PaperFormComponent,
        ResultComponent,
    ],
  imports: [
    CommonModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzUploadModule,
    NzCardModule,
    NzDatePickerModule,
    NzCheckboxModule,
    FormsModule,
    ComponentsModule,
    NzRadioModule,
    NzImageModule,
    NzStepsModule,
    UtilModule,
  ],
})
export class PaperModule { }
