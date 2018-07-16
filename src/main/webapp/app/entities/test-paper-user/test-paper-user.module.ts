import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TestPaperUserComponent,
    TestPaperUserDetailComponent,
    TestPaperUserUpdateComponent,
    TestPaperUserDeletePopupComponent,
    TestPaperUserDeleteDialogComponent,
    testPaperUserRoute,
    testPaperUserPopupRoute
} from './';

const ENTITY_STATES = [...testPaperUserRoute, ...testPaperUserPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestPaperUserComponent,
        TestPaperUserDetailComponent,
        TestPaperUserUpdateComponent,
        TestPaperUserDeleteDialogComponent,
        TestPaperUserDeletePopupComponent
    ],
    entryComponents: [
        TestPaperUserComponent,
        TestPaperUserUpdateComponent,
        TestPaperUserDeleteDialogComponent,
        TestPaperUserDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTestPaperUserModule {}
