import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserdataResponse } from '../Models/userdata.interface';
import { PostDataResponse } from '../Models/post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MyUserService {
  private readonly httpClient = inject(HttpClient);

  getMyUserData(): Observable<UserdataResponse> {
    return this.httpClient.get<UserdataResponse>(`${environment.base_url}/users/profile-data`);
  }
  getMyUserPosts(userId: string): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.base_url}/users/${userId}/posts`);
  }
}
