import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  nrClicks: number = 0;

  constructor() { }

  helloFromService(){
    this.nrClicks++;
    console.log('---------------------------');
    console.log('----------hello------------' + this.nrClicks);
    console.log('---------------------------');
  }
}
