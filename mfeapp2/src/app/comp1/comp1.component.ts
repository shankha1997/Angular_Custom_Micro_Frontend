import { Component, Input, OnInit } from '@angular/core';
import { CableService } from '../cable.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit{
  @Input() public data : any;
  constructor(private cableSrc : ApiService) {
    
  }

  ngOnInit() {
    console.log("this.cableSrc.transferedData;",this.data);
    
    // this.data = this.cableSrc.transferedData;
  }
}
