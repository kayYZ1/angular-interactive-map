
# Interactive trip map - Opole

Opo Trip is a web application that allows users to plan and select single or multiple trips within the city of Opole. The project is built using Angular, providing a smooth and dynamic experience for creating, managing, and customizing trip itineraries. Users can explore points of interest, get trip suggestions, and manage their travel plans efficiently.

## Features

- Trip Planning: Create and plan trips by selecting multiple points of interest in Opole.
- Multiple Trip Management: Manage multiple itineraries in one place.
- Interactive Map: View locations on an interactive map and get route suggestions.
- Customization: Edit your trip details like duration, preferred stops, and more.
- Trip suggestions (ToDo)

## Tech Stack

**Client:** Angular, NgRx, CSS, Leaflet, OpenStreetMap.

**Server:** OSRMv1 server hosted on VPS in a docker container.


## Run Locally

Clone the project

```bash
  https://github.com/kayYZ1/angular-interactive-map.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng s
```


## Environment Variables

It's recommended to add your own OSRMv1 server in the map.component.ts.

For reference: https://hub.docker.com/r/osrm/osrm-backend/

