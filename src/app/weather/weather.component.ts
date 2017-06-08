import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from '../service/weather.service';
import { ZipcodeService } from '../service/zipcode.service';

import { Weather } from '../model/weather';

import { IMAGE_ROOT, WEATHER_COLORS, WEATHER_DESCRIPTION } from '../constants/constants';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
    zipcode: any = '75062';
    weatherData = new Weather(null, null, null, null, null, null, null, null);
    currentSpeedUnit = "kph";
    currentTempUnit = "F";
    currentLocation = "";
    icons = new Skycons();
    dataReceived = false;
    init = true;
    subscription: Subscription;
    iconImg: string;
    constructor(private service: WeatherService, private _zipcodeService: ZipcodeService) {
    }

    ngOnInit() {
        this.subscription = this._zipcodeService.zipcode$.subscribe(
            data => {
                console.log('zip code received: ' + data);
                if (!this.init) {
                    this.zipcode = data;
                    this.getCurrentWeather();
                    this.init = false;
                }
            }
        );
        this.getCurrentWeather();
        this.init = false;
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.zipcode)
            .subscribe(weather => {
                this.weatherData.temp = weather["main"]["temp"],
                    this.weatherData.summary = weather["weather"][0]["main"],
                    this.weatherData.wind = weather["wind"]["speed"],
                    this.weatherData.humidity = weather["main"]["humidity"],
                    this.weatherData.icon = weather["weather"][0]["icon"],
                    this.weatherData.city = weather["name"],
                    this.weatherData.lat = weather["coord"]["lat"],
                    this.weatherData.long = weather["coord"]["lon"],
                    this.iconImg = IMAGE_ROOT + weather["weather"][0]["icon"] + ".png",
                    this.setIcon();
                console.log(this.weatherData);
                this.dataReceived = true;
            },
            err => console.error(err));
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits() {
        if (this.currentTempUnit === "F") {
            this.currentTempUnit = "C";
        } else {
            this.currentTempUnit = "F";
        }
    }

    toggleSpeedUnits() {
        if (this.currentSpeedUnit === "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon() {
        this.icons.add("icon", WEATHER_DESCRIPTION[this.weatherData.icon]["description"]);
        this.icons.play();
    }

    setStyles(): Object {
        if (this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
}