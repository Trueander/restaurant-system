import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {DialogModule} from '@angular/cdk/dialog';


const MaterialComponents = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatSelectModule,
  MatChipsModule,
  MatDialogModule,
  MatPaginatorModule,
  DialogModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
