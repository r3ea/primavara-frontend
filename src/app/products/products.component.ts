import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { HelloService} from 'src/app/hello.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../model/product';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  // clasa : string = "highlighted";
  // afiseaza: boolean = true;

  termenCautat : string = '';
  title: string = 'Products Component Hello';
  products: Product[] = [];
  productsDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  // produsEditat: Product = new Product();

  displayedColumns: string[] = ['idColumn', 'nameColumn', 'priceColumn', 'categoryColumn', 'actionsColumn'];
  // isDeleting: boolean = false;

  // priceThreshold: number = 400;

  // newProductName: string = '';
  // newProductPrice: number;
  constructor(private serviciuHttp: HttpClient, public dialog: MatDialog) { }

  currentPage: number = 0;


  functieCautare(){
    // /pagina-cautare-new/{searchTerm}/{nrPagina}/{nrElementePePagina}
    // List<String> lista;
    // lista.add("HELLO");
    // lista.add("30"); 
    console.log('ai tastat ceva: ', this.termenCautat);
    if(this.termenCautat.length < 4){
      console.log('no search!');
      return;
    }
    this.serviciuHttp.get<Product[]>('http://localhost:9000/produse/pagina-cautare-new/'+this.termenCautat+'/'+this.currentPage+'/3')
      .subscribe(
        rez => {
          console.log('produse gasite: ', rez);
          this.products = rez;
          this.productsDataSource = new MatTableDataSource<Product>(rez);
          // TODO: :) refresh table
        }
      );
  }

  loadPreviousPage() {
    this.currentPage--;
    console.log('should load next page', this.currentPage);
    this.loadSpecificPage(this.currentPage);
  }


  loadNextPage() {
    this.currentPage++;
    console.log('should load next page', this.currentPage);
    this.loadSpecificPage(this.currentPage);
  }


  loadSpecificPage(pageNumber: number){
    fetch('http://localhost:9000/produse/pagina/' + pageNumber)
    .then(datele => datele.json())
    .then(datele => {
      console.log('am luat de la server: ', datele);
      // this.products = datele;
      this.products = this.products.concat(datele);
      // console.log('primul produs: ', this.products[0])

      this.productsDataSource = new MatTableDataSource<Product>(this.products);

      // nasty si pentru ca trebuie dupa ce salvam un produs sa setam priceRange

    })

  }

  ngOnInit(): void {

    this.loadSpecificPage(this.currentPage);

    // http://localhost:9000/produse/all
    // fetch('http://localhost:9000/produse/all')
  
    // TODO: de incarcat toate categoriile in variabila categories
    // X TODO: dupa ce le incarcam in categories am dori ca drop-down-ul (select)
    // in loc sa fie hard coded sa aiba valorile din categories


  }


  editProdusDialog(unProdus: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ...unProdus };
    dialogConfig.disableClose = true;

    let dialogulPentruEditare = this.dialog.open(ProductEditDialogComponent, dialogConfig);
    dialogulPentruEditare.afterClosed().subscribe(result => {



      // TODO: some modifications required here

      // inlocuim "vechiul" produs cu "noul" (data) produs
      if (result) {
        console.log('dupa dialog closed, rezultatul "dialogului" este: ', result);
        console.log('pozitia in array a produsul care a fost editat: ', this.products.indexOf(unProdus));
        this.products.splice(this.products.indexOf(unProdus), 1, result); // pentru tabelul "regular"
        this.productsDataSource = new MatTableDataSource<Product>(this.products); // pentru tabelul "material"
      } else {
        console.log('no product edited, user prolly canceled');
      }

    });
  }

  // completeze field-urile
  // editProdus(unProdus: Product) {
  //   this.produsEditat = { ...unProdus }; // nu mai este elementul din tabel, ci o copie (no reference)
  // }




  // saveProdusCuFetch() {
  //   console.log('pas 1');
  //   console.log('saving a new product: ', this.produsNou);
  //   fetch('http://localhost:9000/produse/save-simpler', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(this.produsNou)
  //   }).then(raspuns => raspuns.json())
  //     .then(raspuns => {
  //       console.log('dupa post save raspunsul server: ', raspuns);
  //       console.log('pas 2');
  //       this.products.push(raspuns);
  //       this.produsNou = new Product(); // clear the input fields
  //     })

  //   console.log('pas 3');
  //   // 1. send the product to POST http://localhost:9000/produse/save-simpler

  //   // 2. dupa ce trimitem pe server ar trebui sa apara in pagina
  //   // this.products.push(OBIECT)
  //   // 
  // }

  deleteProdus(produs: Product) {

    // let rezultatConfirm = confirm("Are you sure you wanna delete the product?");


    // let variabila = functie(); // <--- in functie ai return

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Deleting product ' + produs.name,
      confirmMessage: 'You sure you wanna delete ' + produs.name + '?'
    };

    let dialogulDeschisPentruConfirmare = this.dialog.open(DialogConfirmComponent, dialogConfig);
    dialogulDeschisPentruConfirmare.afterClosed().subscribe(result => {
      console.log('rezultatul dialogului: ', result);
      if (!result) {
        return;
      }
      produs.isDeleting = true;
      console.log('should delete product: ', produs);
      this.serviciuHttp.delete('http://localhost:9000/produse/delete/' + produs.id)
        .subscribe(
          raspuns => {
            console.log('am sters produsul: ', raspuns);
            // de scos din tabel
            this.products.splice(this.products.indexOf(produs), 1); // scoate produs din 'products'
            produs.isDeleting = false;
            this.productsDataSource = new MatTableDataSource<Product>(this.products);
          }
        );

    });
    return;
  }

  openDialogAddNewProduct() {
    console.log('should open the dialog');
    // dialog - ProductAddDialogComponent

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    const dialogul = this.dialog.open(ProductAddDialogComponent, dialogConfig);

    dialogul.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, result);

      if (result) {
        console.log('SHOULD PUSH')
        this.products.push(result);
        this.productsDataSource = new MatTableDataSource<Product>(this.products); // material table
      }
    });
  }

  sortByIdAscending: boolean = true;
  niciunClickPeId: boolean = true;

  sortById() {
    console.log('sort by id asc: ', this.sortByIdAscending);
    console.log('niciun click pe Id: ', this.niciunClickPeId);

    // if(this.sortByIdAscending){
    //   this.products.sort((x, y) => x.id - y.id);
    // }else{
    //   this.products.sort((y, x) => x.id - y.id);
    // }
    this.products.sort((x, y) => this.sortByIdAscending ? x.id - y.id : y.id - x.id);
    this.productsDataSource = new MatTableDataSource<Product>(this.products);

    this.sortByIdAscending = !this.sortByIdAscending;
    this.niciunClickPeId = false;



  }

  sortByNameAscending: boolean = true;
  niciunClickPeName: boolean = true;


  sortByName() {
    this.niciunClickPeName = false;
    if (this.sortByNameAscending) {
      this.products.sort((pa, pb) => pa.name.localeCompare(pb.name));
    } else {
      this.products.sort((pa, pb) => pb.name.localeCompare(pa.name));
    }
    this.sortByNameAscending = !this.sortByNameAscending;
    this.productsDataSource = new MatTableDataSource<Product>(this.products); // material table
  }

  sortByPriceAscending: boolean = true;
  niciunClickPePrice: boolean = true;


  sortByPrice() {
    this.niciunClickPePrice = false;
    console.log('test function');
    // 1. sort the array
    if (this.sortByPriceAscending) {
      this.products.sort((pa, pb) => pa.price - pb.price);
    } else {
      this.products.sort((pa, pb) => pb.price - pa.price);
    }
    this.sortByPriceAscending = !this.sortByPriceAscending;
    // 2. refresh the table
    this.productsDataSource = new MatTableDataSource<Product>(this.products); // material table
  }
}
