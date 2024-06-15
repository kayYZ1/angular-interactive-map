import * as Leaflet from 'leaflet';
import { Component, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import 'leaflet-routing-machine';
import 'leaflet-defaulticon-compatibility';
import { IFilters, IObject } from '../../../core/ts/interfaces';
import { selectRoute } from '../../../core/store/trip/trip.selectors';
import { selectFilters } from '../../../core/store/filters/filters.selectors';
import { Objects } from '../../../core/data/objects';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private readonly store = inject(Store);

  route$ = this.store.select(selectRoute);
  filters$ = this.store.select(selectFilters);

  objects: IObject[] = Objects;
  route: [number, number][] = [];
  filters!: IFilters;

  routingControl!: Leaflet.Routing.Control;
  map!: Leaflet.Map;
  waypoints: Leaflet.LatLng[] = [];

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
    this.filters$.subscribe((data) => {
      this.filters = data;
    });

    this.route$.subscribe((data) => {
      this.route = data;
      this.mapRoute();
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);
    const icon = new Leaflet.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
    });

    for (const o of this.objects) {
      const marker = Leaflet.marker(o.coordinates, { icon });
      marker.addTo(this.map).bindTooltip(`<p>${o.title}</p>`);
    }
  }

  mapRoute() {
    if (this.routingControl) {
      this.waypoints = this.route.map((coordinates) =>
        Leaflet.latLng(coordinates)
      );
      this.routingControl.setWaypoints(this.waypoints);
    } else {
      this.routingControl = Leaflet.Routing.control({
        waypoints: this.waypoints,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: '#242c81', weight: 2 }],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
        waypointMode: 'connect',
      });

      this.routingControl.addTo(this.map);
    }
  }
}
