import { Component, inject, OnInit } from '@angular/core';
import { Notification } from '../../Core/Models/Notification/notifications.interface';
import { NotificationsService } from '../../Core/Services/notifications.service';
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { NotificationRead } from '../../Core/Models/Notification/notification-read.interface';

@Component({
  selector: 'app-notification',
  imports: [TimeAgoPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  notificationsArray: Notification[] = [];
  unReadNotificationCount: number = 0;
  ngOnInit(): void {
    this.getNotifications();
    this.getUnReadNotificationCount();
    this.notificationsService.Count.subscribe(() => {
      this.getUnReadNotificationCount();
    });
  }
  getNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (res) => {
        this.notificationsArray = res.data.notifications;
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
  makeNotificationRead(notificationId: string): void {
    this.notificationsService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notificationsArray.find(
          (notify) => notify._id === notificationId,
        );
        if (notification) {
          notification.isRead = true;
        }
        this.notificationsService.Count.next();
      },
    });
  }
  markAllAsRead(): void {
    this.notificationsService.markAllAsRead().subscribe({
      next: () => {
        this.notificationsArray.every((notify) => (notify.isRead = true));
      },
    });
  }
}
