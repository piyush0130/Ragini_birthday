/**
 * A Little Space of Her Own - Ragini's Birthday Website
 * Vanilla JavaScript interactions, countdown, cake animations, and envelope reveal
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. DATA: Interactive Wishes Content
  // ---------------------------------------------------------------------------
  const WISHES_DATA = {
    adventure: {
      number: '01',
      icon: '🧭',
      title: 'A Little Adventure',
      quote: 'Hope tumhara aane wala saal naye experiences, unexpected memories aur exciting discoveries se bhara ho.',
      commentary: 'Hamesha naye raaste explore karna, spontaneous plans ko enjoy karna aur aisi yaadein collect karna jo lifetime tumhare saath muskuraati rahein.'
    },
    peace: {
      number: '02',
      icon: '🌿',
      title: 'A Little Peace',
      quote: 'Tumhe hamesha apne liye aur un chhoti-chhoti cheezon ke liye waqt mile jo tumhe sach me andar se khushi deti hain.',
      commentary: 'Is busy duniya me tumhara sukoon hamesha barkarar rahe. Subah ki peaceful chai se lekar shaam ke relaxing moments tak, har pal dil ko aaram de.'
    },
    happiness: {
      number: '03',
      icon: '☀️',
      title: 'A Little Happiness',
      quote: 'Life tumhe har din aisi dher saari chhoti-chhoti wajah de jo tumhare chehre par bina reason bhi pyari si smile le aayein.',
      commentary: 'Random jokes par khilkhilana ho ya shaam ki thandi hawa, achhi coffee ho ya doston ki hansi — har chhoti khushi tumhare paas bina maange chali aaye.'
    }
  };

  // ---------------------------------------------------------------------------
  // 2. DOM Elements
  // ---------------------------------------------------------------------------
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const wishesSection = document.getElementById('wishes');

  // Modal elements
  const wishModal = document.getElementById('wish-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalNumber = document.getElementById('modal-number');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalQuote = document.getElementById('modal-quote');
  const modalCommentary = document.getElementById('modal-commentary');
  const wishCards = document.querySelectorAll('.wish-card');

  // Countdown elements
  const timerGrid = document.getElementById('timer-grid');
  const birthdayGreetingBanner = document.getElementById('birthday-greeting-banner');
  const daysVal = document.getElementById('days-val');
  const hoursVal = document.getElementById('hours-val');
  const minutesVal = document.getElementById('minutes-val');
  const secondsVal = document.getElementById('seconds-val');

  // Cake elements
  const candleButtons = document.querySelectorAll('.candle-btn');
  const candleCounterText = document.getElementById('counter-text');
  const cakeInstruction = document.getElementById('cake-instruction');
  const wishRevealBox = document.getElementById('wish-reveal-box');
  const relightBtn = document.getElementById('relight-btn');
  const confettiCanvas = document.getElementById('confetti-canvas');

  // Envelope elements
  const envelopeStage = document.getElementById('envelope-stage');
  const envelopeSeal = document.getElementById('envelope-seal');
  const envelopeHint = document.getElementById('envelope-hint');

  // Restart element
  const restartBtn = document.getElementById('restart-btn');

  // Ambient canvas
  const ambientCanvas = document.getElementById('ambient-canvas');

  // ---------------------------------------------------------------------------
  // 3. AMBIENT BACKGROUND PARTICLES CANVAS
  // ---------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ambientCtx = null;
  let ambientParticles = [];
  let ambientWidth = 0;
  let ambientHeight = 0;
  let ambientAnimId = null;

  function initAmbientCanvas() {
    if (!ambientCanvas || prefersReducedMotion) return;
    ambientCtx = ambientCanvas.getContext('2d');
    resizeAmbientCanvas();

    window.addEventListener('resize', debounce(resizeAmbientCanvas, 150));

    // Create particles: soft stars, pastel petals, and glowing pollen dots
    const count = Math.min(35, Math.floor(window.innerWidth / 30));
    ambientParticles = [];
    const colors = [
      'rgba(163, 188, 169, 0.45)', // Sage
      'rgba(184, 169, 220, 0.45)', // Lavender
      'rgba(160, 196, 226, 0.45)', // Pastel blue
      'rgba(244, 212, 136, 0.45)'  // Gold
    ];

    for (let i = 0; i < count; i++) {
      ambientParticles.push({
        x: Math.random() * ambientWidth,
        y: Math.random() * ambientHeight,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.4, // Floating gently upward
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        isPetal: Math.random() > 0.6
      });
    }

    renderAmbient();
  }

  function resizeAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientWidth = window.innerWidth;
    ambientHeight = window.innerHeight;
    ambientCanvas.width = ambientWidth;
    ambientCanvas.height = ambientHeight;
  }

  function renderAmbient() {
    if (!ambientCtx) return;
    ambientCtx.clearRect(0, 0, ambientWidth, ambientHeight);

    for (let i = 0; i < ambientParticles.length; i++) {
      const p = ambientParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.spin += p.spinSpeed;

      // Wrap around edges
      if (p.y < -20) p.y = ambientHeight + 20;
      if (p.x < -20) p.x = ambientWidth + 20;
      if (p.x > ambientWidth + 20) p.x = -20;

      ambientCtx.save();
      ambientCtx.translate(p.x, p.y);
      ambientCtx.rotate(p.spin);

      if (p.isPetal) {
        // Draw tiny petal/leaf
        ambientCtx.fillStyle = p.color;
        ambientCtx.beginPath();
        ambientCtx.ellipse(0, 0, p.radius * 2, p.radius, 0, 0, Math.PI * 2);
        ambientCtx.fill();
      } else {
        // Draw tiny glowing star or circle
        ambientCtx.fillStyle = p.color;
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ambientCtx.fill();
      }
      ambientCtx.restore();
    }

    ambientAnimId = requestAnimationFrame(renderAmbient);
  }

  // ---------------------------------------------------------------------------
  // 4. SECTION 1: WELCOME SCREEN INTERACTION
  // ---------------------------------------------------------------------------
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', function () {
      if (wishesSection) {
        wishesSection.scrollIntoView({ behavior: 'smooth' });
      }
      triggerGentleSparkles(openSurpriseBtn);
    });
  }

  function triggerGentleSparkles(originElem) {
    if (prefersReducedMotion) return;
    // Launch a few confetti particles near the button
    const rect = originElem.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    spawnSingleConfettiBurst(originX, originY);
  }

  // ---------------------------------------------------------------------------
  // 5. SECTION 2: INTERACTIVE WISHES (MODAL)
  // ---------------------------------------------------------------------------
  wishCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const cardId = card.getAttribute('data-card-id');
      openWishModal(cardId);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cardId = card.getAttribute('data-card-id');
        openWishModal(cardId);
      }
    });
  });

  function openWishModal(cardId) {
    const data = WISHES_DATA[cardId];
    if (!data) return;

    modalNumber.textContent = data.number;
    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalQuote.textContent = `"${data.quote}"`;
    modalCommentary.textContent = data.commentary;

    wishModal.classList.add('active');
    wishModal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeWishModal() {
    wishModal.classList.remove('active');
    wishModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeWishModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeWishModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeWishModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wishModal.classList.contains('active')) {
      closeWishModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 6. SECTION 3: BIRTHDAY COUNTDOWN (ASIA/KOLKATA TIMEZONE)
  // ---------------------------------------------------------------------------
  // Target: November 5, 2026, 00:00:00 Asia/Kolkata (UTC+5:30)
  // Asia/Kolkata is UTC + 5 hours 30 mins.
  // 2026-11-05 00:00:00 IST = 2026-11-04 18:30:00 UTC
  // Date.UTC(year, monthIndex, day, hours, minutes, seconds)
  // Note: Month index for November is 10 (0-indexed).
  const TARGET_BIRTHDAY_MS = Date.UTC(2026, 10, 4, 18, 30, 0); // 2026-11-05 00:00:00 IST

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = TARGET_BIRTHDAY_MS - now;

    if (diff <= 0) {
      // It is on or after November 5, 2026!
      // Display the birthday greeting instead of a negative countdown
      if (timerGrid) timerGrid.classList.add('hidden');
      if (birthdayGreetingBanner) birthdayGreetingBanner.classList.remove('hidden');
      return;
    }

    // Still counting down
    if (timerGrid) timerGrid.classList.remove('hidden');
    if (birthdayGreetingBanner) birthdayGreetingBanner.classList.add('hidden');

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysVal) daysVal.textContent = days < 10 ? '0' + days : days;
    if (hoursVal) hoursVal.textContent = hours < 10 ? '0' + hours : hours;
    if (minutesVal) minutesVal.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secondsVal) secondsVal.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------------------------------------------------------------------------
  // 7. SECTION 4: INTERACTIVE BIRTHDAY CAKE & CANDLES
  // ---------------------------------------------------------------------------
  let extinguishedCount = 0;
  const totalCandles = candleButtons.length;

  candleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      extinguishCandle(btn);
    });
  });

  function extinguishCandle(btn) {
    if (btn.classList.contains('extinguished')) return;

    btn.classList.add('extinguished');
    btn.setAttribute('aria-label', `Candle ${btn.dataset.index} extinguished`);
    extinguishedCount++;

    updateCandleStatus();

    if (extinguishedCount === totalCandles) {
      onAllCandlesExtinguished();
    }
  }

  function updateCandleStatus() {
    const remaining = totalCandles - extinguishedCount;
    if (remaining === 3) {
      candleCounterText.textContent = '3 candles burning — tap them!';
    } else if (remaining === 2) {
      candleCounterText.textContent = '2 candles left to blow out...';
    } else if (remaining === 1) {
      candleCounterText.textContent = 'Just 1 more candle left!';
    } else {
      candleCounterText.textContent = 'All candles blown out! 🎂✨';
    }
  }

  function onAllCandlesExtinguished() {
    if (cakeInstruction) {
      cakeInstruction.textContent = '✨ You blew out all the candles! Make your wish now.';
    }

    if (wishRevealBox) {
      wishRevealBox.classList.remove('hidden');
      wishRevealBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Trigger celebration confetti
    triggerCelebratoryConfetti();
  }

  if (relightBtn) {
    relightBtn.addEventListener('click', function () {
      resetCake();
    });
  }

  function resetCake() {
    candleButtons.forEach(function (btn) {
      btn.classList.remove('extinguished');
      btn.setAttribute('aria-label', `Extinguish candle ${btn.dataset.index}`);
    });
    extinguishedCount = 0;
    updateCandleStatus();

    if (cakeInstruction) {
      cakeInstruction.textContent = 'Tap each of the three candles to blow them out gently!';
    }

    if (wishRevealBox) {
      wishRevealBox.classList.add('hidden');
    }
  }

  // ---------------------------------------------------------------------------
  // 8. CELEBRATORY CONFETTI ENGINE (Vanilla Canvas, Lightweight)
  // ---------------------------------------------------------------------------
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimId = null;

  function initConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    resizeConfettiCanvas();
    window.addEventListener('resize', debounce(resizeConfettiCanvas, 150));
  }

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    const rect = confettiCanvas.parentElement.getBoundingClientRect();
    confettiCanvas.width = rect.width;
    confettiCanvas.height = rect.height;
  }

  function triggerCelebratoryConfetti() {
    if (prefersReducedMotion || !confettiCanvas) return;

    resizeConfettiCanvas();
    const width = confettiCanvas.width;
    const height = confettiCanvas.height;

    // Palette: Sage, lavender, cream, gold, pastel blue
    const colors = ['#708D79', '#8E7CB5', '#B8A9DC', '#E5A84B', '#6B95B8', '#FAF7F2', '#E8DFD5'];

    confettiParticles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height * 0.45,
        vx: (Math.random() - 0.5) * 8,
        vy: -4 - Math.random() * 8,
        gravity: 0.18 + Math.random() * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 4,
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: (Math.random() * 0.08) + 0.04,
        tiltAngle: 0,
        opacity: 1
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) return;

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = 0; i < confettiParticles.length; i++) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.tiltAngle += p.tiltAngleIncremental;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      // Gentle fade out near bottom
      if (p.y > confettiCanvas.height * 0.75) {
        p.opacity -= 0.02;
      }

      confettiCtx.save();
      confettiCtx.beginPath();
      confettiCtx.lineWidth = p.size;
      confettiCtx.strokeStyle = p.color;
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.moveTo(p.x + p.tilt + p.size / 2, p.y);
      confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.size / 2);
      confettiCtx.stroke();
      confettiCtx.restore();
    }

    // Filter out dead particles
    confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 20 && p.opacity > 0);

    if (confettiParticles.length > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  function spawnSingleConfettiBurst(originX, originY) {
    // Quick mini-burst directly on ambient canvas for welcome click
    if (!ambientCtx) return;
    const colors = ['#708D79', '#8E7CB5', '#B8A9DC', '#E5A84B', '#6B95B8'];
    for (let i = 0; i < 20; i++) {
      ambientParticles.push({
        x: originX,
        y: originY,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 5,
        vy: -2 - Math.random() * 4,
        spin: 0,
        spinSpeed: 0.05,
        isPetal: true
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 9. SECTION 5: PERSONAL BIRTHDAY NOTE (ENVELOPE REVEAL)
  // ---------------------------------------------------------------------------
  const letterPaper = document.getElementById('letter-paper');
  const tuckLetterBtn = document.getElementById('tuck-letter-btn');

  if (envelopeStage) {
    envelopeStage.addEventListener('click', function (e) {
      // If clicking inside the letter paper or buttons, don't trigger the envelope toggle
      if (e.target.closest('#letter-paper') && !e.target.closest('#tuck-letter-btn')) {
        return;
      }
      toggleEnvelope();
    });

    envelopeStage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('#tuck-letter-btn')) return;
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }

  if (tuckLetterBtn) {
    tuckLetterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeEnvelope();
    });
  }

  function openEnvelope() {
    if (!envelopeStage) return;
    envelopeStage.classList.add('opened');
    envelopeStage.setAttribute('aria-expanded', 'true');
    if (envelopeHint) {
      envelopeHint.innerHTML = '<span class="hint-icon">💌</span><span class="hint-text">Letter unfolded • Tap "Fold & Tuck Away" to close</span>';
    }
  }

  function closeEnvelope() {
    if (!envelopeStage) return;
    envelopeStage.classList.remove('opened');
    envelopeStage.setAttribute('aria-expanded', 'false');
    if (envelopeHint) {
      envelopeHint.innerHTML = '<span class="hint-icon">👆</span><span class="hint-text">Tap the wax seal to slide open</span>';
    }
  }

  function toggleEnvelope() {
    if (!envelopeStage) return;
    if (envelopeStage.classList.contains('opened')) {
      closeEnvelope();
    } else {
      openEnvelope();
    }
  }

  // ---------------------------------------------------------------------------
  // 10. SECTION 6: FINAL SCREEN & EXPERIENCE AGAIN
  // ---------------------------------------------------------------------------
  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      // 1. Reset candles
      resetCake();

      // 2. Close envelope
      if (envelopeStage) {
        envelopeStage.classList.remove('opened');
        envelopeStage.setAttribute('aria-expanded', 'false');
        if (envelopeHint) {
          envelopeHint.innerHTML = '<span class="hint-icon">👆</span><span class="hint-text">Tap the wax seal to slide open</span>';
        }
      }

      // 3. Close modal if open
      closeWishModal();

      // 4. Smoothly scroll back to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // 5. Friendly greeting sparkle
      setTimeout(() => {
        if (openSurpriseBtn) {
          triggerGentleSparkles(openSurpriseBtn);
        }
      }, 700);
    });
  }

  // ---------------------------------------------------------------------------
  // 11. UTILITY: Debounce
  // ---------------------------------------------------------------------------
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // ---------------------------------------------------------------------------
  // 12. INITIALIZATION ON DOM READY
  // ---------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', function () {
    initAmbientCanvas();
    initConfettiCanvas();
  });

})();
