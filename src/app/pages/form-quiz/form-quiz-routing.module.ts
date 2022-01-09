import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormQuizPage } from './form-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: FormQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormQuizPageRoutingModule {}
