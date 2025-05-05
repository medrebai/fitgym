import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoachDialogComponent } from './add-coach-dialog.component';

describe('AddCoachDialogComponent', () => {
  let component: AddCoachDialogComponent;
  let fixture: ComponentFixture<AddCoachDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoachDialogComponent]
    });
    fixture = TestBed.createComponent(AddCoachDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
