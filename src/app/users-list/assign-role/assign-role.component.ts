import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/api';
import { UserRoles } from 'src/app/enums';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  roles = UserRoles.Types;
  control: FormControl;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserDto
  ) { }

  ngOnInit(): void {
    const role = !this.user
      ? 0
      : this.user.role;

    this.control = this.formBuilder
      .control({value: role, disabled: false});
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
