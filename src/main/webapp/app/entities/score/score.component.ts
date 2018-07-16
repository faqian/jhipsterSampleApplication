import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IScore } from 'app/shared/model/score.model';
import { Principal } from 'app/core';
import { ScoreService } from './score.service';

@Component({
    selector: 'jhi-score',
    templateUrl: './score.component.html'
})
export class ScoreComponent implements OnInit, OnDestroy {
    scores: IScore[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scoreService: ScoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.scoreService.query().subscribe(
            (res: HttpResponse<IScore[]>) => {
                this.scores = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInScores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IScore) {
        return item.id;
    }

    registerChangeInScores() {
        this.eventSubscriber = this.eventManager.subscribe('scoreListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
