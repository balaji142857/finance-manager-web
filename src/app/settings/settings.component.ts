import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../dialogs/category-dialog/category-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../models/category.model';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  categories: CategoryModel[] = [];

  constructor(private dialog: MatDialog,
    private service: RestService,
    private route: ActivatedRoute) {
      this.categories = route.snapshot.data['categories'];
  }

  ngOnInit(): void {
  }

  handleRemove(cat: CategoryModel) {
    const ref = this.dialog.open(GenericDialogComponent, {
      data: {
        confirmationMessage: 'Delete this Category ? ',
        confirmText: 'DELETE',
        cancelText: 'CANCEL',
        confirmMethod: this.service.deleteCategory(cat.id)
      }
    })
  }

  openCategories(cat: CategoryModel) {
    const ref= this.dialog.open(CategoryDialogComponent, {
      width: '100vw',
      height: '40vh',
      data: {
        category: cat ? JSON.parse(JSON.stringify(cat)) : null
      }
    })
    ref.afterClosed().subscribe(
      data => {
        if (data && data.isChanged) {

        }
      }
    )
  }

}
