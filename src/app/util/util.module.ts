import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomOrderPipe } from './pipes/random-order.pipe';



@NgModule({
    declarations: [
        RandomOrderPipe,
    ],
    exports: [
        RandomOrderPipe,
    ],
    imports: [
        CommonModule,
    ],
})
export class UtilModule { }
