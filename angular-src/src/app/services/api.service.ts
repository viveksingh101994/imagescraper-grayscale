import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ApiService {

  private item= new BehaviorSubject<string>('');

  public currentitem = this.item.asObservable();

  public apiPath = '/api/';

  constructor(
    private _http: Http,
  ) { }

  public ChangeItem(item) {
    this.item.next(item);
  }


  public getAllKeywords() {
    return this._http.get(this.apiPath + 'getAll').map(x => x.json());
  }

  public getPastKeywordImage(item) {
    const body = {
      keyword: item
    };
    return this._http.post(this.apiPath + 'getSavedImages', body).map(x => x.json());
  }

  public SaveSearchResult(item) {
    const body = {
      keyword: item
    };
    return this._http.post(this.apiPath + 'getImageByKey', body).map(x => x.json());
  }

}
