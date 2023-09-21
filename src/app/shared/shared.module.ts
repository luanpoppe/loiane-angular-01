import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModelComponent],
  imports: [CommonModule],
  exports: [AlertModalComponent],
})
export class SharedModule {}
