import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
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

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*(\.[0-9]{0,2})?$')]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      active: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.maxLength(255)]],
    })

    this.categories = this.productService.getCategories();
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
  get stock() { return this.productForm.get('stock'); }
  get active() { return this.productForm.get('active'); }
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

}
