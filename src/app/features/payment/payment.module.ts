import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {ComponentsModule} from '../../components/components.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';



@NgModule({
    declarations: [
        PaymentComponent,
        PaymentTableComponent,
        PaymentFormComponent,
    ],
    imports: [
        CommonModule,
        NzTabsModule,
        NzPageHeaderModule,
        NzModalModule,
        NzImageModule,
        NzAvatarModule,
        NzButtonModule,
        NzDropDownModule,
        ComponentsModule,
        NzIconModule,
        ReactiveFormsModule,
        NzFormModule,
        NzDatePickerModule,
        NzInputModule,
        NzTableModule,
        FormsModule,
    ],
    exports: [
        PaymentComponent,
    ],
})
export class PaymentModule { }
