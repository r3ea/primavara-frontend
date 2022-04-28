import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
    console.log('in dialogul asta il editam pe: ', this.data);
  }

}
