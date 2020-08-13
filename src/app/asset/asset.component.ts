
import { Component, ViewChild, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../models/asset.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssetDialogComponent } from '../dialogs/asset-dialog/asset-dialog.component';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})

export class AssetComponent implements OnInit{

  dataSource = [];
  ELEMENT_DATA = {
    data:[]
  };
  constructor(private route: ActivatedRoute,
    private service: RestService,
    private dialog: MatDialog) {
    this.ELEMENT_DATA.data = this.route.snapshot.data['assets'];
  }
  columnsToDisplay = ['actions', 'id', 'name', 'usage', 'comment'];
  expandedElement: Asset | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = this.ELEMENT_DATA.data
  }

  openAsset(asset: Asset) {
		const dialogRef = this.dialog.open(AssetDialogComponent, {
			width: '100vw',
			maxWidth: '100vw',
			position: {
				top: '64px'
			},
			data: {
				asset: asset
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result && result.data) {
				this.paginator._changePageSize(this.paginator.pageSize);
			}
		});
  }

  editAsset(asset: Asset, event) {
    console.log('editign asset ',asset);
    this.openAsset(JSON.parse(JSON.stringify(asset)));
    this.suppressEvent(event);
  }

  deleteAsset(asset: Asset) {
    const ref = this.dialog.open(GenericDialogComponent, {
      width: '50vw',
      height: '40vh',
      data: {
        confirmationMessage: 'Do you want to delete this asset ?',
        cancelText: 'CANCEL',
        confirmText: 'CONFIRM',
        confirmMethod: this.service.deleteAsset(asset.id)
      }
    });
  }

  suppressEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }



}

