/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApmBackOfficeTestModule } from '../../../test.module';
import { LabelValueComponent } from 'app/entities/label-value/label-value.component';
import { LabelValueService } from 'app/entities/label-value/label-value.service';
import { LabelValue } from 'app/shared/model/label-value.model';

describe('Component Tests', () => {
  describe('LabelValue Management Component', () => {
    let comp: LabelValueComponent;
    let fixture: ComponentFixture<LabelValueComponent>;
    let service: LabelValueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApmBackOfficeTestModule],
        declarations: [LabelValueComponent],
        providers: []
      })
        .overrideTemplate(LabelValueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LabelValueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LabelValueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LabelValue(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.labelValues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
