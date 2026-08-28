import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from "./components/create-post/create-post.component";

@Component({
  selector: 'app-feedcontent',
  imports: [RouterOutlet, CreatePostComponent],
  templateUrl: './feedcontent.component.html',
  styleUrl: './feedcontent.component.css',
})
export class FeedcontentComponent {}
