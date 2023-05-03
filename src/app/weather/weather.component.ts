import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  temp: number = 0;
  city: string = '';
  isLoading: boolean = true;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getPosition();
    this.weatherService.cityChange.subscribe(city => this.city = city);
    this.weatherService.tempChange.subscribe(temp => this.temp = temp);
    this.weatherService.isLoadingChange.subscribe(load => this.isLoading = load);
  }
}
