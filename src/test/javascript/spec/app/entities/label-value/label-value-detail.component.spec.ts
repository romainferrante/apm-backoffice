/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApmBackOfficeTestModule } from '../../../test.module';
import { LabelValueDetailComponent } from 'app/entities/label-value/label-value-detail.component';
import { LabelValue } from 'app/shared/model/label-value.model';

describe('Component Tests', () => {
  describe('LabelValue Management Detail Component', () => {
    let comp: LabelValueDetailComponent;
    let fixture: ComponentFixture<LabelValueDetailComponent>;
    const route = ({ data: of({ labelValue: new LabelValue(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApmBackOfficeTestModule],
        declarations: [LabelValueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LabelValueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LabelValueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.labelValue).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
