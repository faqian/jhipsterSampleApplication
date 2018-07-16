import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';
import { TestPaperUserService } from 'app/entities/test-paper-user';

@Component({
    selector: 'jhi-score-update',
    templateUrl: './score-update.component.html'
})
export class ScoreUpdateComponent implements OnInit {
    private _score: IScore;
    isSaving: boolean;

    testpaperusers: ITestPaperUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private scoreService: ScoreService,
        private testPaperUserService: TestPaperUserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ score }) => {
            this.score = score;
        });
        this.testPaperUserService.query().subscribe(
            (res: HttpResponse<ITestPaperUser[]>) => {
                this.testpaperusers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.score.id !== undefined) {
            this.subscribeToSaveResponse(this.scoreService.update(this.score));
        } else {
            this.subscribeToSaveResponse(this.scoreService.create(this.score));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IScore>>) {
        result.subscribe((res: HttpResponse<IScore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTestPaperUserById(index: number, item: ITestPaperUser) {
        return item.id;
    }
    get score() {
        return this._score;
    }

    set score(score: IScore) {
        this._score = score;
    }
}
