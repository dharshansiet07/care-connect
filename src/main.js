import { renderNavbar } from './components/Navbar.js';
import { MapView } from './components/MapView.js';
import { HospitalList } from './components/HospitalList.js';
import { DoctorProfileModal } from './components/DoctorProfileModal.js';
import { AIAssistant } from './components/AIAssistant.js';
import { Dashboard } from './components/Dashboard.js';
import { hospitalsData, initialAppointments, locationPresets } from './data/mockData.js';

class App {
  constructor() {
    this.currentTab = 'find-care';
    this.hospitals = hospitalsData;
    this.appointments = [...initialAppointments];
    this.selectedHospital = hospitalsData[0];
    this.currentLocation = locationPresets[1]; // Default: Coimbatore, TN (KMCH location)

    this.appContainer = document.getElementById('app');

    this.docModal = new DoctorProfileModal(this.handleConfirmBooking.bind(this));
    this.aiAssistant = new AIAssistant((doc, hosp) => this.docModal.open(doc, hosp), () => this.hospitals);
  }

  init() {
    this.render();
    this.aiAssistant.init();
    
    // Automatically prompt browser geolocation if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.currentLocation = {
            id: 'auto-user',
            name: 'My Current Location',
            lat: latitude,
            lng: longitude
          };
          if (this.mapView) {
            this.mapView.setUserLocation(latitude, longitude);
          }
        },
        (err) => {
          console.log('Using default location: Coimbatore, TN');
        }
      );
    }
  }

  render() {
    this.appContainer.innerHTML = '';

    // Render Navbar
    const nav = renderNavbar(
      this.currentTab,
      this.currentLocation.name,
      this.switchTab.bind(this),
      this.handleSelectLocation.bind(this),
      this.triggerEmergencyModal.bind(this)
    );
    this.appContainer.appendChild(nav);

    // Main Container Frame
    const mainContainer = document.createElement('main');
    mainContainer.className = 'main-container';
    this.appContainer.appendChild(mainContainer);

    if (this.currentTab === 'find-care') {
      this.renderFindCareTab(mainContainer);
    } else {
      this.renderDashboardTab(mainContainer);
    }
  }

  renderFindCareTab(container) {
    const grid = document.createElement('div');
    grid.className = 'content-grid';

    // Left List Container
    const listContainer = document.createElement('div');
    listContainer.id = 'hospital-list-container';

    // Right Map Container
    const mapSection = document.createElement('div');
    mapSection.className = 'map-section';
    mapSection.innerHTML = '<div id="map-container"></div>';

    grid.appendChild(listContainer);
    grid.appendChild(mapSection);
    container.appendChild(grid);

    // Render Hospital Cards & Map
    this.hospitalList = new HospitalList(
      listContainer,
      (doc, hosp) => this.docModal.open(doc, hosp),
      (hosp) => {
        this.selectedHospital = hosp;
        if (this.mapView) this.mapView.focusHospital(hosp.lat, hosp.lng);
      },
      this.currentLocation
    );
    this.hospitalList.render(this.hospitals);

    // Initialize Map View after DOM attachment
    setTimeout(() => {
      this.mapView = new MapView(
        'map-container',
        (hosp) => {
          this.selectedHospital = hosp;
          const targetDoc = hosp.doctors[0];
          if (targetDoc) this.docModal.open(targetDoc, hosp);
        },
        (doc, hosp) => this.docModal.open(doc, hosp)
      );
      this.mapView.init(this.hospitals, this.currentLocation.lat || 11.0507, this.currentLocation.lng || 77.0374);
    }, 100);
  }

  renderDashboardTab(container) {
    const dash = new Dashboard(container, this.launchTeleconsultationRoom.bind(this));
    dash.render(this.appointments);
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    this.render();
  }

  handleSelectLocation(preset) {
    if (preset.id === 'auto') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            this.currentLocation = {
              id: 'auto-user',
              name: 'My Current Location',
              lat: latitude,
              lng: longitude
            };
            this.render();
            if (this.mapView) {
              this.mapView.setUserLocation(latitude, longitude);
            }
          },
          () => {
            this.showToast('Geolocation permission denied. Displaying default location.');
          }
        );
      }
    } else {
      this.currentLocation = preset;
      this.render();
      if (this.mapView && preset.lat && preset.lng) {
        this.mapView.focusHospital(preset.lat, preset.lng);
      }
    }
  }

  handleConfirmBooking(bookingData) {
    this.appointments.unshift(bookingData);
    this.switchTab('dashboard');
    this.showToast(`Success! Your appointment with ${bookingData.doctorName} has been booked for ${bookingData.time}.`);
  }

  handleBookBySpecialty(specialtyId) {
    this.switchTab('find-care');
  }

  triggerEmergencyModal() {
    let overlay = document.getElementById('emergency-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'emergency-modal';
      overlay.className = 'modal-overlay active';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal-box" style="max-width:500px; text-align:center; border:2px solid #ef4444;">
        <div class="modal-header" style="background:#fef2f2;">
          <h3 style="color:#dc2626;"><i class="fa-solid fa-triangle-exclamation"></i> 24/7 Emergency Dispatch</h3>
          <button class="close-modal" onclick="document.getElementById('emergency-modal').remove()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <div style="font-size:3.5rem; color:#dc2626; margin-bottom:1rem;">
            <i class="fa-solid fa-truck-medical"></i>
          </div>
          <h4>Need Urgent Medical Assistance?</h4>
          <p style="color:var(--text-muted); font-size:0.875rem; margin:0.5rem 0 1.5rem 0;">
            If you or someone near you is experiencing a life-threatening medical emergency, call 108 / 911 or dispatch an ambulance immediately.
          </p>
          <a href="tel:108" class="emergency-btn" style="justify-content:center; padding:1rem; font-size:1.1rem;">
            <i class="fa-solid fa-phone"></i> Call 108 Emergency Ambulance
          </a>
          <button onclick="document.getElementById('emergency-modal').remove()" style="margin-top:1rem; background:transparent; color:var(--text-muted); font-size:0.85rem; text-decoration:underline;">
            Dismiss Warning
          </button>
        </div>
      </div>
    `;
  }

  launchTeleconsultationRoom(apt) {
    let teleModal = document.getElementById('tele-modal');
    if (!teleModal) {
      teleModal = document.createElement('div');
      teleModal.id = 'tele-modal';
      teleModal.className = 'modal-overlay active';
      document.body.appendChild(teleModal);
    }

    teleModal.innerHTML = `
      <div class="modal-box" style="max-width:850px; background:#0f172a; color:white;">
        <div class="modal-header" style="border-color:#334155;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="width:10px; height:10px; background:#10b981; border-radius:50%;"></span>
            <h3 style="color:white;">Teleconsultation Room — ${apt.doctorName}</h3>
          </div>
          <button class="close-modal" style="background:#334155; color:white;" onclick="document.getElementById('tele-modal').remove()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body" style="display:grid; grid-template-columns: 2fr 1fr; gap:1rem;">
          <div style="background:#1e293b; border-radius:var(--radius-md); height:380px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;">
            <img src="${apt.avatar}" style="width:100%; height:100%; object-fit:cover; opacity:0.85;" alt="${apt.doctorName}">
            <div style="position:absolute; top:1rem; left:1rem; background:rgba(0,0,0,0.6); padding:0.4rem 0.8rem; border-radius:var(--radius-full); font-size:0.75rem;">
              <i class="fa-solid fa-circle" style="color:#ef4444; font-size:0.6rem;"></i> Live HD • Encrypted
            </div>
            <div style="position:absolute; bottom:1rem; left:50%; transform:translateX(-50%); display:flex; gap:0.75rem;">
              <button style="width:45px; height:45px; border-radius:50%; background:#334155; color:white; font-size:1.1rem;"><i class="fa-solid fa-microphone"></i></button>
              <button style="width:45px; height:45px; border-radius:50%; background:#334155; color:white; font-size:1.1rem;"><i class="fa-solid fa-video"></i></button>
              <button style="width:45px; height:45px; border-radius:50%; background:#ef4444; color:white; font-size:1.1rem;" onclick="document.getElementById('tele-modal').remove()"><i class="fa-solid fa-phone-slash"></i></button>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; background:#1e293b; border-radius:var(--radius-md); padding:1rem; gap:0.75rem;">
            <h5 style="color:white;">Doctor Consultation Chat</h5>
            <div style="flex:1; background:#0f172a; border-radius:var(--radius-sm); padding:0.75rem; font-size:0.8rem; color:#cbd5e1; overflow-y:auto;">
              <div style="margin-bottom:0.5rem;"><strong>${apt.doctorName}:</strong> Hello! I am ready to review your medical history. How are you feeling today?</div>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <input type="text" placeholder="Type a message..." style="flex:1; padding:0.5rem; border-radius:4px; border:none; font-size:0.8rem;">
              <button style="background:var(--primary-600); color:white; padding:0.5rem 0.75rem; border-radius:4px;"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      color: white;
      padding: 0.85rem 1.5rem;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-lg);
      font-weight: 600;
      font-size: 0.875rem;
      z-index: 3000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid var(--primary-500);
      animation: fadeIn 0.3s ease;
    `;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
  }
}

// Bootstrap logic ensuring execution even if DOM is already loaded
function bootstrap() {
  const app = new App();
  app.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
