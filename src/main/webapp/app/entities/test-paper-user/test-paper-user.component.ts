import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';
import { Principal } from 'app/core';
import { TestPaperUserService } from './test-paper-user.service';

@Component({
    selector: 'jhi-test-paper-user',
    templateUrl: './test-paper-user.component.html'
})
export class TestPaperUserComponent implements OnInit, OnDestroy {
    testPaperUsers: ITestPaperUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testPaperUserService: TestPaperUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.testPaperUserService.query().subscribe(
            (res: HttpResponse<ITestPaperUser[]>) => {
                this.testPaperUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTestPaperUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestPaperUser) {
        return item.id;
    }

    registerChangeInTestPaperUsers() {
        this.eventSubscriber = this.eventManager.subscribe('testPaperUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
