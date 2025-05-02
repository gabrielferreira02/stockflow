import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment.development"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "https://brapi.dev/api";
  private token: string | undefined;

  private header: {[key: string]: string} | undefined;

  constructor(private http: HttpClient) {
    this.token = environment.apiToken;
    console.log(this.token);
    this.header = {
      "Authorization": this.token
    }
  }

  getStocks(): Observable<any> {
    return this.http.get(this.url + "/quote/list?limit=10", this.header);
  }

  getStock(stock: string): Observable<any> {
    const endpoint = `${this.url}/quote/${stock}?token=${this.token}&interval=1d&range=1mo&modules=summaryProfile`
    return this.http.get(endpoint);
  }
}
