import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SupabaseService, Match } from '../../services/supabase.service';
import { CameraService } from '../../services/camera.service';
import { GeolocationService } from '../../services/geolocation.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.scss'],
})
export class CreateMatchPage implements OnInit {
  matchForm!: FormGroup;
  imagePreview: string | null = null;
  currentLocation: { lat: number; lng: number } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private cameraService: CameraService,
    private geolocationService: GeolocationService,
    private storageService: StorageService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0].substring(0, 5);

    this.matchForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: [today, Validators.required],
      time: [now, Validators.required],
      location: ['', Validators.required],
      max_participants: [10, [Validators.required, Validators.min(2)]],
    });
  }

  async takePicture() {
    const image = await this.cameraService.takePicture();
    if (image) {
      this.imagePreview = image;
    }
  }

  async selectFromGallery() {
    const image = await this.cameraService.selectFromGallery();
    if (image) {
      this.imagePreview = image;
    }
  }

  async useCurrentLocation() {
    const loading = await this.loadingController.create({
      message: 'Standort wird ermittelt...',
    });
    await loading.present();

    const position = await this.geolocationService.getCurrentPosition();
    await loading.dismiss();

    if (position) {
      this.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      // Hier könntest du die Koordinaten in eine Adresse umwandeln
      // Für jetzt setzen wir einen generischen Text
      this.matchForm.patchValue({
        location: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
      });

      const toast = await this.toastController.create({
        message: 'Standort erfolgreich hinzugefügt',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Standort konnte nicht ermittelt werden',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  async showImageOptions() {
    const alert = await this.alertController.create({
      header: 'Bild auswählen',
      buttons: [
        {
          text: 'Kamera',
          handler: () => this.takePicture()
        },
        {
          text: 'Galerie',
          handler: () => this.selectFromGallery()
        },
        {
          text: 'Abbrechen',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async createMatch() {
    if (this.matchForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Bitte fülle alle Pflichtfelder aus',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Match wird erstellt...',
    });
    await loading.present();

    const userProfile = await this.storageService.getUserProfile();
    
    const matchData: Match = {
      ...this.matchForm.value,
      created_by: userProfile?.email || 'anonymous',
      image_url: this.imagePreview || null,
      latitude: this.currentLocation?.lat || null,
      longitude: this.currentLocation?.lng || null
    };

    const result = await this.supabaseService.createMatch(matchData);
    await loading.dismiss();

    if (result) {
      const toast = await this.toastController.create({
        message: 'Match erfolgreich erstellt!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      
      this.matchForm.reset();
      this.imagePreview = null;
      this.currentLocation = null;
      this.initForm();
      
      this.router.navigate(['/tabs/matches']);
    } else {
      const toast = await this.toastController.create({
        message: 'Fehler beim Erstellen des Matches',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  removeImage() {
    this.imagePreview = null;
  }
}
