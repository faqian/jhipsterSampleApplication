import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainUser } from 'app/shared/model/train-user.model';

@Component({
    selector: 'jhi-train-user-detail',
    templateUrl: './train-user-detail.component.html'
})
export class TrainUserDetailComponent implements OnInit {
    trainUser: ITrainUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trainUser }) => {
            this.trainUser = trainUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
