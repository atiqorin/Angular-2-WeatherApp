import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ZipcodeService {

    zipcode = new BehaviorSubject<string>('');

    // Observable string streams
    zipcode$ = this.zipcode.asObservable();

    // Service message commands
    publishData(data: string) {
        this.zipcode.next(data);
    }
}