import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmitterAlertComponent } from './emitter-alert.component';
import { EmitterAlertService } from './emitter-alert.service';
import { NgbDropdownModule,
    NgbAccordionModule,
    NgbAlertModule,
    NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        EmitterAlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgbAccordionModule,
        NgbAlertModule,
        NgbPaginationModule
    ],
    exports: [EmitterAlertComponent],
    providers: [EmitterAlertService]
})
export class EmitterAlertModule { }
