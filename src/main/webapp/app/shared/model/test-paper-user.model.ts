import { ITestPaper } from 'app/shared/model//test-paper.model';

export interface ITestPaperUser {
    id?: number;
    testPaper?: ITestPaper;
}

export class TestPaperUser implements ITestPaperUser {
    constructor(public id?: number, public testPaper?: ITestPaper) {}
}
