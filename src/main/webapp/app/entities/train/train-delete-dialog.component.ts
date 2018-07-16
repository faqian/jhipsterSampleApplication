import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrain } from 'app/shared/model/train.model';
import { TrainService } from './train.service';

@Component({
    selector: 'jhi-train-delete-dialog',
    templateUrl: './train-delete-dialog.component.html'
})
export class TrainDeleteDialogComponent {
    train: ITrain;

    constructor(private trainService: TrainService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trainListModification',
                content: 'Deleted an train'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-train-delete-popup',
    template: ''
})
export class TrainDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ train }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrainDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.train = train;
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
