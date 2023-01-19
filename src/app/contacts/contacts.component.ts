import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddContactRequest, ContactDto, ContactsService, UpdateContactRequest } from '../api';
import { Authenticable } from '../authenticable';
import { UserInfoService } from '../user-info.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from './add-contact/add-contact.component';
import { filter, mergeMap } from 'rxjs';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { ContactTypes } from '../enums';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends Authenticable implements OnInit {

  contacts: ContactDto[];
  dataSource: MatTableDataSource<ContactDto>;
  displayedColumns: string[] = ['name', 'number', 'email', 'type', 'action'];
  contactTypes = ContactTypes.Types;
  
  @ViewChild(MatTable) table: MatTable<ContactDto>;

  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly contactsService: ContactsService 
  ){
    super(userService, router, snackbar);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();

    const bandId: number = this.userInfo.band?.id ?? 0;

    this.contactsService
    .apiContactsListBandIdGet(bandId)
    .subscribe(
      (res: ContactDto[]) => {
        this.contacts = res;
        this.dataSource = new MatTableDataSource(this.contacts);
      },
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    this.dialog.open(AddContactComponent)
    .afterClosed()
    .pipe(
      filter((res: AddContactRequest) => !!res),
      mergeMap((res: AddContactRequest) => {
        res.bandId = this.userInfo.band?.id;
        return this.contactsService
          .apiContactsPost(res);
      }),
    )
    .subscribe(
      (res: ContactDto) => {
        console.log(res);
        this.contacts.push(res);
        this.table.renderRows();
      });
  }

  edit(contact: ContactDto){
    this.dialog.open(AddContactComponent, {
      data: contact
    })
    .afterClosed().pipe(
      filter((res: UpdateContactRequest) => !!res),
      mergeMap((res: UpdateContactRequest) => 
        this.contactsService
        .apiContactsPut(res)
    ))
    .subscribe((res: ContactDto) => {
      this.contacts[this.contacts.findIndex(c => c.id === res.id)] = res;
      this.table.renderRows();
    });
  }

  delete(id: number){
    this.contactsService
    .apiContactsDelete({ contactId: id })
    .subscribe(
      res => {
        this.contacts.splice(this.contacts.findIndex(c => c.id === id), 1);
        this.table.renderRows();
      }
    );
  }

}
