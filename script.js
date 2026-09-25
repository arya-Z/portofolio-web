// --- OPTIMASI SPOTLIGHT ---
const spotlight = document.querySelector('.cursor-spotlight');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice && spotlight) {
  spotlight.style.display = 'none';
} else {
  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }
  });
}

// --- LIGHTWEIGHT CANVAS BACKGROUND ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = window.innerWidth < 768 ? 12 : 30;

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();

window.addEventListener('resize', () => {
  setCanvasSize();
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }

  draw() {
    ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function connectParticles() {
  let maxDistance = 100;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        let opacity = 1 - (distance / maxDistance);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.15})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  if (window.innerWidth > 768) {
    connectParticles();
  }
  requestAnimationFrame(animate);
}
animate();

// --- TYPING EFFECT ---
const typingText = document.querySelector('.typing-text');
const roles = [
  'Professional Data Entry & Admin Specialist',
  'Microsoft Excel & Data Reporting Expert',
  'Software & Database Engineering Student',
  'Office Automation & Management Support'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typingText) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(type, 2200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 20 : 50);
  }
}
document.addEventListener('DOMContentLoaded', type);

// --- SCROLL REVEAL & NAV ACTIVE ---
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const navLinksList = document.querySelectorAll('.nav-links a');

function onScrollHandler() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      element.classList.add('active');
    }
  });

  let currentSection = '';
  document.querySelectorAll('section').forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 120) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinksList.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScrollHandler);
window.addEventListener('load', onScrollHandler);

// --- MOBILE MENU ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

navLinksList.forEach((link) => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// --- PROJECT FILTERING ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- IMAGE MODAL PREVIEW ---
function openModal(imgSrc, captionText) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const caption = document.getElementById('modalCaption');
  
  modal.style.display = 'block';
  modalImg.src = imgSrc;
  caption.textContent = captionText;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// --- QUICK COPY EMAIL ---
function copyEmail() {
  const emailText = document.getElementById('emailText').textContent;
  navigator.clipboard.writeText(emailText).then(() => {
    const toast = document.getElementById('toastNotification');
    toast.className = 'toast show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
  });
}

// --- AJAX CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    formStatus.style.color = 'var(--accent-cyan)';
    formStatus.textContent = 'Mengirim tawaran pekerjaan...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.style.color = '#10b981';
        formStatus.textContent = 'Tawaran pekerjaan berhasil dikirim!';
        contactForm.reset();
      } else {
        formStatus.style.color = '#f59e0b';
        formStatus.textContent = 'Terhubung! Anda juga bisa mengirim email langsung.';
      }
    } catch (error) {
      formStatus.style.color = '#f59e0b';
      formStatus.textContent = 'Pesan terkirim atau hubungi langsung via email.';
    }
  });
}