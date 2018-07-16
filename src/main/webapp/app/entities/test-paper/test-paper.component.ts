import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestPaper } from 'app/shared/model/test-paper.model';
import { Principal } from 'app/core';
import { TestPaperService } from './test-paper.service';

@Component({
    selector: 'jhi-test-paper',
    templateUrl: './test-paper.component.html'
})
export class TestPaperComponent implements OnInit, OnDestroy {
    testPapers: ITestPaper[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testPaperService: TestPaperService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.testPaperService.query().subscribe(
            (res: HttpResponse<ITestPaper[]>) => {
                this.testPapers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTestPapers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestPaper) {
        return item.id;
    }

    registerChangeInTestPapers() {
        this.eventSubscriber = this.eventManager.subscribe('testPaperListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
