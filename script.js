// Final TroEqualizer JS — Fixed: keyword input + mantra box on reflect + age scaling visuals

window.audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)();

let intensityValue = 36;
let intensityBracket = 'middle';

const emotions = {
  happy: {
    frequencies: [432, 436, 440],
    color: '#ffcc33',
    shape: 'star',
    mantras: [
      '😊 Smile', '☀️ Radiate', '🎉 Celebrate', '😄 Joy Flows', '🌞 Shine Bright', '🎵 Dance Lightly',
      '🎈 Lift Spirits', '🏖 Feel Free', '🐦 Sing Out', '🌼 Blossom Boldly', '🍯 Sweetness Lives', '🎶 Harmonic Heart',
      '👣 Step Forward', '🌠 Magic Happens', '🥳 Party Within', '🏆 Victory Inside', '🌻 Golden Glow', '📣 Speak Joy',
      '🧚 Enchant Moments', '🥰 Heart Beats Happy', '🌄 Rise Up', '🎯 Joy as Aim', '🌟 Feel Worthy', '🤗 Hug the World'
    ]
  },
  hopeful: {
    frequencies: [444, 456, 468],
    color: '#88cc88',
    shape: 'circle',
    mantras: [
      '🌱 New Beginnings', '🌈 Better Days', '🕊 Peace Comes', '🛤 Path Opens', '🌅 Hope Rises', '🚪 A Way Forward',
      '📖 Write Destiny', '🪁 Fly Free', '🫧 Fresh Breath', '🌤 Silver Lining', '🪷 Float Upward', '✨ Stay Curious',
      '🫶 Trust It', '🪄 Believe Now', '🧭 Find North', '🧩 Pieces Fit', '🌟 Still Worthy', '🍃 Light Touch',
      '🧚 Whisper Faith', '🎯 Focus Hope', '🎁 Life Gives', '🎈 Rise Again', '🔓 Unfold Path', '📈 Keep Climbing'
    ]
  },
  inspired: {
    frequencies: [600, 612, 624],
    color: '#ffaa44',
    shape: 'hexagon',
    mantras: [
      '💡 Bright Idea', '🔥 Passion Awakened', '🎨 Creative Flow', '🚀 Launch Self', '🌌 Vision Grows', '🧠 Mind Sharpens',
      '🛠 Build It', '📸 Capture It', '🧬 Invent Now', '🎬 Act Bold', '🧗 Rise High', '🖋 Write Truth',
      '🎼 Compose Soul', '🧘 Insight Ignites', '📚 Learn Fast', '🪄 Channel Muse', '🔭 Explore Depths', '🧩 Solve It',
      '🎤 Speak Up', '🎻 String Harmony', '🛰 Sky’s Limit', '⛳ Hit Goal', '💥 Burst Open', '💎 Shine Within'
    ]
  },
  sad: {
    frequencies: [220, 230, 240],
    color: '#8888ff',
    shape: 'triangle',
    mantras: [
      '💧 Let It Out', '🌙 Be Gentle', '🤍 You’re Not Alone', '🫂 Safe to Feel', '🛏 Rest Here', '🦋 Pain Passes',
      '📿 Soft Moments', '🍂 Release Now', '🫖 Warmth Helps', '🌧 Clean Tears', '🌊 Ride Waves', '🤲 Open Arms',
      '🌌 Night Ends', '🥀 Still Beautiful', '🔐 Guard Heart', '🪞 Reflect Light', '🫧 Let Go', '🕯 Hold Flame',
      '🧺 Carry Softly', '🧘‍♀️ Slow Down', '📦 Unpack It', '🌁 Feel Fully', '🌫 Drift Gently', '🫀 Heal Slowly'
    ],
    healWith: 'happy'
  },
  frustrated: {
    frequencies: [520, 530, 540],
    color: '#ff6644',
    shape: 'pentagon',
    mantras: [
      '🔥 Release It', '🛠 Refocus', '🌀 Regain Center', '🔧 Fix Slowly', '💣 Let Off', '🫸 Breathe Forward',
      '⏳ Patience Lives', '📐 Align It', '🪛 Adjust Plan', '📍 Mark Center', '📉 Slow Curve', '🧯 Cool Down',
      '📎 Link Pieces', '🗂 Order Comes', '💤 Rest Helps', '📦 Box It', '🧱 Lay Bricks', '🛤 Clear Path',
      '🔍 Reframe View', '🧠 Reset Thought', '🫰 Shift Now', '🫳 Drop Weight', '🧺 Sort Out', '🧽 Clean Mind'
    ],
    healWith: 'hopeful'
  },
  angry: {
    frequencies: [660, 672, 684],
    color: '#ff0000',
    shape: 'cross',
    mantras: [
      '⚡ Ground Yourself', '🧘 Deep Breath', '💢 Channel Energy', '🧨 Defuse Heat', '🚧 Hold Fire', '🥶 Cool Head',
      '🧊 Ice Wrath', '🏋️ Push Hard', '🗣 Speak True', '🚿 Wash Rage', '🎮 Pause Game', '🔦 Find Core',
      '🧬 Own Power', '🎯 Target Good', '🎭 Drop Mask', '🧱 Break Wall', '🏹 Redirect Force', '📴 Power Off',
      '🛑 Stop Cycle', '🧘‍♂️ Sit Still', '🌪 Calm Storm', '🌋 Release Fire', '⏸ Breathe Deep', '🔋 Recharge Slow'
    ],
    healWith: 'inspired'
  }
};

