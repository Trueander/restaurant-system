import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent {
  value = '';
  myControl = new FormControl<string>('');
  products: string[] = ['Double hamburger','Pizza','Inka Kola','Bisteak'];

  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value) : this.products.slice();
      }),
    );
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.products.filter(product => product.toLocaleLowerCase().includes(filterValue));
  }
}
