import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/components/about.component";
import { StickyFooterComponent } from "./sticky-footer/sticky-footer.component";
import { WeatherComponent } from "./weather/weather.component";

import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from "@angular/forms";
import { NavbarModule } from './navbar/navbar.module';

import { SpeedUnitPipe } from './pipe/speed-unit.pipe';
import { TempUnitPipe } from './pipe/temp-unit.pipe';

import { ZipcodeService } from './service/zipcode.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        JsonpModule,
        HttpModule,
        routing,
        NavbarModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        StickyFooterComponent,
        WeatherComponent,
        SpeedUnitPipe,
        TempUnitPipe
    ],
    providers: [
        appRoutingProviders,
        ZipcodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}