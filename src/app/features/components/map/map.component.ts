import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import * as Leaflet from 'leaflet';
import { Store } from '@ngrx/store';
import { IObject } from '../../../core/ts/interfaces';
import { selectObjects } from '../../../core/store/objects';
import { selectTripRoad } from '../../../core/store/trip';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private readonly store = inject(Store);

  objectList$ = this.store.select(selectObjects);
  tripRoad$ = this.store.select(selectTripRoad)

  objects: IObject[] = [];
  road: [number, number][] = [];
  page = 1;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 14,
    center: { lat: 50.6667, lng: 17.93 }
  }

  ngOnInit(): void {
    this.objectList$.subscribe(data => this.objects = data);
    this.tripRoad$.subscribe(data => this.road = data)
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    this.drawLines();
  }

  initMarkers() {
    for (const o of this.objects) {
      const marker = Leaflet.marker(o.coordinates)
      marker.addTo(this.map).bindPopup(o.title)
      this.markers.push(marker)
    }
  }
  //leaflet routing machine
  drawLines() {
    Leaflet.polyline([[50.673329439288906, 17.926613371482905], [50.66655956910213, 17.922351760468285]], {
      color: 'red'
    }).addTo(this.map)
  }
}