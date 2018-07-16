import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationTrainModule } from './train/train.module';
import { JhipsterSampleApplicationTrainUserModule } from './train-user/train-user.module';
import { JhipsterSampleApplicationTestPaperModule } from './test-paper/test-paper.module';
import { JhipsterSampleApplicationTestPaperUserModule } from './test-paper-user/test-paper-user.module';
import { JhipsterSampleApplicationScoreModule } from './score/score.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationTrainModule,
        JhipsterSampleApplicationTrainUserModule,
        JhipsterSampleApplicationTestPaperModule,
        JhipsterSampleApplicationTestPaperUserModule,
        JhipsterSampleApplicationScoreModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
