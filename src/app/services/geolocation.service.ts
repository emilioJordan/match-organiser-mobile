import { Injectable } from '@angular/core';
import { Geolocation, Position, PermissionStatus } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  async getCurrentPosition(): Promise<Position | null> {
    try {
      // Prüfe zuerst die Berechtigung
      const permission = await this.checkPermissions();
      
      if (permission.location !== 'granted') {
        console.log('Location permission not granted, requesting...');
        const requestResult = await this.requestPermissions();
        
        if (requestResult.location !== 'granted') {
          console.error('Location permission denied');
          throw new Error('Location permission denied');
        }
      }

      // Hole Position mit Timeout
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
      
      console.log('Got position:', coordinates);
      return coordinates;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  async checkPermissions(): Promise<PermissionStatus> {
    try {
      const result = await Geolocation.checkPermissions();
      console.log('Permission status:', result);
      return result;
    } catch (error) {
      console.error('Error checking permissions:', error);
      throw error;
    }
  }

  async requestPermissions(): Promise<PermissionStatus> {
    try {
      const result = await Geolocation.requestPermissions();
      console.log('Permission request result:', result);
      return result;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      throw error;
    }
  }
}
