import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/modules/categories/services/category.service';
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
selectedCategoryId!: number | undefined;

productNameFilterControl = new FormControl();
productNameFilter: string = '';

categories: readonly Category[] = [];

overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, 
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.categoryService.getCategories()
        .subscribe(response => this.categories = response); 
  }

  ngOnInit(): void {
    this.detachOverlayRef();

    this.productNameFilterControl.valueChanges
        .pipe(debounceTime(700))
          .subscribe(value => {
            if(value !== null) {
              this.productNameFilter = value;
            }
          });
  }

  openProductFormDialog(productIdToUpdate?: number) {
    this.overlayRef = this.createOverLayRef();

    const dialogPortal = new ComponentPortal(ProductFormDialogComponent);
    const componentRef = this.overlayRef.attach(dialogPortal);

    if(productIdToUpdate) componentRef.instance.productIdToUpdate = productIdToUpdate;

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
        .subscribe
        ((value: Boolean) => {
          if(value && this.overlayRef) {
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

  clearFilters(): void {
    this.productNameFilterControl.setValue(null);
    this.productNameFilter = '';
    this.selectedCategoryId = undefined;
  }
}
