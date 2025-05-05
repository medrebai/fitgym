import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../models/member';
import { Subscription } from '../models/subscription';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionSummaryDialogComponent } from '../subscription-summary-dialog/subscription-summary-dialog.component';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.css']
})
export class SubscriptionDialogComponent {
  planType: 'basic' | 'premium' | 'platinum';
  member: Member;

  address: string = '';
  paymentMethod: string = 'Cash';
  months: number = 1;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.planType = data.plan;
    this.member = data.member;
  }

  get planPrice(): number {
    const prices = { basic: 50, premium: 75, platinum: 100 };
    return prices[this.planType];
  }

  calculateTotal(): number {
    return this.months * this.planPrice;
  }

  confirm(): void {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);
    const endDate = new Date(today.setMonth(today.getMonth() + this.months)).toISOString().slice(0, 10);

    const subscription: Subscription = {
      memberId: this.member.id,
      type: this.planType,
      startDate,
      endDate,
      price: this.calculateTotal()
    };

    // Show success snackbar
    this.snackBar.open('Subscription successful!', 'Close', {
      duration: 2500,
      panelClass: ['snackbar-success']
    });

    // Close current dialog
    this.dialogRef.close(subscription);

    // Open summary confirmation modal
    this.dialog.open(SubscriptionSummaryDialogComponent, {
      width: '500px',
      data: {
        plan: this.planType,
        price: this.calculateTotal(),
        paymentMethod: this.paymentMethod,
        preferredTime: this.member.preferredWorkoutTime || 'Not specified',
        availableCourses: ['Yoga', 'Cardio', 'HIIT'], // You can make this dynamic later
        gymAddress: '24 Rue de la Forme, Sfax 3000, Tunisia'
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
