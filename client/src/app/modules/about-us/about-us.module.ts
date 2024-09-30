import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUs2Component } from './about-us2/about-us2.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    AboutUs2Component
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ],
  exports: []
})
export class AboutUsModule { }
