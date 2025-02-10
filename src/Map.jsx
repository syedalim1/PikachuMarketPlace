import React, { useEffect, useRef, useState } from "react";

function Maps() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const autocompleteInputRef = useRef(null);

  const initMap = (position) => {
    const latitude = position?.coords?.latitude || 37.7749; // Fallback to San Francisco
    const longitude = position?.coords?.longitude || -122.4194; // Fallback to San Francisco
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });
    setMap(mapInstance);

    // Add a marker for the user's location
    const userMarker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: mapInstance,
      title: "Your Location",
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    // Add click event to the map to place new markers
    mapInstance.addListener("click", (event) => {
      addMarker(event.latLng, mapInstance);
    });

    // Initialize Autocomplete
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      { types: ["geocode"] }
    );
    setAutocomplete(autocompleteInstance);

    // Add listener for place selection
    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (!place.geometry) {
        console.error("Place details not found for input: ", place.name);
        return;
      }
      // Pan the map to the selected place
      mapInstance.panTo(place.geometry.location);
      mapInstance.setZoom(15);

      // Add a marker for the selected place
      addMarker(place.geometry.location, mapInstance, place.name);
    });
  };

  const addMarker = (location, mapInstance, title = "New Marker") => {
    const marker = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      title: title,
    });

    // Add an info window to the marker
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<strong>${title}</strong><br>Lat: ${location
        .lat()
        .toFixed(4)}, Lng: ${location.lng().toFixed(4)}`,
    });

    marker.addListener("click", () => {
      infoWindow.open(mapInstance, marker);
    });

    // Save the marker to state
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AlzaSyFffSDJ8dxlabT3aOR5uIH4i76QsM05TpU&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => initMap(position),
          (error) => {
            console.error("Error fetching location: ", error);
            // Fallback to a default location
            initMap({ coords: { latitude: 37.7749, longitude: -122.4194 } });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Fallback to a default location
        initMap({ coords: { latitude: 37.7749, longitude: -122.4194 } });
      }
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Search Box */}
      <div style={{ marginBottom: "10px" }}>
        <input
          ref={autocompleteInputRef}
          type="text"
          placeholder="Search for a location..."
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "500px", borderRadius: "8px" }}
      ></div>
    </div>
  );
}

export default Maps;
