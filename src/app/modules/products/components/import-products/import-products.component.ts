import { Component, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-import-products',
  templateUrl: './import-products.component.html',
  styleUrls: ['./import-products.component.scss']
})
export class ImportProductsComponent {

  srcResult!: any;
  file!: File;

  errorMessageActive: boolean = false;

  constructor(private productService: ProductService) {
      
  }

  closeDialog(): void {
    this.productService.sendCloseModal();
  }

  getFileFromInput(event: any) {
    let fileInput = event.target.files[0];
    console.log(event)
    if(!this.validateFileXlsx(fileInput)){
      
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
}
