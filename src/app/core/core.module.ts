import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ScenarioService } from './http-services/scenario.service';
import { GameService } from './http-services/game.service';
import { GoogleMapService } from './http-services/google-map.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule
  ],
  exports: [
    SidenavComponent,
    HeaderComponent
  ],
  providers: [
    GoogleMapService,
    ScenarioService,
    GameService
  ]
})
export class CoreModule { }
