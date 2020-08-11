import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [NavComponent]
})
export class NavModule { }
