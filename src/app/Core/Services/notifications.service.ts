import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationsResponse } from '../Models/Notification/notifications.interface';
import { NotificationReadResponse } from '../Models/Notification/notification-read.interface';
import { UnReadNotificationCountResponse } from '../Models/Notification/un-read-Notification-count.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);
  Count = new Subject<void>();
  getNotifications(): Observable<NotificationsResponse> {
    return this.httpClient.get<NotificationsResponse>(
      `${environment.base_url}/notifications?unread=false&page=1&limit=30`,
    );
  }
  getNotificationsUnReadCount(): Observable<UnReadNotificationCountResponse> {
    return this.httpClient.get<UnReadNotificationCountResponse>(
      `${environment.base_url}/notifications/unread-count`,
    );
  }
  markNotificationAsRead(notificationId: string): Observable<NotificationReadResponse> {
    return this.httpClient.patch<NotificationReadResponse>(
      `${environment.base_url}/notifications/${notificationId}/read`,
      {},
    );
  }
  markAllAsRead(notificationId: string): Observable<NotificationReadResponse> {
    return this.httpClient.patch<NotificationReadResponse>(
      `${environment.base_url}/notifications/${notificationId}/read`,
      {},
    );
  }
}
