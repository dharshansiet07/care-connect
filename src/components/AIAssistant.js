export class AIAssistant {
  constructor(onBookDoctor, getHospitals) {
    this.onBookDoctor = onBookDoctor;
    this.getHospitals = getHospitals;
    this.isOpen = false;
  }

  init() {
    let trigger = document.getElementById('ai-trigger-btn');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.id = 'ai-trigger-btn';
      trigger.className = 'ai-trigger';
      trigger.innerHTML = `
        <i class="fa-solid fa-robot"></i>
        <span>AI Care Assistant</span>
        <div class="ai-pulse"></div>
      `;
      document.body.appendChild(trigger);
    }

    let chatBox = document.getElementById('ai-chat-box');
    if (!chatBox) {
      chatBox = document.createElement('div');
      chatBox.id = 'ai-chat-box';
      chatBox.className = 'ai-chat-box';
      chatBox.innerHTML = `
        <div class="ai-chat-header">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <i class="fa-solid fa-user-nurse" style="font-size:1.2rem; color:#2dd4bf;"></i>
            <div>
              <h4 style="font-size:0.95rem; color:white; font-weight:800; margin:0;">CareConnect Health AI</h4>
              <span style="font-size:0.7rem; color:#94a3b8;">Smart Triage & Doctor Search</span>
            </div>
          </div>
          <button id="close-ai-chat" style="background:transparent; color:white; font-size:1rem; border:none; cursor:pointer;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="ai-messages" id="ai-msg-list">
          <div class="msg ai">
            👋 Hello! I am your <strong>CareConnect Medical AI Assistant</strong>.<br><br>
            Ask me anything about symptoms, specialist doctors, hospital locations, or appointment booking.<br>
            <em style="font-size:0.75rem; color:#64748b; display:block; margin-top:0.3rem;">Disclaimer: AI guidance is for informational triage and does not replace emergency diagnosis.</em>
          </div>
          
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.25rem;">
            <button class="quick-ai-btn" data-query="chest pain" style="font-size:0.75rem; padding:0.3rem 0.6rem; border-radius:12px; background:#fecdd3; color:#9f1239; border:none; font-weight:600; cursor:pointer;">🚨 Chest pain</button>
            <button class="quick-ai-btn" data-query="best cardiologist" style="font-size:0.75rem; padding:0.3rem 0.6rem; border-radius:12px; background:#e0f2fe; color:#0369a1; border:none; font-weight:600; cursor:pointer;">❤️ Cardiologist Doctor</button>
            <button class="quick-ai-btn" data-query="emergency number" style="font-size:0.75rem; padding:0.3rem 0.6rem; border-radius:12px; background:#fef3c7; color:#92400e; border:none; font-weight:600; cursor:pointer;">🚑 Emergency Ambulance</button>
            <button class="quick-ai-btn" data-query="knee joint pain" style="font-size:0.75rem; padding:0.3rem 0.6rem; border-radius:12px; background:#f3e8ff; color:#6b21a8; border:none; font-weight:600; cursor:pointer;">🦴 Knee / Orthopedics</button>
          </div>
        </div>

        <div class="ai-input-area">
          <input type="text" id="ai-user-input" placeholder="Ask about symptoms, doctors or hospitals...">
          <button class="btn-primary" id="ai-send-btn" style="padding:0.5rem 0.85rem; border-radius:var(--radius-full);">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      `;
      document.body.appendChild(chatBox);
    }

    // Toggle Chat Visibility
    trigger.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      chatBox.classList.toggle('open', this.isOpen);
    });

    chatBox.querySelector('#close-ai-chat').addEventListener('click', () => {
      this.isOpen = false;
      chatBox.classList.remove('open');
    });

    const sendBtn = chatBox.querySelector('#ai-send-btn');
    const input = chatBox.querySelector('#ai-user-input');

    const handleSend = () => {
      const text = input.value.trim();
      if (!text) return;
      this.appendUserMessage(text);
      input.value = '';
      this.processAIResponse(text);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    chatBox.querySelectorAll('.quick-ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const q = e.currentTarget.dataset.query;
        this.appendUserMessage(q);
        this.processAIResponse(q);
      });
    });
  }

  appendUserMessage(text) {
    const list = document.getElementById('ai-msg-list');
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    list.appendChild(userMsg);
    list.scrollTop = list.scrollHeight;
  }

  processAIResponse(query) {
    const list = document.getElementById('ai-msg-list');
    const qLower = query.toLowerCase();

    // Show Typing Indicator
    const typing = document.createElement('div');
    typing.className = 'msg ai';
    typing.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing medical knowledge base & available doctors...';
    list.appendChild(typing);
    list.scrollTop = list.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const aiMsg = document.createElement('div');
      aiMsg.className = 'msg ai';

      const responseObj = this.generateIntelligentResponse(qLower);
      aiMsg.innerHTML = responseObj.html;

      list.appendChild(aiMsg);
      list.scrollTop = list.scrollHeight;

      // Attach dynamic doctor booking event listeners if any doctor card was generated
      if (responseObj.doctors && responseObj.doctors.length > 0) {
        responseObj.doctors.forEach(({ doctor, hospital }) => {
          const btn = aiMsg.querySelector(`#ai-book-${doctor.id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              if (this.onBookDoctor) {
                this.onBookDoctor(doctor, hospital);
              }
            });
          }
        });
      }
    }, 600);
  }

  generateIntelligentResponse(qLower) {
    const hospitals = typeof this.getHospitals === 'function' ? this.getHospitals() : [];

    // Helper: Find doctors by specialty or doctor name
    const findMatchingDoctors = (specId, nameKeyword = '') => {
      let matches = [];
      hospitals.forEach(hosp => {
        hosp.doctors.forEach(doc => {
          if (specId && doc.specialtyId === specId) {
            matches.push({ doctor: doc, hospital: hosp });
          } else if (nameKeyword && (doc.name.toLowerCase().includes(nameKeyword) || doc.specialty.toLowerCase().includes(nameKeyword))) {
            matches.push({ doctor: doc, hospital: hosp });
          }
        });
      });
      return matches;
    };

    // 1. Emergency / Chest Pain / Heart Attack
    if (qLower.includes('chest') || qLower.includes('heart attack') || qLower.includes('cardiac') || qLower.includes('breathless')) {
      const cardiologists = findMatchingDoctors('cardiology');
      let docsHtml = '';
      if (cardiologists.length > 0) {
        const topDoc = cardiologists[0];
        docsHtml = `
          <div style="margin-top:0.6rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #fca5a5;">
            <div style="font-weight:700; font-size:0.85rem; color:#9f1239;">Recommended Senior Cardiologist:</div>
            <div style="font-size:0.825rem; font-weight:700; color:#0f172a; margin-top:0.2rem;">${topDoc.doctor.name} (${topDoc.doctor.experience})</div>
            <div style="font-size:0.775rem; color:#64748b;"><i class="fa-solid fa-hospital"></i> ${topDoc.hospital.name}</div>
            <button id="ai-book-${topDoc.doctor.id}" style="margin-top:0.4rem; padding:0.4rem 0.8rem; background:#e11d48; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
              <i class="fa-solid fa-calendar-plus"></i> Book Consultation (${topDoc.doctor.fee})
            </button>
          </div>
        `;
      }

      return {
        html: `
          <div style="font-weight:800; font-size:0.8rem; color:#dc2626; margin-bottom:0.3rem;">🚨 URGENT EMERGENCY TRIAGE</div>
          <p style="margin:0; line-height:1.4;">Chest pain, pressure, or shortness of breath requires immediate emergency evaluation. Please call <strong>108 Ambulance</strong> or visit 24/7 ER immediately.</p>
          ${docsHtml}
        `,
        doctors: cardiologists
      };
    }

    // 2. Cardiology / Heart Queries
    if (qLower.includes('cardiol') || qLower.includes('heart') || qLower.includes('subramanian') || qLower.includes('rajesh') || qLower.includes('hegde')) {
      const cardiologists = findMatchingDoctors('cardiology');
      const docsHtml = cardiologists.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.qualification} • ${doctor.experience}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">❤️ Cardiology Specialists Available</div>
          <p style="margin:0; font-size:0.825rem;">Here are top-rated Cardiologists available for consultation:</p>
          ${docsHtml}
        `,
        doctors: cardiologists
      };
    }

    // 3. Neurology / Migraine / Headache / Brain
    if (qLower.includes('headache') || qLower.includes('migraine') || qLower.includes('neuro') || qLower.includes('brain') || qLower.includes('elena') || qLower.includes('meera')) {
      const neurologists = findMatchingDoctors('neurology');
      const docsHtml = neurologists.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.specialty} • ${doctor.experience}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">🧠 Neurology & Migraine Specialists</div>
          <p style="margin:0; font-size:0.825rem;">Persistent headaches or migraines are best evaluated by a certified Neurologist:</p>
          ${docsHtml}
        `,
        doctors: neurologists
      };
    }

    // 4. Pediatrics / Child / Baby / Infant
    if (qLower.includes('child') || qLower.includes('baby') || qLower.includes('pediatr') || qLower.includes('kid') || qLower.includes('vance') || qLower.includes('anitha')) {
      const peds = findMatchingDoctors('pediatrics');
      const docsHtml = peds.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.qualification} • ${doctor.experience}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">👶 Pediatric & Child Care Specialists</div>
          <p style="margin:0; font-size:0.825rem;">Here are recommended pediatricians for newborn care, childhood fever, and vaccinations:</p>
          ${docsHtml}
        `,
        doctors: peds
      };
    }

    // 5. Orthopedics / Bone / Knee / Joint / Fracture
    if (qLower.includes('bone') || qLower.includes('knee') || qLower.includes('joint') || qLower.includes('ortho') || qLower.includes('fracture') || qLower.includes('thorne') || qLower.includes('balaji')) {
      const orthos = findMatchingDoctors('orthopedics');
      const docsHtml = orthos.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.specialty} • ${doctor.qualification}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">🦴 Orthopedic & Joint Care Specialists</div>
          <p style="margin:0; font-size:0.825rem;">Joint pain, knee swelling, or sports injuries can be evaluated by these specialists:</p>
          ${docsHtml}
        `,
        doctors: orthos
      };
    }

    // 6. Dermatology / Skin / Rash / Allergy / Acne
    if (qLower.includes('skin') || qLower.includes('rash') || qLower.includes('dermat') || qLower.includes('acne') || qLower.includes('itch') || qLower.includes('bennett') || qLower.includes('sneha')) {
      const derms = findMatchingDoctors('dermatology');
      const docsHtml = derms.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.qualification} • ${doctor.experience}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">🧪 Dermatology & Skin Care Specialists</div>
          <p style="margin:0; font-size:0.825rem;">For skin rashes, allergies, or cosmetic consultations, visit these dermatologists:</p>
          ${docsHtml}
        `,
        doctors: derms
      };
    }

    // 7. General Medicine / Fever / Cold / Cough / Infection
    if (qLower.includes('fever') || qLower.includes('cold') || qLower.includes('cough') || qLower.includes('general') || qLower.includes('priya') || qLower.includes('chang')) {
      const gens = findMatchingDoctors('general');
      const docsHtml = gens.map(({ doctor, hospital }) => `
        <div style="margin-top:0.5rem; padding:0.6rem; background:white; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="font-weight:700; font-size:0.85rem; color:#0f766e;">${doctor.name}</div>
          <div style="font-size:0.775rem; color:#475569;">${doctor.qualification} • ${doctor.experience}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;"><i class="fa-solid fa-hospital"></i> ${hospital.name}</div>
          <button id="ai-book-${doctor.id}" style="margin-top:0.4rem; padding:0.35rem 0.75rem; background:#0d9488; color:white; border:none; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer;">
            Book Appointment (${doctor.fee})
          </button>
        </div>
      `).join('');

      return {
        html: `
          <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">🩺 General Medicine Physicians</div>
          <p style="margin:0; font-size:0.825rem;">For fevers, viral infections, or routine checkups, consult these internal medicine doctors:</p>
          ${docsHtml}
        `,
        doctors: gens
      };
    }

    // 8. Emergency Phone Numbers / Ambulance
    if (qLower.includes('emergency') || qLower.includes('ambulance') || qLower.includes('number') || qLower.includes('phone') || qLower.includes('call')) {
      return {
        html: `
          <div style="font-weight:800; font-size:0.8rem; color:#ef4444; margin-bottom:0.3rem;">🚑 24/7 Emergency Medical Dispatch</div>
          <p style="margin:0; font-size:0.825rem;">In case of an urgent emergency or trauma:</p>
          <ul style="margin:0.4rem 0; padding-left:1.2rem; font-size:0.8rem;">
            <li><strong>Emergency Ambulance:</strong> Call 108 / 911</li>
            <li><strong>KMCH 24/7 Trauma Hotline:</strong> +91 422 432 3800</li>
            <li><strong>Apollo Chennai Emergency:</strong> +91 44 2829 0200</li>
          </ul>
        `,
        doctors: []
      };
    }

    // 9. Intelligent General Fallback
    return {
      html: `
        <div style="font-weight:700; font-size:0.8rem; color:#0d9488; margin-bottom:0.3rem;">ℹ️ CareConnect AI Guidance</div>
        <p style="margin:0; font-size:0.825rem;">I can assist you with finding specialist doctors, scheduling appointments, or checking hospital locations.</p>
        <p style="margin-top:0.3rem; font-size:0.8rem; color:#64748b;">Try asking about: <em>"Cardiologist in Coimbatore"</em>, <em>"Neurologist"</em>, <em>"Knee pain doctor"</em>, or <em>"Emergency ambulance number"</em>.</p>
      `,
      doctors: []
    };
  }
}

