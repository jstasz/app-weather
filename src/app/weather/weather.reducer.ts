import { Action } from "@ngrx/store";

const initialState = {
    currentWeather: {
        curDate: new Date(),
        city: '',
        curTemp: 0,
        minTemp: 0,
        maxTemp: 0,
        weatherCode: {image: '', description: '', icon: ''}
    }
}

export function weatherReducer(state = initialState, action: Action) {

}