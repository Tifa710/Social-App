import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BookmarkPost } from '../../Core/Models/bookMark/bookmarksposts.interface';
import { Post } from '../../Core/Models/Posts/post-data.interface';
import { User } from '../../Core/Models/User/userdata.interface';
import { MyUserService } from '../../Core/Services/myuser.service';
import { PostService } from '../../Core/Services/post.service';
import { getUserData } from '../../Core/utilities/getUserData';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private myUserService = inject(MyUserService);
  private postService = inject(PostService);
  myUser!: User;
  postArray: Post[] = [];
  savedPostArray: BookmarkPost[] = [];
  userData = getUserData();
  selectedPhoto!: File;
  isMyPosts: boolean = true;
  isSavedPosts: boolean = false;
  ngOnInit(): void {
    this.getMyUser();
  }
  getMyUser(): void {
    this.myUserService.getMyUserData().subscribe({
      next: (res) => {
        this.myUser = res.data.user;
        this.getMyPosts();
      },
    });
  }
  getMyPosts(): void {
    this.myUserService.getMyUserPosts(this.myUser._id).subscribe({
      next: (res) => {
        this.postArray = res.data.posts;
        this.isMyPosts = true;
        this.isSavedPosts = false;
      },
    });
  }
  getSavedPosts(): void {
    this.postService.getBookMarksPosts().subscribe({
      next: (res) => {
        this.savedPostArray = res.data.bookmarks;
        this.isSavedPosts = true;
        this.isMyPosts = false;
      },
    });
  }
  userChangePhoto(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.selectedPhoto = input.files[0];
      this.changePhoto();
    }
  }
  changePhoto(): void {
    const formData = new FormData();
    formData.append('photo', this.selectedPhoto);
    this.myUserService.updateUserPhoto(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getMyUser();
        this.myUserService.photoUpdated.next();
      },
    });
  }
}
