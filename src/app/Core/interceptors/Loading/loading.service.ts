import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private spinner = inject(NgxSpinnerService);

  private requests = 0;

  show(): void {
    this.requests++;

    if (this.requests === 1) {
      this.spinner.show();
    }
  }

  hide(): void {
    this.requests--;

    if (this.requests <= 0) {
      this.requests = 0;
      this.spinner.hide();
    }
  }
}
