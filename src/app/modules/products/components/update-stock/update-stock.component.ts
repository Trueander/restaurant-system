import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
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

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    })
    this.myControl.valueChanges.pipe(debounceTime(1000))
        .subscribe(response => {
          if(typeof response === 'string' && response.trim().length > 0){
            this.filteredOptions = this.productService.filterByName(response);
          }
        })
  }

  selectOption(selectedProduct: MatAutocompleteSelectedEvent) {
    const product: Product = selectedProduct.option.value;
    this.productsArray.push(this.addProductFormGroup(product))
 }

  addProductFormGroup(product: Product): FormGroup{
    return this.fb.group({
      productId:[product.id, Validators.required],
      name: [product.name, Validators.required],
      stock: [product.stock, Validators.required]
    })
  }

  get productsArray(){
    return this.productForm.controls['products'] as FormArray;
  }

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }
}
