import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private themeService: ThemeService,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    
    // Theme ZUERST setzen, damit Splash Screen das richtige Theme hat
    await this.themeService.initializeTheme();
    
    // Zeige Splash Screen für 2 Sekunden
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }
}
