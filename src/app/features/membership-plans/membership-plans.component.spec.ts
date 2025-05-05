import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPlansComponent } from './membership-plans.component';

describe('MembershipPlansComponent', () => {
  let component: MembershipPlansComponent;
  let fixture: ComponentFixture<MembershipPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipPlansComponent]
    });
    fixture = TestBed.createComponent(MembershipPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
