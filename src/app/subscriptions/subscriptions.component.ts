import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { MemberService } from '../services/member.service';
import { Subscription } from '../models/subscription';
import { Member } from '../models/member';
import { MatDialog } from '@angular/material/dialog';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: (Subscription & { memberName?: string })[] = [];
  members: Member[] = [];

  chartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Basic', 'Premium', 'Platinum'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#2196f3', '#9c27b0']
      }
    ]
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Subscription Distribution',
        font: {
          size: 18
        }
      }
    }
  };

  constructor(
    private subscriptionService: SubscriptionService,
    private memberService: MemberService,
    public dialog: MatDialog
  ) {}

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
        memberName: this.findMemberName(sub.memberId)
      }));
      this.updateChartData(); // call after data is fetched
    });
  }

  findMemberName(memberId: string | number): string {
    const member = this.members.find(m => m.id === memberId.toString());
    return member ? member.name : 'Unknown Member';
  }

  updateChartData(): void {
    const counts = { basic: 0, premium: 0, platinum: 0 };

    this.subscriptions.forEach(sub => {
      const type = sub.type?.toLowerCase().trim();
      if (type in counts) {
        counts[type as keyof typeof counts]++;
      }
    });

    this.chartData = {
      labels: ['Basic', 'Premium', 'Platinum'],
      datasets: [
        {
          data: [counts.basic, counts.premium, counts.platinum],
          backgroundColor: ['#4caf50', '#2196f3', '#9c27b0']
        }
      ]
    };
  }

  deleteSubscription(id: string): void {
    this.subscriptionService.deleteSubscription(id).subscribe(() => {
      this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
      this.updateChartData(); // update chart after deletion
    });
  }

  getSubscriptionDescription(type: string): string {
    switch (type.toLowerCase()) {
      case 'basic': return 'Perfect for beginners';
      case 'premium': return 'Best value for regulars';
      case 'platinum': return 'All-inclusive experience';
      default: return '';
    }
  }
}
