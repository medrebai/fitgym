import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsDialogComponent } from './member-details-dialog.component';

describe('MemberDetailsDialogComponent', () => {
  let component: MemberDetailsDialogComponent;
  let fixture: ComponentFixture<MemberDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(MemberDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
