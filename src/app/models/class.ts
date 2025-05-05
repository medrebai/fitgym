export interface GymClass {
  id: number;
  name: string;
  category: 'Yoga' | 'HIIT' | 'Cardio' | 'Dance';
  coachId: number;
  time: string;
  price: number;
}