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
    
    if (!userProfile?.userId) {
      console.log('No user profile or userId found');
      this.myMatches = [];
      this.loading = false;
      return;
    }

    console.log('Loading matches for user:', userProfile.userId);
    
    // Hole alle Matches wo der User angemeldet ist
    const matches = await this.supabaseService.getMyMatches(userProfile.userId);
    
    // Hole die Participant-Details für jedes Match
    const myMatchesPromises = matches.map(async (match) => {
      const participants = await this.supabaseService.getParticipants(match.id!);
      const myParticipation = participants.find(p => p.user_id === userProfile.userId);
      
      return {
        match: match,
        participant: myParticipation || {
          match_id: match.id!,
          user_id: userProfile.userId,
          status: 'registered'
        }
      } as MyMatch;
    });
    
    this.myMatches = await Promise.all(myMatchesPromises);
    console.log('Loaded my matches:', this.myMatches.length);
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
