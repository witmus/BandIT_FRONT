import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs';
import { AddPositionRequest, BudgetPositionDto, BudgetService, EventDto, ScheduleService, UpdatePositionRequest } from '../api';
import { Authenticable } from '../authenticable';
import { PositionTypes } from '../enums';
import { UserInfoService } from '../user-info.service';
import { AddPositionComponent } from './add-position/add-position.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent extends Authenticable implements OnInit {

  positions: BudgetPositionDto[];
  events: EventDto[];
  dataSource: MatTableDataSource<BudgetPositionDto>;
  displayedColumns: string[] = ['name', 'amount', 'date', 'type', 'action'];
  contactTypes = PositionTypes.Types;

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;

  balance: number = 0;
  
  @ViewChild(MatTable) table: MatTable<BudgetPositionDto>;
  
  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly budgetService: BudgetService,
    private readonly scheduleService: ScheduleService
  ){
    super(userService, router, snackbar);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();

    this.getPositions();
  }

  getPositions(): void {
    const bandId: number = this.userInfo.band?.id ?? 0;

    this.budgetService
      .apiBudgetListBandIdGet(bandId, this.year, this.month)
      .subscribe(
        (res: BudgetPositionDto[]) => {
          this.balance = 0;
          res.map((position: BudgetPositionDto) => this.balance += position.amount ?? 0);
          this.positions = res;
          this.dataSource = new MatTableDataSource(this.positions);
        },
      )

    this.scheduleService
      .apiScheduleListBandIdGet(bandId, this.year, this.month)
      .subscribe(
        (res: EventDto[]) => {
          this.events = res;
        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    const dialog = this.dialog.open(AddPositionComponent);
    dialog.componentInstance.events = this.events;
    dialog
    .afterClosed()
    .pipe(
      filter((res: AddPositionRequest) => !!res),
      mergeMap((res: AddPositionRequest) => {
        res.bandId = this.userInfo.band?.id ?? 0;
        return this.budgetService
          .apiBudgetPost(res);
      }),
    )
    .subscribe(
      (res: BudgetPositionDto) => {
          this.positions.push(res);
          this.table.renderRows();
      });
  }

  edit(position: BudgetPositionDto): void {
    const dialog = this.dialog.open(AddPositionComponent, {
      data: position
    })
    dialog.componentInstance.events = this.events;
    dialog
    .afterClosed().pipe(
      filter((res: UpdatePositionRequest) => !!res),
      mergeMap((res: UpdatePositionRequest) => 
        this.budgetService
        .apiBudgetPut(res)
    ))
    .subscribe((res: BudgetPositionDto) => {
      this.positions[this.positions.findIndex(p => p.id === res.id)] = res;
      this.table.renderRows();
    });
  }

  delete(id: number): void {
    this.budgetService
    .apiBudgetDelete({ positionId: id })
    .subscribe(
      res => {
        this.positions.splice(this.positions.findIndex(p => p.id === id), 1);
        this.table.renderRows();
      }
    );
  }

  getReport(): void {
    const bandId: number = this.userInfo.band?.id ?? 0;

    this.budgetService
    .apiBudgetReportGet(bandId, this.year, this.month)
    .subscribe(
      res => {
        FileSaver.saveAs(new Blob([res]), `report_${this.year}_${this.month}.csv`);
      }
    )
  }
}
