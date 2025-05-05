import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() dashboardClicked = new EventEmitter<void>();
  @Output() scroll = new EventEmitter<string>(); // 👈 New output for section scroll

  onLogout() {
    this.logoutClicked.emit();
  }

  onDashboard() {
    this.dashboardClicked.emit();
  }

  scrollTo(sectionId: string) {
    this.scroll.emit(sectionId);
  }
}
