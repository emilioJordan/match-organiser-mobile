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
  async saveUserProfile(profile: { name: string; email: string; isOrganizer: boolean }) {
    await this.set('userProfile', profile);
  }

  async getUserProfile(): Promise<{ name: string; email: string; isOrganizer: boolean } | null> {
    return await this.get('userProfile');
  }

  async saveFavoriteMatches(matchIds: number[]) {
    await this.set('favoriteMatches', matchIds);
  }

  async getFavoriteMatches(): Promise<number[]> {
    const favorites = await this.get('favoriteMatches');
    return favorites || [];
  }
}
