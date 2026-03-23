// Default Data Context
const defaultData = {
    hero: {
        name: "Abhijith Surendran",
        title: "Senior QC Data Analyst",
        company: "Numerator India Private Limited",
        subtitle: "Ensuring quality and precision in every project.",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Abhijith+Surendran&backgroundColor=2563eb&textColor=ffffff"
    },
    about: {
        text: "I am a dedicated Senior Data Analyst at Numerator India Private Limited, where I specialize in ensuring the highest standards of data integrity and project deliverables. With a keen eye for detail and a passion for optimizing processes, I strive to drive excellence across all cross-functional teams. Outside of work, I am constantly exploring new methodologies to improve efficiency and maintain top-tier performance."
    },
    workExperience: [
        {
            company: "Numerator India Private Limited - Vadodara, Gujarat",
            role: "Senior QC Data Analyst",
            duration: "June 2021 - Present",
            description: "Handle quality checks, Data validation and analysis, conduct trainings and meetings, maintain process documentation, fulfil SME/QC/Trainer responsibilities, and support Team lead duties when required."
        },
        {
            company: "Numerator India Private Limited - Vadodara, Gujarat",
            role: "Data Classification Associate",
            duration: "September 2020 - June 2021",
            description: "Performed coding of FMCG products for US and Canadian markets on the Numerator platform, classifying items by retailer, usage, store location, price, and consumption."
        },
        {
            company: "FLYdocs India Private Limited - Lufthansa Technic AG - Vadodara, Gujarat",
            role: "Technical Records Engineer",
            duration: "August 2017 - June 2020",
            description: "Reviewed and migrated aircraft documents to the FLYdocs platform, performed large-scale data analysis and compliance audits of maintenance records, managed engine and component documentation, resolved discrepancies with clients, supported aircraft acquisition and lease processes, and utilized multiple aviation audit and records management systems."
        },
        {
            company: "Antonio Academy - Cochin, Kerala",
            role: "IELTS Trainer",
            duration: "February 2014 - September 2014",
            description: "Delivered basic language and accent training along with interpersonal skills development sessions."
        }
    ],
    academics: [
        {
            institution: "University of South Wales, Wales, United Kingdom",
            degree: "M.Sc. Aeronautical Engineering",
            year: "2016"
        },
        {
            institution: "Jawaharlal Collage of Engineering & Technology, Kerala, India",
            degree: "B.Tech Aeronautical Engineering",
            year: "2013"
        }
    ],
    skills: ["ANSYS", "CATIA V5", "SolidWorks", "Google Antigravity", "Power BI", "Kali Linux", "Nmap", "Metasploit", "STREAM", "TRAX", "SQL", "AMOS", "AIRVAULT", "GOASPEN", "MS Office", "Google - Sheets, Slides, Docs", "Technical Records & Manuals", "Communication", "Training & Mentoring", "Communication", "Team Player", "Fast Learner", "Professional", "Polyglot"],
    contact: {
        email: "abhi.suru@gmail.com",
        phone: "+91 81284 86855",
        address: "Ernakulam, Kerala, India",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        resume: "#"
    }
};

let portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || defaultData;
let isAdminMode = false;
const PASSCODE = 'Admin@9895';

