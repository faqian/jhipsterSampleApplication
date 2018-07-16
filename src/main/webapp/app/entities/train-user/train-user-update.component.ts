import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITrainUser } from 'app/shared/model/train-user.model';
import { TrainUserService } from './train-user.service';
import { ITrain } from 'app/shared/model/train.model';
import { TrainService } from 'app/entities/train';

@Component({
    selector: 'jhi-train-user-update',
    templateUrl: './train-user-update.component.html'
})
export class TrainUserUpdateComponent implements OnInit {
    private _trainUser: ITrainUser;
    isSaving: boolean;

    trains: ITrain[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private trainUserService: TrainUserService,
        private trainService: TrainService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trainUser }) => {
            this.trainUser = trainUser;
        });
        this.trainService.query().subscribe(
            (res: HttpResponse<ITrain[]>) => {
                this.trains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.trainUser.id !== undefined) {
            this.subscribeToSaveResponse(this.trainUserService.update(this.trainUser));
        } else {
            this.subscribeToSaveResponse(this.trainUserService.create(this.trainUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrainUser>>) {
        result.subscribe((res: HttpResponse<ITrainUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTrainById(index: number, item: ITrain) {
        return item.id;
    }
    get trainUser() {
        return this._trainUser;
    }

    set trainUser(trainUser: ITrainUser) {
        this._trainUser = trainUser;
    }
}
