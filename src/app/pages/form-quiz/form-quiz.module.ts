import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormQuizPageRoutingModule } from './form-quiz-routing.module';

import { FormQuizPage } from './form-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormQuizPageRoutingModule
  ],
  declarations: [FormQuizPage]
})
export class FormQuizPageModule {}
