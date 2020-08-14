import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ErrorlogComponent } from '../errorlog/errorlog.component';

@Component({
  providers: [ErrorlogComponent, MapComponent],
  selector: 'app-menubar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  // ViewChild used to call functions from child components
  @ViewChild("MapComponent") mapComponent: MapComponent;
  @ViewChild("ErrorlogComponent") errorlogComponent: ErrorlogComponent;

  constructor(private mapcomp: MapComponent, private errorcomp: ErrorlogComponent) { }

  ngOnInit() {}

  /* vehicleData functions not working as intended */

  // function for 'Vehicle 1' button click
  public vehicle1Data() {
    this.mapcomp.loadVehicle1Coordinates();
    this.errorcomp.loadVehicle1Log();
  }

  // function for 'Vehicle 2' button click
  public vehicle2Data() {
    this.mapcomp.loadVehicle2Coordinates();
    this.errorcomp.loadVehicle2Log();
  }
}
