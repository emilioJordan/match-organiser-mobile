import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  async scheduleMatchReminder(matchTitle: string, matchDate: Date, matchId: number) {
    try {
      await LocalNotifications.requestPermissions();
      
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Match Reminder',
            body: `${matchTitle} starts soon!`,
            id: matchId,
            schedule: { at: new Date(matchDate.getTime() - 60 * 60 * 1000) }, // 1 hour before
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: { matchId }
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async cancelNotification(id: number) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  async checkPermissions() {
    return await LocalNotifications.checkPermissions();
  }

  async requestPermissions() {
    return await LocalNotifications.requestPermissions();
  }
}
