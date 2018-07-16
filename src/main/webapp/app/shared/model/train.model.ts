import { ITrainUser } from 'app/shared/model//train-user.model';

export interface ITrain {
    id?: number;
    trainUsers?: ITrainUser[];
}

export class Train implements ITrain {
    constructor(public id?: number, public trainUsers?: ITrainUser[]) {}
}
