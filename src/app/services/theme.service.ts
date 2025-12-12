import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;
  private readonly THEME_KEY = 'darkMode';

  constructor() {}

  async initializeTheme() {
    const { value } = await Preferences.get({ key: this.THEME_KEY });
    this.darkMode = value === 'true';
    await this.applyTheme();
  }

  async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    await Preferences.set({
      key: this.THEME_KEY,
      value: this.darkMode.toString()
    });
    await this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private async applyTheme() {
    // CSS Klasse setzen
    document.body.classList.toggle('dark', this.darkMode);
    
    // Android StatusBar Style ändern
    try {
      if (this.darkMode) {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#1a1a1a' });
      } else {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#1e40af' });
      }
    } catch (error) {
      // StatusBar ist nicht verfügbar (z.B. im Browser)
      console.log('StatusBar nicht verfügbar:', error);
    }
  }
}
