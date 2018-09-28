import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(protected messageService: MessageService) { }

  /**
   * Display a toast alert in the top center of the page confirming the creation
   */
  createToastAlert(key, summary, detail) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: `${summary} Created`,
      detail: `${detail} has been created successfully`,
      sticky: false,
      life: 3000
    });
  }

  /**
   * Display a toast alert in the top center of the page confirming the deletion
   */
  updateToastAlert(key, summary, detail) {
    setTimeout(() => {
      this.messageService.add({
        key: key,
        severity: 'success',
        summary: `${summary} Updated`,
        detail: `${detail} has been updated successfully`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }

  /**
   * Display a toast alert in the top center of the page informing the user the item has not been deleted
   */
  rejectDeleteToastAlert(key, summary, detail) {
    setTimeout(() => {
      this.messageService.add({
        key: key,
        severity: 'warn',
        summary: `${summary} Not Deleted`,
        detail: `${detail} has not been deleted`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }

  /**
   * Display a toast alert in the top center of the page confirming the deletion
   */
  deleteToastAlert(key, summary, detail) {
    setTimeout(() => {
      this.messageService.add({
        key: key,
        severity: 'success',
        summary: `${summary} Deleted`,
        detail: `${detail} has been deleted successfully`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }
}
