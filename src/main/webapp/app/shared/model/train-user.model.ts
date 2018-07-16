import { ITrain } from 'app/shared/model//train.model';

export interface ITrainUser {
    id?: number;
    train?: ITrain;
}

export class TrainUser implements ITrainUser {
    constructor(public id?: number, public train?: ITrain) {}
}
