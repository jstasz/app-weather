import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  getCityName(lat: number, lon: number) {
    const apiKey = '95cfebe49f7542d5b304920c806cc54f';
    return this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`);
  }

  getWeather(lat: number, lon: number) {
    return this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`
    )
  }
}
