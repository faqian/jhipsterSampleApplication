import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestPaper } from 'app/shared/model/test-paper.model';
import { TestPaperService } from './test-paper.service';

@Component({
    selector: 'jhi-test-paper-delete-dialog',
    templateUrl: './test-paper-delete-dialog.component.html'
})
export class TestPaperDeleteDialogComponent {
    testPaper: ITestPaper;

    constructor(private testPaperService: TestPaperService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testPaperService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testPaperListModification',
                content: 'Deleted an testPaper'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-paper-delete-popup',
    template: ''
})
export class TestPaperDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testPaper }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestPaperDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.testPaper = testPaper;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
