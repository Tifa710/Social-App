import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserdataResponse } from '../Models/User/userdata.interface';
import { PostDataResponse } from '../Models/Posts/post-data.interface';
import { UpdatePhotoData } from '../Models/User/update-photo.interface';

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
  updateUserPhoto(updatedPhoto: FormData): Observable<UpdatePhotoData> {
    return this.httpClient.put<UpdatePhotoData>(
      `${environment.base_url}/users/upload-photo`,
      updatedPhoto,
    );
  }
}
