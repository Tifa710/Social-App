import { Component } from '@angular/core';
import { FeedcontentComponent } from './Components/feedcontent/feedcontent.component';
import { SuggestedFriendsComponent } from './Components/suggested-friends/suggested-friends.component';

@Component({
  selector: 'app-feed',
  imports: [FeedcontentComponent, SuggestedFriendsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
