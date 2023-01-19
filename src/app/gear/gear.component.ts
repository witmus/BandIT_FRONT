import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs';
import { AddItemRequest, GearItemDto, GearService, UpdateItemRequest } from '../api';
import { Authenticable } from '../authenticable';
import { GearTypes } from '../enums';
import { UserInfoService } from '../user-info.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.css']
})
export class GearComponent extends Authenticable implements OnInit {

  gearItems: GearItemDto[];
  dataSource: MatTableDataSource<GearItemDto>;
  displayedColumns: string[] = ['name', 'weight', 'type', 'action'];
  gearTypes = GearTypes.Types;

  @ViewChild(MatTable) table: MatTable<GearItemDto>;

  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly gearService: GearService 
  ){
    super(userService, router, snackbar);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();

    const bandId: number = this.userInfo.band?.id ?? 0;

    this.gearService
    .apiGearListBandIdGet(bandId)
    .subscribe(
      (res: GearItemDto[]) => {
        this.gearItems = res;
        this.dataSource = new MatTableDataSource(this.gearItems);
      },
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    this.dialog.open(AddItemComponent)
    .afterClosed()
    .pipe(
      filter((res: AddItemRequest) => !!res),
      mergeMap((res: AddItemRequest) => {
        res.bandId = this.userInfo.band?.id ?? 0;
        return this.gearService
          .apiGearPost(res);
      }),
    )
    .subscribe(
      (res: GearItemDto) => {
        this.gearItems.push(res);
        this.table.renderRows();
      });
  }

  edit(item: GearItemDto){
    this.dialog.open(AddItemComponent, {
      data: item
    })
    .afterClosed().pipe(
      filter((res: UpdateItemRequest) => !!res),
      mergeMap((res: UpdateItemRequest) => 
        this.gearService
        .apiGearPut(res)
    ))
    .subscribe((res: GearItemDto) => {
      this.gearItems[this.gearItems.findIndex(g => g.id === res.id)] = res;
      this.table.renderRows();
    });
  }

  delete(id: number){
    this.gearService
    .apiGearDelete({ itemId: id })
    .subscribe(
      res => {
        this.gearItems.splice(this.gearItems.findIndex(g => g.id === id), 1);
        this.table.renderRows();
      }
    );
  }
}
