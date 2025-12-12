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
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  created_by: string;
  created_at?: string;
}

export interface Participant {
  id?: number;
  match_id: number;
  user_id: string;
  status: string;
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
    try {
      console.log('Supabase: Sending match data:', match);
      
      const { data, error } = await this.supabase
        .from('matches')
        .insert([match])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase Error creating match:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(error.message || 'Fehler beim Erstellen des Matches');
      }
      
      console.log('Supabase: Match created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('Supabase: Exception in createMatch:', error);
      throw error;
    }
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

  async registerParticipant(participant: Omit<Participant, 'id' | 'created_at'>): Promise<Participant | null> {
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

  async registerForMatch(matchId: number, userId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('participants')
      .insert([{ match_id: matchId, user_id: userId, status: 'registered' }]);
    
    if (error) {
      console.error('Error registering for match:', error);
      return false;
    }
    return true;
  }

  // Hole alle Matches eines Users (wo er angemeldet ist)
  async getMyMatches(userId: string): Promise<Match[]> {
    try {
      console.log('Fetching matches for userId:', userId);
      
      // Hole alle participant Einträge des Users
      const { data: participantData, error: participantError } = await this.supabase
        .from('participants')
        .select('match_id')
        .eq('user_id', userId)
        .eq('status', 'registered');
      
      if (participantError) {
        console.error('Error fetching user participants:', participantError);
        return [];
      }
      
      if (!participantData || participantData.length === 0) {
        console.log('User has no match registrations');
        return [];
      }
      
      // Extrahiere die Match-IDs
      const matchIds = participantData.map(p => p.match_id);
      console.log('User is registered for match IDs:', matchIds);
      
      // Hole die Matches mit diesen IDs
      const { data: matchesData, error: matchesError } = await this.supabase
        .from('matches')
        .select('*')
        .in('id', matchIds)
        .order('date', { ascending: true });
      
      if (matchesError) {
        console.error('Error fetching matches:', matchesError);
        return [];
      }
      
      console.log('Found matches:', matchesData?.length || 0);
      return matchesData || [];
    } catch (error) {
      console.error('Exception in getMyMatches:', error);
      return [];
    }
  }

  async unregisterParticipant(participantId: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('participants')
      .delete()
      .eq('id', participantId);
    
    if (error) {
      console.error('Error unregistering participant:', error);
      return false;
    }
    return true;
  }

  async unregisterFromMatch(matchId: number, userId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('participants')
      .delete()
      .eq('match_id', matchId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error unregistering from match:', error);
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
