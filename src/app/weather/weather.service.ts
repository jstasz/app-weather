import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { Position } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    isLoading = new BehaviorSubject<boolean>(true);
    isLoadingChange = this.isLoading.asObservable();
    city = new BehaviorSubject<string>('');
    cityChange = this.city.asObservable();
    temp = new BehaviorSubject<number>(0);
    tempChange = this.temp.asObservable();

  constructor(private dataStorageService : DataStorageService) { }

    getPosition() {
        if (navigator.geolocation)
	    	navigator.geolocation.getCurrentPosition(
	    		(position: Position) => {
                const { latitude } = position.coords;
	    	    const { longitude } = position.coords;
                this.getWeather(latitude, longitude);
                this.getCityName(latitude, longitude)
                this.isLoading.next(false);
            },
	    	function () {
	    		alert(`could not get your position`);
	    	}
	    )
    }

    getCityName(lat: number, lon: number) {
        this.dataStorageService.getCityName(lat, lon).subscribe(data => {
          const city = data.results[0].components.city;
          this.city.next(city);
        })
    }
    
    getWeather(lat: number, lon: number) {
        this.dataStorageService.getWeather(lat, lon).subscribe(data => {
            const temp: number = data.current_weather.temperature;
            this.temp.next(temp);
        })
    }
}
