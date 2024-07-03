import * as Leaflet from "leaflet";

import "leaflet.markercluster";
import 'leaflet-routing-machine';
import 'leaflet-defaulticon-compatibility';

import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { IFilters, IObject, ITripDay } from '@/shared/ts/interfaces';
import { addObjectToTripDay, setSummary } from '@/core/store/trip/trip.actions';
import { customMarker, popupHeader, popupStyle } from './styles';
import { selectActiveTripDay, selectRoute } from '@/core/store/trip/trip.selectors';

import { CriteriaFilterPipe } from '@/core/pipes/criteria-filter.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeafletMarkerClusterModule } from "@bluehalo/ngx-leaflet-markercluster";
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Objects } from '@/core/data/objects';
import { SearchFilterPipe } from '@/core/pipes/search-filter.pipe';
import { Store } from '@ngrx/store';
import { selectFilters } from '@/core/store/filters/filters.selectors';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, LeafletMarkerClusterModule, FontAwesomeModule],
  providers: [CriteriaFilterPipe, SearchFilterPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit {
  private readonly store = inject(Store);
  private criteriaPipe = inject(CriteriaFilterPipe);
  private searchPipe = inject(SearchFilterPipe);

  activeTripDay$ = this.store.select(selectActiveTripDay);
  route$ = this.store.select(selectRoute);
  filters$ = this.store.select(selectFilters);

  objects: IObject[] = Objects;

  activeTripDay!: ITripDay;
  route!: [number, number][];
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

  ngOnInit() {
    this.updateMarkers(this.objects);
  }

  ngAfterViewInit() {
    this.activeTripDay$.subscribe(data => this.activeTripDay = data);

    this.route$.subscribe(data => {
      this.route = data;
      this.mapRoute();
    })

    this.filters$.subscribe((data) => {
      this.filters = data;
      this.clearRoute();
      this.setFilteredData(this.filters);
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

  clearRoute() {
    this.route = [];
    this.mapRoute();
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
        .on("click", () => {
          this.store.dispatch(addObjectToTripDay({ object, id: this.activeTripDay.id }))
        })
        .bindTooltip(`<div style=${popupStyle}>
            <div style=${popupHeader}>
              <b>${object.title}</b>
              <small style='text-transform: uppercase; padding-left: 0.5vw;'>${object.category}</small>
            </div>
            <div>
              <p>${object.email}</p>
              <a href=${object.phone} style='color: #00adef'>${object.phone}</a>
            </div>
          </div>`)

      this.markers.push(marker);
    }
    this.markerClusterData = this.markers;
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  mapRoute() {
    if (this.routingControl) {
      this.waypoints = this.route.map((coordinates) =>
        Leaflet.latLng(coordinates)
      );
      this.routingControl.setWaypoints(this.waypoints);
      this.routingControl.on('routesfound', (e) => {
        const distance = e.routes[0].summary.totalDistance;
        const time = e.routes[0].summary.totalTime;
        this.store.dispatch(
          setSummary({ id: this.activeTripDay.id, distance, time })
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
