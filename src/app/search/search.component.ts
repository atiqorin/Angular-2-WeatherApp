import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ZipcodeService } from '../service/zipcode.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'search-bar',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {
    zipcode: any = '';
    zipform: FormGroup;
    outgoingData: EventEmitter<string>;
    disabled: boolean;
    constructor(private fb: FormBuilder, private _zipcodeService: ZipcodeService, private router: Router) {
    }

    createForm() {
        this.zipform = this.fb.group({
            zip: [null, Validators.compose([Validators.required, Validators.pattern('\\d{5}$')])]
        });
    }
    ngOnInit() {
        this.createForm();
        this._zipcodeService.zipcode$.subscribe(
            data => {
                console.log('zip from form: ' + data);
                this.zipcode = data;
                this.zipform.patchValue({
                    zipcode: data
                });
            }
        );
        this.router.events.subscribe((route: any) => {
            if (route.url === '/weather' || route.url === "/") {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        });
        this.disabled = false;
    }

    onSubmit(): void {
        let zipcode = this.zipform.get('zip').value;
        this._zipcodeService.publishData(zipcode);
        this.outgoingData = new EventEmitter<string>();
        this.outgoingData.emit(zipcode);
    }
}