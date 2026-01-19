/* FluentHour — Tutorial Section (UI-only overlay)
   Adds: Tutorial button in header + multi-step tutorial modal
   - Covers what FluentHour is, session structure, proficiency levels, and tips
   - Shows automatically on first visit (can be dismissed)
   - Accessible via "?" button in header at any time
   Safe: no bundle edits, no business logic changes. */
(() => {
  'use strict';

  const STORAGE_KEY = 'fluenthour.tutorial.completed.v1';
  const STORAGE_KEY_DISMISSED = 'fluenthour.tutorial.dismissed.v1';
  const TUTORIAL_BTN_ID = 'fh-tutorial-btn';
  const TUTORIAL_MODAL_ID = 'fh-tutorial-modal';

  const TUTORIAL_STEPS = [
    {
      title: 'Welcome to FluentHour',
      content: `
        <p><strong>FluentHour</strong> is an interactive language learning platform designed around structured "Perfect Hour" conversation sessions.</p>
        <p>Each session gives you a complete one-hour practice routine for mastering real-world conversation scenarios — from ordering at a restaurant to negotiating business deals.</p>
        <p>Whether you're a beginner or advanced learner, FluentHour provides step-by-step guidance to build fluency through active practice.</p>
      `
    },
    {
      title: 'The Perfect Hour Structure',
      content: `
        <p>Every session follows a proven 4-phase structure designed to maximize your learning:</p>
        <div class="fh-tutorial-phases">
          <div class="fh-tutorial-phase">
            <span class="fh-tutorial-phase-num">1</span>
            <div>
              <strong>Fluency Loop</strong> <em>(10 min)</em><br>
              Rapid pronunciation drills to warm up your speaking muscles.
            </div>
          </div>
          <div class="fh-tutorial-phase">
            <span class="fh-tutorial-phase-num">2</span>
            <div>
              <strong>Model & Input</strong> <em>(25 min)</em><br>
              Listen to native speaker models and absorb natural patterns.
            </div>
          </div>
          <div class="fh-tutorial-phase">
            <span class="fh-tutorial-phase-num">3</span>
            <div>
              <strong>Simulation Output</strong> <em>(15 min)</em><br>
              Role-play the scenario with active speaking practice.
            </div>
          </div>
          <div class="fh-tutorial-phase">
            <span class="fh-tutorial-phase-num">4</span>
            <div>
              <strong>Record & Focus</strong> <em>(10 min)</em><br>
              Self-recording and targeted feedback on your performance.
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'Choosing Your Level',
      content: `
        <p>Sessions are organized by proficiency level using the ACTFL scale:</p>
        <div class="fh-tutorial-levels">
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-a1">A1</span>
            <div><strong>Beginner</strong> — Basic greetings, simple transactions, survival phrases</div>
          </div>
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-a2">A2</span>
            <div><strong>Elementary</strong> — Everyday situations, simple conversations, familiar topics</div>
          </div>
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-b1">B1</span>
            <div><strong>Intermediate</strong> — Travel, work discussions, expressing opinions</div>
          </div>
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-b2">B2</span>
            <div><strong>Upper Intermediate</strong> — Complex topics, abstract discussions, nuanced expression</div>
          </div>
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-c1">C1</span>
            <div><strong>Advanced</strong> — Professional contexts, subtle meanings, sophisticated vocabulary</div>
          </div>
          <div class="fh-tutorial-level">
            <span class="fh-tutorial-level-badge fh-level-c2">C2</span>
            <div><strong>Mastery</strong> — Near-native fluency, complex negotiations, nuanced cultural contexts</div>
          </div>
        </div>
        <p class="fh-tutorial-tip">Start at a level that feels slightly challenging but achievable. You can always adjust!</p>
      `
    },
    {
      title: 'Using the AI Companion',
      content: `
        <p>FluentHour works seamlessly with AI assistants for interactive practice:</p>
        <div class="fh-tutorial-companion-section">
          <div class="fh-tutorial-companion-step">
            <span class="fh-tutorial-step-num">1</span>
            <div>Open a session and navigate to any phase</div>
          </div>
          <div class="fh-tutorial-companion-step">
            <span class="fh-tutorial-step-num">2</span>
            <div>Click the <strong>FluentHour Companion</strong> button</div>
          </div>
          <div class="fh-tutorial-companion-step">
            <span class="fh-tutorial-step-num">3</span>
            <div>Paste the phase content into the Companion chat</div>
          </div>
          <div class="fh-tutorial-companion-step">
            <span class="fh-tutorial-step-num">4</span>
            <div>Follow along step-by-step with AI guidance</div>
          </div>
        </div>
        <div class="fh-tutorial-commands">
          <strong>Quick commands the Companion understands:</strong>
          <ul>
            <li><code>next step</code> — Move to the next step</li>
            <li><code>repeat</code> — Hear something again</li>
            <li><code>slower</code> — Slow down the pace</li>
            <li><code>harder</code> — Increase the challenge</li>
            <li><code>twist</code> — Try a variation of the scenario</li>
            <li><code>drill mode</code> — Focus on repetition practice</li>
          </ul>
        </div>
      `
    },
    {
      title: 'Tips for Success',
      content: `
        <div class="fh-tutorial-tips">
          <div class="fh-tutorial-tip-item">
            <span class="fh-tutorial-tip-icon">🎯</span>
            <div>
              <strong>Commit to the full hour</strong><br>
              Each session is designed as a complete unit. Going through all four phases builds lasting skills.
            </div>
          </div>
          <div class="fh-tutorial-tip-item">
            <span class="fh-tutorial-tip-icon">🔊</span>
            <div>
              <strong>Speak out loud</strong><br>
              Language learning happens through active speaking, not just listening. Don't be shy!
            </div>
          </div>
          <div class="fh-tutorial-tip-item">
            <span class="fh-tutorial-tip-icon">🔄</span>
            <div>
              <strong>Embrace repetition</strong><br>
              Repeat sessions multiple times. Use the "twist" variations to keep it fresh.
            </div>
          </div>
          <div class="fh-tutorial-tip-item">
            <span class="fh-tutorial-tip-icon">📱</span>
            <div>
              <strong>Record yourself</strong><br>
              Use the Record & Focus phase to capture your speaking and identify areas to improve.
            </div>
          </div>
          <div class="fh-tutorial-tip-item">
            <span class="fh-tutorial-tip-icon">🏠</span>
            <div>
              <strong>Quick navigation</strong><br>
              Click the FluentHour logo anytime to return to the home screen.
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'You\'re Ready!',
      content: `
        <div class="fh-tutorial-ready">
          <div class="fh-tutorial-ready-icon">✨</div>
          <p>You now know everything you need to start your fluency journey with FluentHour.</p>
          <p>Browse sessions by level, pick a scenario that interests you, and dive in!</p>
          <p class="fh-tutorial-cta">Remember: You can access this tutorial anytime by clicking the <strong>?</strong> button in the header.</p>
        </div>
      `
    }
  ];

  function isVisible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function isFirstVisit() {
    try {
      return !localStorage.getItem(STORAGE_KEY_DISMISSED);
    } catch (_) {
      return false;
    }
  }

  function markTutorialDismissed() {
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, '1');
    } catch (_) {}
  }

  function markTutorialCompleted() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
  }

  function createTutorialButton() {
    if (document.getElementById(TUTORIAL_BTN_ID)) return;

    const header = document.querySelector('.fh-header-inner') || document.querySelector('.fh-header');
    if (!header) return;

    const btn = document.createElement('button');
    btn.id = TUTORIAL_BTN_ID;
    btn.type = 'button';
    btn.className = 'fh-tutorial-btn';
    btn.setAttribute('aria-label', 'Tutorial');
    btn.setAttribute('title', 'How to use FluentHour');
    btn.textContent = '?';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openTutorial();
    });

    // Try to find a good spot in the header
    const headerControls = header.querySelector('.fh-header-controls');
    if (headerControls) {
      headerControls.insertAdjacentElement('afterbegin', btn);
    } else {
      header.insertAdjacentElement('beforeend', btn);
    }
  }

  function openTutorial(startStep = 0) {
    if (document.getElementById(TUTORIAL_MODAL_ID)) return;

    let currentStep = startStep;

    const backdrop = document.createElement('div');
    backdrop.id = TUTORIAL_MODAL_ID;
    backdrop.className = 'fh-tutorial-backdrop';
    backdrop.setAttribute('data-fh-injected', '1');

    function renderStep() {
      const step = TUTORIAL_STEPS[currentStep];
      const isFirst = currentStep === 0;
      const isLast = currentStep === TUTORIAL_STEPS.length - 1;

      backdrop.innerHTML = `
        <div class="fh-tutorial-modal" role="dialog" aria-modal="true" aria-label="FluentHour Tutorial">
          <div class="fh-tutorial-hdr">
            <div class="fh-tutorial-progress">
              ${TUTORIAL_STEPS.map((_, i) => `
                <span class="fh-tutorial-dot ${i === currentStep ? 'fh-tutorial-dot--active' : ''} ${i < currentStep ? 'fh-tutorial-dot--done' : ''}" data-step="${i}"></span>
              `).join('')}
            </div>
            <button type="button" class="fh-tutorial-close" aria-label="Close tutorial" data-action="close">×</button>
          </div>
          <div class="fh-tutorial-body">
            <h2 class="fh-tutorial-title">${step.title}</h2>
            <div class="fh-tutorial-content">${step.content}</div>
          </div>
          <div class="fh-tutorial-footer">
            ${!isFirst ? '<button type="button" class="fh-tutorial-nav fh-tutorial-nav--prev" data-action="prev">← Back</button>' : '<span></span>'}
            ${isLast
              ? '<button type="button" class="fh-tutorial-nav fh-tutorial-nav--primary" data-action="finish">Get Started</button>'
              : '<button type="button" class="fh-tutorial-nav fh-tutorial-nav--next" data-action="next">Next →</button>'
            }
          </div>
        </div>
      `.trim();

      // Attach event listeners
      backdrop.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', (e) => {
          const action = el.getAttribute('data-action');
          if (action === 'close') close();
          else if (action === 'prev') goToPrev();
          else if (action === 'next') goToNext();
          else if (action === 'finish') finish();
        });
      });

      // Allow clicking dots to navigate
      backdrop.querySelectorAll('.fh-tutorial-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const stepIndex = parseInt(dot.getAttribute('data-step'), 10);
          if (!isNaN(stepIndex)) {
            currentStep = stepIndex;
            renderStep();
          }
        });
      });
    }

    function goToPrev() {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    }

    function goToNext() {
      if (currentStep < TUTORIAL_STEPS.length - 1) {
        currentStep++;
        renderStep();
      }
    }

    function finish() {
      markTutorialCompleted();
      markTutorialDismissed();
      close();
    }

    function close() {
      markTutorialDismissed();
      document.removeEventListener('keydown', onKey);
      backdrop.remove();
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPrev();
    }

    document.addEventListener('keydown', onKey);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    renderStep();
    document.body.appendChild(backdrop);
  }

  function tick() {
    try {
      createTutorialButton();
    } catch (_) {}
  }

  function start() {
    tick();

    // Show tutorial automatically on first visit (after a short delay)
    if (isFirstVisit()) {
      setTimeout(() => {
        openTutorial();
      }, 800);
    }

    const obs = new MutationObserver(() => tick());
    obs.observe(document.documentElement, { subtree: true, childList: true });

    window.addEventListener('hashchange', tick);
    window.addEventListener('popstate', tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
