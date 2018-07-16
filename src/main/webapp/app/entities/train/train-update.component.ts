import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITrain } from 'app/shared/model/train.model';
import { TrainService } from './train.service';

@Component({
    selector: 'jhi-train-update',
    templateUrl: './train-update.component.html'
})
export class TrainUpdateComponent implements OnInit {
    private _train: ITrain;
    isSaving: boolean;

    constructor(private trainService: TrainService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ train }) => {
            this.train = train;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.train.id !== undefined) {
            this.subscribeToSaveResponse(this.trainService.update(this.train));
        } else {
            this.subscribeToSaveResponse(this.trainService.create(this.train));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrain>>) {
        result.subscribe((res: HttpResponse<ITrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get train() {
        return this._train;
    }

    set train(train: ITrain) {
        this._train = train;
    }
}
