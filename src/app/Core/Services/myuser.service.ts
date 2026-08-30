import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserdataResponse } from '../Models/userdata.interface';

@Injectable({
  providedIn: 'root',
})
export class MyUserService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };
  getMyUserData(): Observable<UserdataResponse> {
    return this.httpClient.get<UserdataResponse>(
      `${environment.base_url}/users/profile-data`,
      this.myHeaders,
    );
  }
}
