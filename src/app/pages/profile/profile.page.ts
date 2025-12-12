import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ThemeService } from '../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile = {
    name: '',
    email: '',
    isOrganizer: false,
    userId: ''
  };

  constructor(
    private storageService: StorageService,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    const profile = await this.storageService.getUserProfile();
    if (profile) {
      this.userProfile = profile;
    }
  }

  async saveProfile() {
    if (!this.userProfile.name || !this.userProfile.email) {
      const toast = await this.toastController.create({
        message: 'Bitte fülle alle Felder aus',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    await this.storageService.saveUserProfile(this.userProfile);
    
    const toast = await this.toastController.create({
      message: 'Profil gespeichert',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  async toggleDarkMode() {
    await this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
