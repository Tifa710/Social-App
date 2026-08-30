import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../Core/Models/userdata.interface';
import { MyUserService } from '../../Core/Services/myuser.service';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private myUserService = inject(MyUserService);
  myUser!: User;
  ngOnInit(): void {
    this.getMyUser();
  }
  getMyUser(): void {
    this.myUserService.getMyUserData().subscribe({
      next: (res) => {
        this.myUser = res.data.user;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
