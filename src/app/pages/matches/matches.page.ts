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
    this.matches = await this.supabaseService.getMatches();
    this.filteredMatches = [...this.matches];
    this.loading = false;
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
