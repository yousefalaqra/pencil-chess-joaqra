import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class MiniMaterialModule {}
