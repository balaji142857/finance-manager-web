import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RestService } from 'src/app/rest.service';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  cat: CategoryModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private restService: RestService,
    private dialog: MatDialogRef<CategoryDialogComponent>) {
      this.cat = data.category ? data.category : this.getDefaultCategory();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.close();
  }

  confirm() {
    this.restService.saveCategory(this.cat).subscribe(
      data => {
        console.log('category saved', data);
        this.dialog.close();
      },
      err => {
        console.log('error in saving category',err);
      }
    )
  }

  handleRemove(subCat) {
    const index = this.cat.subCategories.indexOf(subCat);
    if (index >= 0 ) {
      this.cat.subCategories.splice(index, 1);
    }
  }

  addSubCat() {
    if (!this.cat.subCategories || !this.cat.subCategories.length) {
      this.cat.subCategories = [];
    }
    this.cat.subCategories.push({
      id: null,
      name: null,
      comment: null
    })
  }

  getDefaultCategory(): CategoryModel {
    return {
      id: null,
      name: null,
      comment: null,
      subCategories: []
    }
  }

}
