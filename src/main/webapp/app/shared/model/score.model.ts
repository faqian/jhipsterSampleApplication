import { ITestPaperUser } from 'app/shared/model//test-paper-user.model';

export interface IScore {
    id?: number;
    testPaper?: ITestPaperUser;
}

export class Score implements IScore {
    constructor(public id?: number, public testPaper?: ITestPaperUser) {}
}
