import { Inject, Injector, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VersionCheckService } from './services/version-check.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [VersionCheckService],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  static injector : Injector;
  constructor(injector : Injector){
    AppModule.injector = injector;
  }

  ngDoBootstrap(){
    const ngElement = createCustomElement(AppComponent, {injector: AppModule.injector});
    if(!window.customElements.get('mfeapp2-ui')){
      window.customElements.define('mfeapp2-ui',ngElement)
    }
  }
}
