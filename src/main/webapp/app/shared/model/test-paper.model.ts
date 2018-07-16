import { ITestPaperUser } from 'app/shared/model//test-paper-user.model';

export interface ITestPaper {
    id?: number;
    testPaperUsers?: ITestPaperUser[];
}

export class TestPaper implements ITestPaper {
    constructor(public id?: number, public testPaperUsers?: ITestPaperUser[]) {}
}
