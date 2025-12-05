import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

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
    this.applyTheme();
  }

  async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    await Preferences.set({
      key: this.THEME_KEY,
      value: this.darkMode.toString()
    });
    this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }
}
