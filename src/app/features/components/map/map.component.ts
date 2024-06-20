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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruckPickup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, FontAwesomeModule],
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

  faIcon = faTruckPickup

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

    /*const icon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
      iconSize: [27, 43],
      iconAnchor: [13, 0]
    })*/

    for (const object of objects) {
      const markerHtmlStyles = `
        position: absolute;
        background-color: white;
        transform: rotate(45deg);
        padding: 1px;
        width: 48px;
        height: 48px;
        margin: -40px 0 0 -15px;
        display: block;
        border-radius: 3rem 3rem 0;
        border: 3px solid #00adef;
      `

      const imgDiv = `
        width: 100%;
        height: 100%;
        transform: rotate(-45deg);
        border-radius: 3rem;
        background-image: url(${object.imgUrl});
        background-size: cover;
      `

      const icon = Leaflet.divIcon({
        iconAnchor: [0, 24],
        html: `
          <div style="${markerHtmlStyles}">
            <div style="${imgDiv}"></div>
          </div>
        `
      })

      const marker = Leaflet.marker(object.coordinates, { icon });
      marker.addTo(this.map).bindTooltip(`<p>${object.title}</p>`).on("click", () => {
        this.store.dispatch(addToTrip({ object }))
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
        this.store.dispatch(setSummary({
          distance: e.routes[0].summary.totalDistance,
          time: e.routes[0].summary.totalTime
        }))
      })
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