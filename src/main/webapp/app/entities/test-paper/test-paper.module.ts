import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TestPaperComponent,
    TestPaperDetailComponent,
    TestPaperUpdateComponent,
    TestPaperDeletePopupComponent,
    TestPaperDeleteDialogComponent,
    testPaperRoute,
    testPaperPopupRoute
} from './';

const ENTITY_STATES = [...testPaperRoute, ...testPaperPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestPaperComponent,
        TestPaperDetailComponent,
        TestPaperUpdateComponent,
        TestPaperDeleteDialogComponent,
        TestPaperDeletePopupComponent
    ],
    entryComponents: [TestPaperComponent, TestPaperUpdateComponent, TestPaperDeleteDialogComponent, TestPaperDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTestPaperModule {}
