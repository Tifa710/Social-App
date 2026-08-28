import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostDataResponse } from '../Models/post-data.interface';
import { PostMutation, PostMutationResponse } from '../Models/post-mutation.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };
  getALLPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(`${environment.base_url}/posts`, this.myHeaders);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.base_url}/posts/${postId}`, this.myHeaders);
  }
  createPost(data: object): Observable<PostMutationResponse> {
    return this.httpClient.post<PostMutationResponse>(
      `${environment.base_url}/posts/`,
      data,
      this.myHeaders,
    );
  }
  updatePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.base_url}/posts/${postId}`, this.myHeaders);
  }
  deletePost(postId: string): Observable<PostMutationResponse> {
    return this.httpClient.delete<PostMutationResponse>(
      `${environment.base_url}/posts/${postId}`,
      this.myHeaders,
    );
  }
}
