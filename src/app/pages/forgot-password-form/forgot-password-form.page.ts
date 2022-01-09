import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.page.html',
  styleUrls: ['./forgot-password-form.page.scss'],
})
export class ForgotPasswordFormPage implements OnInit {

  email:string;
  constructor(private toastt : ToastController,private afauth:AngularFireAuth,
    private loadt:LoadingController,
    private router:Router) { }

  ngOnInit() {
  }



 async reset(){
    if(this.email){
      const load =  await this.loadt.create({
        message:'envoi du lien de réinitialisation du mot de passe',
        spinner:'crescent',
        showBackdrop:true
      });

        load.present();

        this.afauth.sendPasswordResetEmail(this.email)
         .then(()=>{
          load.dismiss();
          this.toast('success! svp verifier votre mail...','success');
          this.router.navigate(['/login'])
        }).catch((error)=>{
          load.dismiss();
         this.toast('erreur','danger');
        })
    }else{
      this.toast('veuillez entrer votre correcte email addresse','danger');
      console.log('veuillez entrer votre correcte email addresse')
    }
  }



  async  toast(message,status){

    const toast = await this.toastt.create({
      message:message,
      position:'top',
      color:status,
      duration:2000
    })
      toast.present();
  }

}
