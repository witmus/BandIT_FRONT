import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetPositionDto } from 'src/app/api';
import { PositionTypes } from 'src/app/enums';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {
  positionForm: FormGroup;
  positionTypes = PositionTypes.Types;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public position: BudgetPositionDto
  ) { }

  ngOnInit(): void {
    this.positionForm = this.formBuilder.group({
      id: [null],
      name: [null],
      amount: [0],
      date: [null],
      positionType: [null],
      description: [null],
      band: [null],
      addedTimestamp: [null],
      event: [null]
    });

    if(!!this.position){
      this.positionForm.setValue(this.position);
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}
