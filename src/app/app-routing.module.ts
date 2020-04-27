import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [

{ path: '', loadChildren: () => import('./login/home.module').then( m => m.HomePageModule)},
  { path: 'login' , loadChildren: () => import('./login/home.module').then( m => m.HomePageModule)},
  {
    path: 'create-new-user',
    loadChildren: () => import('./singup/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'client',  canActivate: [AuthGuardService],
    loadChildren: () => import('./client/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'client/new-delevery',
    loadChildren: () => import('./new-delevery/new-delevery.module').then( m => m.NewDeleveryPageModule)
  },
  {
    path: 'courier',  canActivate: [AuthGuardService],
    loadChildren: () => import('./courier/courier.module').then( m => m.CourierPageModule)
  },
  {
    path: 'courier/my-job',
    loadChildren: () => import('./my-job/my-job.module').then( m => m.MyJobPageModule)
  },
  {
    path: 'courier/my-job/response/:id',
    loadChildren: () => import('./response/response.module').then( m => m.ResponsePageModule)
  },
  {
    path: 'transfer-job',
    loadChildren: () => import('./transfer-job/transfer-job.module').then( m => m.TransferJobPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scanning-module/scanning-module.module').then( m => m.ScanningModulePageModule)
  },
  {
    path: 'job-complete',
    loadChildren: () => import('./job-complete/job-complete.module').then( m => m.JobCompletePageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
