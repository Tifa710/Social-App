import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../../Core/Models/post-data.interface';
import { getUserData } from '../../../../Core/utilities/getUserData';
import { MyUserService } from '../../../../Core/Services/myuser.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly myUserService = inject(MyUserService);
  isUserMenuOpen = false;
  userData!: User;
  private readonly router = inject(Router);
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  ngOnInit(): void {
    this.getMyUserData();
    this.myUserService.photoUpdated.subscribe(() => {
      this.getMyUserData();
    });
  }
  getMyUserData(): void {
    this.myUserService.getMyUserData().subscribe({
      next: (res) => {
        this.userData = res.data.user;
      },
    });
  }

  sigOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
