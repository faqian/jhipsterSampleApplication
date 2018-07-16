import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainUser } from 'app/shared/model/train-user.model';
import { TrainUserService } from './train-user.service';
import { TrainUserComponent } from './train-user.component';
import { TrainUserDetailComponent } from './train-user-detail.component';
import { TrainUserUpdateComponent } from './train-user-update.component';
import { TrainUserDeletePopupComponent } from './train-user-delete-dialog.component';
import { ITrainUser } from 'app/shared/model/train-user.model';

@Injectable({ providedIn: 'root' })
export class TrainUserResolve implements Resolve<ITrainUser> {
    constructor(private service: TrainUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((trainUser: HttpResponse<TrainUser>) => trainUser.body));
        }
        return of(new TrainUser());
    }
}

export const trainUserRoute: Routes = [
    {
        path: 'train-user',
        component: TrainUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrainUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train-user/:id/view',
        component: TrainUserDetailComponent,
        resolve: {
            trainUser: TrainUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrainUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train-user/new',
        component: TrainUserUpdateComponent,
        resolve: {
            trainUser: TrainUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrainUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'train-user/:id/edit',
        component: TrainUserUpdateComponent,
        resolve: {
            trainUser: TrainUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrainUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainUserPopupRoute: Routes = [
    {
        path: 'train-user/:id/delete',
        component: TrainUserDeletePopupComponent,
        resolve: {
            trainUser: TrainUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TrainUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
