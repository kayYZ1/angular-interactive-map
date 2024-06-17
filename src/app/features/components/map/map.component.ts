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
import { CriteriaFilterPipe } from '../../../core/pipes/criteria-filter.pipe';
import { SearchFilterPipe } from '../../../core/pipes/search-filter.pipe';
import { addToTrip, setSummary } from '../../../core/store/trip/trip.actions';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  providers: [CriteriaFilterPipe, SearchFilterPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private readonly store = inject(Store);
  private criteriaPipe = inject(CriteriaFilterPipe);
  private searchPipe = inject(SearchFilterPipe);

  route$ = this.store.select(selectRoute);
  filters$ = this.store.select(selectFilters);

  objects: IObject[] = Objects;
  route: [number, number][] = [];
  filters!: IFilters;

  routingControl!: Leaflet.Routing.Control;
  map!: Leaflet.Map;
  waypoints: Leaflet.LatLng[] = [];
  markers: Leaflet.Marker[] = [];

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    maxZoom: 18,
    minZoom: 8,
    zoom: 14,
    zoomControl: false,
    center: { lat: 50.6667, lng: 17.91 },
  };

  ngAfterViewInit() {
    this.filters$.subscribe((data) => {
      this.filters = data;
      this.setFilteredData(this.filters);
    });

    this.route$.subscribe((data) => {
      this.route = data;
      this.mapRoute();
    });
  }

  setFilteredData(filters: IFilters) {
    let filteredObjects: IObject[] = [];
    if (filters.criteria) filteredObjects = this.criteriaPipe.transform(Objects, filters.criteria);
    if (filters.searchQuery) filteredObjects = this.searchPipe.transform(Objects, filters.searchQuery);
    this.updateMarkers(filteredObjects);
  }

  updateMarkers(objects: IObject[]) {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    const icon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
    });

    for (const o of objects) {
      const marker = Leaflet.marker(o.coordinates, { icon });
      marker.addTo(this.map).bindTooltip(`<p>${o.title}</p>`).on("click", () => {
        this.store.dispatch(addToTrip({ object: o }))
      });
      this.markers.push(marker);
    }
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);
    this.updateMarkers(this.objects);
  }

  mapRoute() {
    if (this.routingControl) {
      this.waypoints = this.route.map((coordinates) =>
        Leaflet.latLng(coordinates)
      );
      this.routingControl.setWaypoints(this.waypoints);
      this.routingControl.on("routesfound", (e) => {
        const distance = e.routes[0].summary.totalDistance;
        const time = e.routes[0].summary.totalTime;
        this.store.dispatch(setSummary({ distance, time }))
      })
    } else {
      this.routingControl = Leaflet.Routing.control({
        waypoints: this.waypoints,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: '#00adef', weight: 3 }],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
        waypointMode: 'connect',
      });

      this.routingControl.addTo(this.map);
      this.routingControl.hide();
    }
  }
}
