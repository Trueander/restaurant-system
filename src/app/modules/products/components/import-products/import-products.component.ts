import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/modules/products/models/product';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/modules/categories/services/category.service';
import { Category } from 'src/app/modules/products/models/category';

@Component({
  selector: 'app-import-products',
  templateUrl: './import-products.component.html',
  styleUrls: ['./import-products.component.scss']
})
export class ImportProductsComponent implements OnInit, OnDestroy{
  productForm: FormGroup;
  file: File | undefined;
  errorMessageActive: boolean = false;
  progressBarActive: boolean = false;
  importedProducts: Product[] = [];
  categories: Category[] = [];
  numRegex = /^[0-9]+(\.[0-9]\d{0,1})?$/;
  unsubscribe$: Subject<void>;

  constructor(private productService: ProductService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private categoryService: CategoryService) {
      this.unsubscribe$ = new Subject<void>();
      this.productForm = this.fb.group({
        products: this.fb.array([])
      });
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(response=> this.categories = response);
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  importProducts(): void {
    if(this.file !== undefined) {
      this.progressBarActive = true;
      this.productService.importProductsFromExcel(this.file)
          .pipe(takeUntil(this.unsubscribe$))
          .pipe(finalize (() => this.progressBarActive = false))
          .subscribe({
            next: productsResponse => {
              this.sweetAlertService.successAlert('Products imported successfully');
              this.importedProducts = productsResponse;
              this.loadImportedProductsToFormArray();
            }
          });
    }
  }

  getFileFromInput(event: any) {
    let fileInput = event.target.files[0];
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

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeDialog();
  }

  deleteFile(): void {
    this.file = undefined;
  }

  loadImportedProductsToFormArray(): void {
    this.importedProducts.forEach(prod => {
      this.productsArray.push(this.addProductFormGroup(prod));
    });
  }

  get productsArray(){
    return this.productForm.controls['products'] as FormArray;
  }

  addProductFormGroup(product: Product): FormGroup{
    return this.fb.group({
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      price: [product.price, [Validators.required, Validators.pattern(this.numRegex)]],
      stock: [product.stock, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]],
      imageUrl: [product.imageUrl, Validators.required],
      categoryId: [product.category ? product.category.categoryId: null, Validators.required]
    });
  }

  removeItemFromProductArrayForm(index: number): void {
    this.productsArray.removeAt(index);
    this.importedProducts = this.importedProducts.filter((_, i) => i !== index);
  }

  createProducts(): void {
    this.productService.createProducts(this.productsArray.value as Product[])
        .subscribe({
          next:() => {
            this.sweetAlertService.successAlert('Products created successfully');
            this.closeDialog();
          },
          error: error => this.sweetAlertService.errorAlert('Something went wrong! Try again')
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
