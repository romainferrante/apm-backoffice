/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ApmBackOfficeTestModule } from '../../../test.module';
import { LabelValueUpdateComponent } from 'app/entities/label-value/label-value-update.component';
import { LabelValueService } from 'app/entities/label-value/label-value.service';
import { LabelValue } from 'app/shared/model/label-value.model';

describe('Component Tests', () => {
  describe('LabelValue Management Update Component', () => {
    let comp: LabelValueUpdateComponent;
    let fixture: ComponentFixture<LabelValueUpdateComponent>;
    let service: LabelValueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApmBackOfficeTestModule],
        declarations: [LabelValueUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LabelValueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LabelValueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LabelValueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LabelValue(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LabelValue();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
