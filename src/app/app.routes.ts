import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { LoginComponent } from './Features/login/login.component';
import { RegisterComponent } from './Features/register/register.component';
import { ForgetPasswordComponent } from './Features/forget-password/forget-password.component';
import { FeedComponent } from './Features/feed/feed.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { NotificationComponent } from './Features/notification/notification.component';
import { ChangePasswordComponent } from './Features/change-password/change-password.component';
import { NotfoundComponent } from './Features/notfound/notfound.component';
import { authGuard } from './Core/Auth/Guards/auth-guard';
import { guestGuard } from './Core/Auth/Guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
