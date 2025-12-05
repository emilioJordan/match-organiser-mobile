import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Match {
  id?: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  max_participants: number;
  latitude?: number;
  longitude?: number;
  image_url?: string;
  created_by: string;
  created_at?: string;
}

export interface Participant {
  id?: number;
  match_id: number;
  user_name: string;
  user_email: string;
  status: 'registered' | 'cancelled';
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  // Match CRUD operations
  async getMatches(): Promise<Match[]> {
    const { data, error } = await this.supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching matches:', error);
      return [];
    }
    return data || [];
  }

  async getMatch(id: number): Promise<Match | null> {
    const { data, error } = await this.supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching match:', error);
      return null;
    }
    return data;
  }

  async createMatch(match: Match): Promise<Match | null> {
    const { data, error } = await this.supabase
      .from('matches')
      .insert([match])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating match:', error);
      return null;
    }
    return data;
  }

  async updateMatch(id: number, match: Partial<Match>): Promise<Match | null> {
    const { data, error } = await this.supabase
      .from('matches')
      .update(match)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating match:', error);
      return null;
    }
    return data;
  }

  async deleteMatch(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('matches')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting match:', error);
      return false;
    }
    return true;
  }

  // Participant operations
  async getParticipants(matchId: number): Promise<Participant[]> {
    const { data, error } = await this.supabase
      .from('participants')
      .select('*')
      .eq('match_id', matchId)
      .eq('status', 'registered');
    
    if (error) {
      console.error('Error fetching participants:', error);
      return [];
    }
    return data || [];
  }

  async registerParticipant(participant: Participant): Promise<Participant | null> {
    const { data, error } = await this.supabase
      .from('participants')
      .insert([participant])
      .select()
      .single();
    
    if (error) {
      console.error('Error registering participant:', error);
      return null;
    }
    return data;
  }

  async unregisterParticipant(participantId: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('participants')
      .update({ status: 'cancelled' })
      .eq('id', participantId);
    
    if (error) {
      console.error('Error unregistering participant:', error);
      return false;
    }
    return true;
  }

  // Upload image
  async uploadImage(file: File, bucket: string = 'match-images'): Promise<string | null> {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase
      .storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: urlData } = this.supabase
      .storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  }
}
