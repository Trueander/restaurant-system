import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/modules/products/models/product';
import { ProductService } from '../../services/product.service';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnChanges{
  columns: string[] = ['name', 'price', 'stock', 'category', 'status', 'actions']

  page: number = 0;
  size: number = 6;

  products: Product[] = [];
  productsAux: Product[] = [];

  paginatorResult: any;
  paginatorResultAux: any;
  productsTimesCalled: number = 0;

  @Input() productName!: string;
  @Input() categoryId!: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  overlayRef!: OverlayRef;

  constructor(
    private productService: ProductService,
    private overlay: Overlay) {
      
  }

  ngOnInit() {
    this.detachOverlayRef();
    this.getProducts(this.page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.productName && this.productName.length >= 3 || (this.productName.length == 0 && this.categoryId)) {
      this.cleanProductsAndPagination();
      this.getFilterProducts(0);
    }

    if(this.productName.length == 0 && this.categoryId == undefined && this.productsTimesCalled > 0) {
      this.getProducts(this.page);
    }
  }


  onPageChange(pageEvent: PageEvent): void {
    if(this.productName.length == 0 && this.categoryId === undefined){
      this.getProducts(pageEvent.pageIndex);
      return
    }

    this.getFilterProducts(pageEvent.pageIndex);
  }

  getProducts(page: number): void {
    this.productService.getProductsPageable(page, this.size)
        .subscribe(response => {
          this.validateAndSetResponse(response);
          this.productsTimesCalled++;
          if(response != null) {
            this.productsAux = this.products
            this.paginatorResultAux = response;
          }
          
        })
  }

  getFilterProducts(page: number) {
    this.productService.filterProducts(page, this.size, this.productName, this.categoryId)
        .subscribe(response => {
          this.validateAndSetResponse(response);
        });
  }

  validateAndSetResponse(response: any) {
    response == null ? this.cleanProductsAndPagination() : this.setProductResponse(response);
  }

  cleanProductsAndPagination(): void {
    this.products = [];
    this.paginatorResult = undefined;
  }

  setProductResponse(response: any): void {
    this.products = response.content as Product[];
    this.paginatorResult = response;
  }

  openProductFormDialog(productIdToUpdate?: number) {
    this.overlayRef = this.createOverLayRef();

    const dialogPortal = new ComponentPortal(ProductFormDialogComponent);
    const componentRef = this.overlayRef.attach(dialogPortal);

    if(productIdToUpdate) componentRef.instance.productIdToUpdate = productIdToUpdate;

    componentRef.instance.updatedProductEmitter
                .subscribe(response => {
                  this.products = this.products.map(prod => {
                    if(prod.productId === response.productId) {
                      prod = response;
                      return prod;
                    }
                    return prod;
                  });
                });

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
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

  detachOverlayRef(): void {
      this.productService.getCloseModalValue()
          .subscribe((value: Boolean) => {
            if(value && this.overlayRef) {
              this.overlayRef.detach();
            }
        });
    }
}

