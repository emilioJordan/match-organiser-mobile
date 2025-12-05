import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService, Match } from '../../services/supabase.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private supabaseService: SupabaseService,
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadMatches();
  }

  async ionViewWillEnter() {
    await this.loadMatches();
  }

  async loadMatches() {
    this.loading = true;
    
    // Mock-Daten für Demo (ohne Supabase)
    this.matches = [
      {
        id: 1,
        title: 'Fussball am Dienstag',
        description: 'Lockeres Freundschaftsspiel für alle Niveaus',
        date: '2025-12-10',
        time: '18:00',
        location: 'Sportplatz Zürich',
        latitude: 47.3769,
        longitude: 8.5417,
        max_participants: 12,
        image_url: '',
        created_by: 'user-123',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Basketball Match',
        description: 'Suchen noch Spieler für 5vs5',
        date: '2025-12-12',
        time: '19:00',
        location: 'Sporthalle Bern',
        latitude: 46.9480,
        longitude: 7.4474,
        max_participants: 10,
        image_url: '',
        created_by: 'user-456',
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Volleyball Turnier',
        description: 'Freundschaftliches Turnier am Wochenende',
        date: '2025-12-15',
        time: '14:00',
        location: 'Beach Arena Basel',
        latitude: 47.5596,
        longitude: 7.5886,
        max_participants: 16,
        image_url: '',
        created_by: 'user-789',
        created_at: new Date().toISOString()
      }
    ];
    
    this.filteredMatches = [...this.matches];
    this.loading = false;
    
    // Original Supabase Code (auskommentiert)
    // this.matches = await this.supabaseService.getMatches();
    // this.filteredMatches = [...this.matches];
    // this.loading = false;
  }

  filterMatches() {
    if (!this.searchTerm.trim()) {
      this.filteredMatches = [...this.matches];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredMatches = this.matches.filter(match =>
      match.title.toLowerCase().includes(term) ||
      match.location.toLowerCase().includes(term) ||
      match.description.toLowerCase().includes(term)
    );
  }

  viewMatch(matchId: number) {
    this.router.navigate(['/tabs/matches', matchId]);
  }

  async doRefresh(event: any) {
    await this.loadMatches();
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
