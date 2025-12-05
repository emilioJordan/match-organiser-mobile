import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SupabaseService, Match, Participant } from '../../services/supabase.service';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.page.html',
  styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {
  match: Match | null = null;
  participants: Participant[] = [];
  isRegistered = false;
  loading = true;
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      await this.loadMatchDetails(parseInt(matchId, 10));
    }
  }

  async loadMatchDetails(matchId: number) {
    this.loading = true;
    this.match = await this.supabaseService.getMatch(matchId);
    this.participants = await this.supabaseService.getParticipants(matchId);
    
    const userProfile = await this.storageService.getUserProfile();
    if (userProfile && this.match) {
      // Verwende Email als temporäre User-ID bis Auth implementiert ist
      const userId = userProfile.email || 'anonymous';
      this.canEdit = userId === this.match.created_by && userProfile.isOrganizer;
      this.isRegistered = this.participants.some(p => p.user_id === userId);
    }
    
    this.loading = false;
  }

  async register() {
    if (!this.match) return;

    const userProfile = await this.storageService.getUserProfile();
    if (!userProfile || !userProfile.name || !userProfile.email) {
      const toast = await this.toastController.create({
        message: 'Bitte fülle dein Profil aus, bevor du dich anmeldest',
        duration: 3000,
        color: 'warning'
      });
      await toast.present();
      this.router.navigate(['/tabs/profile']);
      return;
    }

    if (this.participants.length >= this.match.max_participants) {
      const toast = await this.toastController.create({
        message: 'Match ist bereits voll',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Anmeldung läuft...',
    });
    await loading.present();

    // Verwende Email als temporäre User-ID bis Auth implementiert ist
    const userId = userProfile.email || 'anonymous';

    const result = await this.supabaseService.registerForMatch(this.match.id!, userId);
    await loading.dismiss();

    if (result) {
      this.isRegistered = true;
      await this.loadMatchDetails(this.match.id!); // Reload participants
      
      // Schedule notification
      const matchDateTime = new Date(`${this.match.date}T${this.match.time}`);
      await this.notificationService.scheduleMatchReminder(
        this.match.title,
        matchDateTime,
        this.match.id!
      );

      const toast = await this.toastController.create({
        message: 'Erfolgreich angemeldet!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Anmeldung fehlgeschlagen',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  async unregister() {
    if (!this.match) return;

    const alert = await this.alertController.create({
      header: 'Abmelden',
      message: 'Möchtest du dich wirklich von diesem Match abmelden?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Abmelden',
          handler: async () => {
            const userProfile = await this.storageService.getUserProfile();
            const userId = userProfile?.email || 'anonymous';
            
            const success = await this.supabaseService.unregisterFromMatch(this.match!.id!, userId);
            
            if (success) {
              this.isRegistered = false;
              await this.loadMatchDetails(this.match!.id!); // Reload participants
              
              // Cancel notification
              await this.notificationService.cancelNotification(this.match!.id!);

              const toast = await this.toastController.create({
                message: 'Erfolgreich abgemeldet',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async editMatch() {
    // Hier würde eine Edit-Seite geöffnet werden
    const toast = await this.toastController.create({
      message: 'Bearbeiten-Funktion wird implementiert',
      duration: 2000,
      color: 'medium'
    });
    await toast.present();
  }

  async deleteMatch() {
    if (!this.match) return;

    const alert = await this.alertController.create({
      header: 'Match löschen',
      message: 'Möchtest du dieses Match wirklich löschen? Dies kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Match wird gelöscht...',
            });
            await loading.present();

            const success = await this.supabaseService.deleteMatch(this.match!.id!);
            await loading.dismiss();

            if (success) {
              const toast = await this.toastController.create({
                message: 'Match erfolgreich gelöscht',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
              this.router.navigate(['/tabs/matches']);
            } else {
              const toast = await this.toastController.create({
                message: 'Fehler beim Löschen',
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
  }

  getFormattedDate(): string {
    if (!this.match) return '';
    const date = new Date(`${this.match.date}T${this.match.time}`);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack() {
    this.router.navigate(['/tabs/matches']);
  }
}
