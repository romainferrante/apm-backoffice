import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ILabelValue, LabelValue } from 'app/shared/model/label-value.model';
import { LabelValueService } from './label-value.service';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';

@Component({
  selector: 'jhi-label-value-update',
  templateUrl: './label-value-update.component.html'
})
export class LabelValueUpdateComponent implements OnInit {
  isSaving: boolean;

  labels: ILabel[];
  creationDateDp: any;
  updateDateDp: any;

  editForm = this.fb.group({
    id: [],
    value: [],
    lang: [],
    country: [],
    creationDate: [],
    updateDate: [],
    label: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected labelValueService: LabelValueService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ labelValue }) => {
      this.updateForm(labelValue);
    });
    this.labelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILabel[]>) => response.body)
      )
      .subscribe((res: ILabel[]) => (this.labels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(labelValue: ILabelValue) {
    this.editForm.patchValue({
      id: labelValue.id,
      value: labelValue.value,
      lang: labelValue.lang,
      country: labelValue.country,
      creationDate: labelValue.creationDate,
      updateDate: labelValue.updateDate,
      label: labelValue.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const labelValue = this.createFromForm();
    if (labelValue.id !== undefined) {
      this.subscribeToSaveResponse(this.labelValueService.update(labelValue));
    } else {
      this.subscribeToSaveResponse(this.labelValueService.create(labelValue));
    }
  }

  private createFromForm(): ILabelValue {
    return {
      ...new LabelValue(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      lang: this.editForm.get(['lang']).value,
      country: this.editForm.get(['country']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      updateDate: this.editForm.get(['updateDate']).value,
      label: this.editForm.get(['label']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabelValue>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackLabelById(index: number, item: ILabel) {
    return item.id;
  }
}
