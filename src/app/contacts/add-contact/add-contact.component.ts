import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactDto } from 'src/app/api';
import { ContactTypes } from 'src/app/enums';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  contactTypes = ContactTypes.Types;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: ContactDto
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      id: [null],
      firstName: [null],
      contactType: [0],
      lastName: [null],
      phoneNumber: [null],
      emailAddress: [null],
      description: [null],
      band: [null],
      addedTimestamp: [null]
    });

    if(!!this.contact){
      this.contactForm.setValue(this.contact);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
