import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';
import { ILabelValue } from 'app/shared/model/label-value.model';

export interface ILabel {
  id?: number;
  code?: string;
  creationDate?: Moment;
  updateDate?: Moment;
  category?: ICategory;
  labelValues?: ILabelValue[];
}

export class Label implements ILabel {
  constructor(
    public id?: number,
    public code?: string,
    public creationDate?: Moment,
    public updateDate?: Moment,
    public category?: ICategory,
    public labelValues?: ILabelValue[]
  ) {}
}
