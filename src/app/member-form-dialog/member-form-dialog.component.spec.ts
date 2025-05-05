import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFormDialogComponent } from './member-form-dialog.component';

describe('MemberFormDialogComponent', () => {
  let component: MemberFormDialogComponent;
  let fixture: ComponentFixture<MemberFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberFormDialogComponent]
    });
    fixture = TestBed.createComponent(MemberFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
