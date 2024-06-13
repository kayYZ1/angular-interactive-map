import * as Leaflet from 'leaflet';
import { Component, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import "leaflet-routing-machine";
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
export class MapComponent {
  private readonly store = inject(Store);

  objectList$ = this.store.select(selectObjects);
  route$ = this.store.select(selectRoute);

  objects: IObject[] = [];
  route: [number, number][] = [];
  page = 1;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 14,
    zoomControl: false,
    center: { lat: 50.6667, lng: 17.91 },
  };

  ngAfterViewInit(): void {
    this.objectList$.subscribe((data) => {
      this.objects = data;
    });
    this.updateMap();

    this.route$.subscribe((data) => {
      this.route = data;
      this.mapRoute();
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  updateMap() {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);

    for (const o of this.objects) {
      const marker = Leaflet.marker(o.coordinates);
      marker.addTo(this.map).bindTooltip(`<p>${o.title}</p>`)
      this.markers.push(marker);
    }
  }

  mapRoute() {
    const waypoints: L.LatLng[] = [];
    this.route.forEach((coordinates) => waypoints.push(Leaflet.latLng(coordinates[0], coordinates[1])))

    const routeControl = Leaflet.Routing.control({
      waypoints,
      plan: Leaflet.Routing.plan(waypoints, {
        addWaypoints: false,
        draggableWaypoints: false,
      }),
      lineOptions: {
        addWaypoints: false,
        styles: [{ color: '#242c81', weight: 2 }],
        extendToWaypoints: false,
        missingRouteTolerance: 1,
      },
      routeWhileDragging: false,
    })

    routeControl.addTo(this.map);
    routeControl.hide();
  }
}
