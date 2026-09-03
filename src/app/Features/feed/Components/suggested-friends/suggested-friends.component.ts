import { Component, inject, OnInit } from '@angular/core';
import { FollowService } from '../../../../Core/Services/follow.service';
import { Suggestion } from '../../../../Core/Models/following-suggestion.interface';

@Component({
  selector: 'app-suggested-friends',
  imports: [],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {
  private readonly followService = inject(FollowService);
  suggestFriendArray: Suggestion[] = [];
  ngOnInit(): void {
    this.getFollowingSuggestion();
  }
  getFollowingSuggestion() {
    this.followService.getFollowSuggestion().subscribe({
      next: (res) => {
        this.suggestFriendArray = res.data.suggestions;
      },
    });
  }
  makeFollowAndUnFollow(userId: string) {
    this.followService.makeFollowAndUnFollowUser(userId).subscribe({
      next: (res) => {
        this.getFollowingSuggestion();
      },
    });
  }
}
