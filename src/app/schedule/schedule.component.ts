import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs';
import { AddEventRequest, ContactDto, ContactsService, EventDto, ScheduleService, UpdateEventRequest } from '../api';
import { Authenticable } from '../authenticable';
import { EventTypes } from '../enums';
import { UserInfoService } from '../user-info.service';
import { AddEventComponent } from './add-event/add-event.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends Authenticable implements OnInit {

  events: EventDto[];
  contacts: ContactDto[];
  dataSource: MatTableDataSource<EventDto>;
  displayedColumns: string[] = ['name', 'start', 'end', 'type', 'contact', 'action'];
  eventTypes = EventTypes.Types;

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;

  @ViewChild(MatTable) table: MatTable<EventDto>;

  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly scheduleService: ScheduleService,
    private readonly contactsService: ContactsService
  ){ super(userService, router, snackbar); }

  ngOnInit(): void {
    this.checkUserLoggedIn();
    
    this.getEvents();
  }

  getEvents(): void {
    const bandId: number = this.userInfo.band?.id ?? 0;

    this.scheduleService
      .apiScheduleListBandIdGet(bandId, this.year, this.month)
      .subscribe(
        (res: EventDto[]) => {
          this.events = res;
          this.dataSource = new MatTableDataSource(this.events);
        },
      )

    this.contactsService
      .apiContactsListBandIdGet(bandId)
      .subscribe(
        (res: ContactDto[]) => {
          this.contacts = res;
        },
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    const dialog = this.dialog.open(AddEventComponent);
    dialog.componentInstance.contacts = this.contacts;

    dialog
    .afterClosed()
    .pipe(
      filter((res: AddEventRequest) => !!res),
      mergeMap((res: AddEventRequest) => {
        res.bandId = this.userInfo.band?.id ?? 0;
        return this.scheduleService
          .apiSchedulePost(res);
      }),
    )
    .subscribe(
      (res: EventDto) => {
        this.events.push(res);
        this.table.renderRows();
      });
  }

  edit(event: EventDto){
    const dialog = this.dialog.open(AddEventComponent, {
      data: event
    });
    dialog.componentInstance.contacts = this.contacts;

    dialog
    .afterClosed().pipe(
      filter((res: UpdateEventRequest) => !!res),
      mergeMap((res: UpdateEventRequest) => 
        this.scheduleService
        .apiSchedulePut(res)
    ))
    .subscribe((res: EventDto) => {
      this.events[this.events.findIndex(e => e.id === res.id)] = res;
      this.table.renderRows();
    });
  }

  delete(id: number){
    this.scheduleService
    .apiScheduleDelete({ eventId: id })
    .subscribe(
      res => {
        this.events.splice(this.events.findIndex(e => e.id === id), 1);
        this.table.renderRows();
      }
    );
  }
}