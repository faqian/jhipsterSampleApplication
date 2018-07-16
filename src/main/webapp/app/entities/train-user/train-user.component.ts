import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrainUser } from 'app/shared/model/train-user.model';
import { Principal } from 'app/core';
import { TrainUserService } from './train-user.service';

@Component({
    selector: 'jhi-train-user',
    templateUrl: './train-user.component.html'
})
export class TrainUserComponent implements OnInit, OnDestroy {
    trainUsers: ITrainUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainUserService: TrainUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.trainUserService.query().subscribe(
            (res: HttpResponse<ITrainUser[]>) => {
                this.trainUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITrainUser) {
        return item.id;
    }

    registerChangeInTrainUsers() {
        this.eventSubscriber = this.eventManager.subscribe('trainUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
