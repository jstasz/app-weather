import { Component, OnInit } from '@angular/core';
import { CurrentWeather, DaysWeather, HoursWeather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentWeather!: CurrentWeather;
  hoursWeather!: HoursWeather[];
  daysWeather!: DaysWeather[];
  city: string = '';
  isLoading: boolean = true;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.cityChange.subscribe(city => this.city = city);
    this.weatherService.currentWeatherChange.subscribe(weather => this.currentWeather = weather);
    this.weatherService.hoursWeatherChange.subscribe(weather => this.hoursWeather = weather);
    this.weatherService.daysWeatherChange.subscribe(weather => this.daysWeather = weather);
    this.weatherService.isLoadingChange.subscribe(load => this.isLoading = load);
    this.weatherService.getPosition();
  }
}
