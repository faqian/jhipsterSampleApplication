import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestPaperUser } from 'app/shared/model/test-paper-user.model';

type EntityResponseType = HttpResponse<ITestPaperUser>;
type EntityArrayResponseType = HttpResponse<ITestPaperUser[]>;

@Injectable({ providedIn: 'root' })
export class TestPaperUserService {
    private resourceUrl = SERVER_API_URL + 'api/test-paper-users';

    constructor(private http: HttpClient) {}

    create(testPaperUser: ITestPaperUser): Observable<EntityResponseType> {
        return this.http.post<ITestPaperUser>(this.resourceUrl, testPaperUser, { observe: 'response' });
    }

    update(testPaperUser: ITestPaperUser): Observable<EntityResponseType> {
        return this.http.put<ITestPaperUser>(this.resourceUrl, testPaperUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestPaperUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPaperUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
