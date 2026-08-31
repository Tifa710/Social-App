import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommentsResponse } from '../Models/comments.interface';
import { CommentReplayResponse } from '../Models/commentreplay.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComment(postId: string): Observable<CommentsResponse> {
    return this.httpClient.get<CommentsResponse>(
      `${environment.base_url}/posts/${postId}/comments?page=1&limit=10`,
    );
  }
  getCommentReplay(postId: string, commentId: string): Observable<CommentReplayResponse> {
    return this.httpClient.get<CommentReplayResponse>(
      `${environment.base_url}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    );
  }
  createComment(postId: string, data: object): Observable<CommentsResponse> {
    return this.httpClient.post<CommentsResponse>(
      `${environment.base_url}/posts/${postId}/comments`,
      data,
    );
  }
  createCommentReplay(
    commentId: string,
    postId: string,
    data: object,
  ): Observable<CommentReplayResponse> {
    return this.httpClient.post<CommentReplayResponse>(
      `${environment.base_url}/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }
  deleteComment(commentId: string, postId: string): Observable<CommentsResponse> {
    return this.httpClient.delete<CommentsResponse>(
      `${environment.base_url}/posts/${postId}/comments/${commentId}`,
    );
  }
}
