import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Asset } from 'src/app/models/asset.model';

@Component({
  selector: 'app-asset-dialog',
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      private service: RestService) {
        if (!data.asset) {
          data.asset = this.getDefaultAsset();
        }
      }

  ngOnInit(): void {
  }

  save() {
    this.service.saveAsset().subscirbe(
      data => {},
      err => {}
    )
  }

  getDefaultAsset(): Asset {
    return {
      id: null,
      name: null,
      comment: null,
      createdAt: null,
      createdBy: null,
      usage: null
    }
  }

}
