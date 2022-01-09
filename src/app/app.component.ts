import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { SplashComponent } from './splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25
  };
  sideMenuList :any;

  constructor(private modalController: ModalController,private menu: MenuController,private router : Router,private authSrvc : AuthService) {
    this.presentSplash()


    this.sideMenuList = [
      {
        title: 'Mon Profile',
      },
      {
        title: 'Nous contacter',
        icon: 'paper-plane'
      }, {
        title: 'Proposer un contenu',
        icon: 'heart'
      }, {
        title: 'Echange mes points',
        icon: 'archive'
      }, {
        title: 'Déconnexion',
        icon: 'trash'
      }

    ]
  }


  onMenuClick(item:string){
    this.menu.close()
  }

  ionDidOpen(event) {
    // console.log(event);
    this.menu.isOpen().then(() => {
      console.log("opened")
    })
  }

  ionDidClose(event) {
    // console.log(event);
    this.menu.isOpen().then(() => {
      console.log("Closed")
    })
  }

  openEnd(item: string) {
    if (item == "Mon Profile"){
        this.router.navigate(['/Profile'])
    }
    if(item == "Déconnexion"){
      this.authSrvc.Logout();
      this.router.navigate(['/login'])

    }
    this.menu.close();
  }

  async presentSplash() {
    const modal = await this.modalController.create({
      component: SplashComponent ,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
