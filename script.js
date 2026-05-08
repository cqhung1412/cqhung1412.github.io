// ============================================
// FLOATING EMOJIS - Random movement, some FAST
// ============================================
const emojiContainer = document.getElementById('emojiContainer');
const emojis = ['🧋', '🍚', '🍕', '🍔', '🏸', '🎱', '🎮', '🐧', '🧋', '🍚', '🍕', '🎮', '🐧'];
const emojiColors = ['#582CFF', '#BF40FF', '#00F2FF'];
const NUM_EMOJIS = 35;

class FloatingEmoji {
  constructor(container) {
    this.el = document.createElement('span');
    this.el.className = 'floating-emoji';
    this.el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    this.el.style.fontSize = (20 + Math.random() * 40) + 'px';
    this.el.style.opacity = 0.2 + Math.random() * 0.4;

    // Random starting position
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight * 3;

    // Random velocity - some are REALLY fast
    const isFast = Math.random() < 0.25; // 25% chance of being fast
    const speedMultiplier = isFast ? (4 + Math.random() * 8) : (0.3 + Math.random() * 1.5);
    this.vx = (Math.random() - 0.5) * speedMultiplier;
    this.vy = (Math.random() - 0.5) * speedMultiplier;

    // Some have erratic direction changes
    this.isErratic = Math.random() < 0.15;
    this.dirChangeTimer = 0;

    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    container.appendChild(this.el);
  }

