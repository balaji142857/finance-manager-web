import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		FormsModule,
		MatInputModule
	],
	declarations: [FileUploadComponent],
	exports: [FileUploadComponent]
})
export class FileUploadModule { }
