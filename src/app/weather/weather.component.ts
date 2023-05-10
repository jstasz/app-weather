import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentWeather, DaysWeather, HoursWeather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentWeather!: Observable<{currentWeather: CurrentWeather}>;
  hoursWeather!: HoursWeather[];
  daysWeather!: DaysWeather[];
  city: string = '';
  isLoading: boolean = true;

  constructor(
    private weatherService: WeatherService, 
    private store: Store<{weather: {currentWeather: CurrentWeather}}>
    ) {}

  ngOnInit(): void {
    this.currentWeather = this.store.select('weather')
    this.weatherService.cityChange.subscribe(city => this.city = city);
    // this.weatherService.currentWeatherChange.subscribe(weather => this.currentWeather = weather);
    this.weatherService.hoursWeatherChange.subscribe(weather => this.hoursWeather = weather);
    this.weatherService.daysWeatherChange.subscribe(weather => this.daysWeather = weather);
    this.weatherService.isLoadingChange.subscribe(load => this.isLoading = load);
    this.weatherService.getPosition();
  }
}
