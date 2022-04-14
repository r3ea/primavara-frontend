import { Component, OnInit } from '@angular/core';
import { HelloService } from '../hello.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  titlu : string = 'Hello din pizza component'; // let titlu = 'dklsajdklasjdklas'; titlu = 33;
  subtitlu : string = 'Here you can find the best pizzas evur';

  pizzaMenu = ['margherita', 'quattro formaggi', 'pepperoni'];

  // @Autowired
  // private HelloService service;

  constructor(private service : HelloService) { 
    console.log('constructor pizza component')
    console.log('titlu: ', this.titlu)
  }

  ngOnInit(): void {
  }

  clickHelloPizza(){
    this.service.helloFromService();
  }

}
