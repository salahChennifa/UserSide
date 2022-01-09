import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordFormPage } from './forgot-password-form.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordFormPageRoutingModule {}
