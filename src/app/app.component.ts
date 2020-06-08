import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  darkThemeEnabled: boolean;
  private themeStateListenerSubs: Subscription;

  constructor(private themeService: ThemeService) {
    this.darkThemeEnabled = false;
  }

  ngOnInit() {
    this.darkThemeEnabled = this.themeService.darkThemeEnabled;
    this.themeStateListenerSubs = this.themeService
    .getThemeListener()
    .subscribe(darkThemeEnabled => {
      this.darkThemeEnabled = darkThemeEnabled;
    });
  }

  toggleTheme() {
    this.themeService.toggleDarkTheme();
  }

  ngOnDestroy() {
    this.themeStateListenerSubs.unsubscribe();
  }
}