// DOM Elements
const adminBtn = document.getElementById('admin-login-btn');
const modal = document.getElementById('passcode-modal');
const closeModal = document.querySelector('.close-modal');
const submitPasscode = document.getElementById('submit-passcode');
const passcodeInput = document.getElementById('passcode-input');
const passcodeError = document.getElementById('passcode-error');
const adminBanner = document.getElementById('admin-banner');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Render Portfolio Function
function renderData() {
    // Hero
    if (!portfolioData.hero.avatar) portfolioData.hero.avatar = defaultData.hero.avatar;
    document.getElementById('hero-name').innerText = portfolioData.hero.name;
    document.getElementById('hero-title').innerText = portfolioData.hero.title;
    document.getElementById('hero-company').innerText = portfolioData.hero.company;
    document.getElementById('hero-subtitle').innerText = portfolioData.hero.subtitle;

    // Avatar picture
    const avatarEl = document.getElementById('about-avatar');
    if (avatarEl && portfolioData.hero.avatar) avatarEl.src = portfolioData.hero.avatar;

    // About
    if (!portfolioData.about) {
        portfolioData.about = defaultData.about;
    }
    const aboutEl = document.getElementById('about-text');
    if (aboutEl) aboutEl.innerText = portfolioData.about.text;

    // Experience
    const expList = document.getElementById('experience-list');
    expList.innerHTML = portfolioData.workExperience.map((exp, index) => `
        <div class="timeline-item">
            <div class="timeline-content">
                ${isAdminMode ? `<button class="delete-btn" onclick="deleteExp(${index})"><i class="fa-solid fa-trash"></i></button>` : ''}
                <div class="timeline-date editable" data-path="workExperience.${index}.duration">${exp.duration}</div>
                <h3 class="editable" data-path="workExperience.${index}.role">${exp.role}</h3>
                <h4 class="editable" style="color:var(--text-secondary); margin-bottom:1rem;" data-path="workExperience.${index}.company">${exp.company}</h4>
                <p class="editable" data-path="workExperience.${index}.description">${exp.description}</p>
            </div>
        </div>
    `).join('');

    // Academics
    const acadList = document.getElementById('academics-list');
    acadList.innerHTML = portfolioData.academics.map((acad, index) => `
        <div class="card">
            ${isAdminMode ? `<button class="delete-btn" onclick="deleteAcad(${index})"><i class="fa-solid fa-trash"></i></button>` : ''}
            <h3 class="card-title editable" data-path="academics.${index}.degree">${acad.degree}</h3>
            <p class="editable" style="color:var(--accent-color); font-weight:bold" data-path="academics.${index}.institution">${acad.institution}</p>
            <span class="editable" style="color:var(--text-secondary); font-size:0.9rem;" data-path="academics.${index}.year">${acad.year}</span>
        </div>
    `).join('');

    // Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = portfolioData.skills.map((skill, index) => `
        <div class="chip">
            <span class="editable" data-path="skills.${index}">${skill}</span>
            ${isAdminMode ? `<i class="fa-solid fa-times" style="cursor:pointer; margin-left:8px;" onclick="deleteSkill(${index})"></i>` : ''}
        </div>
    `).join('');

    // Contact
    document.getElementById('contact-email').innerText = portfolioData.contact.email;
    document.getElementById('contact-phone').innerText = portfolioData.contact.phone || "+91 Enter Phone Number";
    document.getElementById('contact-address').innerText = portfolioData.contact.address || "Enter Your Location";
    document.getElementById('link-linkedin').href = portfolioData.contact.linkedin;
    document.getElementById('link-facebook').href = portfolioData.contact.facebook;
    document.getElementById('link-instagram').href = portfolioData.contact.instagram;

    // Resume Link
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) resumeBtn.href = portfolioData.contact.resume;
    const navResume = document.getElementById('nav-resume-link');
    if (navResume) navResume.href = portfolioData.contact.resume;

    // Contact Admin Fields
    document.querySelector('[data-key="contact.linkedin"]').innerText = portfolioData.contact.linkedin || '';
    document.querySelector('[data-key="contact.facebook"]').innerText = portfolioData.contact.facebook || '';
    document.querySelector('[data-key="contact.instagram"]').innerText = portfolioData.contact.instagram || '';

    if (isAdminMode) enableEditing();
}

// Global functions for inline deletes
window.deleteExp = (index) => { portfolioData.workExperience.splice(index, 1); renderData(); };
window.deleteAcad = (index) => { portfolioData.academics.splice(index, 1); renderData(); };
window.deleteSkill = (index) => { portfolioData.skills.splice(index, 1); renderData(); };

renderData();

// Modal Handlers
adminBtn.addEventListener('click', () => { modal.style.display = 'flex'; passcodeInput.value = ''; passcodeError.style.display = 'none'; });
closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

submitPasscode.addEventListener('click', () => {
    if (passcodeInput.value === PASSCODE) {
        modal.style.display = 'none';
        activateAdminMode();
    } else {
        passcodeError.style.display = 'block';
    }
});

function activateAdminMode() {
    isAdminMode = true;
    adminBanner.style.display = 'flex';
    document.body.style.paddingTop = '60px'; // make room for banner
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'inline-block');
    document.getElementById('social-admin-inputs').style.display = 'block';
    document.getElementById('social-links-display').style.display = 'none';
    renderData();
}

function enableEditing() {
    const editables = document.querySelectorAll('.editable');
    editables.forEach(el => {
        el.contentEditable = true;
        el.classList.add('editing');
    });
}

function disableEditing() {
    isAdminMode = false;
    adminBanner.style.display = 'none';
    document.body.style.paddingTop = '0';
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    document.getElementById('social-admin-inputs').style.display = 'none';
    document.getElementById('social-links-display').style.display = 'flex';

    const editables = document.querySelectorAll('.editable');
    editables.forEach(el => {
        el.contentEditable = false;
        el.classList.remove('editing');
    });
    // Restore data from storage to discard unsaved changes
    portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || defaultData;
    renderData();
}

// Save Changes By Mapping Paths
function setValueByPath(obj, path, value) {
    let parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
}

saveBtn.addEventListener('click', () => {
    const editables = document.querySelectorAll('.editable');
    editables.forEach(el => {
        let path = el.getAttribute('data-path') || el.getAttribute('data-key');
        if (path) {
            setValueByPath(portfolioData, path, el.innerText.trim());
        }
    });

    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    alert('Changes Saved Successfully! (Stored in your browser)');
    disableEditing();
});

cancelBtn.addEventListener('click', disableEditing);

// Add Elements Button Logic
document.getElementById('add-experience-btn').addEventListener('click', () => {
    portfolioData.workExperience.push({ company: "New Company", role: "New Role", duration: "New Date", description: "Description" });
    renderData();
});

document.getElementById('add-academic-btn').addEventListener('click', () => {
    portfolioData.academics.push({ institution: "New Institution", degree: "New Degree", year: "New Year" });
    renderData();
});

document.getElementById('add-skill-btn').addEventListener('click', () => {
    portfolioData.skills.push("New Skill");
    renderData();
});

// File Upload Readers
const avatarInput = document.getElementById('upload-avatar-input');
if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image is too large! Please select an image under 2MB for local storage.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                portfolioData.hero.avatar = event.target.result;
                renderData();
                alert("Profile picture loaded! Click 'Save Changes' to apply.");
            };
            reader.readAsDataURL(file);
        }
    });
}

const resumeInput = document.getElementById('upload-resume-input');
if (resumeInput) {
    resumeInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Resume file is too large! Please select a file under 2MB for local storage.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                portfolioData.contact.resume = event.target.result;
                renderData();
                alert("Resume file loaded! Click 'Save Changes' to apply.");
            };
            reader.readAsDataURL(file);
        }
    });
}

