import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './weather/store/weather.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      weather: weatherReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
