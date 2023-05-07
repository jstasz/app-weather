import { Component } from '@angular/core';
import { CurrentWeather } from './weather/weather.model';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentWeather!: CurrentWeather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.currentWeather = this.weatherService.currentWeather;
    this.weatherService.currentWeatherChange.subscribe(weather => this.currentWeather = weather);
  }
}
