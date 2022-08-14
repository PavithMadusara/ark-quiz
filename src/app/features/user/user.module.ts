import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserTableComponent } from './user-table/user-table.component';
import {ComponentsModule} from '../../components/components.module';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzIconModule} from 'ng-zorro-antd/icon';



@NgModule({
    declarations: [
        UserComponent,
        UserTableComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        NzPageHeaderModule,
        NzTabsModule,
        NzDropDownModule,
        NzImageModule,
        NzAvatarModule,
        FormsModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzIconModule,
    ],
    exports: [
        UserComponent,
    ],
})
export class UserModule { }
