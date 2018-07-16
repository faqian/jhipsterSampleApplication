import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ScoreComponent,
    ScoreDetailComponent,
    ScoreUpdateComponent,
    ScoreDeletePopupComponent,
    ScoreDeleteDialogComponent,
    scoreRoute,
    scorePopupRoute
} from './';

const ENTITY_STATES = [...scoreRoute, ...scorePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ScoreComponent, ScoreDetailComponent, ScoreUpdateComponent, ScoreDeleteDialogComponent, ScoreDeletePopupComponent],
    entryComponents: [ScoreComponent, ScoreUpdateComponent, ScoreDeleteDialogComponent, ScoreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationScoreModule {}
