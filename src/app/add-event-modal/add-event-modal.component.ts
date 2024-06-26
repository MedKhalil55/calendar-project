import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {
  event: any;
  isEditMode = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.event = data.event ? { ...data.event } : this.initializeNewEvent();
    this.isEditMode = !!data.event;
    this.form = this.fb.group({
      title: [this.event.title, Validators.required],
      description: [this.event.description],
      startDateTime: [this.event.startDateTime, Validators.required],
      endDateTime: [this.event.endDateTime, Validators.required],
      category: [this.event.category, Validators.required]
    });
  }

  ngOnInit(): void {}

  initializeNewEvent() {
    return {
      title: '',
      description: '',
      startDateTime: new Date().toISOString().substring(0, 16),
      endDateTime: new Date().toISOString().substring(0, 16),
      category: 'category1'
    };
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid || this.isInvalidDateOrder()) {
      return; // Prevent saving if form is invalid or dates are out of order
    }

    const startDateTime = new Date(this.form.value.startDateTime);
    const endDateTime = new Date(this.form.value.endDateTime);
    const color = this.getCategoryColor(this.form.value.category);

    const newEvent = {
      ...this.form.value,
      start: startDateTime,
      end: endDateTime,
      color: color
    };

    this.dialogRef.close({ event: newEvent, isEditMode: this.isEditMode });
  }

  onDeleteClick(): void {
    this.dialogRef.close({ delete: true, event: this.event });
  }

  getCategoryColor(category: string): any {
    switch (category) {
      case 'category1':
        return { primary: '#1e90ff', secondary: '#D1E8FF' };
      case 'category2':
        return { primary: '#32CD32', secondary: '#C3FDB8' };
      case 'category3':
        return { primary: '#FFA500', secondary: '#FFE4B5' };
      default:
        return { primary: '#1e90ff', secondary: '#D1E8FF' };
    }
  }

  isInvalidDateOrder(): boolean {
    const startDateTime = new Date(this.form.value.startDateTime);
    const endDateTime = new Date(this.form.value.endDateTime);
    return startDateTime >= endDateTime;
  }
}
