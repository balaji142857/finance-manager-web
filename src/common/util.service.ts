import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import * as env from '../../environments//environment';
// import { SnackbarComponent } from './snackbar/snackbar.component';
// import * as config from '../common/config';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _snackBar: MatSnackBar) { }

  // notify(message: string, type?: string) {
	// this.openSnackBar(message, type ? type : 'success')
  // }

  getObjectByProperty<T>(data: T[], propName: string, prop:any): T {
	if ( !data || !data.length )
	  return null;
	for (let i = 0 ; i < data.length; i++) {
	  if (data[i][propName] == prop) {
		  return data[i];
	  }
	}
  }

  getObjectIndexByProperty<T>(data: T[], propName: string, prop:any): number {
	for (let i = 0 ; i < data.length; i++) {
	  if (data[i][propName] == prop) {
		  return i;
	  }
	}
  }

  // openSnackBar(message: string, type?: string) {
	// this._snackBar.openFromComponent(SnackbarComponent, {
	//   duration: config.default.snackbarDuration,
	//   panelClass: 'snackbar_'+type,
	//   data: {
	// 	message: message,
	// 	class: type
	//   }
	// });
  // }

  // showError(err?: any, defaultMsg:string = 'Error occured whilce processing the request') {
	// this.openSnackBar(err && err.error ? err.error.message : defaultMsg,  'error');
  // }

}
