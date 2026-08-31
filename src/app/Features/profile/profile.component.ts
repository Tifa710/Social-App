import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../Core/Models/userdata.interface';
import { MyUserService } from '../../Core/Services/myuser.service';
import { Post } from '../../Core/Models/post-data.interface';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private myUserService = inject(MyUserService);
  myUser!: User;
  postArray: Post[] = [];
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
        console.log(res);
      },

    });
  }
}
