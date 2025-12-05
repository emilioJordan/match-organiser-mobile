import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  async getCurrentPosition(): Promise<Position | null> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  async checkPermissions() {
    return await Geolocation.checkPermissions();
  }

  async requestPermissions() {
    return await Geolocation.requestPermissions();
  }
}
