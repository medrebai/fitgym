export interface Member {
  id: string; // changed from number
  name: string;
  email: string;
  phone: string;
  subscriptionId?: number;
  weight?: number;
  height?: number;
  goals?: string;
  preferredWorkoutTime?: 'Morning' | 'Afternoon' | 'Evening';
  profilePictureUrl?: string;
}
