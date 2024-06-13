import * as Leaflet from 'leaflet';
import { Component, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import "leaflet-routing-machine";
import "leaflet-defaulticon-compatibility";
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
  objectsDistance: string[] = [];
  page = 1;

  map!: Leaflet.Map;
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
    this.objectList$.subscribe((data) => this.objects = data);
    this.updateMap();

    this.route$.subscribe((data) => {
      this.route = data;
      this.mapRoute();
      console.log(this.objectsDistance)
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  updateMap() {
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);

    const icon = new Leaflet.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
    })

    for (const o of this.objects) {
      const marker = Leaflet.marker(o.coordinates, { icon });
      marker.addTo(this.map).bindTooltip(`<p>${o.title}</p>`)
    }
  }

  mapRoute() {
    const waypoints: L.LatLng[] = [];
    this.route.forEach((coordinates) => {
      waypoints.push(Leaflet.latLng(coordinates))
    })

    for (let i = 0; i < this.route.length - 1; i++) {
      const distanceInM = this.map.distance(this.route[i], this.route[i + 1]);
      this.objectsDistance.push((distanceInM / 1000).toFixed(2)) //Fix
    }

    const routeControl = Leaflet.Routing.control({
      waypoints,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#242c81', weight: 2 }],
        extendToWaypoints: false,
        missingRouteTolerance: 1,
      },
      waypointMode: "connect"
    })

    routeControl.addTo(this.map);
    routeControl.hide();
  }
}
