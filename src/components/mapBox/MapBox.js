import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl";
import { useSelector } from "react-redux";
import { Dropdown, Menu } from "antd";
import AddNewCoordinateModel from "../Models/AddNewCoordinateModel";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXVoYW5uYWQzNTk5MCIsImEiOiJja3J5eGJ5aGsxNHB2Mm9uODUzejEwanAxIn0.rzqtpU0RJv8KrLpRCp-ddw";
function MapBox({ isRightClickEnabled, locations, popLocation }) {
  let mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);
  const [showAddModel, setShowAddModel] = useState(false);
  const tour = useSelector((state) => state.tours.tour);
  const [markers, setMarkers] = useState([]);
  const [popUps, setPopUps] = useState([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        scrollZoom: false,
        // center: [lng, lat],
        // zoom: zoom,
      });
    }
  });
  useEffect(() => {
    const bounds = new mapboxgl.LngLatBounds();

    markers.forEach((marker) => marker.remove());
    popUps.forEach((popup) => popup.remove());
    setMarkers([]);
    setPopUps([]);

    tour.locations.forEach((loc) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(loc.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 30 })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}:  ${loc.description}</p>`)
        .addTo(map.current);

      setMarkers((val) => [...val, marker]);
      setPopUps((val) => [...val, popup]);
      bounds.extend(loc.coordinates);
    });

    map.current.fitBounds(bounds, {
      padding: {
        top: isRightClickEnabled ? 100 : 200,
        bottom: isRightClickEnabled ? 100 : 150,
        left: 100,
        right: 100,
      },
    });
  }, [locations]);
  useEffect(() => {
    if (popLocation) {
      markers.forEach((marker) => marker.remove());
      popUps.forEach((popup) => popup.remove());
      setMarkers([]);
      setPopUps([]);
      const marker = new mapboxgl.Marker()
        .setLngLat(popLocation.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 30 })
        .setLngLat(popLocation.coordinates)
        .setHTML(`<p>Day ${popLocation.day}:  ${popLocation.description}</p>`)
        .addTo(map.current);
      setMarkers((val) => [...val, marker]);
      setPopUps((val) => [...val, popup]);
    }
  }, [popLocation]);
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
  function handleMenuClick(e) {
    setShowAddModel(true);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Add new Trip</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["contextMenu"]}
        disabled={!isRightClickEnabled}
      >
        <div>
          {/* <div className="sidebar-map ">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
          <div ref={(el) => (mapContainer.current = el)} />
        </div>
      </Dropdown>
      <AddNewCoordinateModel
        visible={showAddModel}
        onCancel={() => setShowAddModel(false)}
        lng={lng}
        lat={lat}
      />
    </>
  );
}

export default MapBox;
