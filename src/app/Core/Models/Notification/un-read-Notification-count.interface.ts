export interface UnReadNotificationCountResponse {
  success: boolean;
  message: string;
  data: UnReadNotificationCount;
}

export interface UnReadNotificationCount {
  unreadCount: number;
}
