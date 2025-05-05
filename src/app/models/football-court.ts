export interface FootballCourt {
  id: number;
  name: string;
  location: string;
  pricePerHour: number;
  reservations?: Reservation[];
}
export interface Reservation {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  memberId: number;    // <-- not memberName anymore!
}