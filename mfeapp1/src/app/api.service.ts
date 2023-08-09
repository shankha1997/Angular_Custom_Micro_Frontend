import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public transferedData = {};

  constructor(private http : HttpClient) { }

  public getData () {
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
  }
}
