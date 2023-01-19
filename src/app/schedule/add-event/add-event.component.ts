import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactDto, EventDto } from 'src/app/api';
import { EventTypes } from 'src/app/enums';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  eventTypes = EventTypes.Types;
  isFormValid: boolean;
  @Input('contacts') contacts: ContactDto[]

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventDto,
  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      id: [null],
      name: [null],
      start: [null],
      end: [null],
      eventType: [null],
      description: [null],
      band: [null],
      addedTimestamp: [null],
      contact: [null]
    });

    if(!!this.event){
      this.eventForm.setValue(this.event);
    }

    console.log(this.contacts);
  }

  cancel(){
    this.dialogRef.close();
  }
}
