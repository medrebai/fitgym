import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membership-plans',
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css']
})
export class MembershipPlansComponent {
  @Output() planSelected = new EventEmitter<'basic' | 'premium' | 'platinum'>();

  selectPlan(plan: 'basic' | 'premium' | 'platinum') {
    this.planSelected.emit(plan);
  }
}
