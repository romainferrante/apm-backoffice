import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/label.model';

export interface ICategory {
  id?: number;
  name?: string;
  creationDate?: Moment;
  updateDate?: Moment;
  labels?: ILabel[];
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public creationDate?: Moment,
    public updateDate?: Moment,
    public labels?: ILabel[]
  ) {}
}
