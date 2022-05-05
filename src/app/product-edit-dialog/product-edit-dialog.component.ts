import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit {

  categories: any[] = [];
  amEditat: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private serviciuHttp: HttpClient) { }

  // produsEditat: any;

  ngOnInit(): void {
    console.log('in dialogul asta il editam pe: ', this.data);
    // this.produsEditat = this.data;
    fetch('http://localhost:9000/categorii/all')
    .then(categoriiDePeServer => categoriiDePeServer.json())
    .then(categoriiDePeServer => {
      console.log('am luat categoriile: ', categoriiDePeServer);
      this.categories = categoriiDePeServer;
    })
  }

  
  updateProdus() {
    console.log('updatam produsul: ', this.data);
    this.serviciuHttp.put<Product>('http://localhost:9000/produse/update-simple', this.data)
      .subscribe(
        rezultat => {
          console.log('raspuns server: ', rezultat);
          // TODO: de inlocuit vechiul produs din tabel cu rezultat
          // similar cu delete -> stergem vechiul produs (produsEditat) 
          // numere.splice(numere.indexOf(4), 1, 400)
          this.amEditat = true;
        }
      );
  }


  

}
