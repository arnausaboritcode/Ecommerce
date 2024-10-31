import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string): void {
    this.toastr.success(`${message}`, '', {
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      messageClass: 'text-xs',
      toastClass:
        'ngx-toastr right-4 bottom-4 !rounded-lg flex items-center !shadow-none bg-black/90',
    });
  }

  showError(message: string): void {
    this.toastr.error(`${message}`, '', {
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      messageClass: 'text-xs',
      toastClass:
        'ngx-toastr top-4 !rounded-lg flex items-center !shadow-none bg-black/90',
    });
  }
}
