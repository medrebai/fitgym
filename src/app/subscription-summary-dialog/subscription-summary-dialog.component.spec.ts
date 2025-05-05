import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSummaryDialogComponent } from './subscription-summary-dialog.component';

describe('SubscriptionSummaryDialogComponent', () => {
  let component: SubscriptionSummaryDialogComponent;
  let fixture: ComponentFixture<SubscriptionSummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionSummaryDialogComponent]
    });
    fixture = TestBed.createComponent(SubscriptionSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
