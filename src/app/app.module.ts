import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire'
import { AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { LoginPipe } from './pages/login.pipe';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {  AngularFireDatabaseModule } from '@angular/fire/database'; // pour manipuler la base de données Firebase
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginPipe],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
     AngularFireAuthModule,
     FormsModule,
     AngularFireDatabaseModule,
     AngularFireStorageModule],
     
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
