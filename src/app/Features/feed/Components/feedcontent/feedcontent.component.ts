import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookmarkPost } from '../../../../Core/Models/bookmarksposts.interface';
import { Reply } from '../../../../Core/Models/commentreplay.interface';
import { Comment } from '../../../../Core/Models/comments.interface';
import { Post, User } from '../../../../Core/Models/post-data.interface';
import { CommentsService } from '../../../../Core/Services/comments.service';
import { MyUserService } from '../../../../Core/Services/myuser.service';
import { PostService } from '../../../../Core/Services/post.service';
import { getUserData } from '../../../../Core/utilities/getUserData';

@Component({
  selector: 'app-feedcontent',
  imports: [DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './feedcontent.component.html',
  styleUrl: './feedcontent.component.css',
})
export class FeedcontentComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly commentsService = inject(CommentsService);
  private readonly myUserService = inject(MyUserService);
  private replaySubscription!: Subscription;
  postArray: Post[] = [];
  bookMarkedPostArray: BookmarkPost[] = [];
  commentsArray: Comment[] = [];
  commentReplyArray: Reply[] = [];
  commentControl = new FormControl('');
  commentReplyControl = new FormControl('');
  imgUrl: string | ArrayBuffer | null | undefined;
  textContentControl = new FormControl('');
  privacyControl = new FormControl('public');
  createSelectedFile!: File;
  postImgUrl: string | ArrayBuffer | null | undefined;
  userId: string = '';
  postId: string = '';
  selectedFile!: File;
  selectedComment: string = '';
  isFeedPostActive: boolean = true;
  isCommunityPostActive: boolean = false;
  isMyPostActive: boolean = false;
  isSavedPostActive: boolean = false;
  userData: User = getUserData();
  ngOnInit(): void {
    this.onFeedPost();
  }
  @HostListener('document:click')
  closeDetails(): void {
    const details = document.querySelectorAll('details[open]');

    details.forEach((detail) => {
      detail.removeAttribute('open');
    });
  }
  onFeedPost(): void {
    this.postService.getFeedPosts().subscribe({
      next: (res) => {
        this.postArray = res.data.posts;
        this.isFeedPostActive = true;
        this.isCommunityPostActive = false;
        this.isMyPostActive = false;
        this.isSavedPostActive = false;
      },
    });
  }
  onGetMYPost(): void {
    this.myUserService.getMyUserPosts(this.userData._id).subscribe({
      next: (res) => {
        this.postArray = res.data.posts;
        this.isFeedPostActive = false;
        this.isCommunityPostActive = false;
        this.isMyPostActive = true;
        this.isSavedPostActive = false;
      },
    });
  }
  getAllPosts() {
    this.postService.getALLPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postArray = res.data.posts;
          this.isCommunityPostActive = true;
          this.isFeedPostActive = false;
          this.isMyPostActive = false;
          this.isSavedPostActive = false;
        }
      },
    });
  }
  onGetMarkedPost(): void {
    this.postService.getBookMarksPosts().subscribe({
      next: (res) => {
        this.bookMarkedPostArray = res.data.bookmarks;
        this.isFeedPostActive = false;
        this.isCommunityPostActive = false;
        this.isMyPostActive = false;
        this.isSavedPostActive = true;
      },
    });
  }
  deletePostItem(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
        }
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
        this.commentControl.reset();
        this.imgUrl = '';
        this.getPostCommentsData(this.postId);
        this.getAllPosts();
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
        this.commentReplyControl.reset();
        this.imgUrl = '';
        this.getPostCommentsData(this.postId);
        this.getAllPosts();
        this.getCommentsReplyData(commentId);
      },
    });
  }
  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId, this.postId).subscribe({
      next: (res) => {
        this.getAllPosts();
        this.getPostCommentsData(this.postId);
      },
    });
  }
  makeLikeAndUnLikePost(postId: string): void {
    this.postService.putLikeAndUnLikePost(postId).subscribe({
      next: (res) => {
        const post = this.postArray.find((post) => post.id == postId);
        const savedPost = this.bookMarkedPostArray.find((post) => post.id == postId);
        if (post) {
          post.likes = res.data.post.likes;
          post.likesCount = res.data.post.likesCount;
        } else if (savedPost) {
          savedPost.likes = res.data.post.likes;
          savedPost.likesCount = res.data.post.likesCount;
        }
      },
    });
  }
  makeMarkedAndUnMarkedPost(postId: string): void {
    this.postService.putMarkedAndUnMarkedPost(postId).subscribe({
      next: (res) => {
        const post = this.postArray.find((post) => post.id == postId);
        const savedPost = this.bookMarkedPostArray.find((post) => post.id == postId);
        if (post) {
          post.bookmarked = res.data.bookmarked;
        } else if (savedPost) {
          savedPost.bookmarked = res.data.bookmarked;
        }
      },
    });
  }
  postChangeFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.createSelectedFile = input.files[0];
    }
    this.previewPostImage();
  }
  previewPostImage() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.createSelectedFile);
    fileReader.addEventListener('load', (e) => {
      this.postImgUrl = e.target?.result;
    });
  }
  submitPost(e: SubmitEvent, formElement: HTMLFormElement) {
    e.preventDefault();
    const formData = new FormData();

    if (this.textContentControl.value) {
      formData.append('body', this.textContentControl.value!);
    }
    if (this.privacyControl.value) {
      formData.append('privacy', this.privacyControl.value!);
    }
    if (this.createSelectedFile) {
      formData.append('image', this.createSelectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          formElement.reset();
          this.postImgUrl = '';
          this.getAllPosts();
        }
      },
    });
  }
  createPostRemoveFile(): void {
    this.postImgUrl = '';
  }
}
