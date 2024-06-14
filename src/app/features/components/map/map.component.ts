import * as Leaflet from 'leaflet';
import { Component, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import 'leaflet-routing-machine';
import 'leaflet-defaulticon-compatibility';
import { IObject } from '../../../core/ts/interfaces';
import { selectObjects } from '../../../core/store/objects/objects.selectors';
import { selectRoute } from '../../../core/store/trip/trip.selectors';
import { CriteriaFilterPipe } from '../../../core/pipes/criteria-filter.pipe';
import { Categories } from '../../../core/ts/enums';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, CriteriaFilterPipe],
  providers: [CriteriaFilterPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private readonly store = inject(Store);
  private criteriaPipe = inject(CriteriaFilterPipe)

  objectList$ = this.store.select(selectObjects);
  route$ = this.store.select(selectRoute);

  objects: IObject[] = [];
  route: [number, number][] = [];
  objectsDistance: string[] = [];

  routingControl!: Leaflet.Routing.Control;
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
    });

    this.objects = this.criteriaPipe.transform(this.objects, [Categories.PARKI])
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  updateMap() {
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
      const waypoints: Leaflet.LatLng[] = this.route.map((coordinates) =>
        Leaflet.latLng(coordinates)
      );
      this.routingControl.setWaypoints(waypoints);

      for (let i = 0; i < this.route.length; i++) {
        const distanceInM = this.map.distance(this.route[i], this.route[i + 1]);
        this.objectsDistance.push((distanceInM / 1000).toFixed(2))
      }

    } else {
      this.routingControl = Leaflet.Routing.control({
        waypoints: [],
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
