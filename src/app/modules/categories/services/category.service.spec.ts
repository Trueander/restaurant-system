import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CategoryService} from "./category.service";
import {Category} from "../../products/models/category";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all the categories', (done: DoneFn) => {
    //Arrange
    const categoriesMock: Category[] = [{categoryId: 1, name: 'Food', icon: 'icon'}];

    //Act
    service.getCategories().subscribe(response => {
      expect(response.length).toEqual(1);
      done();
    });

    //Assert
    const req = httpMock.expectOne(`${service['baseUrlBackend']}/list`);
    expect(req.request.method).toBe('GET');
    req.flush(categoriesMock);
  });

});
