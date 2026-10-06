export class Dashboard {
  constructor(container, onLaunchTeleconsultation) {
    this.container = container;
    this.onLaunchTeleconsultation = onLaunchTeleconsultation;
  }

  render(appointments) {
    this.container.innerHTML = '';

    const view = document.createElement('div');
    view.className = 'dashboard-view';

    view.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2>Patient Care Dashboard</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Manage your active bookings, teleconsultations, and medical records.</p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <span style="background:var(--primary-50); color:var(--primary-700); font-weight:700; font-size:0.825rem; padding:0.4rem 0.85rem; border-radius:var(--radius-full);">
            <i class="fa-solid fa-user-shield"></i> HIPAA Compliant Patient Portal
          </span>
        </div>
      </div>

      <div class="dash-stats">
        <div class="stat-card">
          <h6>Upcoming Visits</h6>
          <p>${appointments.length}</p>
        </div>
        <div class="stat-card">
          <h6>Past Consultations</h6>
          <p>4</p>
        </div>
        <div class="stat-card">
          <h6>Active Prescriptions</h6>
          <p>2</p>
        </div>
        <div class="stat-card">
          <h6>Saved Specialists</h6>
          <p>3</p>
        </div>
      </div>

      <div>
        <h3 style="font-size:1.15rem; margin-bottom:1rem;">Your Scheduled Appointments</h3>
        ${appointments.length === 0 ? `
          <div style="text-align:center; padding:3rem; background:#f8fafc; border-radius:var(--radius-md);">
            <i class="fa-regular fa-calendar-xmark" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:0.75rem;"></i>
            <h4>No Scheduled Appointments</h4>
            <p style="color:var(--text-muted); font-size:0.875rem;">Use the "Find Care" tab to discover doctors and schedule visits.</p>
          </div>
        ` : `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Doctor & Hospital</th>
                  <th>Specialty</th>
                  <th>Date & Time</th>
                  <th>Mode</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${appointments.map(apt => `
                  <tr>
                    <td>
                      <div style="display:flex; align-items:center; gap:0.75rem;">
                        <img src="${apt.avatar}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;" alt="${apt.doctorName}">
                        <div>
                          <strong style="display:block; font-size:0.9rem;">${apt.doctorName}</strong>
                          <span style="font-size:0.775rem; color:var(--text-muted);">${apt.hospitalName}</span>
                        </div>
                      </div>
                    </td>
                    <td><span style="background:#e0f2fe; color:#0369a1; font-weight:700; font-size:0.75rem; padding:0.2rem 0.5rem; border-radius:4px;">${apt.specialty}</span></td>
                    <td>
                      <strong>${apt.date}</strong><br>
                      <span style="font-size:0.775rem; color:var(--text-muted);">${apt.time}</span>
                    </td>
                    <td>
                      <span style="font-size:0.8rem; font-weight:600; color:${apt.mode.includes('Virtual') ? 'var(--primary-600)' : 'var(--text-main)'};">
                        <i class="fa-solid ${apt.mode.includes('Virtual') ? 'fa-video' : 'fa-building'}"></i> ${apt.mode}
                      </span>
                    </td>
                    <td><strong>${apt.fee}</strong></td>
                    <td>
                      ${apt.mode.includes('Virtual') ? `
                        <button class="btn-sm-book" id="tele-btn-${apt.id}" style="background:var(--accent-indigo); display:flex; align-items:center; gap:0.35rem;">
                          <i class="fa-solid fa-headset"></i> Enter Video Room
                        </button>
                      ` : `
                        <button class="btn-sm-book" style="background:var(--text-muted); cursor:default;">
                          <i class="fa-solid fa-check"></i> Confirmed
                        </button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;

    this.container.appendChild(view);

    // Teleconsultation room buttons
    appointments.forEach(apt => {
      if (apt.mode.includes('Virtual')) {
        const btn = view.querySelector(`#tele-btn-${apt.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            this.onLaunchTeleconsultation(apt);
          });
        }
      }
    });
  }
}
