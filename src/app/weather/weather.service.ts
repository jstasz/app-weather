import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { CurrentWeather, Position } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    isLoading = new BehaviorSubject<boolean>(true);
    isLoadingChange = this.isLoading.asObservable();
    city: string = '';
    cityChange = new Subject<string>();
    currentWeather!: CurrentWeather;
    currentWeatherChange = new Subject<CurrentWeather>();

  constructor(private dataStorageService : DataStorageService) { }

    getPosition() {
        if (navigator.geolocation)
	    	navigator.geolocation.getCurrentPosition((position: Position) => {
                const { latitude } = position.coords;
	    	    const { longitude } = position.coords;

                this.getCityName(latitude, longitude)
                .then(() => {
                    this.getWeather(latitude, longitude);
                    this.isLoading.next(false);
                    })
                .catch(() => {
                    this.isLoading.next(false);
                    alert('Could not get city name');
                })
            },
	    	function () {
	    		alert(`could not get your position`);
	    	}
	    )
    }

    getCityName(lat: number, lon: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.dataStorageService.getCityName(lat, lon).subscribe(data => {
                const city = data.results[0].components.city;
                this.city = city;
                this.cityChange.next(this.city);
                resolve();
              }),
            (error: any) => {
                reject(error);
            }
        })
    }
    
    getWeather(lat: number, lon: number) {
        this.dataStorageService.getWeather(lat, lon).subscribe(data => {
            const currentTemp: number = data.current_weather.temperature;
            const minTemp: number = data.daily.temperature_2m_min[0];
            const maxTemp: number = data.daily.temperature_2m_max[0];
            const currentDate: Date = new Date;
            this.currentWeather = new CurrentWeather(currentDate, this.city, currentTemp, minTemp, maxTemp);
            this.currentWeatherChange.next(this.currentWeather);
        })
    }
}
