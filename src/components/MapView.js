export class MapView {
  constructor(containerId, onSelectHospital, onBookDoctor) {
    this.containerId = containerId;
    this.onSelectHospital = onSelectHospital;
    this.onBookDoctor = onBookDoctor;
    this.map = null;
    this.markers = [];
    this.userMarker = null;
  }

  init(hospitals, centerLat = 11.0507, centerLng = 77.0374, retries = 5) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    if (!window.L) {
      if (retries > 0) {
        setTimeout(() => this.init(hospitals, centerLat, centerLng, retries - 1), 200);
      }
      return;
    }

    // Center map around specified lat/lng (Default: KMCH Coimbatore)
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    if (!this.map) {
      try {
        this.map = L.map(this.containerId, {
          zoomControl: false
        }).setView([centerLat, centerLng], 13);

        // CartoDB Voyager Tile Layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(this.map);

        L.control.zoom({ position: 'topright' }).addTo(this.map);
      } catch (err) {
        console.warn('Map initialization note:', err);
      }
    } else {
      this.map.flyTo([centerLat, centerLng], 13, { duration: 1.2 });
    }

    this.renderMarkers(hospitals);
  }

  renderMarkers(hospitals) {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    // Custom Hospital Map Pin SVG Icon
    const hospitalIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #0d9488, #0f766e);
          border: 3px solid white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.1rem;
          box-shadow: 0 6px 16px rgba(13,148,136,0.45);
          cursor: pointer;
        ">
          <i class="fa-solid fa-hospital"></i>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    hospitals.forEach(hosp => {
      const marker = L.marker([hosp.lat, hosp.lng], { icon: hospitalIcon }).addTo(this.map);

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; width: 240px; padding: 0.35rem;">
          <span style="background:#f0fdfa; color:#0f766e; font-weight:700; font-size:0.7rem; padding:0.15rem 0.5rem; border-radius:12px; display:inline-block; margin-bottom:0.3rem;">
            ${hosp.type}
          </span>
          <h4 style="margin: 0 0 0.3rem 0; font-size: 0.95rem; font-family: 'Outfit', sans-serif; color:#0f172a;">${hosp.name}</h4>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.775rem; color: #64748b;">${hosp.address}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; margin-bottom: 0.6rem;">
            <span style="background: #fffbeb; color: #b45309; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px;">
              ★ ${hosp.rating} (${hosp.reviewsCount})
            </span>
            <span style="color: #0d9488; font-weight: 600;">${hosp.distance}</span>
          </div>
          <button id="popup-btn-${hosp.id}" style="
            width: 100%;
            background: #0d9488;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.775rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(13,148,136,0.3);
          ">View Hospital & Doctors</button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${hosp.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            this.onSelectHospital(hosp);
          });
        }
      });

      this.markers.push(marker);
    });
  }

  setUserLocation(lat, lng) {
    if (!this.map) return;

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    const userIcon = L.divIcon({
      className: 'user-map-pin',
      html: `
        <div style="
          width: 24px; height: 24px;
          background: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.35);
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    this.userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(this.map);
    this.userMarker.bindPopup('<b>📍 You Are Here</b>').openPopup();

    this.map.flyTo([lat, lng], 14, { duration: 1.2 });
  }

  focusHospital(lat, lng) {
    if (this.map) {
      this.map.flyTo([lat, lng], 15, { duration: 1.2 });
    }
  }
}
