import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { ProductFormDialogComponent } from '../../components/product-form-dialog/product-form-dialog.component';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
value = 'Clear me';
selected = 'option2';

categories: readonly Category[] = [];

  constructor(private overlay: Overlay, private productService: ProductService) {
    this.categories = productService.getCategories();
  }

  openProductFormDialog() {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const dialogPortal = new ComponentPortal(ProductFormDialogComponent);
    overlayRef.attach(dialogPortal);
    overlayRef.backdropClick()
      .subscribe(() => overlayRef.detach());
  }

}
