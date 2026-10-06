import { locationPresets } from '../data/mockData.js';

export function renderNavbar(currentTab, currentLocationName, onSelectTab, onSelectLocation, onEmergencyClick) {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <div class="brand">
      <div class="brand-icon">
        <i class="fa-solid fa-heart-pulse"></i>
      </div>
      <div class="brand-text">
        <h1>CareConnect</h1>
        <span>Finding & Managing Medical Care</span>
      </div>
    </div>

    <div class="location-picker">
      <i class="fa-solid fa-location-dot"></i>
      <select id="location-preset-select" style="background:transparent; border:none; outline:none; font-weight:700; color:var(--primary-700); font-family:var(--font-body); cursor:pointer;">
        ${locationPresets.map(loc => `
          <option value="${loc.id}" ${currentLocationName.includes(loc.name.split(',')[0]) ? 'selected' : ''}>
            ${loc.name}
          </option>
        `).join('')}
      </select>
    </div>

    <div class="nav-controls">
      <div class="nav-tabs">
        <button class="nav-btn ${currentTab === 'find-care' ? 'active' : ''}" id="tab-find-care">
          <i class="fa-solid fa-compass"></i> Find Care
        </button>
        <button class="nav-btn ${currentTab === 'dashboard' ? 'active' : ''}" id="tab-dashboard">
          <i class="fa-solid fa-calendar-check"></i> My Appointments
        </button>
      </div>

      <button class="emergency-btn" id="btn-emergency">
        <i class="fa-solid fa-phone-volume"></i> 24/7 ER Hotline
      </button>
    </div>
  `;

  // Attach Listeners
  header.querySelector('#tab-find-care').addEventListener('click', () => onSelectTab('find-care'));
  header.querySelector('#tab-dashboard').addEventListener('click', () => onSelectTab('dashboard'));
  header.querySelector('#btn-emergency').addEventListener('click', onEmergencyClick);

  const locationSelect = header.querySelector('#location-preset-select');
  locationSelect.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    const preset = locationPresets.find(l => l.id === selectedId);
    if (preset) {
      onSelectLocation(preset);
    }
  });

  return header;
}
