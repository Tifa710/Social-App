import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PostService } from '../../../../../../Core/Services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Post, User } from '../../../../../../Core/Models/post-data.interface';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../../../../Core/Services/comments.service';
import { Comment } from '../../../../../../Core/Models/comments.interface';
import { Reply } from '../../../../../../Core/Models/commentreplay.interface';
import { getUserData } from '../../../../../../Core/utilities/getUserData';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-community',
  imports: [DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
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
  commentControl = new FormControl('');
  commentReplyControl = new FormControl('');
  imgUrl: string | ArrayBuffer | null | undefined;
  userId: string = '';
  postId: string = '';
  selectedFile!: File;
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
  changeFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
    this.previewImage();
  }
  previewImage() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFile);
    fileReader.addEventListener('load', (e) => {
      this.imgUrl = e.target?.result;
    });
  }
  submitComment() {
    const formdata = new FormData();
    if (this.commentControl.value) {
      formdata.append('content', this.commentControl.value);
    }
    if (this.selectedFile) {
      formdata.append('image', this.selectedFile);
    }
    this.commentsService.createComment(this.postId, formdata).subscribe({
      next: (res) => {
        console.log(res);
        this.commentControl.reset();
        this.imgUrl = '';
        this.getPostCommentsData(this.postId);
        this.getAllPosts();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  removeFile(): void {
    this.imgUrl = '';
  }
  submitReplyComment(commentId: string) {
    const formdata = new FormData();
    if (this.commentReplyControl.value) {
      formdata.append('content', this.commentReplyControl.value);
    }
    this.commentsService.createCommentReplay(commentId, this.postId, formdata).subscribe({
      next: (res) => {
        console.log(res);
        this.commentReplyControl.reset();
        this.imgUrl = '';
        this.getPostCommentsData(this.postId);
        this.getAllPosts();
        this.getCommentsReplyData(commentId);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
