import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TrainUserComponent,
    TrainUserDetailComponent,
    TrainUserUpdateComponent,
    TrainUserDeletePopupComponent,
    TrainUserDeleteDialogComponent,
    trainUserRoute,
    trainUserPopupRoute
} from './';

const ENTITY_STATES = [...trainUserRoute, ...trainUserPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainUserComponent,
        TrainUserDetailComponent,
        TrainUserUpdateComponent,
        TrainUserDeleteDialogComponent,
        TrainUserDeletePopupComponent
    ],
    entryComponents: [TrainUserComponent, TrainUserUpdateComponent, TrainUserDeleteDialogComponent, TrainUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTrainUserModule {}
