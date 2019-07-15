import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILabelValue } from 'app/shared/model/label-value.model';
import { LabelValueService } from './label-value.service';

@Component({
  selector: 'jhi-label-value-delete-dialog',
  templateUrl: './label-value-delete-dialog.component.html'
})
export class LabelValueDeleteDialogComponent {
  labelValue: ILabelValue;

  constructor(
    protected labelValueService: LabelValueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.labelValueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'labelValueListModification',
        content: 'Deleted an labelValue'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-label-value-delete-popup',
  template: ''
})
export class LabelValueDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ labelValue }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LabelValueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.labelValue = labelValue;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/label-value', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/label-value', { outlets: { popup: null } }]);
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
