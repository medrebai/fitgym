import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
import { Subscription } from '../models/subscription';
import { Reservation, FootballCourt } from '../models/football-court';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:3000/members';  
  private subscriptionsUrl = 'http://localhost:3000/subscriptions';  
  private courtsUrl = 'http://localhost:3000/football-courts';  

  constructor(private http: HttpClient) {}

  // Get all members
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  // Get a single member by ID
  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  // Get subscription details for a specific member
  getMemberSubscription(memberId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.subscriptionsUrl}?memberId=${memberId}`);
  }

  // Get all reservations of a member across all football courts
  getMemberReservations(memberId: number): Observable<Reservation[]> {
    return new Observable(observer => {
      this.http.get<FootballCourt[]>(this.courtsUrl).subscribe(courts => {
        const reservations = courts.flatMap(court => 
          (court.reservations || []).filter(reservation => reservation.memberId === memberId)
        );
        observer.next(reservations);
        observer.complete();
      });
    });
  }

  // Add a new member
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  // Update a member
  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, member);
  }

  // Delete a member
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