  update() {
    // Erratic ones change direction randomly
    if (this.isErratic) {
      this.dirChangeTimer++;
      if (this.dirChangeTimer > 30 + Math.random() * 60) {
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.dirChangeTimer = 0;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x > window.innerWidth + 50) this.x = -50;
    if (this.x < -50) this.x = window.innerWidth + 50;
    if (this.y > window.innerHeight * 3 + 50) this.y = -50;
    if (this.y < -50) this.y = window.innerHeight * 3 + 50;

    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}

const floatingEmojis = [];
for (let i = 0; i < NUM_EMOJIS; i++) {
  floatingEmojis.push(new FloatingEmoji(emojiContainer));
}

function animateEmojis() {
  floatingEmojis.forEach(e => e.update());
  requestAnimationFrame(animateEmojis);
}
animateEmojis();

// ============================================
// HERO NAME ANIMATION - Multiple effects cycling
// ============================================
const heroName = document.getElementById('heroName');
const names = ['Chiêm Quốc Hùng', 'Big City Bear'];
let currentNameIndex = 0;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const effects = [glitchEffect, typewriterEffect, morphEffect, matrixEffect, flipEffect, pixelDissolveEffect, waveEffect, neonFlickerEffect];
let currentEffectIndex = 0;

function getNextName() {
  currentNameIndex = (currentNameIndex + 1) % names.length;
  return names[currentNameIndex];
}

function shuffleEffects() {
  // Pick a random effect each time
  currentEffectIndex = Math.floor(Math.random() * effects.length);
}

// Effect 1: Glitch/Scramble
function glitchEffect(targetName, callback) {
  const duration = 1200;
  const steps = 15;
  let step = 0;
  const interval = setInterval(() => {
    step++;
    let text = '';
    for (let i = 0; i < targetName.length; i++) {
      if (step / steps > i / targetName.length) {
        text += targetName[i];
      } else {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    heroName.textContent = text;
    if (step >= steps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, duration / steps);
}

// Effect 2: Typewriter delete + retype
function typewriterEffect(targetName, callback) {
  const currentText = heroName.textContent;
  let i = currentText.length;
  
  // Delete
  const deleteInterval = setInterval(() => {
    i--;
    heroName.textContent = currentText.substring(0, i) + '|';
    if (i <= 0) {
      clearInterval(deleteInterval);
      heroName.textContent = '|';
      // Type new
      let j = 0;
      const typeInterval = setInterval(() => {
        j++;
        heroName.textContent = targetName.substring(0, j) + '|';
        if (j >= targetName.length) {
          clearInterval(typeInterval);
          heroName.textContent = targetName;
          callback();
        }
      }, 60);
    }
  }, 40);
}

// Effect 3: Morph (shared chars stay)
function morphEffect(targetName, callback) {
  const currentText = heroName.textContent;
  const maxLen = Math.max(currentText.length, targetName.length);
  let step = 0;
  const steps = 20;
  
  const interval = setInterval(() => {
    step++;
    let text = '';
    for (let i = 0; i < maxLen; i++) {
      const progress = step / steps;
      if (i < targetName.length && progress > i / maxLen) {
        text += targetName[i];
      } else if (i < currentText.length) {
        text += currentText[i];
      }
    }
    heroName.textContent = text;
    if (step >= steps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, 50);
}

// Effect 4: Matrix rain
function matrixEffect(targetName, callback) {
  let step = 0;
  const steps = 25;
  const interval = setInterval(() => {
    step++;
    let text = '';
    for (let i = 0; i < targetName.length; i++) {
      if (Math.random() < step / steps) {
        text += targetName[i];
      } else {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    heroName.textContent = text;
    if (step >= steps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, 50);
}

// Effect 5: Flip (airport board)
function flipEffect(targetName, callback) {
  const flipChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
  let positions = Array(targetName.length).fill(0);
  let done = Array(targetName.length).fill(false);
  
  const interval = setInterval(() => {
    let text = '';
    let allDone = true;
    for (let i = 0; i < targetName.length; i++) {
      if (done[i]) {
        text += targetName[i];
      } else {
        positions[i]++;
        const charIndex = positions[i] % flipChars.length;
        text += flipChars[charIndex];
        if (flipChars[charIndex] === targetName[i].toUpperCase() || positions[i] > 20 + i * 3) {
          done[i] = true;
          text = text.slice(0, -1) + targetName[i];
        }
        allDone = false;
      }
    }
    heroName.textContent = text;
    if (allDone) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, 40);
}

// Effect 6: Pixel dissolve
function pixelDissolveEffect(targetName, callback) {
  const currentText = heroName.textContent;
  const maxLen = Math.max(currentText.length, targetName.length);
  let revealed = new Set();
  const totalSteps = maxLen + 5;
  let step = 0;
  
  const interval = setInterval(() => {
    step++;
    // Reveal 1-3 random positions each step
    const toReveal = 1 + Math.floor(Math.random() * 2);
    for (let r = 0; r < toReveal; r++) {
      const pos = Math.floor(Math.random() * targetName.length);
      revealed.add(pos);
    }
    
    let text = '';
    for (let i = 0; i < targetName.length; i++) {
      if (revealed.has(i)) {
        text += targetName[i];
      } else {
        text += '·';
      }
    }
    heroName.textContent = text;
    
    if (revealed.size >= targetName.length || step >= totalSteps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, 60);
}

// Effect 7: Wave distortion
function waveEffect(targetName, callback) {
  const currentText = heroName.textContent;
  let step = 0;
  const steps = 30;
  
  const interval = setInterval(() => {
    step++;
    const progress = step / steps;
    let text = '';
    for (let i = 0; i < targetName.length; i++) {
      const wave = Math.sin((i + step) * 0.5);
      if (progress > 0.5) {
        text += targetName[i];
      } else if (wave > 0) {
        text += targetName[i] || ' ';
      } else {
        text += currentText[i] || ' ';
      }
    }
    heroName.textContent = text;
    if (step >= steps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      callback();
    }
  }, 50);
}

// Effect 8: Neon flicker
function neonFlickerEffect(targetName, callback) {
  let step = 0;
  const steps = 12;
  const interval = setInterval(() => {
    step++;
    if (step % 2 === 0) {
      heroName.textContent = targetName;
      heroName.style.opacity = '1';
    } else {
      heroName.textContent = step < 6 ? heroName.textContent : targetName;
      heroName.style.opacity = Math.random() > 0.5 ? '0.3' : '0.8';
    }
    if (step >= steps) {
      clearInterval(interval);
      heroName.textContent = targetName;
      heroName.style.opacity = '1';
      callback();
    }
  }, 80);
}

// Name animation loop
function startNameAnimation() {
  setTimeout(() => {
    shuffleEffects();
    const nextName = getNextName();
    effects[currentEffectIndex](nextName, () => {
      startNameAnimation();
    });
  }, 3000 + Math.random() * 2000); // Wait 3-5 seconds between transitions
}

// ============================================
// NAVIGATION - Show/hide on scroll
// ============================================
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

function updateNav() {
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    nav.classList.add('visible');
  } else {
    nav.classList.remove('visible');
  }
  lastScrollY = scrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
});

// ============================================
// SCROLL REVEAL - IntersectionObserver
// ============================================
const revealElements = document.querySelectorAll('.scroll-reveal, .animate-in');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// STAT COUNTER - Count up on scroll
// ============================================
const statNums = document.querySelectorAll('.stat-num');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === 'true';
      const duration = 2000;
      const start = performance.now();

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        
        if (isDecimal) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }
      requestAnimationFrame(animate);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ============================================
// SECTION LABEL - Letter spacing animation
// ============================================
const sectionLabels = document.querySelectorAll('.section-label');

const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'letter-spacing 0.8s ease, opacity 0.6s ease, transform 0.6s ease';
      entry.target.style.letterSpacing = '5px';
      setTimeout(() => {
        entry.target.style.letterSpacing = '3px';
      }, 800);
    }
  });
}, { threshold: 0.5 });

sectionLabels.forEach(el => labelObserver.observe(el));

// ============================================
// INIT - Start animations after page load
// ============================================
window.addEventListener('load', () => {
  // Staggered hero reveal
  const heroElements = document.querySelectorAll('.hero .animate-in');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 200);
  });

  // Start name cycling after initial reveal
  setTimeout(startNameAnimation, 2500);
});
