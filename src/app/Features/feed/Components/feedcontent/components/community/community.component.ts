import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../../../Core/Services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../../../../Core/Models/post-data.interface';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../../../../Core/Services/comments.service';
import { Comment } from '../../../../../../Core/Models/comments.interface';

@Component({
  selector: 'app-community',
  imports: [DatePipe],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit, OnDestroy {
  private readonly postService = inject(PostService);
  private readonly commentsService = inject(CommentsService);
  private postSubscription!: Subscription;
  postArray: Post[] = [];
  commentsArray: Comment[] = [];
  userId: string = '';
  ngOnInit(): void {
    this.getAllPosts();
    this.getUserId();
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
  getAllPosts() {
    this.postSubscription = this.postService.getALLPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postArray = res.data.posts;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  getUserId(): void {
    if (localStorage.getItem('userData')) {
      this.userId = JSON.parse(localStorage.getItem('userData')!)?._id;
    }
  }
  deletePostItem(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  getPostCommentsData(postId: string): void {
    this.commentsService.getPostComment(postId).subscribe({
      next: (res) => {
        this.commentsArray = res.data.comments;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
