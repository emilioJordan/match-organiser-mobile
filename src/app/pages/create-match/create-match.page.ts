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
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = today.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

    console.log('Init form with date:', dateString, 'time:', timeString);

    this.matchForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: [dateString, Validators.required],
      time: [timeString, Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      max_participants: [10, [Validators.required, Validators.min(2), Validators.max(100)]],
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

    try {
      // Erst Berechtigung prüfen
      const permissions = await this.geolocationService.checkPermissions();
      console.log('Current permissions:', permissions);
      
      if (permissions.location !== 'granted') {
        await loading.dismiss();
        
        const alert = await this.alertController.create({
          header: 'Standortberechtigung erforderlich',
          message: 'Die App benötigt Zugriff auf deinen Standort, um den aktuellen Ort zu verwenden.',
          buttons: [
            {
              text: 'Abbrechen',
              role: 'cancel'
            },
            {
              text: 'Berechtigung erteilen',
              handler: async () => {
                try {
                  const requestResult = await this.geolocationService.requestPermissions();
                  console.log('Permission request result:', requestResult);
                  
                  if (requestResult.location === 'granted') {
                    // Berechtigung erteilt, versuche erneut
                    setTimeout(() => this.useCurrentLocation(), 500);
                  } else {
                    const toast = await this.toastController.create({
                      message: 'Standortberechtigung wurde verweigert. Bitte aktiviere sie in den Einstellungen.',
                      duration: 3000,
                      color: 'warning'
                    });
                    await toast.present();
                  }
                } catch (error) {
                  console.error('Fehler bei Berechtigungsanfrage:', error);
                  const toast = await this.toastController.create({
                    message: 'Fehler bei der Berechtigungsanfrage',
                    duration: 2000,
                    color: 'danger'
                  });
                  await toast.present();
                }
              }
            }
          ]
        });
        await alert.present();
        return;
      }

      // Berechtigung vorhanden, hole Position
      console.log('Permission granted, getting position...');
      const position = await this.geolocationService.getCurrentPosition();
      
      if (position && position.coords) {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        console.log('Position obtained:', this.currentLocation);
        
        // Formatiere die Koordinaten für bessere Lesbarkeit
        const locationText = `Koordinaten: ${position.coords.latitude.toFixed(6)}°, ${position.coords.longitude.toFixed(6)}°`;
        
        this.matchForm.patchValue({
          location: locationText
        });

        await loading.dismiss();
        
        const toast = await this.toastController.create({
          message: 'Standort erfolgreich hinzugefügt!',
          duration: 2000,
          color: 'success',
          icon: 'checkmark-circle'
        });
        await toast.present();
      } else {
        throw new Error('Keine Position erhalten');
      }
    } catch (error: any) {
      await loading.dismiss();
      console.error('Fehler beim Abrufen des Standorts:', error);
      
      let errorMessage = 'Standort konnte nicht ermittelt werden.';
      
      if (error.message && error.message.includes('permission')) {
        errorMessage = 'Standortberechtigung wurde verweigert.';
      } else if (error.message && error.message.includes('timeout')) {
        errorMessage = 'Zeitüberschreitung beim Abrufen des Standorts. Bitte versuche es erneut.';
      } else if (error.message && error.message.includes('unavailable')) {
        errorMessage = 'Standortdienste sind nicht verfügbar. Bitte aktiviere GPS.';
      }
      
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        icon: 'alert-circle'
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
      // Zeige welche Felder fehlen
      const invalidFields: string[] = [];
      Object.keys(this.matchForm.controls).forEach(key => {
        const control = this.matchForm.get(key);
        if (control?.invalid) {
          invalidFields.push(key);
          console.log(`Feld '${key}' ist ungültig:`, control.errors);
        }
      });
      
      console.log('Formular ungültig. Fehlerhafte Felder:', invalidFields);
      console.log('Formular Werte:', this.matchForm.value);
      
      const toast = await this.toastController.create({
        message: `Bitte fülle alle Pflichtfelder korrekt aus: ${invalidFields.join(', ')}`,
        duration: 3000,
        color: 'warning',
        icon: 'alert-circle'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Match wird erstellt...',
    });
    await loading.present();

    try {
      console.log('=== Match-Erstellung gestartet ===');
      
      // Hole User-Profil
      const userProfile = await this.storageService.getUserProfile();
      console.log('User Profile:', userProfile);
      
      if (!userProfile || !userProfile.userId) {
        throw new Error('Kein Benutzerprofil gefunden. Bitte melde dich erneut an.');
      }
      
      // Erstelle Match-Daten
      const matchData: Match = {
        title: this.matchForm.value.title,
        description: this.matchForm.value.description,
        date: this.matchForm.value.date,
        time: this.matchForm.value.time,
        location: this.matchForm.value.location,
        max_participants: parseInt(this.matchForm.value.max_participants),
        created_by: userProfile.userId, // Verwende UUID statt E-Mail
        image_url: this.imagePreview || null,
        latitude: this.currentLocation?.lat || null,
        longitude: this.currentLocation?.lng || null
      };

      console.log('Match-Daten die gesendet werden:', matchData);
      
      // Sende an Supabase
      const result = await this.supabaseService.createMatch(matchData);
      console.log('Supabase Antwort:', result);
      
      await loading.dismiss();

      if (result && result.id) {
        console.log('Match erfolgreich erstellt mit ID:', result.id);
        
        const toast = await this.toastController.create({
          message: '✅ Match erfolgreich erstellt!',
          duration: 2000,
          color: 'success',
          icon: 'checkmark-circle'
        });
        await toast.present();
        
        // Formular zurücksetzen
        this.matchForm.reset();
        this.imagePreview = null;
        this.currentLocation = null;
        this.initForm();
        
        // Navigiere zur Match-Liste
        await this.router.navigate(['/tabs/matches']);
      } else {
        console.error('Match konnte nicht erstellt werden - result:', result);
        throw new Error('Keine gültige Antwort vom Server erhalten');
      }
    } catch (error: any) {
      await loading.dismiss();
      console.error('=== Fehler beim Erstellen des Matches ===');
      console.error('Error:', error);
      console.error('Error Message:', error?.message);
      console.error('Error Stack:', error?.stack);
      
      let errorMessage = 'Fehler beim Erstellen des Matches';
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      const toast = await this.toastController.create({
        message: `❌ ${errorMessage}`,
        duration: 4000,
        color: 'danger',
        icon: 'alert-circle',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
    }
  }

  removeImage() {
    this.imagePreview = null;
  }
}
