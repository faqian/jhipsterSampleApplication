import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';
import { TestPaperUserService } from './test-paper-user.service';
import { ITestPaper } from 'app/shared/model/test-paper.model';
import { TestPaperService } from 'app/entities/test-paper';

@Component({
    selector: 'jhi-test-paper-user-update',
    templateUrl: './test-paper-user-update.component.html'
})
export class TestPaperUserUpdateComponent implements OnInit {
    private _testPaperUser: ITestPaperUser;
    isSaving: boolean;

    testpapers: ITestPaper[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testPaperUserService: TestPaperUserService,
        private testPaperService: TestPaperService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testPaperUser }) => {
            this.testPaperUser = testPaperUser;
        });
        this.testPaperService.query().subscribe(
            (res: HttpResponse<ITestPaper[]>) => {
                this.testpapers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testPaperUser.id !== undefined) {
            this.subscribeToSaveResponse(this.testPaperUserService.update(this.testPaperUser));
        } else {
            this.subscribeToSaveResponse(this.testPaperUserService.create(this.testPaperUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestPaperUser>>) {
        result.subscribe((res: HttpResponse<ITestPaperUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTestPaperById(index: number, item: ITestPaper) {
        return item.id;
    }
    get testPaperUser() {
        return this._testPaperUser;
    }

    set testPaperUser(testPaperUser: ITestPaperUser) {
        this._testPaperUser = testPaperUser;
    }
}
