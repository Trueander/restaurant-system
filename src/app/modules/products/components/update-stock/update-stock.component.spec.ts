import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UpdateStockComponent } from './update-stock.component';
import {SharedModule} from "../../../../shared/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProductService} from "../../services/product.service";
import {of, throwError} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {SweetAlertService} from "../../../../shared/services/sweet-alert.service";

describe('UpdateStockComponent', () => {
  let component: UpdateStockComponent;
  let fixture: ComponentFixture<UpdateStockComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  const category: Category = {categoryId: 1, name:'Fast food', icon:'new'};
  const newProduct: Product = {productId: 1, name: 'Hamburguer', description: 'With fries', price: 25.5, stock: 30, isActive: true, category: category, createdAt:'', discount: 20, imageUrl:''};

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductsFilterByName', 'sendCloseModal', 'updateProductsStock']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['successAlert', 'errorAlert']);

    await TestBed.configureTestingModule({
      declarations: [ UpdateStockComponent ],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStockComponent);
    component = fixture.componentInstance;
    productServiceSpy.getProductsFilterByName.and.returnValue(of([]));
    fixture.detectChanges()
  });

  it('should employee-form updatestock', () => {
    expect(component).toBeTruthy();
    expect(component.filterControl).toBeTruthy();
  });

  it('should set filteredOptions$ when the formcontrol has more than 2 characters', fakeAsync(() => {
    //Arrange
    const text = 'New text';

    //Act
    component.filterControl.setValue(text);
    tick(700);

    //Assert
    expect(productServiceSpy.getProductsFilterByName).toHaveBeenCalledWith(text);
    expect(component.filteredOptions$).toBeTruthy();
  }));

  it('should select a product and add it to the selectedProducts list', () => {
    //Arrange
    const mockMatOption: any = {
      option: {value: newProduct}
    };

    //Act
    component.selectOption(mockMatOption);

    //Assert
    expect(component.productsArray.length).toBe(1);
    expect(component.selectedProducts.length).toBe(1);
  });

  it('should select a product and not add it to the list', () => {
    //Arrange
    const mockMatOption: any = {
      option: {value: newProduct}
    };
    component.selectedProducts.push(newProduct);

    //Act
    component.selectOption(mockMatOption);

    //Assert
    expect(component.selectedProducts.length).toBe(1);
  });

  it('should create a new FormGroup', () => {
    //Arrange

    //Act
    const formGroup = component.addProductFormGroup(newProduct);

    //Assert
    expect(+formGroup.get('productId')?.value).toEqual(1);
    expect(formGroup.get('name')?.value).toEqual('Hamburguer');
    expect(+formGroup.get('stock')?.value).toEqual(30);
  });

  it('should emit sendClosemodal when the dialog is closed', () => {
    //Arrange

    //Act
    component.closeDialog();

    //Assert
    expect(productServiceSpy.sendCloseModal).toHaveBeenCalled();
  });

  it('should clean filterControl', () => {
    //Arrange
    component.filterControl.setValue('Some text');

    //Act
    component.limpiarFiltro();

    //Assert
    expect(component.filterControl.value).toEqual('');
  });

  it('should call successAlerta and close the modal', () => {
    //Arrange
    component.addProductFormGroup(newProduct);
    productServiceSpy.updateProductsStock.and.returnValue(of());

    //Act
    component.updateProductsStock();

    //Assert
    expect(productServiceSpy.updateProductsStock).toHaveBeenCalled();
    expect(productServiceSpy.sendCloseModal).toHaveBeenCalled();
    expect(sweetAlertServiceSpy.successAlert).toHaveBeenCalled();
  });

  it('should call errorAlert on Error', () => {
    //Arrange
    productServiceSpy.updateProductsStock.and.returnValue(throwError(() => new Error()));

    //Act
    component.updateProductsStock();

    //Assert
    expect(productServiceSpy.updateProductsStock).toHaveBeenCalled();
    expect(productServiceSpy.sendCloseModal).not.toHaveBeenCalled();
    expect(sweetAlertServiceSpy.successAlert).not.toHaveBeenCalled();
    expect(sweetAlertServiceSpy.errorAlert).toHaveBeenCalled();
  });

  it('should remove an item from the form array', () => {
    //Arrange
    const mockMatOption: any = {
      option: {value: newProduct}
    };
    component.selectOption(mockMatOption);

    //Act
    component.removeItemFromProductArrayForm(0);

    //Assert
    expect(component.productsArray.length).toEqual(0)
    expect(component.selectedProducts.length).toEqual(0)
  });

  it('should call closeModal when escape key is pressed', () => {
    //Arrange

    //Act
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    //Assert
    expect(productServiceSpy.sendCloseModal).toHaveBeenCalled();
  });

  it('should return the products name', () => {
    //Arrange

    //Act
    const productName = component.displayFn(newProduct);

    //Assert
    expect(productName).toBe(newProduct.name);
  });
});
