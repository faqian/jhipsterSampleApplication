import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestPaper } from 'app/shared/model/test-paper.model';

@Component({
    selector: 'jhi-test-paper-detail',
    templateUrl: './test-paper-detail.component.html'
})
export class TestPaperDetailComponent implements OnInit {
    testPaper: ITestPaper;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testPaper }) => {
            this.testPaper = testPaper;
        });
    }

    previousState() {
        window.history.back();
    }
}
