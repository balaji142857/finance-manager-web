import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Asset } from 'src/app/models/asset.model';
import { ConsoleReporter } from 'jasmine';

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

  save(asset: Asset) {
    this.service.saveAsset(asset).subscribe(
      data => {
        console.log('asset saved', data);
      },
      err => {
        console.log('asset save failed',err);
      }
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

  cancel() {}

  confirm() {
    this.save(this.data.asset);
  }

}
