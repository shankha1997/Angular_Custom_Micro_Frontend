import { Component, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { VersionCheckService } from './services/version-check.service';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  @ViewChild('mfeContainer') mfeContainer : ElementRef<HTMLElement> | undefined;
  @Input() public componentData : any = {};
  public data : any;
  public containerEle : any = null;
  public showUi : boolean = false;

  constructor(private cd : ChangeDetectorRef, private versionCheckService : VersionCheckService){
    this.versionCheckService.initVersionCheck('http://localhost:3000/mfeversion');
  }
  
  ngOnChanges(changes: SimpleChanges) : void {
    console.log("changes",changes);
    if(changes['componentData']  && changes['componentData']?.currentValue !== changes['componentData']?.previousValue) {
      this.observer(changes['componentData']?.currentValue);
    }
  }

  private observer (data : any) {
    if(Object.keys(data).length !== 0){
      this.showUi = true;
      this.data = data;
    }
  }

  detectChanges(){
    this.cd.detectChanges();
    setInterval(this.containerEle.click(),500)
  }

  ngAfterViewInit(){
    this.containerEle = this.mfeContainer?.nativeElement;
    this.containerEle.click();
  }
}
