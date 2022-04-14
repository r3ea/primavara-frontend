import { Component, OnInit } from '@angular/core';
import { HelloService } from '../hello.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.component.html',
  styleUrls: ['./pasta.component.css']
})
export class PastaComponent implements OnInit {

  constructor(private service : HelloService) { }

  ngOnInit(): void {
    console.log(this.suma(10, 20));
  }

  clickHelloPasta(){
    this.service.helloFromService();
  }

  suma(x: number, y: number){
    return x+y;
  }

}
