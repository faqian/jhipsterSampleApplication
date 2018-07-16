import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestPaper } from 'app/shared/model/test-paper.model';

type EntityResponseType = HttpResponse<ITestPaper>;
type EntityArrayResponseType = HttpResponse<ITestPaper[]>;

@Injectable({ providedIn: 'root' })
export class TestPaperService {
    private resourceUrl = SERVER_API_URL + 'api/test-papers';

    constructor(private http: HttpClient) {}

    create(testPaper: ITestPaper): Observable<EntityResponseType> {
        return this.http.post<ITestPaper>(this.resourceUrl, testPaper, { observe: 'response' });
    }

    update(testPaper: ITestPaper): Observable<EntityResponseType> {
        return this.http.put<ITestPaper>(this.resourceUrl, testPaper, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestPaper>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPaper[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
