import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILabelValue } from 'app/shared/model/label-value.model';

type EntityResponseType = HttpResponse<ILabelValue>;
type EntityArrayResponseType = HttpResponse<ILabelValue[]>;

@Injectable({ providedIn: 'root' })
export class LabelValueService {
  public resourceUrl = SERVER_API_URL + 'api/label-values';

  constructor(protected http: HttpClient) {}

  create(labelValue: ILabelValue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(labelValue);
    return this.http
      .post<ILabelValue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(labelValue: ILabelValue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(labelValue);
    return this.http
      .put<ILabelValue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILabelValue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILabelValue[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(labelValue: ILabelValue): ILabelValue {
    const copy: ILabelValue = Object.assign({}, labelValue, {
      creationDate:
        labelValue.creationDate != null && labelValue.creationDate.isValid() ? labelValue.creationDate.format(DATE_FORMAT) : null,
      updateDate: labelValue.updateDate != null && labelValue.updateDate.isValid() ? labelValue.updateDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((labelValue: ILabelValue) => {
        labelValue.creationDate = labelValue.creationDate != null ? moment(labelValue.creationDate) : null;
        labelValue.updateDate = labelValue.updateDate != null ? moment(labelValue.updateDate) : null;
      });
    }
    return res;
  }
}
