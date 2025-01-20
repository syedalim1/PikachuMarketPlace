import React from "react";

function Map() {
  return (
    <div>
      <div id="map"></div>

      <script
        src="https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&callback=initMap&v=weekly&solution_channel=GMP_CCS_simpleclickevents_v2"
        defer
      ></script>
    </div>
  );
}

export default Map;
