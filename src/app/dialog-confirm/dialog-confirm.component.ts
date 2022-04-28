import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  title: string = '';
  confirmMessage: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.confirmMessage = this.data.confirmMessage;
    console.log('DIALOGUL E DESCHIS, data: ', this.data);
  }

}
