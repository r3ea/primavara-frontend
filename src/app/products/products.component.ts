import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { HelloService} from 'src/app/hello.service';

class Product {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  categorieAsociata?: any;
  priceRange?: string;

  isDeleting: boolean = false;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title: string = 'Products Component Hello';
  products: Product[] = [];
  produsNou: Product = new Product();
  produsEditat: Product = new Product();
  categories: any[] = [];
  // isDeleting: boolean = false;

  // priceThreshold: number = 400;

  // newProductName: string = '';
  // newProductPrice: number;
  constructor(private serviciuHttp: HttpClient) { }

  ngOnInit(): void {

    fetch('http://localhost:9000/categorii/all')
      .then(categoriiDePeServer => categoriiDePeServer.json())
      .then(categoriiDePeServer => {
        console.log('am luat categoriile: ', categoriiDePeServer);
        this.categories = categoriiDePeServer;
      })

    // http://localhost:9000/produse/all
    fetch('http://localhost:9000/produse/all')
      .then(datele => datele.json())
      .then(datele => {
        console.log('am luat de la server: ', datele);
        this.products = datele;
        // console.log('primul produs: ', this.products[0])

        // nasty si pentru ca trebuie dupa ce salvam un produs sa setam priceRange
        for (let p of this.products) { // for execute once for every product
          if (p.price && p.price > 400) {
            p.priceRange = 'SCUMP';
          } else {
            p.priceRange = 'IEFTIN';
          }
        }
      })

    // TODO: de incarcat toate categoriile in variabila categories
    // X TODO: dupa ce le incarcam in categories am dori ca drop-down-ul (select)
    // in loc sa fie hard coded sa aiba valorile din categories


  }

  // completeze field-urile
  editProdus(unProdus: Product){
    this.produsEditat = {...unProdus}; // nu mai este elementul din tabel, ci o copie (no reference)
  }


  updateProdus(){
    console.log('updatam produsul: ', this.produsEditat);
    this.serviciuHttp.put<Product>('http://localhost:9000/produse/update-simple', this.produsEditat)
      .subscribe(
        rezultat => {
          console.log('raspuns server: ', rezultat);
          // TODO: de inlocuit vechiul produs din tabel cu rezultat
            // similar cu delete -> stergem vechiul produs (produsEditat) 
            // numere.splice(numere.indexOf(4), 1, 400)
        }
      );
  }

  saveProdus() {
    this.serviciuHttp.post<Product>('http://localhost:9000/produse/save-simpler', this.produsNou)
      .subscribe(raspuns => {
        console.log('produsul nou: ', this.produsNou);
        console.log('dupa post save raspunsul server: ', raspuns);
        console.log('pas 2');
        
        if(raspuns.price && raspuns.price > 400){
          raspuns.priceRange = 'SCUMP';
        }else{
          raspuns.priceRange = 'IEFTIN';
        }
        this.products.push(raspuns);
        this.produsNou = new Product(); // clear the input fields
      })
  }

  saveProdusCuFetch() {
    console.log('pas 1');
    console.log('saving a new product: ', this.produsNou);
    fetch('http://localhost:9000/produse/save-simpler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.produsNou)
    }).then(raspuns => raspuns.json())
      .then(raspuns => {
        console.log('dupa post save raspunsul server: ', raspuns);
        console.log('pas 2');
        this.products.push(raspuns);
        this.produsNou = new Product(); // clear the input fields
      })

    console.log('pas 3');
    // 1. send the product to POST http://localhost:9000/produse/save-simpler

    // 2. dupa ce trimitem pe server ar trebui sa apara in pagina
    // this.products.push(OBIECT)
    // 
  }

  deleteProdus(produs: Product){
    
    produs.isDeleting = true;
    console.log('should delete product: ', produs);
    this.serviciuHttp.delete('http://localhost:9000/produse/delete/'+produs.id)
      .subscribe(
        raspuns => {
          console.log('am sters produsul: ', raspuns);
          // de scos din tabel
          this.products.splice(this.products.indexOf(produs), 1); // scoate produs din 'products'
          produs.isDeleting = false;
        }
      );

      // TODO: find a way to disable just the specific clicked delete button

  }

}
