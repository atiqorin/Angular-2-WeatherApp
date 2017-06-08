import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { WEATHER_KEY, WEATHER_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {

    constructor(private jsonp: Jsonp, private http: Http) { }


    getCurrentWeather(zip: number): Observable<any> {
        const url = WEATHER_ROOT + '?zip=' + zip + ',us&appid=' + WEATHER_KEY;
        const queryParams = "&callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather data -- ", err);
                return Observable.throw(err.json());
            });
    }

}
