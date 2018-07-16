import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestPaper } from 'app/shared/model/test-paper.model';
import { TestPaperService } from './test-paper.service';
import { TestPaperComponent } from './test-paper.component';
import { TestPaperDetailComponent } from './test-paper-detail.component';
import { TestPaperUpdateComponent } from './test-paper-update.component';
import { TestPaperDeletePopupComponent } from './test-paper-delete-dialog.component';
import { ITestPaper } from 'app/shared/model/test-paper.model';

@Injectable({ providedIn: 'root' })
export class TestPaperResolve implements Resolve<ITestPaper> {
    constructor(private service: TestPaperService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testPaper: HttpResponse<TestPaper>) => testPaper.body));
        }
        return of(new TestPaper());
    }
}

export const testPaperRoute: Routes = [
    {
        path: 'test-paper',
        component: TestPaperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPapers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper/:id/view',
        component: TestPaperDetailComponent,
        resolve: {
            testPaper: TestPaperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPapers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper/new',
        component: TestPaperUpdateComponent,
        resolve: {
            testPaper: TestPaperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPapers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-paper/:id/edit',
        component: TestPaperUpdateComponent,
        resolve: {
            testPaper: TestPaperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPapers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testPaperPopupRoute: Routes = [
    {
        path: 'test-paper/:id/delete',
        component: TestPaperDeletePopupComponent,
        resolve: {
            testPaper: TestPaperResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPapers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
