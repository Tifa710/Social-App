import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../../Core/Models/post-data.interface';
import { getUserData } from '../../../../Core/utilities/getUserData';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isUserMenuOpen = false;
  userData: User = getUserData();
  private readonly router = inject(Router);
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  sigOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
