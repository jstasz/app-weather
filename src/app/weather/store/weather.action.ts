import { Action } from '@ngrx/store';
import { CurrentWeather } from '../weather.model';

export const GET_CURRENT_WEATHER = 'CURRENT_WEATHER';

export class GetCurrentWeather implements Action {
    readonly type  = GET_CURRENT_WEATHER;
    constructor(public payload: CurrentWeather) {}
}