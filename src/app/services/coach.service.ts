import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach'; 

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'http://localhost:3000/coaches'; 

  constructor(private http: HttpClient) {}

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl);
  }

  addCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(this.apiUrl, coach);
  }

  updateCoach(coach: Coach): Observable<Coach> {
    return this.http.put<Coach>(`${this.apiUrl}/${coach.Coachid}`, coach);
  }

  deleteCoach(Coachid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Coachid}`);
  }
}
