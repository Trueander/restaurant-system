import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';

import {BehaviorSubject, of} from 'rxjs';
import {ProductService} from "../../services/product.service";
import {PageEvent} from "@angular/material/paginator";
import {Product} from "../../models/product";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {SimpleChanges} from "@angular/core";

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let mockOverlayRef: jasmine.SpyObj<OverlayRef>;
  let closeModalSubject: BehaviorSubject<boolean>;
  const mockResponse = {
    content: [
      {productId: 1, name: 'Hamburguer', description: 'With fries', price: 25.5, stock: 30, isActive: true},
      {productId: 2, name: 'Hamburguer 1', description: 'With fries1', price: 25.5, stock: 30, isActive: true},
      {productId: 3, name: 'Hamburguer 2', description: 'With fries2', price: 25.5, stock: 30, isActive: true},
      {productId: 4, name: 'Hamburguer 3', description: 'With fries3', price: 25.5, stock: 30, isActive: true},
      {productId: 5, name: 'Hamburguer 4', description: 'With fries4', price: 25.5, stock: 30, isActive: true},
      {productId: 6, name: 'Hamburguer 5', description: 'With fries5', price: 25.5, stock: 30, isActive: true},
    ]
  };
  let overLay: Overlay;
  let componentRefMock: any;

  beforeEach(async () => {
    closeModalSubject = new BehaviorSubject<boolean>(false);
    productServiceMock = jasmine.createSpyObj('ProductService', ['getCloseModalValue', 'getProductsPageable', 'filterProducts']);
    componentRefMock = {
      instance: {
        updatedProductEmitter: of({productId: 1, name: 'Hamburguer', description: 'With fries', price: 25.5, stock: 30, isActive: true}),
      },
    };

    productServiceMock.getCloseModalValue.and.returnValue(closeModalSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [ProductsTableComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock }, Overlay
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    overLay = TestBed.inject(Overlay);
    mockOverlayRef = jasmine.createSpyObj('OverlayRef', ['attach', 'backdropClick', 'detach']);
    spyOn(component, 'createOverLayRef').and.returnValue(mockOverlayRef);
  });

  afterEach(() => {
    closeModalSubject.unsubscribe();
  });

  it('should create and attach the dialog', () => {
    // Arrange
    const mockComponentRef = {
      instance: {
        updatedProductEmitter: of({ productId: 1, name: 'Updated Product' }),
        productIdToUpdate: 1
      }
    };

    mockOverlayRef.attach.and.returnValue(mockComponentRef); // Mock attach behavior
    mockOverlayRef.backdropClick.and.returnValue(of()); // Mock attach behavior

    // Act
    component.openProductFormDialog(1);

    // Assert
    expect(component.createOverLayRef).toHaveBeenCalled(); // Check overlay creation
    expect(mockOverlayRef.attach).toHaveBeenCalled(); // Check dialog attached

    // Verify productIdToUpdate is passed correctly
    expect(mockComponentRef.instance.productIdToUpdate).toBe(1);
  });

  it('should detach overlayRef when value is true', () => {
    //Arrange
    closeModalSubject.next(true);
    component.overlayRef = mockOverlayRef;

    //Act
    component.detachOverlayRef();

    //Assert
    expect(mockOverlayRef.detach).toHaveBeenCalled();
  });

  it('should NOT detach overlayRef when value is false', () => {
    //Arrange
    closeModalSubject.next(false);

    //Act
    component.detachOverlayRef();

    //Assert
    expect(mockOverlayRef.detach).not.toHaveBeenCalled();
  });

  it('should NOT throw error when overlayRef is undefined', () => {
    //Arrange - overlayRef undefined by default

    //Act
    closeModalSubject.next(true);

    //Assert
    expect(() => component.detachOverlayRef()).not.toThrow();
  });

  it('should call getProductsPageable', () => {
    //Arrange
    component.page = 0;
    component.size = 6;

    productServiceMock.getProductsPageable.and.returnValue(of(mockResponse));

    //Act
    component.getProducts(component.page);

    //Assert
    expect(productServiceMock.getProductsPageable).toHaveBeenCalledWith(component.page, component.size);
    expect(component.productsTimesCalled).toBeGreaterThan(0);
    expect(component.products.length).toEqual(6);
    expect(component.products.length).toEqual(component.productsAux.length);
    expect(component.productsAux).toEqual(component.products);
  });

  it('should call onPageChange when productName is empty and categoryId undefined', () => {
    //Arrange
    const pageEvent: PageEvent = { pageSize: 6,pageIndex: 1,length: 6 };
    component.productName = '';
    productServiceMock.getProductsPageable.and.returnValue(of(mockResponse));

    //Act
    component.onPageChange(pageEvent);

    //Assert
    expect(productServiceMock.getProductsPageable).toHaveBeenCalledWith(pageEvent.pageIndex, component.size);
    expect(productServiceMock.filterProducts).not.toHaveBeenCalled();
  });

  it('shoud call onPageChange when productName is not empty and categoryId is not undefined', () => {
    //Arrange
    const pageEvent: PageEvent = { pageSize: 6,pageIndex: 1,length: 6 };
    component.productName = 'Hamburguer';
    component.categoryId = 1;
    productServiceMock.filterProducts.and.returnValue(of(mockResponse));

    //Act
    component.onPageChange(pageEvent);

    //Assert
    expect(productServiceMock.filterProducts).toHaveBeenCalledWith(pageEvent.pageIndex, component.size, component.productName, component.categoryId);
    expect(productServiceMock.getProductsPageable).not.toHaveBeenCalled();
  });

  it('should set products to empty and paginationResult to undefined when clearProductsAndPagination called', () => {
    //Arrange
    component.products = mockResponse.content as Product[];
    component.paginatorResult = mockResponse.content;

    //Act
    component.cleanProductsAndPagination();

    //Assert
    expect(component.paginatorResult).toBeUndefined();
    expect(component.products.length).toEqual(0);
  });

  it('should create an overlay with ProductFormDialogComponent', () => {
    //Arrange
    const mockComponentRef = {
      instance: {
        updatedProductEmitter: of({ productId: 1, name: 'Updated Product' }),
        productIdToUpdate: 1
      }
    };
    component.products = mockResponse.content as Product[];

    mockOverlayRef.attach.and.returnValue(mockComponentRef);
    mockOverlayRef.backdropClick.and.returnValue(of(new MouseEvent('click')));


    //Act
    component.openProductFormDialog(1);

    //Assert
    let product = component.products.find(product => product.productId === 1);
    expect(product?.name).toEqual('Updated Product');
  });

  it('should call cleanProductsAndPagination and getFilterProducts when productName is not empty or categoryId is set', () => {
    //Arrange
    component.productName = 'Hamburguer';
    const changes: SimpleChanges = {
      productName: { currentValue: 'Hamburguer', previousValue: '', firstChange: true, isFirstChange: () => true },
      categoryId: { currentValue: undefined, previousValue: undefined, firstChange: true, isFirstChange: () => true },
    };

    productServiceMock.filterProducts.and.returnValue(of(mockResponse));
    spyOn(component, 'cleanProductsAndPagination');
    spyOn(component, 'getFilterProducts');

    //Act
    component.ngOnChanges(changes);

    //Assert
    expect(component.cleanProductsAndPagination).toHaveBeenCalled();
    expect(component.getFilterProducts).toHaveBeenCalledWith(0);
  });

  it('should call getProducts when productName is empty and categoryId is undefined and productsTimesCalled is greater than 0', () => {
    //Arrange
    component.productName = '';
    component.productsTimesCalled++;
    const changes: SimpleChanges = {
      productName: { currentValue: '', previousValue: '', firstChange: true, isFirstChange: () => true },
      categoryId: { currentValue: undefined, previousValue: undefined, firstChange: true, isFirstChange: () => true },
    };
    productServiceMock.getProductsPageable.and.returnValue(of(mockResponse));
    spyOn(component, 'getProducts');

    //Act
    component.ngOnChanges(changes);

    //Assert
    expect(component.getProducts).toHaveBeenCalled();
  });
});
