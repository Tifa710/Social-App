import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserdataResponse } from '../Models/userdata.interface';
import { PostDataResponse } from '../Models/post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MyUserService {
  private readonly httpClient = inject(HttpClient);
  photoUpdated = new Subject<void>();

  getMyUserData(): Observable<UserdataResponse> {
    return this.httpClient.get<UserdataResponse>(`${environment.base_url}/users/profile-data`);
  }
  getMyUserPosts(userId: string): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.base_url}/users/${userId}/posts`);
  }
  updateUserPhoto(updatedPhoto: FormData): Observable<any> {
    return this.httpClient.put<any>(`${environment.base_url}/users/upload-photo`, updatedPhoto);
  }
}
