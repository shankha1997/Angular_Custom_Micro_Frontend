import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit{
  @Input() public data : any;
  constructor() {
    
  }

  ngOnInit() {
    console.log("Transfered Data;",this.data);    
  }
}
