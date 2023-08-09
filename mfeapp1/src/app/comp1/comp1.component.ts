import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit{
  public componentData : any = {};
  constructor(private apiSrc : ApiService){

  }
  
  ngOnInit(): void {
    this.apiSrc.getData().subscribe((data : any) => {
      this.apiSrc.transferedData = data;
      this.componentData = {
        apisrc : this.apiSrc
      };
    })
  }

}
