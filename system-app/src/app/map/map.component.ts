import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {
  
  zoom: number;
  lat: number; // map + vehicle marker latitude coordinate
  lng: number; // map + vehicle marker longitutde coordinate
  mapTypeId: 'roadmap'|'hybrid'|'satellite'|'terrain'|string = 'satellite';

  entryList: AngularFireList<any>; // holds data from database to be passed into 'paths' array
  paths: Array<LatLngLiteral> = []; // container holding latitude and longitude coordinates to draw map boundary polygon

  constructor(private firebase: AngularFireDatabase) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // load initial data
    this.loadVehicle2Coordinates();
  }

  public loadVehicle1Coordinates() {

    // set 'lat' value
    this.firebase.object('Vehicle1/mapEntries/vehicleMarker/lat').snapshotChanges().subscribe(data => {
      this.lat = Number.parseFloat(data.payload.toJSON() as string);
    });
  
    // set 'lng' value
    this.firebase.object('Vehicle1/mapEntries/vehicleMarker/lng').snapshotChanges().subscribe(data => {
      this.lng = Number.parseFloat(data.payload.toJSON() as string);
    });
   
    // pull data from firebase
    this.entryList = this.firebase.list('Vehicle1/mapEntries/boundaryMarkers');

    // load data into 'paths' array
    this.entryList.snapshotChanges().subscribe(item => {
      item.forEach(element => {         
        this.paths = [...this.paths,element.payload.toJSON() as LatLngLiteral];          
      })
    })
    // adjust map zoom
    this.zoom = 10;
  }

  public loadVehicle2Coordinates() {

    // set 'lat' value
    this.firebase.object('Vehicle2/mapEntries/vehicleMarker/lat').snapshotChanges().subscribe(data => {
      this.lat = Number.parseFloat(data.payload.toJSON() as string);
    });
      
    // set 'lng' value
    this.firebase.object('Vehicle2/mapEntries/vehicleMarker/lng').snapshotChanges().subscribe(data => {
      this.lng = Number.parseFloat(data.payload.toJSON() as string);
    });

    // pull boundary markers from firebase
    this.entryList = this.firebase.list('Vehicle2/mapEntries/boundaryMarkers');

    // load markers into 'paths' array
    this.entryList.snapshotChanges().subscribe(item => {
      item.forEach(element => {         
        this.paths = [...this.paths,element.payload.toJSON() as LatLngLiteral];          
      })
    })

    // adjust map zoom
    this.zoom = 15;
  }
}
