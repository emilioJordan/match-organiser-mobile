import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  async set(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async get(key: string): Promise<any> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }

  // Specific methods for match data
  async saveUserProfile(profile: { name: string; email: string; isOrganizer: boolean; userId?: string }) {
    // Generiere eine UUID wenn keine vorhanden ist
    if (!profile.userId) {
      profile.userId = this.generateUUID();
    }
    await this.set('userProfile', profile);
  }

  async getUserProfile(): Promise<{ name: string; email: string; isOrganizer: boolean; userId: string } | null> {
    const profile = await this.get('userProfile');
    if (profile && !profile.userId) {
      // Füge UUID hinzu wenn noch keine vorhanden
      profile.userId = this.generateUUID();
      await this.saveUserProfile(profile);
    }
    return profile;
  }

  // Generiere eine einfache UUID v4
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async saveFavoriteMatches(matchIds: number[]) {
    await this.set('favoriteMatches', matchIds);
  }

  async getFavoriteMatches(): Promise<number[]> {
    const favorites = await this.get('favoriteMatches');
    return favorites || [];
  }
}
