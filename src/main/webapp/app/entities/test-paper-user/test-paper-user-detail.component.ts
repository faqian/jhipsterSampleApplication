import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';

@Component({
    selector: 'jhi-test-paper-user-detail',
    templateUrl: './test-paper-user-detail.component.html'
})
export class TestPaperUserDetailComponent implements OnInit {
    testPaperUser: ITestPaperUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testPaperUser }) => {
            this.testPaperUser = testPaperUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
