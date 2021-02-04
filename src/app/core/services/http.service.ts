import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  constructor(private http: HttpClient) { }

  httpGet(url) {
    let request = this.http.get(url);
    return this.handleRequest(request, "getData");
  }

  httpPost(url, payload, options?) {
    let request = this.http.post(url, payload, options);
    return this.handleRequest(request, "httpPost");
  }

  httpPut(url, payload, options?) {
    let request = this.http.put(url, payload, options);
    return this.handleRequest(request, "httpPut");
  }

  httpDelete(url, options?) {
    let request = this.http.delete(url, options);
    return this.handleRequest(request);
  }

  handleRequest(request: any, method?: string) {
    return request.pipe(
      tap(_ => { console.log("Fixed that source lift function error") }),
      catchError(this.handleError(method, null))
    );
  }

  //Handle errors
  handleError(operation = "operation", result?) {
    return (error: any) => {
      return of(error);
    };
  }
}