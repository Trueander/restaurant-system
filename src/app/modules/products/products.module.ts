import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ProductFormDialogComponent } from './components/product-form-dialog/product-form-dialog.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ProductFormDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
