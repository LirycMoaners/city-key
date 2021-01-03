import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { GoogleMapService } from './http-services/google-map.service';
import { MechanismService } from './http-services/mechanism.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule
  ],
  exports: [
    SidenavComponent,
    HeaderComponent
  ],
  providers: [
    GoogleMapService,
    MechanismService
  ]
})
export class CoreModule { }
