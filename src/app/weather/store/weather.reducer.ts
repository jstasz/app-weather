import { Action } from "@ngrx/store";
import { CurrentWeather } from "../weather.model";
import * as WeatherActions from "./weather.action";

const initialState: {currentWeather: CurrentWeather} = {
    currentWeather: {
        curDate: '',
        curTime: '',
        city: '',
        curTemp: 0,
        minTemp: 0,
        maxTemp: 0,
        weatherCode: {image: '', description: '', icon: ''}
    }
}

export function weatherReducer(state = initialState, action: Action) {
    switch (action.type) {
        case WeatherActions.GET_CURRENT_WEATHER:
            return {
                ...state,
                currentWeather: {
                    ...state.currentWeather, 
                    ...(action as WeatherActions.GetCurrentWeather).payload
                }
            }
        default:
            return state;
    }
}