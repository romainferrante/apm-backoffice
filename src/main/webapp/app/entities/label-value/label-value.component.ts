import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILabelValue } from 'app/shared/model/label-value.model';
import { AccountService } from 'app/core';
import { LabelValueService } from './label-value.service';

@Component({
  selector: 'jhi-label-value',
  templateUrl: './label-value.component.html'
})
export class LabelValueComponent implements OnInit, OnDestroy {
  labelValues: ILabelValue[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected labelValueService: LabelValueService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.labelValueService
      .query()
      .pipe(
        filter((res: HttpResponse<ILabelValue[]>) => res.ok),
        map((res: HttpResponse<ILabelValue[]>) => res.body)
      )
      .subscribe(
        (res: ILabelValue[]) => {
          this.labelValues = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLabelValues();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILabelValue) {
    return item.id;
  }

  registerChangeInLabelValues() {
    this.eventSubscriber = this.eventManager.subscribe('labelValueListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
