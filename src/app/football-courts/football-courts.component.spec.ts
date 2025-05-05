import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCourtsComponent } from './football-courts.component';

describe('FootballCourtsComponent', () => {
  let component: FootballCourtsComponent;
  let fixture: ComponentFixture<FootballCourtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootballCourtsComponent]
    });
    fixture = TestBed.createComponent(FootballCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
