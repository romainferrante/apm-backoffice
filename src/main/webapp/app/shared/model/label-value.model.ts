import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/label.model';

export interface ILabelValue {
  id?: number;
  value?: string;
  lang?: string;
  country?: string;
  creationDate?: Moment;
  updateDate?: Moment;
  label?: ILabel;
}

export class LabelValue implements ILabelValue {
  constructor(
    public id?: number,
    public value?: string,
    public lang?: string,
    public country?: string,
    public creationDate?: Moment,
    public updateDate?: Moment,
    public label?: ILabel
  ) {}
}
