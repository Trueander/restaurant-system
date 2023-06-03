import { Component, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent {
  value = '';
  myControl = new FormControl<string | Product>('');
  products: Product[] = [];

  productsToUpdate: Product[] = []

  filteredOptions!: Observable<Product[]>;

  productForm!: FormGroup;

  selectedProducts: Product[] = [];

  constructor(private fb: FormBuilder, 
    private productService: ProductService,
    private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    })
    this.myControl.valueChanges.pipe(debounceTime(700))
        .subscribe(response => {
          if(typeof response === 'string' && response.trim().length > 2){
            this.filteredOptions = this.productService.getProductsFilterByName(response);
          }
        })
  }

  selectOption(selectedProduct: MatAutocompleteSelectedEvent) {
    const product: Product = selectedProduct.option.value;

    if(this.selectedProducts.find(p => p.productId === product.productId)) return

    this.productsArray.push(this.addProductFormGroup(product))
    this.selectedProducts.push(product);
 }

  addProductFormGroup(product: Product): FormGroup{
    return this.fb.group({
      productId:[product.productId, Validators.required],
      name: [product.name, Validators.required],
      stock: [product.stock, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]]
    })
  }

  get productsArray(){
    return this.productForm.controls['products'] as FormArray;
  }

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  updateProductsStock(): void {
    this.productService.updateProductsStock(this.productsArray.value)
        .subscribe({
          next: () => {
            this.sweetAlertService.successAlert('Stock updated successfully');
            this.closeDialog();
          },
          error: () => this.sweetAlertService.errorAlert('Something went wrong, please try again')
        });
  }

  removeItemFromProductArrayForm(index: number): void {
    this.productsArray.removeAt(index);
    this.selectedProducts = this.selectedProducts.filter((p, i) => i != index);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog();
  }

}
