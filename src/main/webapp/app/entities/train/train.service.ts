import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrain } from 'app/shared/model/train.model';

type EntityResponseType = HttpResponse<ITrain>;
type EntityArrayResponseType = HttpResponse<ITrain[]>;

@Injectable({ providedIn: 'root' })
export class TrainService {
    private resourceUrl = SERVER_API_URL + 'api/trains';

    constructor(private http: HttpClient) {}

    create(train: ITrain): Observable<EntityResponseType> {
        return this.http.post<ITrain>(this.resourceUrl, train, { observe: 'response' });
    }

    update(train: ITrain): Observable<EntityResponseType> {
        return this.http.put<ITrain>(this.resourceUrl, train, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
