import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TrainComponent,
    TrainDetailComponent,
    TrainUpdateComponent,
    TrainDeletePopupComponent,
    TrainDeleteDialogComponent,
    trainRoute,
    trainPopupRoute
} from './';

const ENTITY_STATES = [...trainRoute, ...trainPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TrainComponent, TrainDetailComponent, TrainUpdateComponent, TrainDeleteDialogComponent, TrainDeletePopupComponent],
    entryComponents: [TrainComponent, TrainUpdateComponent, TrainDeleteDialogComponent, TrainDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTrainModule {}
