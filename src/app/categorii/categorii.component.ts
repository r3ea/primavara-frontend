import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelloService } from '../hello.service';

@Component({
  selector: 'app-categorii',
  templateUrl: './categorii.component.html',
  styleUrls: ['./categorii.component.css']
})
export class CategoriiComponent implements OnInit {


  numeCategorieNoua: string = '';

  categoriile: any[] = [

  ]

  constructor(
    private hello: HelloService,
    private serviciuHttp : HttpClient
    ) {
    console.log("categorii constructor")
  }

  ngOnInit(): void {
    console.log("categorii ng on init")
    this.hello.helloFromService();

    this.serviciuHttp.get<any[]>('http://localhost:9000/categorii/all')
      .subscribe(datele => {
        this.categoriile = datele;
      })

    // fetch('http://localhost:9000/categorii/all')
    //   .then(datele => datele.json())
    //   .then(datele => {
    //     this.categoriile = datele;
    //   })
  }

  saveCategorie() {

    let obiectDeTrimis = {
      "catName": this.numeCategorieNoua
    }
    console.log('salvam o categorie: ', obiectDeTrimis);
    this.serviciuHttp.post('http://localhost:9000/categorii/save', obiectDeTrimis)
      .subscribe(raspuns => {
            console.log('dupa ce am trimis request-ul, server-ul ne trimite: ', raspuns);      
            this.categoriile.push(raspuns)
        });
    // fetch('http://localhost:9000/categorii/save', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(obiectDeTrimis)
    // }).then(raspuns => raspuns.json())
    //   .then(raspuns => {
    //     console.log('dupa ce am trimis request-ul, server-ul ne trimite: ', raspuns);      
    //     this.categoriile.push(raspuns);
    //   })

  }

  deleteCategory(cat: any){
    console.log('should delete a category', cat);

   
    this.serviciuHttp.delete('http://localhost:9000/categorii/delete/'+cat.id)
      .subscribe(
        datele => {
          console.log('raspuns server delete: ', datele);
          console.log('before splice');
          this.categoriile.splice(this.categoriile.indexOf(cat), 1); // only delete from view if the server returns something "ok"
          console.log('after splice');
        },
        eroarea => {
          alert('Could not delete category');
        }
      );

    console.log('function end');

  }
}
