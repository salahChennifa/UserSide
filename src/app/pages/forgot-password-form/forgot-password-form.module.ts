import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordFormPageRoutingModule } from './forgot-password-form-routing.module';

import { ForgotPasswordFormPage } from './forgot-password-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordFormPageRoutingModule
  ],
  declarations: [ForgotPasswordFormPage]
})
export class ForgotPasswordFormPageModule {}
