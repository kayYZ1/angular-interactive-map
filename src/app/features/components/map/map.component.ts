import * as Leaflet from 'leaflet';
import "leaflet.markercluster";
import { Component, inject } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { customMarker } from './styles';
import { LeafletMarkerClusterModule } from "@bluehalo/ngx-leaflet-markercluster";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, LeafletMarkerClusterModule, FontAwesomeModule],
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

  markerClusterGroup!: Leaflet.MarkerClusterGroup;
  markerClusterData: Leaflet.Marker[] = [];
  markerClusterOptions: Leaflet.MarkerClusterGroupOptions = ({
    disableClusteringAtZoom: 13,
    showCoverageOnHover: false
  })

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
    if (filters.criteria)
      filteredObjects = this.criteriaPipe.transform(Objects, filters.criteria);
    if (filters.searchQuery)
      filteredObjects = this.searchPipe.transform(Objects, filters.searchQuery);
    this.updateMarkers(filteredObjects);
  }

  updateMarkers(objects: IObject[]) {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    for (const object of objects) {
      const imgDiv = `
        width: 90%;
        height: 90%;
        transform: rotate(-45deg);
        border-radius: 3rem;
        background-image: url(${object.imgUrl});
        background-size: cover;
        border: 2px solid #fff;
      `;

      const icon = Leaflet.divIcon({
        html: `
          <div style="${customMarker}">
            <div style="${imgDiv}"></div>
          </div>
        `,
      });

      const marker = Leaflet.marker(object.coordinates, { icon });
      marker
        .on('click', () => {
          this.store.dispatch(addToTrip({ object }));
        })
        .bindTooltip(`<p>${object.title}</p>`)

      this.markers.push(marker);
    }
    this.markerClusterData = this.markers;
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);

    this.updateMarkers(this.objects);
  }

  markerClusterReady(group: Leaflet.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  mapRoute() {
    if (this.routingControl) {
      this.waypoints = this.route.map((coordinates) =>
        Leaflet.latLng(coordinates)
      );
      this.routingControl.setWaypoints(this.waypoints);
      this.routingControl.on('routesfound', (e) => {
        this.store.dispatch(
          setSummary({
            distance: e.routes[0].summary.totalDistance,
            time: e.routes[0].summary.totalTime,
          })
        );
      });
    } else {
      this.routingControl = Leaflet.Routing.control({
        waypoints: this.waypoints,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: '#00adef', opacity: 0.9, weight: 3 }],
          extendToWaypoints: true,
          addWaypoints: false,
          missingRouteTolerance: 1,
        },
      });

      this.routingControl.addTo(this.map);
      this.routingControl.hide();
    }
  }
}
