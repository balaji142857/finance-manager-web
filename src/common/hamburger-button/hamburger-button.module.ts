import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerButtonComponent } from './hamburger-button.component';



@NgModule({
  declarations: [HamburgerButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [HamburgerButtonComponent]
})
export class HamburgerButtonModule { }
