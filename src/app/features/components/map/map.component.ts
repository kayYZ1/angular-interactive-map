import * as Leaflet from 'leaflet';
import { Component, OnInit, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import { IObject } from '../../../core/ts/interfaces';
import { selectObjects } from '../../../core/store/objects';
import { selectRoute } from '../../../core/store/trip';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private readonly store = inject(Store);

  objectList$ = this.store.select(selectObjects);
  route$ = this.store.select(selectRoute);

  objects: IObject[] = [];
  route: [number, number][] = [];
  page = 1;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  polyline!: Leaflet.Polyline;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 14,
    maxZoom: 20,
    minZoom: 6,
    zoomControl: false,
    center: { lat: 50.6667, lng: 17.91 },
  };

  ngOnInit(): void {
    this.objectList$.subscribe((data) => {
      this.objects = data;
      if (this.map) {
        this.updateMap();
      }
    });

    this.route$.subscribe((data) => {
      this.route = data;
      if (this.map) {
        this.updatePolyline();
      }
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMapFeatures();
  }

  initMapFeatures() {
    this.updateMap();
    this.updatePolyline();
  }

  updateMap() {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);

    for (const o of this.objects) {
      const marker = Leaflet.marker(o.coordinates);
      marker.addTo(this.map).bindPopup(o.title);
      this.markers.push(marker);
    }
  }

  updatePolyline() {
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }

    if (this.route.length > 0) {
      this.polyline = Leaflet.polyline(this.route, { color: 'red' }).addTo(
        this.map
      );
    }
  }
}
