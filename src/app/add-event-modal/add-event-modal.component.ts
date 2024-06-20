import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent {
  newEvent = {
    title: '',
    startDateTime: new Date().toISOString().substring(0, 16), // Initialize to current date and time in ISO format
    endDateTime: new Date().toISOString().substring(0, 16)    // Initialize to current date and time in ISO format
  };

  constructor(
    public dialogRef: MatDialogRef<AddEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
    
  }

  onSaveClick(): void {
    const startDateTime = new Date(this.newEvent.startDateTime);
    const endDateTime = new Date(this.newEvent.endDateTime);

    const newEvent = {
      title: this.newEvent.title,
      start: startDateTime,
      end: endDateTime,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };

    this.dialogRef.close(newEvent);
  }
}