const keywordMap = {
  happy: [
    'joy', 'smile', 'fun', 'sun', 'celebrate', 'laugh', 'cheerful', 'delight', 'glee', 'play',
    'giggle', 'excited', 'bright', 'warmth', 'happiness', 'bliss', 'elated', 'cheer', 'festive',
    'ecstatic', 'jubilant', 'bubbly', 'vibrant', 'funny', 'sweet', 'positive', 'radiant', 'golden',
    'shine', 'content', 'peaceful', 'merry', 'party', 'smiley', 'silly', 'bouncy', 'uplift',
    'joyful', 'friendly', 'sunshine', 'happy-go-lucky', 'amused', 'tickled', 'hilarious', 'glad',
    'carefree', 'harmony', 'hugs', 'comfort', 'lighthearted', 'sparkle', 'satisfied', 'laughing',
    'fizzy', 'energised', 'yay', 'whoopee', 'giggly', 'zest', 'zippy', 'boosted', 'grinning', 'gleaming'
  ],
  hopeful: [
    'hope', 'future', 'chance', 'believe', 'faith', 'potential', 'dreams', 'goal', 'vision', 'trust',
    'confidence', 'wish', 'aspire', 'optimism', 'light', 'possibility', 'path', 'journey', 'grow',
    'bloom', 'sprout', 'rise', 'awakening', 'dawn', 'open', 'expand', 'aim', 'northstar', 'trusting',
    'change', 'new', 'better', 'brighter', 'next', 'fresh', 'sky', 'direction', 'freedom',
    'courage', 'plan', 'achieve', 'inspire', 'truth', 'visionary', 'blessing', 'flow', 'lightness',
    'forward', 'energy', 'goodness', 'love', 'guidance', 'clarity', 'focus', 'intent', 'peace',
    'resolve', 'support', 'motivation', 'faithful', 'healing', 'encouragement', 'growing', 'promise'
  ],
    inspired: [
    'idea', 'create', 'art', 'dream', 'vision',
    'invention', 'imagine', 'spark', 'concept', 'genius',
    'insight', 'innovate', 'motivate', 'construct', 'motivation',
    'paint', 'design', 'expression', 'reimagine', 'inspire',
    'craft', 'compose', 'discover', 'intuition', 'build',
    'manifest', 'creativity', 'originate', 'engineer', 'blueprint',
    'write', 'script', 'direct', 'envision', 'artistic',
    'visionary', 'lead', 'invent', 'ignite', 'dreamer',
    'revolution', 'conceptual', 'mindmap', 'explore', 'shift',
    'potential', 'brilliance', 'compose', 'lightbulb', 'map',
    'imagination', 'fresh', 'new', 'canvas', 'draft',
    'theme', 'outline', 'unfold', 'draw', 'brush',
    'poem', 'lyrics', 'inspiration', 'think'
  ],
sad: [
  'cry', 'lost', 'alone', 'blue', 'grief', 'hurt', 'pain', 'tears', 'regret', 'sorrow',
  'heartache', 'longing', 'gloom', 'mourning', 'emptiness', 'cold', 'broken', 'wounded', 'silent',
  'darkness', 'rejected', 'forgotten', 'numb', 'fragile', 'melancholy', 'shadow', 'weep', 'shame',
  'abandoned', 'heavy', 'gray', 'downcast', 'dull', 'hopeless', 'low', 'despair', 'aching',
  'wilted', 'sinking', 'solitude', 'misunderstood', 'wistful', 'drained', 'unseen',
  'suffering', 'guilt', 'remorse', 'anguish', 'isolation', 'depressed', 'weary', 'teardrop',
  'bleak', 'coldness', 'muffled', 'retreat', 'hollow', 'distressed', 'wilt', 'crumble',
  'unheard', 'grayness', 'withdrawn', 'quiet'
],
  frustrated: [
    'stuck', 'fail', 'block', 'confuse', 'tired',
    'delay', 'impossible', 'closed', 'jammed', 'pressure',
    'irritated', 'not working', 'problem', 'crash', 'error',
    'glitch', 'mess', 'overwhelmed', 'too much', 'annoyed',
    'ugh', 'cluttered', 'foggy', 'slow', 'laggy',
    'frozen', 'loop', 'limit', 'constraint', 'broken',
    'can’t fix', 'stuck again', 'retry', 'locked out', 'bottleneck',
    'can’t focus', 'mind stuck', 'shutdown', 'rage building', 'on edge',
    'heat rising', 'bursting', 'about to scream', 'noise', 'chaotic',
    'spinning', 'fighting', 'stressing', 'blocked path', 'misaligned',
    'out of sync', 'pushed around', 'pressure rising', 'can’t solve', 'tight',
    'closed off', 'jammed again', 'need space', 'mental mess', 'loop again',
    'feel dumb', 'headache', 'can’t think straight', 'circuit overload'
  ],
    angry: [
    'rage', 'mad', 'explode', 'irritate', 'injustice',
    'fury', 'hate', 'resent', 'boil', 'snap',
    'yell', 'storm', 'annoyed', 'bitter', 'provoked',
    'agitated', 'disrupt', 'burst', 'frustrated', 'grr',
    'shout', 'break', 'fight', 'scream', 'fire',
    'blowup', 'punch', 'slammed', 'brawl', 'snap',
    'fiery', 'vengeance', 'eruption', 'lash', 'growl',
    'feral', 'disturbed', 'temper', 'tantrum', 'bang',
    'clash', 'triggered', 'rageful', 'revenge', 'infuriate',
    'disrespect', 'abuse', 'riot', 'disgust', 'grudge',
    'insult', 'cutoff', 'revolt', 'offended', 'demand',
    'outburst', 'pressure', 'boiling', 'storming', 'resentment',
    'enraged', 'destructive', 'damage', 'snapback'
  ]
};


