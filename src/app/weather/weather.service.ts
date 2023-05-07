import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { CurrentWeather, DaysWeather, HoursWeather, Position } from './weather.model';

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
    hoursWeather! : HoursWeather[];
    hoursWeatherChange = new Subject<HoursWeather[]>();
    daysWeather! : DaysWeather[];
    daysWeatherChange = new Subject<DaysWeather[]>();

  constructor(private dataStorageService : DataStorageService) { }

    getPosition() {
        if (navigator.geolocation)
	    	navigator.geolocation.getCurrentPosition((position: Position) => {
                const { latitude } = position.coords;
	    	    const { longitude } = position.coords;

                this.getCityName(latitude, longitude)
                .then(() => {
                    this.getCurrentWeather(latitude, longitude);
                    this.getHoursWeather(latitude, longitude);
                    this.getDaysWeather(latitude, longitude);
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
    
    getCurrentWeather(lat: number, lon: number) {
        this.dataStorageService.getWeather(lat, lon).subscribe(data => {
            const currentDate: Date = new Date;
            const currentTemp: number = data.current_weather.temperature;
            const minTemp: number = data.daily.temperature_2m_min[0];
            const maxTemp: number = data.daily.temperature_2m_max[0];
            const weatherCode = this.getWeatherCode(data.current_weather.weathercode);
            this.currentWeather = new CurrentWeather(currentDate, this.city, currentTemp, minTemp, maxTemp, weatherCode);
            this.currentWeatherChange.next(this.currentWeather);
        })
    }

    getHoursWeather(lat: number, lon: number) {
        this.dataStorageService.getWeather(lat, lon).subscribe(data => {
            const currentHour = new Date().getHours();
            const nextHours = data.hourly.time.slice(currentHour+1, currentHour+6);
            const tempHours = data.hourly.temperature_2m.slice(currentHour+1, currentHour+6);
            const precipitation = data.hourly.precipitation_probability.slice(currentHour+1, currentHour+6);
            const hoursWeather : HoursWeather[] = [];

            nextHours.map((hour: string, index: number) => {
                const weatherItem = new HoursWeather(hour, tempHours[index], precipitation[index]);
                hoursWeather.push(weatherItem);
            })
            this.hoursWeather = hoursWeather;
            this.hoursWeatherChange.next(this.hoursWeather);
        })
    }

    getDaysWeather(lat: number, lon: number) {
        this.dataStorageService.getWeather(lat, lon).subscribe(data => {
            const nextDays = data.daily.time.slice(1);
            const precipitation = data.daily.precipitation_sum.slice(1);
            const minTemp = data.daily.temperature_2m_min.slice(1);
            const maxTemp = data.daily.temperature_2m_max.slice(1);
            const daysWeather : DaysWeather[] = [];
            console.log(data)

            nextDays.map((day : string, index: number) => {
                const weatherItem = new DaysWeather(day, precipitation[index], maxTemp[index], minTemp[index]);
                daysWeather.push(weatherItem);
            })
            this.daysWeather = daysWeather;
            this.daysWeatherChange.next(this.daysWeather);
        })
    }

    getWeatherCode(code: number) {
        let weatherCode;
        switch (code) {
            case 0:
                weatherCode = {image: 'clear_sky.jpg', description: 'Clear Sky', icon: ''};
                break;
            case 1:
            case 2:
            case 3: 
                weatherCode = {image: 'mainly_clear.jpg', description: 'Mainly Clear', icon: ''};
                break;
            case 45:
            case 48: 
                weatherCode = {image: 'fog.jpg', description: 'Fog', icon: ''};
                break;
            case 51:
            case 53:
            case 55:
                weatherCode = {image: 'rain.jpg', description: 'Drizzle', icon: ''};
                break;
            case 56:
            case 57: 
                weatherCode = {image: 'rain.jpg', description: 'Freezing Drizzle', icon: ''};
                break;
            case 61:
            case 63:
            case 65: 
                weatherCode = {image: 'rain.jpg', description: 'Rain', icon: ''};
                break;
            case 66:
            case 67: 
                weatherCode = {image: 'rain.jpg', description: 'Freezing Rain', icon: ''};
                break;
            case 71:
            case 73:
            case 75:
                weatherCode = {image: 'snow.jpg', description: 'Snow Fall', icon: ''};
                break;
            case 77:
                weatherCode = {image: 'snow.jpg', description: 'Snow grains', icon: ''};
                break;
            case 80:
            case 81:
            case 82:
                weatherCode = {image: 'rain.jpg', description: 'Rain Showers', icon: ''};
                break;
            case 85:
            case 86:
                weatherCode = {image: 'snow.jpg', description: 'Snow Showers', icon: ''};
                break;
            case 95:
            case 96:
            case 99:
                weatherCode = {image: 'storm.jpg', description: 'Thunderstorm', icon: ''};
                break;
            default:
                weatherCode = {image: 'main.jpg', description: 'error', icon: ''};
        }
        return weatherCode;
    }
}
