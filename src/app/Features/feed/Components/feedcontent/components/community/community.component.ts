import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../../../Core/Services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Post, User } from '../../../../../../Core/Models/post-data.interface';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../../../../Core/Services/comments.service';
import { Comment } from '../../../../../../Core/Models/comments.interface';
import { Reply } from '../../../../../../Core/Models/commentreplay.interface';
import { getUserData } from '../../../../../../Core/utilities/getUserData';

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
  private replaySubscription!: Subscription;
  postArray: Post[] = [];
  commentsArray: Comment[] = [];
  commentReplyArray: Reply[] = [];
  userId: string = '';
  postId: string = '';
  selectedComment: string = '';
  userData: User = getUserData();
  ngOnInit(): void {
    this.getAllPosts();
    this.getUserId();
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
  @HostListener('document:click')
  closeDetails(): void {
    const details = document.querySelectorAll('details[open]');

    details.forEach((detail) => {
      detail.removeAttribute('open');
    });
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
        this.replaySubscription?.unsubscribe();
        this.commentReplyArray = [];
        this.postId = postId;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCommentsReplyData(commentId: string): void {
    this.selectedComment = commentId;
    this.commentReplyArray = [];
    this.replaySubscription?.unsubscribe();
    this.replaySubscription = this.commentsService
      .getCommentReplay(this.postId, commentId)
      .subscribe({
        next: (res) => {
          this.commentReplyArray = res.data.replies;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
