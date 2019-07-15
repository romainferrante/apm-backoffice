import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApmBackOfficeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ApmBackOfficeSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ApmBackOfficeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApmBackOfficeSharedModule {
  static forRoot() {
    return {
      ngModule: ApmBackOfficeSharedModule
    };
  }
}
