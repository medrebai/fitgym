export interface Subscription {
  id?: string;
  memberId: string;
  type: 'basic' | 'premium' | 'platinum';
  startDate: string;
  endDate: string;
  price: number;

  address?: string;
  paymentMethod?: 'Cash' | 'Card' | 'Bank Transfer';
  months?: number;
  fullName?: string; // redundant but usable for summary
}
