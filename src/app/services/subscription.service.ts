import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:3000/subscriptions'; 

  constructor(private http: HttpClient) { }

  // Get all subscriptions
  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  // Get subscription for specific member
  getSubscriptionByMemberId(memberId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}?memberId=${memberId}`);
  }

  // Add new subscription
  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }

  // Update existing subscription
  updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${subscription.id}`, subscription);
  }

  // Delete subscription
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
