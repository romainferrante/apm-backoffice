import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LabelValue } from 'app/shared/model/label-value.model';
import { LabelValueService } from './label-value.service';
import { LabelValueComponent } from './label-value.component';
import { LabelValueDetailComponent } from './label-value-detail.component';
import { LabelValueUpdateComponent } from './label-value-update.component';
import { LabelValueDeletePopupComponent } from './label-value-delete-dialog.component';
import { ILabelValue } from 'app/shared/model/label-value.model';

@Injectable({ providedIn: 'root' })
export class LabelValueResolve implements Resolve<ILabelValue> {
  constructor(private service: LabelValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILabelValue> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LabelValue>) => response.ok),
        map((labelValue: HttpResponse<LabelValue>) => labelValue.body)
      );
    }
    return of(new LabelValue());
  }
}

export const labelValueRoute: Routes = [
  {
    path: '',
    component: LabelValueComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'apmBackOfficeApp.labelValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LabelValueDetailComponent,
    resolve: {
      labelValue: LabelValueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'apmBackOfficeApp.labelValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LabelValueUpdateComponent,
    resolve: {
      labelValue: LabelValueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'apmBackOfficeApp.labelValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LabelValueUpdateComponent,
    resolve: {
      labelValue: LabelValueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'apmBackOfficeApp.labelValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const labelValuePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LabelValueDeletePopupComponent,
    resolve: {
      labelValue: LabelValueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'apmBackOfficeApp.labelValue.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
