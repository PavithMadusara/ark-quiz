import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { PaperCardComponent } from './paper-card/paper-card.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {RouterModule} from '@angular/router';
import { ResultSheetComponent } from './result-sheet/result-sheet.component';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { ResultCardComponent } from './result-card/result-card.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import { ResultTableComponent } from './result-table/result-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';



@NgModule({
    declarations: [
        ProfileDropdownComponent,
        PaperCardComponent,
        ResultSheetComponent,
        ResultCardComponent,
        ResultTableComponent,
    ],
    exports: [
        ProfileDropdownComponent,
        PaperCardComponent,
        ResultSheetComponent,
        ResultCardComponent,
        ResultTableComponent,
    ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    NzProgressModule,
    NzDividerModule,
    NzModalModule,
    NzPopoverModule,
    NzTableModule,
    FormsModule,
    NzInputModule,
  ],
})
export class ComponentsModule { }