function updateAgeBracket(value) {
  if (value <= 40) intensityBracket = 'young';
  else if (value <= 80) intensityBracket = 'middle';
  else intensityBracket = 'elder';
}

document.addEventListener('DOMContentLoaded', () => {
  const thoughtInput = document.getElementById('thought-input');
  const toneSelect = document.getElementById('tone-select');
  const reflectBtn = document.getElementById('reflect-btn');
  const ageSlider = document.getElementById('age-slider');
  const ageValue = document.getElementById('age-value');

  if (thoughtInput) {
    thoughtInput.addEventListener('input', () => {
      const text = thoughtInput.value.toLowerCase().trim();
      if (!text || text.length < 3) return;

      const words = text.split(/\s+/);
      const lastWord = words[words.length - 1];

      for (const [emotion, triggers] of Object.entries(keywordMap)) {
        if (triggers.includes(lastWord)) {
          if (toneSelect) toneSelect.value = emotion;
          updateMandalaShape(emotion);
          startSpin(3000);
          break;
        }
      }
    });
  }

  if (reflectBtn) {
    reflectBtn.addEventListener('click', reflect);
  }

  if (ageSlider) {
    ageSlider.addEventListener('input', () => {
      intensityValue = parseInt(ageSlider.value);
      updateAgeBracket(intensityValue);
      if (ageValue) ageValue.innerText = intensityValue;
    });
  }
});

function startSpin(durationMs = 5000) {
  const triangles = document.querySelectorAll('#triangle-group polygon');
  triangles.forEach((polygon) => {
    const anim = polygon.querySelector('animateTransform');
    if (!anim) return;
    const start = Math.floor(Math.random() * 360);
    const offset = 300 + Math.floor(Math.random() * 120);
    const end = start + offset;
    const duration = (durationMs / 1000).toFixed(2);
    anim.setAttribute('from', `${start} 120 120`);
    anim.setAttribute('to', `${end} 120 120`);
    anim.setAttribute('dur', `${duration}s`);
    anim.beginElement();
    setTimeout(() => polygon.setAttribute('transform', `rotate(${end} 120 120)`), durationMs);
  });
}

