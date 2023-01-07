import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { ImportProductsComponent } from '../../components/import-products/import-products.component';
import { ProductFormDialogComponent } from '../../components/product-form-dialog/product-form-dialog.component';
import { UpdateStockComponent } from '../../components/update-stock/update-stock.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
value = '';
selected = 'option2';

categories: readonly Category[] = [];

overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private productService: ProductService) {
    this.categories = productService.getCategories();
  }

  ngOnInit(): void {
    this.detachOverlayRef();
  }

  openProductFormDialog() {
    this.overlayRef = this.createOverLayRef();

    const dialogPortal = new ComponentPortal(ProductFormDialogComponent);
    this.overlayRef.attach(dialogPortal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
  }

  openImportProductsDialog() {
    this.overlayRef = this.createOverLayRef();

    const dialogPortal = new ComponentPortal(ImportProductsComponent);
    this.overlayRef.attach(dialogPortal);
    
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
  }

  openUpdateStockDialog() {
    this.overlayRef = this.createOverLayRef();

    const dialogPortal = new ComponentPortal(UpdateStockComponent);
    this.overlayRef.attach(dialogPortal);
    
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
  }

  detachOverlayRef(): void {
    this.productService.getCloseModalValue()
        .subscribe((value: Boolean) => {
          if(value) {
            this.overlayRef.detach()
          }
    })
  }

  createOverLayRef(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }
  

}
