import { Component, ElementRef, ViewChild, Output, EventEmitter, HostListener  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss']
})
export class ProductFormDialogComponent {
  productForm!: FormGroup;
  selected = 'option2';
  categories: Category[] = [];

  imageValidated: boolean = false;

  @ViewChild('image') image!: ElementRef;

  @Output() closePanel = new EventEmitter<void>();


  constructor(private fb: FormBuilder, 
    private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*(\.[0-9]{0,2})?$')]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.maxLength(255)]],
    })

    this.categories = this.productService.getCategories();
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
  get stock() { return this.productForm.get('stock'); }
  get category() { return this.productForm.get('category'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }

  onLoadImage() {
      
      if(this.image.nativeElement.complete && this.image.nativeElement.naturalWidth == 0) {
        this.imageUrl?.setErrors({'image': true});
        this.imageValidated = false;
      }else {
        this.imageValidated = true;
      }
  }

  createProduct(): void {
    let product: Product = this.productForm.value;
    console.log(product)
    this.productService.getProducts().push(product)
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog();
  }

}
