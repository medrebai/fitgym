import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymClass } from '../models/class';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'http://localhost:3000/classes';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<GymClass[]> {
    return this.http.get<GymClass[]>(this.apiUrl);
  }

  addClass(newClass: Omit<GymClass, 'id'>): Observable<GymClass> {
    return this.http.post<GymClass>(this.apiUrl, newClass);
  }

  updateClass(cls: GymClass): Observable<GymClass> {
    return this.http.put<GymClass>(`${this.apiUrl}/${cls.id}`, cls);
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

