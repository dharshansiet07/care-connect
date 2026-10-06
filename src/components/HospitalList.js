import { specialtiesData } from '../data/mockData.js';

export class HospitalList {
  constructor(container, onBookDoctor, onSelectHospital, currentLocation) {
    this.container = container;
    this.onBookDoctor = onBookDoctor;
    this.onSelectHospital = onSelectHospital;
    this.currentLocation = currentLocation;
    this.activeSpecialty = 'all';
    this.searchQuery = '';
    this.viewMode = 'doctors'; // 'doctors' or 'hospitals'

    this.wrapper = null;
    this.listContentContainer = null;
    this.listHeader = null;
    this.docCountBtn = null;
    this.hospCountBtn = null;
  }

  setCurrentLocation(loc) {
    this.currentLocation = loc;
  }

  render(hospitals) {
    // If container is empty or structure doesn't exist, build initial skeleton once
    if (!this.wrapper || !this.container.contains(this.wrapper)) {
      this.container.innerHTML = '';
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'list-section';

      // Search & Filter Banner
      const banner = document.createElement('div');
      banner.className = 'search-banner';
      banner.innerHTML = `
        <div class="search-title">
          <h2>Find Specialist Doctors & Medical Care</h2>
          <p>Showing available doctors & hospitals in <strong id="current-location-text" style="color:var(--primary-600);">${this.currentLocation ? this.currentLocation.name : 'Your Location'}</strong></p>
        </div>

        <div class="search-inputs">
          <div class="input-group">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="hospital-search-input" placeholder="Search doctor name, specialty (e.g. Cardiology), hospital or area..." value="${this.searchQuery}">
          </div>

          <div class="input-group">
            <i class="fa-solid fa-user-doctor"></i>
            <select id="specialty-select">
              ${specialtiesData.map(s => `<option value="${s.id}" ${this.activeSpecialty === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>

          <button class="btn-primary" id="search-btn">
            <i class="fa-solid fa-filter"></i> Search
          </button>
        </div>

        <!-- View Mode Tabs (Doctors vs Hospitals) -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; flex-wrap:wrap; gap:0.5rem;">
          <div class="filter-pills" style="margin:0;">
            ${specialtiesData.map(s => `
              <button class="pill ${this.activeSpecialty === s.id ? 'active' : ''}" data-specialty="${s.id}">
                <i class="fa-solid ${s.icon}"></i> ${s.name}
              </button>
            `).join('')}
          </div>

          <div style="display:flex; background:var(--gray-100); padding:3px; border-radius:var(--radius-md);">
            <button id="view-mode-doctors" style="padding:0.4rem 0.85rem; border:none; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:700; cursor:pointer;">
              <i class="fa-solid fa-stethoscope"></i> Specialist Doctors <span id="doc-count-badge">(0)</span>
            </button>
            <button id="view-mode-hospitals" style="padding:0.4rem 0.85rem; border:none; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:700; cursor:pointer;">
              <i class="fa-solid fa-hospital"></i> Hospitals <span id="hosp-count-badge">(0)</span>
            </button>
          </div>
        </div>
      `;

      this.wrapper.appendChild(banner);

      // List Header
      this.listHeader = document.createElement('div');
      this.listHeader.className = 'list-header';
      this.wrapper.appendChild(this.listHeader);

      // Container for List Items (Only this container updates during search!)
      this.listContentContainer = document.createElement('div');
      this.listContentContainer.className = 'list-items-body';
      this.wrapper.appendChild(this.listContentContainer);

      this.container.appendChild(this.wrapper);

      // Bind Persistent Event Listeners (Bound ONLY ONCE)
      const searchInput = this.wrapper.querySelector('#hospital-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value;
          this.updateListContent(hospitals);
        });
      }

      const searchBtn = this.wrapper.querySelector('#search-btn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          this.updateListContent(hospitals);
        });
      }

      const specialtySelect = this.wrapper.querySelector('#specialty-select');
      if (specialtySelect) {
        specialtySelect.addEventListener('change', (e) => {
          this.activeSpecialty = e.target.value;
          this.updatePillUI();
          this.updateListContent(hospitals);
        });
      }

      const pills = this.wrapper.querySelectorAll('.pill');
      pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          this.activeSpecialty = e.currentTarget.dataset.specialty;
          const select = this.wrapper.querySelector('#specialty-select');
          if (select) select.value = this.activeSpecialty;
          this.updatePillUI();
          this.updateListContent(hospitals);
        });
      });

      const btnViewDocs = this.wrapper.querySelector('#view-mode-doctors');
      const btnViewHosps = this.wrapper.querySelector('#view-mode-hospitals');
      if (btnViewDocs) {
        btnViewDocs.addEventListener('click', () => {
          this.viewMode = 'doctors';
          this.updateTabUI();
          this.updateListContent(hospitals);
        });
      }
      if (btnViewHosps) {
        btnViewHosps.addEventListener('click', () => {
          this.viewMode = 'hospitals';
          this.updateTabUI();
          this.updateListContent(hospitals);
        });
      }
    }

    // Update location label if changed
    const locText = this.wrapper.querySelector('#current-location-text');
    if (locText) {
      locText.innerText = this.currentLocation ? this.currentLocation.name : 'Your Location';
    }

    this.updateTabUI();
    this.updatePillUI();
    this.updateListContent(hospitals);
  }

  updatePillUI() {
    if (!this.wrapper) return;
    const pills = this.wrapper.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.specialty === this.activeSpecialty);
    });
  }

  updateTabUI() {
    if (!this.wrapper) return;
    const btnDocs = this.wrapper.querySelector('#view-mode-doctors');
    const btnHosps = this.wrapper.querySelector('#view-mode-hospitals');

    if (btnDocs) {
      btnDocs.style.background = this.viewMode === 'doctors' ? 'white' : 'transparent';
      btnDocs.style.color = this.viewMode === 'doctors' ? 'var(--primary-700)' : 'var(--text-muted)';
      btnDocs.style.boxShadow = this.viewMode === 'doctors' ? 'var(--shadow-sm)' : 'none';
    }
    if (btnHosps) {
      btnHosps.style.background = this.viewMode === 'hospitals' ? 'white' : 'transparent';
      btnHosps.style.color = this.viewMode === 'hospitals' ? 'var(--primary-700)' : 'var(--text-muted)';
      btnHosps.style.boxShadow = this.viewMode === 'hospitals' ? 'var(--shadow-sm)' : 'none';
    }
  }

  updateListContent(hospitals) {
    if (!this.listContentContainer) return;
    this.listContentContainer.innerHTML = '';

    const cleanQuery = this.searchQuery.trim().toLowerCase();
    const locId = (this.currentLocation && this.currentLocation.id) ? this.currentLocation.id.toLowerCase() : 'all';

    // Location Filter Logic
    let locationFilteredHospitals = hospitals.filter(hosp => {
      if (locId === 'auto' || locId === 'auto-user' || locId === 'all') return true;
      if (hosp.city) {
        return hosp.city.toLowerCase() === locId;
      }
      return hosp.address.toLowerCase().includes(locId);
    });

    if (locationFilteredHospitals.length === 0) {
      locationFilteredHospitals = hospitals;
    }

    // Search Query & Specialty Filter Logic
    let filteredHospitals = locationFilteredHospitals.filter(hosp => {
      const matchesSearch = !cleanQuery ||
        hosp.name.toLowerCase().includes(cleanQuery) ||
        hosp.type.toLowerCase().includes(cleanQuery) ||
        hosp.address.toLowerCase().includes(cleanQuery) ||
        hosp.doctors.some(d =>
          d.name.toLowerCase().includes(cleanQuery) ||
          d.specialty.toLowerCase().includes(cleanQuery) ||
          d.bio.toLowerCase().includes(cleanQuery) ||
          d.availableSlots.some(s => s.toLowerCase().includes(cleanQuery))
        );

      if (this.activeSpecialty === 'all') return matchesSearch;
      return matchesSearch && hosp.doctors.some(d => d.specialtyId === this.activeSpecialty);
    });

    // Aggregate Doctors
    let allDoctorsList = [];
    filteredHospitals.forEach(hosp => {
      hosp.doctors.forEach(doc => {
        if (this.activeSpecialty === 'all' || doc.specialtyId === this.activeSpecialty) {
          if (!cleanQuery ||
            doc.name.toLowerCase().includes(cleanQuery) ||
            doc.specialty.toLowerCase().includes(cleanQuery) ||
            hosp.name.toLowerCase().includes(cleanQuery) ||
            hosp.address.toLowerCase().includes(cleanQuery)
          ) {
            allDoctorsList.push({ doctor: doc, hospital: hosp });
          }
        }
      });
    });

    // Update Counts
    const docBadge = this.wrapper.querySelector('#doc-count-badge');
    const hospBadge = this.wrapper.querySelector('#hosp-count-badge');
    if (docBadge) docBadge.innerText = `(${allDoctorsList.length})`;
    if (hospBadge) hospBadge.innerText = `(${filteredHospitals.length})`;

    if (this.listHeader) {
      this.listHeader.innerHTML = `
        <h3>${this.viewMode === 'doctors' ? `Available Specialist Doctors (${allDoctorsList.length})` : `Hospitals & Clinics (${filteredHospitals.length})`}</h3>
        <span style="font-size:0.825rem; color:var(--text-muted);">Sorted by rating & availability</span>
      `;
    }

    // Render Content
    if (this.viewMode === 'doctors') {
      if (allDoctorsList.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.style.cssText = 'text-align:center; padding:3rem 1rem; background:white; border-radius:var(--radius-lg); border:1px solid var(--border-color);';
        emptyState.innerHTML = `
          <i class="fa-solid fa-user-doctor" style="font-size:3rem; color:var(--primary-300); margin-bottom:1rem;"></i>
          <h4>No Specialist Doctors Found</h4>
          <p style="color:var(--text-muted); font-size:0.9rem;">Try clearing your search query or selecting "All Specialties".</p>
        `;
        this.listContentContainer.appendChild(emptyState);
      } else {
        allDoctorsList.forEach(({ doctor: doc, hospital: hosp }) => {
          const docCard = document.createElement('div');
          docCard.className = 'facility-card';
          docCard.style.cssText = 'padding:1.25rem; border-left:4px solid var(--primary-600); margin-bottom:1rem;';

          docCard.innerHTML = `
            <div style="display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap;">
              <img src="${doc.avatar}" style="width:75px; height:75px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-500); flex-shrink:0;" alt="${doc.name}">
              
              <div style="flex:1; min-width:220px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; flex-wrap:wrap;">
                  <div>
                    <h4 style="font-size:1.15rem; color:var(--text-main); font-weight:800; margin:0;">${doc.name}</h4>
                    <span style="color:var(--primary-600); font-weight:700; font-size:0.875rem;">${doc.specialty} • ${doc.experience}</span>
                  </div>
                  <div style="display:flex; gap:0.4rem; align-items:center;">
                    <span class="rating-badge">★ ${doc.rating} (${doc.reviews})</span>
                    <span style="font-weight:800; font-size:0.9rem; color:var(--primary-700); background:var(--primary-50); padding:0.25rem 0.6rem; border-radius:var(--radius-sm);">${doc.fee}</span>
                  </div>
                </div>

                <p style="font-size:0.8rem; color:var(--text-muted); margin:0.3rem 0;">
                  <i class="fa-solid fa-graduation-cap"></i> ${doc.qualification}
                </p>

                <div style="margin:0.6rem 0; padding:0.6rem; background:var(--gray-50); border-radius:var(--radius-sm); border:1px solid var(--border-color);">
                  <div style="font-size:0.825rem; font-weight:700; color:var(--text-main);">
                    <i class="fa-solid fa-hospital" style="color:var(--primary-600);"></i> ${hosp.name}
                  </div>
                  <div style="font-size:0.775rem; color:var(--text-muted); margin-top:0.15rem;">
                    <i class="fa-solid fa-location-dot" style="color:var(--primary-600);"></i> ${hosp.address} (${hosp.distance})
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                  <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.775rem; color:var(--success-600); font-weight:700;">
                    <i class="fa-solid fa-clock"></i> Next Slot: ${doc.availableSlots[0] || '10:00 AM'} Today
                  </div>

                  <div style="display:flex; gap:0.5rem;">
                    <button class="btn-secondary" id="focus-map-doc-${doc.id}" style="padding:0.45rem 0.85rem; font-size:0.8rem; font-weight:700; display:flex; align-items:center; gap:0.3rem;">
                      <i class="fa-solid fa-map-location-dot" style="color:var(--primary-600);"></i> Map Location
                    </button>
                    <button class="btn-primary" id="book-doc-${doc.id}" style="padding:0.45rem 1rem; font-size:0.8rem; font-weight:700;">
                      <i class="fa-solid fa-calendar-plus"></i> Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;

          const bookBtn = docCard.querySelector(`#book-doc-${doc.id}`);
          if (bookBtn) {
            bookBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.onBookDoctor(doc, hosp);
            });
          }

          const mapBtn = docCard.querySelector(`#focus-map-doc-${doc.id}`);
          if (mapBtn) {
            mapBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.onSelectHospital(hosp);
            });
          }

          this.listContentContainer.appendChild(docCard);
        });
      }
    } else {
      // Hospitals View Mode
      filteredHospitals.forEach(hosp => {
        const card = document.createElement('div');
        card.className = 'facility-card';
        card.style.cssText = 'margin-bottom:1rem;';

        const relevantDoctors = this.activeSpecialty === 'all'
          ? hosp.doctors
          : hosp.doctors.filter(d => d.specialtyId === this.activeSpecialty);

        card.innerHTML = `
          <div class="facility-top">
            <div class="facility-title-area">
              <span class="facility-type-badge">${hosp.type}</span>
              <h4>${hosp.name}</h4>
              <div class="facility-meta">
                <span><i class="fa-solid fa-location-dot" style="color:var(--primary-600);"></i> ${hosp.address}</span>
                <span><i class="fa-solid fa-route"></i> ${hosp.distance}</span>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.4rem;">
              <span class="rating-badge">★ ${hosp.rating} (${hosp.reviewsCount})</span>
              ${hosp.emergency24x7 ? '<span class="emergency-tag"><i class="fa-solid fa-bolt"></i> 24/7 ER</span>' : ''}
            </div>
          </div>

          <div class="doctors-preview">
            <span style="font-size:0.775rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
              Available Specialists (${relevantDoctors.length})
            </span>
            ${relevantDoctors.map(doc => `
              <div class="doctor-item">
                <div class="doc-info">
                  <img src="${doc.avatar}" class="doc-avatar" alt="${doc.name}">
                  <div class="doc-details">
                    <h5>${doc.name}</h5>
                    <span>${doc.specialty} • ${doc.experience} • ${doc.fee}</span>
                  </div>
                </div>
                <button class="btn-sm-book" id="book-doc-${doc.id}">
                  Book Visit
                </button>
              </div>
            `).join('')}
          </div>
        `;

        relevantDoctors.forEach(doc => {
          const btn = card.querySelector(`#book-doc-${doc.id}`);
          if (btn) {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.onBookDoctor(doc, hosp);
            });
          }
        });

        card.addEventListener('click', () => {
          this.onSelectHospital(hosp);
        });

        this.listContentContainer.appendChild(card);
      });
    }
  }
}


