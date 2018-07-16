import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Train } from 'app/shared/model/train.model';
import { TrainService } from './train.service';
import { TrainComponent } from './train.component';
import { TrainDetailComponent } from './train-detail.component';
import { TrainUpdateComponent } from './train-update.component';
import { TrainDeletePopupComponent } from './train-delete-dialog.component';
import { ITrain } from 'app/shared/model/train.model';

@Injectable({ providedIn: 'root' })
export class TrainResolve implements Resolve<ITrain> {
    constructor(private service: TrainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((train: HttpResponse<Train>) => train.body));
        }
        return of(new Train());
    }
}

export const trainRoute: Routes = [
    {
        path: 'train',
        component: TrainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train/:id/view',
        component: TrainDetailComponent,
        resolve: {
            train: TrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train/new',
        component: TrainUpdateComponent,
        resolve: {
            train: TrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train/:id/edit',
        component: TrainUpdateComponent,
        resolve: {
            train: TrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trains'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainPopupRoute: Routes = [
    {
        path: 'train/:id/delete',
        component: TrainDeletePopupComponent,
        resolve: {
            train: TrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trains'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
