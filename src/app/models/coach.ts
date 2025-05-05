export interface CoachSession {
  fullName: string;
  email: string;
  phone: string;
  weight: number;
  height: number;
  preferredTime: 'Morning' | 'Afternoon' | 'Evening';
  date: string;
}

export interface Coach {
  Coachid: number;
  name: string;
  specialty: string;
  experience: number;
  photoUrl?: string;
  sessions?: CoachSession[]; // NEW
}
