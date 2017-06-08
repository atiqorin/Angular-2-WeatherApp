import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string) {
        if (unitType === "F") {
            const fahrenheit = 1.8 * (temp - 273) + 32;
            return fahrenheit;
        } else {
            return temp - 273;
        }
    }
}