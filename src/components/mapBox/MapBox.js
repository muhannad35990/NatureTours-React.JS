import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl";
import { useSelector } from "react-redux";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXVoYW5uYWQzNTk5MCIsImEiOiJja3J5eGJ5aGsxNHB2Mm9uODUzejEwanAxIn0.rzqtpU0RJv8KrLpRCp-ddw";
function MapBox() {
  let mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);

  const tour = useSelector((state) => state.tours.tour);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const bounds = new mapboxgl.LngLatBounds();
    map.current.on("load", () => {
      tour.locations.forEach((loc) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          loc.description
        );
        new mapboxgl.Marker()
          .setLngLat(loc.coordinates)
          .setPopup(popup)
          .addTo(map.current);

        bounds.extend(loc.coordinates);
      });
      map.current.fitBounds(bounds);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("mousemove", function (e) {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });
  });

  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={(el) => (mapContainer.current = el)} />
    </div>
  );
}

export default MapBox;
