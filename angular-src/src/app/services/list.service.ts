import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { List } from '../models/list';

import { map } from 'rxjs/operators';


@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }
  private serverApi = 'http://localhost:3000';
  public deleteList(listId: string) {
    let URI =`${this.serverApi}/bucketlist/${listId}`;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers})
      .pipe(map(res => res));
  }
  public getAllLists(): Observable<List[]> {
    let URI = `${this.serverApi}/bucketlist/`;

    return this.http.get(URI)
      .pipe(map(res => {
        return <List[]>res.lists);
      }))

  }
}
