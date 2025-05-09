import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSessionDialogComponent } from './book-session-dialog.component';

describe('BookSessionDialogComponent', () => {
  let component: BookSessionDialogComponent;
  let fixture: ComponentFixture<BookSessionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookSessionDialogComponent]
    });
    fixture = TestBed.createComponent(BookSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
