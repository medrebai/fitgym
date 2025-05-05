import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { MemberService } from '../services/member.service';
import { Subscription } from '../models/subscription';
import { Member } from '../models/member';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: (Subscription & { memberName?: string })[] = [];
  members: Member[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private memberService: MemberService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.fetchSubscriptions();
    });
  }

  fetchSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(subs => {
      this.subscriptions = subs.map(sub => ({
        ...sub,
        memberName: this.findMemberName(+sub.memberId)
      }));
    });
  }

  findMemberName(memberId: number): string {
    const member = this.members.find(m => +m.id === memberId); // << Fix here
    return member ? member.name : 'Unknown Member';
  }

  getSubscriptionDescription(type: string): string {
    switch (type) {
      case 'basic': return 'Perfect for beginners';
      case 'premium': return 'Best value for regulars';
      case 'platinum': return 'All-inclusive experience';
      default: return '';
    }
  }

  deleteSubscription(id: string): void {
    this.subscriptionService.deleteSubscription(id).subscribe(() => {
      this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
    });
  }
  
}
