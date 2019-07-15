import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ApmBackOfficeSharedModule } from 'app/shared';
import {
  LabelValueComponent,
  LabelValueDetailComponent,
  LabelValueUpdateComponent,
  LabelValueDeletePopupComponent,
  LabelValueDeleteDialogComponent,
  labelValueRoute,
  labelValuePopupRoute
} from './';

const ENTITY_STATES = [...labelValueRoute, ...labelValuePopupRoute];

@NgModule({
  imports: [ApmBackOfficeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LabelValueComponent,
    LabelValueDetailComponent,
    LabelValueUpdateComponent,
    LabelValueDeleteDialogComponent,
    LabelValueDeletePopupComponent
  ],
  entryComponents: [LabelValueComponent, LabelValueUpdateComponent, LabelValueDeleteDialogComponent, LabelValueDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApmBackOfficeLabelValueModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
