import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-summary-dialog',
  templateUrl: './subscription-summary-dialog.component.html',
  styleUrls: ['./subscription-summary-dialog.component.css']
})
export class SubscriptionSummaryDialogComponent {
  gymAddress = '24 Rue de la Forme, Sfax 3000, Tunisia';

  constructor(
    public dialogRef: MatDialogRef<SubscriptionSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      plan: string;
      price: number;
      paymentMethod: string;
      preferredTime: string;
      availableCourses: string[];
    }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
