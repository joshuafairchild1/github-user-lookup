import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {

  private userSearchEndpoint: string = 'https://api.github.com/search/users?q=';
  private userDetailEndpoint: string = 'https://api.github.com/users/';

  constructor(
    private http: Http
  ) { }

  userSearchByPlaceAndLanguage(location: string, language: string): Observable<any> {
    let url;
    if (location && !language) {
      url = `${this.userSearchEndpoint}location:${location}`;
    } else if (!location && language) {
      url = `${this.userSearchEndpoint}language:${language}`;
    } else {
      url = `${this.userSearchEndpoint}location:${location}+language:${language}`;
    }

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetailsByUsername(username: string): Observable<any> {
    if (username) {
      const url = `${this.userDetailEndpoint}${username}`;
      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  private extractData(res: Response): JSON {
    const body = res.json();
    return body.items || {};
  }

  private handleError(error: Response | any): ErrorObservable {
    let errorMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }
    console.log(errorMsg);
    return Observable.throw(errorMsg);
  }
}
