import { Component, ViewChild, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Asset } from '../models/asset.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssetDialogComponent } from '../dialogs/asset-dialog/asset-dialog.component';

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
    private dialog: MatDialog) {
    this.ELEMENT_DATA.data = this.route.snapshot.data['assets'];
  }
  columnsToDisplay = ['id', 'name', 'usage', 'comment'];
  expandedElement: Asset | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = this.ELEMENT_DATA.data
  }

  openAsset() {
		const dialogRef = this.dialog.open(AssetDialogComponent, {
			width: '100vw',
			maxWidth: '100vw',
			position: {
				top: '64px'
			},
			data: {
				asset: null
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result && result.data) {
				this.paginator._changePageSize(this.paginator.pageSize);
			}
		});
	}

}


