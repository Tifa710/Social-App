import { Component } from '@angular/core';
import { SidebarNavigationComponent } from './Components/sidebar-navigation/sidebar-navigation.component';
import { FeedcontentComponent } from './Components/feedcontent/feedcontent.component';
import { SuggestedFriendsComponent } from './Components/suggested-friends/suggested-friends.component';

@Component({
  selector: 'app-feed',
  imports: [SidebarNavigationComponent, FeedcontentComponent, SuggestedFriendsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
