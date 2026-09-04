import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FollowingSuggestionResponse } from '../Models/Follow/following-suggestion.interface';
import { FollowingResponse } from '../Models/Follow/following.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly httpClient = inject(HttpClient);

  getFollowSuggestion(): Observable<FollowingSuggestionResponse> {
    return this.httpClient.get<FollowingSuggestionResponse>(
      `${environment.base_url}/users/suggestions?limit=10`,
    );
  }
  makeFollowAndUnFollowUser(userId: string): Observable<FollowingResponse> {
    return this.httpClient.put<FollowingResponse>(
      `${environment.base_url}/users/${userId}/follow`,
      null,
    );
  }
}
