import { AccountComponent } from './components/account/account.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AnnonceInfoComponent } from './components/annonce-info/annonce-info.component';
import { AddProductComponent } from './components/add-product/add-product.component';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { AllAnnoncesComponent } from './components/all-annonces/all-annonces.component';
import { AddProductTestComponent } from './components/add-product-test/add-product-test.component';
import { AddCategoryTestComponent } from './components/add-category-test/add-category-test.component';


const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"signupAdmin", component: SignupAdminComponent},
  {path:"addProduct", component: AddProductComponent},
  {path:"editAnnonce/:id", component: EditProductComponent},
  {path:"annonceInfo/:id", component: AnnonceInfoComponent},
  {path:"dashboard/:id", component: DashboardClientComponent},
  {path:"dashboardAdmin", component: DashboardAdminComponent},
  {path:"allAnnonces", component: AllAnnoncesComponent},
  {path:"account/:id", component: AccountComponent},
  {path:"addProductTest", component: AddProductTestComponent},
  {path:"addCategoryTest", component: AddCategoryTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