function updateMandalaShape(emotionKey) {
  const svg = document.querySelector('.mandala svg');
  if (!svg) return;
  let group = svg.querySelector('#emotion-shape-group');
  if (!group) {
    group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'emotion-shape-group');
    svg.appendChild(group);
  }
  group.innerHTML = '';

  const def = {
    circle: '<circle cx="0" cy="0" r="40" />',
    triangle: '<polygon points="0,-40 -35,30 35,30" />',
    star: '<polygon points="0,-45 13,-15 45,-15 18,6 28,38 0,22 -28,38 -18,6 -45,-15 -13,-15" />',
    pentagon: '<polygon points="0,-40 38,-12 24,32 -24,32 -38,-12" />',
    hexagon: '<polygon points="35,0 17.5,-30 -17.5,-30 -35,0 -17.5,30 17.5,30" />',
    cross: '<path d="M-30,-5 H-5 V-30 H5 V-5 H30 V5 H5 V30 H-5 V5 H-30 Z" />'
  };

  const shapeKey = emotions[emotionKey]?.shape || 'circle';
  const baseColor = emotions[emotionKey]?.color || '#00ffff';

  let shapeScale = 1;
  if (intensityValue <= 40) shapeScale = 0.7;
  else if (intensityValue <= 80) shapeScale = 1.3;
  else shapeScale = 2.2;

  for (let i = 0; i < 3; i++) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(120,120) rotate(${i * 120})`);

    const shapeWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    shapeWrapper.setAttribute('transform', `scale(${shapeScale})`);
    shapeWrapper.setAttribute('stroke', baseColor);
    shapeWrapper.setAttribute('stroke-width', 8);
    shapeWrapper.setAttribute('stroke-opacity', 1);
    shapeWrapper.setAttribute('fill', 'none');
    shapeWrapper.setAttribute('filter', 'url(#shapeGlow)');
    shapeWrapper.innerHTML = def[shapeKey];

    g.classList.add('emotion-shape-group-animated');
    g.appendChild(shapeWrapper);
    group.appendChild(g);
  }
}

function playTone(freq, duration = 2.4) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const ageFactor = Math.max(0.2, intensityValue / 120);
  const scaledGain = 0.001 + (0.3 * ageFactor);

  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(scaledGain, audioCtx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration - 0.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

window.playTone = playTone;

async function reflect() {
  const emotionKey = document.getElementById('tone-select').value;
  const emotion = emotions[emotionKey];
  const box = document.getElementById('mantra-box');
  const mantras = [...emotion.mantras].sort(() => 0.5 - Math.random());
  const freqs = emotion.frequencies;

  if (audioCtx.state === 'suspended') await audioCtx.resume();

  updateMandalaShape(emotionKey);
  startSpin(7200);
  box.style.display = 'block';

  for (let i = 0; i < 3; i++) {
    box.innerText = mantras[i];
    window.playTone(freqs[i]);
    await new Promise(r => setTimeout(r, 2400));
  }

  let heal = emotion;
  if (emotion.healWith) heal = emotions[emotion.healWith];
  const finalMantras = [...heal.mantras].sort(() => 0.5 - Math.random());
  const finalFreqs = heal.frequencies;
  const name = document.getElementById('name-input').value.trim();
  const label = name ? `🔀 ${name}'s Integration 🔀` : '🔀 Integration Complete 🔀';
  box.innerText = `${label}\n${finalMantras[0]}`;

  finalFreqs.forEach(f => window.playTone(f, 1.2));
  updateMandalaShape(heal === emotion ? emotionKey : emotion.healWith);

  setTimeout(() => box.style.display = 'none', 3000);
}

window.addEventListener('load', () => startSpin(3000));

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-button');
  if (installBtn) installBtn.style.display = 'inline-block';
});

document.getElementById('install-button')?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
  }
});

document.getElementById('share-button')?.addEventListener('click', async () => {
  if (navigator.share) {
    await navigator.share({
      title: 'TroEqualizer',
      text: '🌈 Try this healing tone + emotion balancing tool!',
      url: window.location.href
    });
  } else {
    alert('Sharing not supported on this browser.');
  }
});

function isIos() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

window.addEventListener('load', () => {
  if (isIos() && !isInStandaloneMode()) {
    setTimeout(() => {
      document.getElementById('ios-popup')?.classList.remove('hidden');
    }, 2000);
  }
});

