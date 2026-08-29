import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../../Core/Models/post-data.interface';
import { getUserData } from '../../../../Core/utilities/getUserData';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.css',
})
export class SidebarNavigationComponent {
  userData: User = getUserData();
}
