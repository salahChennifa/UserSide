import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login-form/login-form.module').then( m => m.LoginFormPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  // {
  //   path: 'forgot-pwd',canActivate :[AuthGuardGuard],
  //   loadChildren: () => import('./pages/forgot-password-form/forgot-password-form.module').then( m => m.ForgotPasswordFormPageModule)
  // },

  {
    path: 'Profile',canActivate :[AuthGuardGuard],
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: '',
    // redirectTo: 'form-quiz',
    redirectTo: 'slider',

    pathMatch: 'full'
  },
  {
    path: 'register-form',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {
    path: 'forgot-password-form',
    loadChildren: () => import('./pages/forgot-password-form/forgot-password-form.module').then( m => m.ForgotPasswordFormPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-user',canActivate :[AuthGuardGuard],
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'form-quiz',canActivate :[AuthGuardGuard],
    loadChildren: () => import('./pages/form-quiz/form-quiz.module').then( m => m.FormQuizPageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider.module').then( m => m.SliderPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {path:'news/:id',
     loadChildren: () => import('./pages/news/news.module').then(m => m.NewsPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
