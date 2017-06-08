import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/components/about.component";
import { ModuleWithProviders } from "@angular/core";
import { WeatherComponent } from "./weather/weather.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'weather', pathMatch: 'full' },
    { path: 'weather', component: WeatherComponent, data: { title: 'Weather' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
