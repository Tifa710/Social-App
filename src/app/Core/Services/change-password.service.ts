import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChangePasswordResponse } from '../Models/changePassword/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private readonly httpClient = inject(HttpClient);
  changePassword(data: object): Observable<ChangePasswordResponse> {
    return this.httpClient.patch<ChangePasswordResponse>(
      `${environment.base_url}/users/change-password`,
      data,
    );
  }
}
