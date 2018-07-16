import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITestPaper } from 'app/shared/model/test-paper.model';
import { TestPaperService } from './test-paper.service';

@Component({
    selector: 'jhi-test-paper-update',
    templateUrl: './test-paper-update.component.html'
})
export class TestPaperUpdateComponent implements OnInit {
    private _testPaper: ITestPaper;
    isSaving: boolean;

    constructor(private testPaperService: TestPaperService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testPaper }) => {
            this.testPaper = testPaper;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testPaper.id !== undefined) {
            this.subscribeToSaveResponse(this.testPaperService.update(this.testPaper));
        } else {
            this.subscribeToSaveResponse(this.testPaperService.create(this.testPaper));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestPaper>>) {
        result.subscribe((res: HttpResponse<ITestPaper>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get testPaper() {
        return this._testPaper;
    }

    set testPaper(testPaper: ITestPaper) {
        this._testPaper = testPaper;
    }
}
