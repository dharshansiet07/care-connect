export class DoctorProfileModal {
  constructor(onConfirmBooking) {
    this.onConfirmBooking = onConfirmBooking;
    this.selectedSlot = null;
    this.selectedDate = 'Today';
    this.selectedMode = 'In-Person Visit';
    this.currentDoctor = null;
    this.currentHospital = null;
  }

  open(doctor, hospital) {
    this.currentDoctor = doctor;
    this.currentHospital = hospital;
    this.selectedSlot = doctor.availableSlots[0] || '10:00 AM';

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowStr = tomorrowDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    let modalOverlay = document.getElementById('doctor-modal-overlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'doctor-modal-overlay';
      modalOverlay.className = 'modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="modal-box" style="max-width: 650px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size:1.15rem; color:var(--text-main); font-weight:800;">Book Specialist Appointment</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Select date, available time slot & consultation mode</p>
          </div>
          <button class="close-modal" id="close-doc-modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-body" style="padding: 1.25rem;">
          <!-- Doctor Top Bio -->
          <div class="doc-modal-header" style="background:var(--gray-50); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <img src="${doctor.avatar}" class="doc-modal-img" alt="${doctor.name}">
            <div>
              <h4 style="font-size:1.2rem; color:var(--text-main); font-weight:800; margin:0;">${doctor.name}</h4>
              <p style="color:var(--primary-600); font-weight:700; font-size:0.875rem; margin:0.2rem 0;">
                <i class="fa-solid fa-user-doctor"></i> ${doctor.specialty} • ${doctor.experience}
              </p>
              <p style="color:var(--text-muted); font-size:0.8rem; margin:0;">
                <i class="fa-solid fa-graduation-cap"></i> ${doctor.qualification}
              </p>
              <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap;">
                <span class="rating-badge">★ ${doctor.rating} (${doctor.reviews} Reviews)</span>
                <span style="font-weight:700; font-size:0.875rem; color:var(--primary-700); background:var(--primary-50); padding:0.2rem 0.6rem; border-radius:var(--radius-sm);">
                  Fee: ${doctor.fee}
                </span>
              </div>
            </div>
          </div>

          <!-- Hospital Location Card -->
          <div style="margin: 1rem 0; padding:0.85rem; background:white; border:1px solid var(--primary-100); border-radius:var(--radius-md); border-left:4px solid var(--primary-600);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:0.7rem; font-weight:800; color:var(--primary-600); text-transform:uppercase; letter-spacing:0.5px;">
                  <i class="fa-solid fa-hospital"></i> Hospital Location & Address
                </span>
                <h5 style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin:0.2rem 0;">${hospital.name}</h5>
                <p style="font-size:0.825rem; color:var(--text-muted); margin:0; line-height:1.4;">
                  <i class="fa-solid fa-location-dot" style="color:var(--primary-600);"></i> ${hospital.address}
                </p>
              </div>
              <span style="font-size:0.75rem; font-weight:700; background:var(--gray-100); padding:0.25rem 0.5rem; border-radius:var(--radius-sm); white-space:nowrap;">
                <i class="fa-solid fa-route"></i> ${hospital.distance || 'Nearby'}
              </span>
            </div>
          </div>

          <!-- Select Date -->
          <div style="margin: 1rem 0;">
            <h5 style="font-size:0.875rem; font-weight:700; margin-bottom:0.4rem;">1. Select Appointment Date</h5>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem;">
              <button class="date-btn ${this.selectedDate === 'Today' ? 'selected' : ''}" id="date-today" style="
                padding:0.6rem; border-radius:var(--radius-md); border:1px solid ${this.selectedDate === 'Today' ? 'var(--primary-600)' : 'var(--border-color)'}; font-weight:700; font-size:0.8rem; background:${this.selectedDate === 'Today' ? 'var(--primary-50)' : 'white'}; color:${this.selectedDate === 'Today' ? 'var(--primary-700)' : 'var(--text-main)'}; cursor:pointer;
              ">
                <div>Today</div>
                <div style="font-size:0.7rem; font-weight:500; color:var(--text-muted);">${todayStr}</div>
              </button>

              <button class="date-btn ${this.selectedDate === 'Tomorrow' ? 'selected' : ''}" id="date-tomorrow" style="
                padding:0.6rem; border-radius:var(--radius-md); border:1px solid ${this.selectedDate === 'Tomorrow' ? 'var(--primary-600)' : 'var(--border-color)'}; font-weight:700; font-size:0.8rem; background:${this.selectedDate === 'Tomorrow' ? 'var(--primary-50)' : 'white'}; color:${this.selectedDate === 'Tomorrow' ? 'var(--primary-700)' : 'var(--text-main)'}; cursor:pointer;
              ">
                <div>Tomorrow</div>
                <div style="font-size:0.7rem; font-weight:500; color:var(--text-muted);">${tomorrowStr}</div>
              </button>

              <div style="position:relative;">
                <input type="date" id="custom-date-picker" style="
                  width:100%; height:100%; box-sizing:border-box; padding:0.6rem; border-radius:var(--radius-md); border:1px solid var(--border-color); font-weight:600; font-size:0.8rem; color:var(--text-main); font-family:inherit; cursor:pointer;
                ">
              </div>
            </div>
          </div>

          <!-- Select Consultation Mode -->
          <div style="margin: 1rem 0;">
            <h5 style="font-size:0.875rem; font-weight:700; margin-bottom:0.4rem;">2. Select Consultation Mode</h5>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <button class="mode-btn ${this.selectedMode === 'In-Person Visit' ? 'active' : ''}" id="mode-inperson" style="
                padding:0.7rem; border-radius:var(--radius-md); border:1px solid ${this.selectedMode === 'In-Person Visit' ? 'var(--primary-600)' : 'var(--border-color)'}; font-weight:700; font-size:0.85rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; background:${this.selectedMode === 'In-Person Visit' ? 'var(--primary-50)' : 'white'}; color:${this.selectedMode === 'In-Person Visit' ? 'var(--primary-700)' : 'var(--text-main)'}; cursor:pointer;
              ">
                <i class="fa-solid fa-hospital-user"></i> In-Person Visit
              </button>
              <button class="mode-btn ${this.selectedMode === 'Virtual Teleconsultation' ? 'active' : ''}" id="mode-tele" style="
                padding:0.7rem; border-radius:var(--radius-md); border:1px solid ${this.selectedMode === 'Virtual Teleconsultation' ? 'var(--primary-600)' : 'var(--border-color)'}; font-weight:700; font-size:0.85rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; background:${this.selectedMode === 'Virtual Teleconsultation' ? 'var(--primary-50)' : 'white'}; color:${this.selectedMode === 'Virtual Teleconsultation' ? 'var(--primary-700)' : 'var(--text-main)'}; cursor:pointer;
              ">
                <i class="fa-solid fa-video"></i> Video Consultation
              </button>
            </div>
          </div>

          <!-- Available Time Slots -->
          <div style="margin: 1rem 0;">
            <h5 style="font-size:0.875rem; font-weight:700; margin-bottom:0.4rem;">
              3. Available Time Slots for <span style="color:var(--primary-600);">${this.selectedDate}</span>
            </h5>
            <div class="slot-grid">
              ${doctor.availableSlots.map(slot => `
                <button class="slot-btn ${this.selectedSlot === slot ? 'selected' : ''}" data-slot="${slot}">
                  <i class="fa-regular fa-clock"></i> ${slot}
                </button>
              `).join('')}
            </div>
          </div>

          <button class="btn-primary" id="confirm-booking-btn" style="width:100%; padding:0.95rem; margin-top:0.5rem; font-size:1rem; font-weight:700; display:flex; align-items:center; justify-content:center; gap:0.5rem;">
            <i class="fa-solid fa-calendar-check"></i> Confirm Appointment (${doctor.fee})
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');

    // Attach Event Listeners
    modalOverlay.querySelector('#close-doc-modal').addEventListener('click', () => this.close());

    const btnToday = modalOverlay.querySelector('#date-today');
    const btnTomorrow = modalOverlay.querySelector('#date-tomorrow');
    const datePicker = modalOverlay.querySelector('#custom-date-picker');

    if (btnToday) {
      btnToday.addEventListener('click', () => {
        this.selectedDate = 'Today';
        this.open(doctor, hospital);
      });
    }
    if (btnTomorrow) {
      btnTomorrow.addEventListener('click', () => {
        this.selectedDate = 'Tomorrow';
        this.open(doctor, hospital);
      });
    }
    if (datePicker) {
      datePicker.addEventListener('change', (e) => {
        if (e.target.value) {
          const selected = new Date(e.target.value);
          this.selectedDate = selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          this.open(doctor, hospital);
        }
      });
    }

    const modeInPerson = modalOverlay.querySelector('#mode-inperson');
    const modeTele = modalOverlay.querySelector('#mode-tele');

    if (modeInPerson) {
      modeInPerson.addEventListener('click', () => {
        this.selectedMode = 'In-Person Visit';
        this.open(doctor, hospital);
      });
    }
    if (modeTele) {
      modeTele.addEventListener('click', () => {
        this.selectedMode = 'Virtual Teleconsultation';
        this.open(doctor, hospital);
      });
    }

    const slotBtns = modalOverlay.querySelectorAll('.slot-btn');
    slotBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        slotBtns.forEach(b => b.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        this.selectedSlot = e.currentTarget.dataset.slot;
      });
    });

    modalOverlay.querySelector('#confirm-booking-btn').addEventListener('click', () => {
      const refId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;
      const bookingData = {
        id: refId,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        hospitalName: hospital.name,
        hospitalAddress: hospital.address,
        hospitalLat: hospital.lat,
        hospitalLng: hospital.lng,
        date: this.selectedDate,
        time: this.selectedSlot,
        mode: this.selectedMode,
        status: 'Confirmed',
        statusClass: 'status-confirmed',
        fee: doctor.fee,
        avatar: doctor.avatar
      };
      this.close();
      this.showReceiptModal(bookingData);
      this.onConfirmBooking(bookingData);
    });
  }

  showReceiptModal(apt) {
    let receiptOverlay = document.getElementById('receipt-modal-overlay');
    if (!receiptOverlay) {
      receiptOverlay = document.createElement('div');
      receiptOverlay.id = 'receipt-modal-overlay';
      receiptOverlay.className = 'modal-overlay active';
      document.body.appendChild(receiptOverlay);
    }

    receiptOverlay.innerHTML = `
      <div class="modal-box" style="max-width:520px; text-align:center;">
        <div style="background:var(--success-500); color:white; padding:1.5rem; border-radius:var(--radius-lg) var(--radius-lg) 0 0;">
          <div style="font-size:3rem; margin-bottom:0.4rem;"><i class="fa-solid fa-circle-check"></i></div>
          <h3 style="margin:0; color:white; font-size:1.35rem;">Appointment Confirmed!</h3>
          <p style="margin:0.25rem 0 0 0; font-size:0.85rem; opacity:0.9;">Booking Ref: <strong>${apt.id}</strong></p>
        </div>

        <div class="modal-body" style="padding:1.5rem; text-align:left;">
          <div style="display:flex; align-items:center; gap:1rem; padding-bottom:1rem; border-bottom:1px dashed var(--border-color);">
            <img src="${apt.avatar}" style="width:60px; height:60px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-500);" alt="${apt.doctorName}">
            <div>
              <h4 style="margin:0; font-size:1.1rem; color:var(--text-main);">${apt.doctorName}</h4>
              <span style="color:var(--primary-600); font-weight:700; font-size:0.85rem;">${apt.specialty}</span>
            </div>
          </div>

          <div style="margin: 1.2rem 0; display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.875rem;">
              <i class="fa-solid fa-calendar-day" style="color:var(--primary-600); width:20px;"></i>
              <div><strong>Date & Time:</strong> ${apt.date} at ${apt.time}</div>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.875rem;">
              <i class="fa-solid fa-hospital" style="color:var(--primary-600); width:20px;"></i>
              <div><strong>Hospital:</strong> ${apt.hospitalName}</div>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.875rem;">
              <i class="fa-solid fa-location-dot" style="color:var(--primary-600); width:20px;"></i>
              <div><strong>Address:</strong> ${apt.hospitalAddress}</div>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.875rem;">
              <i class="fa-solid fa-stethoscope" style="color:var(--primary-600); width:20px;"></i>
              <div><strong>Mode:</strong> ${apt.mode} (${apt.fee})</div>
            </div>
          </div>

          <button class="btn-primary" id="close-receipt-btn" style="width:100%; padding:0.85rem; font-weight:700;">
            View My Appointments Dashboard
          </button>
        </div>
      </div>
    `;

    receiptOverlay.querySelector('#close-receipt-btn').addEventListener('click', () => {
      receiptOverlay.remove();
    });
  }

  close() {
    const modalOverlay = document.getElementById('doctor-modal-overlay');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  }
}

