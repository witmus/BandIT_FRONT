import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GearItemDto } from 'src/app/api';
import { GearTypes } from 'src/app/enums';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  gearTypes = GearTypes.Types;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public item: GearItemDto
  ) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      id: [null],
      name: [null],
      weight: [0],
      gearType: [0],
      band: [null],
      rental: [null],
      service: [null],
      addedTimestamp: [null],
      owner: [null],
    });

    if(!!this.item){
      this.itemForm.setValue(this.item);
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}
