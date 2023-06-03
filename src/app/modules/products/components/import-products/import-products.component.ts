import { Component, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { finalize } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/modules/categories/services/category.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-import-products',
  templateUrl: './import-products.component.html',
  styleUrls: ['./import-products.component.scss']
})
export class ImportProductsComponent {

  file!: File | undefined;

  errorMessageActive: boolean = false;

  progressBarActive: boolean = false;

  importedProducts: Product[] = [];

  productForm!: FormGroup;

  categories: Category[] = [];

  constructor(private productService: ProductService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    });
    this.categoryService.getCategories()
        .subscribe(response=> this.categories = response);
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  importProducts(): void {
    if(this.file !== undefined) {
      this.progressBarActive = true;
      this.productService.importProductsFromExcel(this.file)
          .pipe(finalize (() => this.progressBarActive = false))
          .subscribe({
            next: productsResponse => {
              this.sweetAlertService.successAlert('Products imported successfully');
              this.importedProducts = productsResponse;
              this.loadImportedProductsToFormArray();
            }
          })
    }
  }

  saveProducts(): void {
    this
  }

  getFileFromInput(event: any) {
    let fileInput = event.target.files[0];
    console.log(event)
    if(!this.validateFileXlsx(fileInput)){
      this.sweetAlertService.warningAlert('Only Excel files are allowed');
      return
    }
    this.file = fileInput;
  }

  getFileFromDragAndDrop(event: any) {
    event.preventDefault();
    let fileInput = event.dataTransfer.files[0];
    if(!this.validateFileXlsx(fileInput)){
      
      return
    }
    this.file = fileInput;
  }

  dragOverItem(event: any) {
    event.preventDefault();
  }

  validateFileXlsx(file: File): boolean {
    if(file.type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')){
      this.errorMessageActive = false;
      return true;
    }
    this.errorMessageActive = true;
    return false;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog();
  }

  deleteFile(): void {
    this.file = undefined;
  }

  loadImportedProductsToFormArray(): void {
    this.importedProducts.forEach(prod => {
      this.productsArray.push(this.addProductFormGroup(prod));
    });
    console.log(this.productsArray)
  }

  get productsArray(){
    return this.productForm.controls['products'] as FormArray;
  }

  addProductFormGroup(product: Product): FormGroup{
    return this.fb.group({
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      price: [product.price, Validators.required],
      stock: [product.stock, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]],
      imageUrl: [product.imageUrl, Validators.required],
      categoryId: [product.category !== null ? product.category.categoryId: null, Validators.required]
    })
  }

  removeItemFromProductArrayForm(index: number): void {
    this.productsArray.removeAt(index);
    this.importedProducts = this.importedProducts.filter((p, i) => i !== index);
  }

  createProducts(): void {
    this.productService.createProducts(this.productsArray.value as Product[])
        .subscribe({
          next:() => {
            this.sweetAlertService.successAlert('Products created successfully');
            this.closeDialog();
          },
          error: error => console.log(error)
        })
  }
}
