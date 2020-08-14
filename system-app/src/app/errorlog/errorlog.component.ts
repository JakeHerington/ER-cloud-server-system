import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-errorlog',
  templateUrl: './errorlog.component.html',
  styleUrls: ['./errorlog.component.css']
})
export class ErrorlogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  displayedColumns = ['Code', 'Time', 'Description'];
  dataSource; // contains table data
  entryList: AngularFireList<any>; // holds data from database to be passed into 'datasource' property 

  constructor(private firebase: AngularFireDatabase) {}

  ngOnInit() {

    // intialise 'datasource parameters'
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

   ngAfterViewInit() {

     // load initial data
    this.loadVehicle1Log();
  }

  loadVehicle1Log() {

    // pull data from firebase
    this.entryList = this.firebase.list('Vehicle1/logEntries');
    this.entryList.query.orderByChild('/timeStamp');

    // load data into 'datasource' property
    this.entryList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        this.dataSource.data = [...this.dataSource.data, element.payload.toJSON()];
      })
    })
  }

  loadVehicle2Log() {

    // pull data from firebase
    this.entryList = this.firebase.list('Vehicle2/logEntries');
    this.entryList.query.orderByChild('/timeStamp');

    // load data into 'datasource' property
    this.entryList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        this.dataSource.data = [...this.dataSource.data, element.payload.toJSON()];
      })
    })
  }
}