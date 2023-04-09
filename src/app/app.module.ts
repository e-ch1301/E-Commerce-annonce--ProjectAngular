import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AnnonceInfoComponent } from './components/annonce-info/annonce-info.component';
import { OrderComponent } from './components/order/order.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { LastAnnonceComponent } from './components/last-annonce/last-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { HttpClientModule } from "@angular/common/http";
import { AllAnnoncesComponent } from './components/all-annonces/all-annonces.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnoncesTableComponent } from './components/annonces-table/annonces-table.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AnnoncesClientTableComponent } from './components/annonces-client-table/annonces-client-table.component';
import { OrdersClientTableComponent } from './components/orders-client-table/orders-client-table.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { AccountComponent } from './components/account/account.component';
import { AddProductTestComponent } from './components/add-product-test/add-product-test.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryTestComponent } from './components/add-category-test/add-category-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    AddProductComponent,
    AnnonceComponent,
    AnnonceInfoComponent,
    OrderComponent,
    OrderInfoComponent,
    DashboardAdminComponent,
    DashboardClientComponent,
    LastAnnonceComponent,
    AllAnnoncesComponent,
    MyFilterPipe,
    NavbarComponent,
    AnnoncesTableComponent,
    OrdersTableComponent,
    EditProductComponent,
    AnnoncesClientTableComponent,
    OrdersClientTableComponent,
    CategoryFilterPipe,
    SignupAdminComponent,
    AccountComponent,
    AddProductTestComponent,
    CategoryComponent,
    AddCategoryTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
