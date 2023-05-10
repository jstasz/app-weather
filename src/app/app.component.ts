import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentWeather } from './weather/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentWeather!: Observable<{currentWeather: CurrentWeather}>;

  constructor(
    private store: Store<{weather: {currentWeather: CurrentWeather}}>
    ) {}

  ngOnInit() {
    this.currentWeather = this.store.select('weather');
  }
}
