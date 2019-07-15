/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ApmBackOfficeTestModule } from '../../../test.module';
import { LabelValueDeleteDialogComponent } from 'app/entities/label-value/label-value-delete-dialog.component';
import { LabelValueService } from 'app/entities/label-value/label-value.service';

describe('Component Tests', () => {
  describe('LabelValue Management Delete Component', () => {
    let comp: LabelValueDeleteDialogComponent;
    let fixture: ComponentFixture<LabelValueDeleteDialogComponent>;
    let service: LabelValueService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApmBackOfficeTestModule],
        declarations: [LabelValueDeleteDialogComponent]
      })
        .overrideTemplate(LabelValueDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LabelValueDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LabelValueService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
