import { Injectable } from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendServiceWithTestsService {

  private readonly BASE_URL = "http://localhost:3000/"

  private responseCache: Map<number, string> = new Map<number, string>

  constructor(private readonly http: HttpClient) { }

  getPersonName(id: number): Observable<string> {
    const cacheResult: string | undefined = this.responseCache.get(id)
    if(typeof cacheResult === 'string') return of(cacheResult)

    return this.http.get(`${this.BASE_URL}/rest/v1/person-name/${id}`, { responseType: "text"})
      .pipe(tap((name: string) => this.responseCache.set(id, name)))
  }
}
