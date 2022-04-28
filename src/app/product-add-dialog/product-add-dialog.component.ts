import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';



@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  amSalvat: boolean = false;
  produsNou: Product = new Product();
  categories: any[] = [];

  constructor(private serviciuHttp: HttpClient) { }

  ngOnInit(): void {
    fetch('http://localhost:9000/categorii/all')
    .then(categoriiDePeServer => categoriiDePeServer.json())
    .then(categoriiDePeServer => {
      console.log('am luat categoriile: ', categoriiDePeServer);
      this.categories = categoriiDePeServer;
    })
  }

  saveProdus() {
    this.serviciuHttp.post<Product>('http://localhost:9000/produse/save-simpler', this.produsNou)
      .subscribe(raspuns => {
        console.log('produsul nou: ', this.produsNou);
        console.log('dupa post save raspunsul server: ', raspuns);
        console.log('pas 2');
        this.produsNou.id = raspuns.id;
        
        if(raspuns.price && raspuns.price > 400){
          raspuns.priceRange = 'SCUMP';
        }else{
          raspuns.priceRange = 'IEFTIN';
        }

        this.amSalvat = true;
        // this.products.push(raspuns);
        // this.produsNou = new Product(); // clear the input fields
      })
  }

}
