import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballCourt } from '../models/football-court';

@Injectable({
  providedIn: 'root'
})
export class FootballCourtService {
  private apiUrl = 'http://localhost:3000/football-courts'; 

  constructor(private http: HttpClient) { }

  getFootballCourts(): Observable<FootballCourt[]> {
    return this.http.get<FootballCourt[]>(this.apiUrl);
  }

  addFootballCourt(court: FootballCourt): Observable<FootballCourt> {
    return this.http.post<FootballCourt>(this.apiUrl, court);
  }

  updateFootballCourt(court: FootballCourt): Observable<FootballCourt> {
    return this.http.put<FootballCourt>(`${this.apiUrl}/${court.id}`, court);
  }

  deleteFootballCourt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
