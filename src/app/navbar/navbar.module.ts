import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SearchComponent } from '../search/search.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ RouterModule, CommonModule, ReactiveFormsModule ],
  declarations: [ NavbarComponent, SearchComponent ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}