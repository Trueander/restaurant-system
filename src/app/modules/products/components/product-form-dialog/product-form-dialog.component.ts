import { Component, ElementRef, ViewChild, Output, EventEmitter, HostListener, OnDestroy, Input, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { ProductRegistrationRequest } from 'src/app/core/models/product-registration-request';
import { ProductUpdateRequest } from 'src/app/core/models/product-update-request';
import { CategoryService } from 'src/app/modules/categories/services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss']
})
export class ProductFormDialogComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];

  imageValidated: boolean = false;

  @ViewChild('image') image!: ElementRef;

  @Input() productIdToUpdate!: number;

  @Output() closePanel = new EventEmitter<void>();
  @Output() updatedProductEmitter = new EventEmitter<Product>();

  numRegex = /^[0-9]+(\.[0-9]\d{0,1})?$/;

  constructor(private fb: FormBuilder, 
    private productService: ProductService,
    private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.loadProductForm();

    if(this.productIdToUpdate) {
        this.productService.getProduct(this.productIdToUpdate)
            .subscribe({
              next: (response: Product) => this.loadProductInfo(response),
              error: (error) => console.log(error)
            })
    }
    
    this.categoryService.getCategories()
        .subscribe(response => this.categories = response);
  }

  onLoadImage() {
    console.log(this.image.nativeElement)
      if(this.image.nativeElement.complete && this.image.nativeElement.naturalWidth == 0) {
        this.imageUrl?.setErrors({'image': true});
        this.imageValidated = false;
      }else {
        this.imageValidated = true;
      }
  }

  createProduct(): void {
    let product: ProductRegistrationRequest = this.productForm.value;
    this.productService.createProduct(product)
        .subscribe(() => {
          this.closeDialog();
        })
  }

  updateProduct(): void {
    let product: ProductUpdateRequest = this.productForm.value;
    this.productService.updateProduct(this.productIdToUpdate, product)
        .subscribe(response => {
          this.updatedProductEmitter.next(response);
          this.closeDialog();
        });
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  loadProductForm(): void {
    this.productForm = this.fb.group({
      productId: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.maxLength(255)]],
    })
  }

  loadProductInfo(product: Product): void {
    const {productId, name, price, description, stock, category, imageUrl} = product;
    this.productForm.setValue({
      productId: productId,
      name: name,
      price: price,
      description: description,
      stock: stock,
      categoryId: category.categoryId,
      imageUrl: imageUrl
    })

    if(imageUrl) this.imageValidated = true;
  }
  
  get productId() { return this.productForm.get('productId'); }
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
  get stock() { return this.productForm.get('stock'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }
}
