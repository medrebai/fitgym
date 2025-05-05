export interface Subscription {

  id?: number;//ken taw ? 5atre mazelt autentification

  memberId: String;

  type: 'basic' | 'premium' | 'platinum';
  startDate: string;  // e.g. "2025-05-01"
  endDate:   string;  // e.g. "2025-06-01"
  price:     number;
}
