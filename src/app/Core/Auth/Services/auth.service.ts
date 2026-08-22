import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataResponse } from '../../Models/user-data.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  signUp(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.base_url}users/signup`, data);
  }
  signIn(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.base_url}users/signin`, data);
  }
}
