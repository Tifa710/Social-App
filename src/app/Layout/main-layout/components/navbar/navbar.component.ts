import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../../Core/Models/Posts/post-data.interface';
import { getUserData } from '../../../../Core/utilities/getUserData';
import { MyUserService } from '../../../../Core/Services/myuser.service';
import { NotificationsService } from '../../../../Core/Services/notifications.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly myUserService = inject(MyUserService);
  private readonly notificationsService = inject(NotificationsService);
  isUserMenuOpen = false;
  unReadNotificationCount: number = 0;
  userData!: User;
  private readonly router = inject(Router);
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  ngOnInit(): void {
    this.getMyUserData();
    this.getUnReadNotificationCount();
    this.myUserService.photoUpdated.subscribe(() => {
      this.getMyUserData();
    });
    this.notificationsService.Count.subscribe(() => {
      this.getUnReadNotificationCount();
    });
  }
  getMyUserData(): void {
    this.myUserService.getMyUserData().subscribe({
      next: (res) => {
        this.userData = res.data.user;
      },
    });
  }
  getUnReadNotificationCount(): void {
    this.notificationsService.getNotificationsUnReadCount().subscribe({
      next: (res) => {
        this.unReadNotificationCount = res.data.unreadCount;
      },
    });
  }
  sigOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
