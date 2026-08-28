import { Routes } from '@angular/router';
import { authGuard } from './Core/Auth/Guards/auth-guard';
import { guestGuard } from './Core/Auth/Guards/guest-guard';
import { ChangePasswordComponent } from './Features/change-password/change-password.component';
import { CommunityComponent } from './Features/feed/Components/feedcontent/components/community/community.component';
import { FeedPostComponent } from './Features/feed/Components/feedcontent/components/feed-post/feed-post.component';
import { MyPostComponent } from './Features/feed/Components/feedcontent/components/my-post/my-post.component';
import { SavedPostComponent } from './Features/feed/Components/feedcontent/components/saved-post/saved-post.component';
import { FeedComponent } from './Features/feed/feed.component';
import { ForgetPasswordComponent } from './Features/forget-password/forget-password.component';
import { LoginComponent } from './Features/login/login.component';
import { NotfoundComponent } from './Features/notfound/notfound.component';
import { NotificationComponent } from './Features/notification/notification.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { RegisterComponent } from './Features/register/register.component';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';

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
        children: [
          {
            path: '',
            redirectTo: 'feedPost',
            pathMatch: 'full',
          },
          {
            path: 'feedPost',
            component: FeedPostComponent,
          },
          {
            path: 'community',
            component: CommunityComponent,
          },
          {
            path: 'myPost',
            component: MyPostComponent,
          },
          {
            path: 'savedPost',
            component: SavedPostComponent,
          },
        ],
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
