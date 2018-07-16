import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestPaperUser } from 'app/shared/model/test-paper-user.model';
import { TestPaperUserService } from './test-paper-user.service';
import { TestPaperUserComponent } from './test-paper-user.component';
import { TestPaperUserDetailComponent } from './test-paper-user-detail.component';
import { TestPaperUserUpdateComponent } from './test-paper-user-update.component';
import { TestPaperUserDeletePopupComponent } from './test-paper-user-delete-dialog.component';
import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';

@Injectable({ providedIn: 'root' })
export class TestPaperUserResolve implements Resolve<ITestPaperUser> {
    constructor(private service: TestPaperUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testPaperUser: HttpResponse<TestPaperUser>) => testPaperUser.body));
        }
        return of(new TestPaperUser());
    }
}

export const testPaperUserRoute: Routes = [
    {
        path: 'test-paper-user',
        component: TestPaperUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaperUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper-user/:id/view',
        component: TestPaperUserDetailComponent,
        resolve: {
            testPaperUser: TestPaperUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaperUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper-user/new',
        component: TestPaperUserUpdateComponent,
        resolve: {
            testPaperUser: TestPaperUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaperUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper-user/:id/edit',
        component: TestPaperUserUpdateComponent,
        resolve: {
            testPaperUser: TestPaperUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaperUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testPaperUserPopupRoute: Routes = [
    {
        path: 'test-paper-user/:id/delete',
        component: TestPaperUserDeletePopupComponent,
        resolve: {
            testPaperUser: TestPaperUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaperUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
