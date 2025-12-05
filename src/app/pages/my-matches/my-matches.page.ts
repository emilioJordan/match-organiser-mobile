import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService, Match, Participant } from '../../services/supabase.service';
import { StorageService } from '../../services/storage.service';

interface MyMatch {
  match: Match;
  participant: Participant;
}

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {
  myMatches: MyMatch[] = [];
  loading = false;

  constructor(
    private supabaseService: SupabaseService,
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadMyMatches();
  }

  async ionViewWillEnter() {
    await this.loadMyMatches();
  }

  async loadMyMatches() {
    this.loading = true;
    const userProfile = await this.storageService.getUserProfile();
    
    if (!userProfile?.email) {
      this.loading = false;
      return;
    }

    // Hier würde normalerweise eine API-Anfrage kommen, um alle Anmeldungen zu holen
    // Für diese Demo laden wir alle Matches und filtern lokal
    const allMatches = await this.supabaseService.getMatches();
    this.myMatches = [];

    // In einer echten Implementierung würde dies serverseitig geschehen
    this.loading = false;
  }

  viewMatch(matchId: number) {
    this.router.navigate(['/tabs/matches', matchId]);
  }

  async doRefresh(event: any) {
    await this.loadMyMatches();
    event.target.complete();
  }

  getFormattedDate(dateString: string, timeString: string): string {
    const date = new Date(`${dateString}T${timeString}`);
    return date.toLocaleDateString('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
