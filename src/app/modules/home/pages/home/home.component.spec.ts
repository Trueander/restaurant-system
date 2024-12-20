import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "../../home-routing.module";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {AppComponent} from "../../../../app.component";
import {By} from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        CommonModule,
        HomeRoutingModule,
        MatChipsModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock params
            queryParams: of({}), // Mock queryParams (if used)
            snapshot: { paramMap: { get: () => '123' } } // Mock snapshot (if used)
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form home', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as routes length 6`, () => {
    expect(component.app_routes.length).toEqual(6);
  });

  it('should render all navigation items with correct icons', () => {
    const navItems = fixture.debugElement.queryAll(By.css('.side-nav-item'));
    const salirItem: number = 1;
    expect(navItems.length).toBe(component.app_routes.length+salirItem);

    component.app_routes.forEach((route, index) => {
      const iconElement = navItems[index].query(By.css('i'));
      const classes = iconElement.classes;
      const iconClasses = route.fontAwesomeIcon.split(' ');
      iconClasses.forEach(iconClass => {
        expect(classes[iconClass]).toBeTrue();
      });
    });
  });
});
