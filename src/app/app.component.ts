import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  temp: number = 0;
  city: string = '';
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(
				(position: Position) => {
          const { latitude } = position.coords;
		      const { longitude } = position.coords;
          this.getWeather(latitude, longitude);
          this.getCityName(latitude, longitude);
          this.isLoading = false;
        },
				function () {
					alert(`could not get your position`);
				}
			)
  }

  getCityName(lat: number, lon: number) {
    const apiKey = '95cfebe49f7542d5b304920c806cc54f';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    this.http.get<any>(url).subscribe(data => {
      const currentCity = data.results[0].components.city;
      this.city = currentCity;
    })
  }

  getWeather(lat: number, lon: number) {
    this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=auto`
    ).subscribe(data => 
      {
        const temp: number = data.current_weather.temperature;
        this.temp = temp;
      }
    )
  }
}
