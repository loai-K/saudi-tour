'use strict';
const $ = id => document.getElementById(id);
const rand = n => Math.floor(Math.random() * n);
const pick = list => list[rand(list.length)];
const shuffle = list => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const arNum = n => n.toLocaleString('ar-EG');
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ================= characters ================= */
const SKIN = '#e9b48a';
const HEROES = {
  abdullah: { name: 'عبدالله', hello: 'هلا والله! أنا عبدالله، جاهز نطير ونكتشف مصايف بلادنا؟', excited: 'متحمس' },
  abeer:    { name: 'عبير',    hello: 'يا هلا! أنا عبير، يلا نطير ونكتشف أجمل مصايف بلادنا!', excited: 'متحمسة' }
};

function faceSvg(lashes) {
  return `
    <g fill="none" stroke="#4a3328" stroke-width="3" stroke-linecap="round"><path d="M79 96q7-4 13-1"/><path d="M108 95q6-3 13 1"/></g>
    <g class="eyes">
      <ellipse cx="86" cy="108" rx="5" ry="6.5" fill="#2b1d17"/><ellipse cx="114" cy="108" rx="5" ry="6.5" fill="#2b1d17"/>
      <circle cx="87.8" cy="105.5" r="1.9" fill="#fff"/><circle cx="115.8" cy="105.5" r="1.9" fill="#fff"/>
      ${lashes ? '<path d="M80 104l-5-3M80 108h-5M120 104l5-3M120 108h5" stroke="#2b1d17" stroke-width="2" stroke-linecap="round"/>' : ''}
    </g>
    <circle cx="76" cy="119" r="6.5" fill="#ff8f8f" opacity=".45"/><circle cx="124" cy="119" r="6.5" fill="#ff8f8f" opacity=".45"/>
    <path class="mouth mo-smile" d="M90 122Q100 132 110 122" fill="none" stroke="#8a3b2f" stroke-width="3" stroke-linecap="round"/>
    <g class="mouth mo-happy"><path d="M88 120Q100 138 112 120Z" fill="#8a2f2f"/><ellipse cx="100" cy="128.5" rx="5" ry="2.6" fill="#f58a8a"/></g>
    <path class="mouth mo-sad" d="M92 128Q100 120 108 128" fill="none" stroke="#8a3b2f" stroke-width="3" stroke-linecap="round"/>
    <ellipse class="mouth mo-talk" cx="100" cy="125" rx="5.5" ry="4.5" fill="#8a2f2f"/>`;
}

function arm(side, x, fill, stroke, cuff) {
  return `<g class="arm arm-${side}">
    <rect x="${x - 12}" y="150" width="24" height="68" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    ${cuff ? `<rect x="${x - 12}" y="204" width="24" height="8" fill="${cuff}"/>` : ''}
    <circle cx="${x}" cy="221" r="9.5" fill="${SKIN}"/></g>`;
}

const BODY = {
  // white thobe, red shemagh, black agal
  abdullah: `
    <ellipse cx="84" cy="281" rx="13" ry="6" fill="#6b4a2f"/><ellipse cx="116" cy="281" rx="13" ry="6" fill="#6b4a2f"/>
    ${arm('l', 70, '#fff', '#d8d2c4')}${arm('r', 130, '#fff', '#d8d2c4')}
    <path d="M68 150Q100 140 132 150L148 272Q100 284 52 272Z" fill="#fff" stroke="#d8d2c4" stroke-width="2"/>
    <path d="M100 152V204" stroke="#d8d2c4" stroke-width="2"/>
    <circle cx="100" cy="170" r="2.2" fill="#c9b98f"/><circle cx="100" cy="186" r="2.2" fill="#c9b98f"/>
    <rect x="110" y="178" width="15" height="17" rx="2" fill="none" stroke="#d8d2c4" stroke-width="1.6"/>
    <g class="head">
      <path d="M56 100Q52 44 100 42Q148 44 144 100L152 172Q138 178 128 160L124 132H76L72 160Q62 178 48 172Z" fill="url(#shm)" stroke="#d6b9b4" stroke-width="1.5"/>
      <circle cx="100" cy="104" r="37" fill="${SKIN}"/>
      ${faceSvg(false)}
      <path d="M61 92Q64 50 100 50Q136 50 139 92Q100 76 61 92Z" fill="url(#shm)" stroke="#d6b9b4" stroke-width="1.5"/>
      <g fill="none" stroke="#1c1c1c" stroke-width="6" stroke-linecap="round"><path d="M65 78Q100 50 135 78"/><path d="M63 86Q100 59 137 86"/></g>
    </g>`,
  // embroidered traditional dress with a light scarf
  abeer: `
    <ellipse cx="84" cy="281" rx="13" ry="6" fill="#a8356f"/><ellipse cx="116" cy="281" rx="13" ry="6" fill="#a8356f"/>
    ${arm('l', 70, '#8e4bb5', '#7a3da0', '#f6c453')}${arm('r', 130, '#8e4bb5', '#7a3da0', '#f6c453')}
    <path d="M70 152Q100 142 130 152L156 272Q100 286 44 272Z" fill="#8e4bb5" stroke="#7a3da0" stroke-width="2"/>
    <path d="M100 160V276" stroke="#f6c453" stroke-width="9"/>
    <path d="M100 166V272" stroke="#8e4bb5" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>
    <path d="M47 262Q100 276 153 262" fill="none" stroke="#f6c453" stroke-width="7"/>
    <path d="M45 252Q100 266 155 252" fill="none" stroke="#f6c453" stroke-width="2" stroke-dasharray="3 6"/>
    <g class="head">
      <path d="M58 104Q54 44 100 42Q146 44 142 104Q148 142 134 162Q100 176 66 162Q52 142 58 104Z" fill="#ffc2d6" stroke="#f09bb8" stroke-width="2"/>
      <ellipse cx="100" cy="106" rx="33" ry="35" fill="${SKIN}"/>
      <path d="M68 96Q80 70 100 70Q120 70 132 96Q118 80 100 80Q82 80 68 96Z" fill="#3a2a22"/>
      ${faceSvg(true)}
      <path d="M72 150Q100 166 128 150" fill="none" stroke="#f09bb8" stroke-width="2"/>
      <g transform="translate(134 76)"><circle r="5" cx="0" cy="-6" fill="#fff"/><circle r="5" cx="6" cy="0" fill="#fff"/><circle r="5" cx="0" cy="6" fill="#fff"/><circle r="5" cx="-6" cy="0" fill="#fff"/><circle r="4" fill="#f6c453"/></g>
    </g>`
};

function heroSvg(id, { head = false, mood = 'idle' } = {}) {
  return `<svg class="ch m-${mood}" viewBox="${head ? '46 34 108 116' : '0 0 200 300'}" role="img" aria-label="${HEROES[id].name}">
    ${head ? '' : '<ellipse cx="100" cy="287" rx="52" ry="8" opacity=".16"/>'}
    <g class="all">${BODY[id]}</g></svg>`;
}
const put = (el, id, opts) => { el.innerHTML = heroSvg(id, opts); };
function setMood(el, mood) {
  const svg = el && el.querySelector('.ch');
  if (svg) svg.setAttribute('class', 'ch m-' + mood);
}

// Type text into a bubble while the given figures "talk".
const typing = new WeakMap();
function say(bubble, text, figs = [], after = 'idle') {
  const token = {}, chars = Array.from(text);
  typing.set(bubble, token);
  figs.forEach(f => setMood(f, 'talk'));
  let i = 0;
  return new Promise(done => {
    (function step() {
      if (typing.get(bubble) !== token) return done();
      i += 2;
      bubble.textContent = chars.slice(0, i).join('');
      if (i < chars.length) return setTimeout(step, 26);
      figs.forEach(f => setMood(f, after));
      done();
    })();
  });
}

/* ================= sound ================= */
let audio = null, muted = false;
function tone(freq, at = 0, dur = .15, type = 'triangle', vol = .13, slideTo) {
  if (muted) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + at;
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + .03);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(audio.destination);
    o.start(t); o.stop(t + dur + .05);
  } catch (e) { /* no audio available */ }
}
const sfx = {
  tap:  () => tone(660, 0, .08),
  tick: () => tone(900, 0, .05, 'square', .04),
  ok:   () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .2)),
  bad:  () => tone(230, 0, .28, 'sawtooth', .07, 140),
  fly:  () => { tone(120, 0, 1.4, 'sawtooth', .04, 330); tone(330, 1.4, 1.3, 'sawtooth', .04, 130); },
  land: () => [784, 988].forEach((f, i) => tone(f, i * .12, .18)),
  win:  () => [523, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * .13, .22))
};

/* ================= destinations ================= */
const CITIES = {
  taif: {
    name: 'الطائف', emoji: '🌹', at: [40.42, 21.27], label: [0, -21],
    intro: 'وصلنا الطائف، مدينة الورد! 🌹 الجو هنا عليل فوق الجبال وريحة الورد في كل مكان.',
    qs: [
      { q: 'بماذا تشتهر الطائف حتى سُمّيت «مدينة الورد»؟', a: 'الورد الطائفي', w: ['أشجار جوز الهند', 'اللؤلؤ', 'الثلج'], f: 'الورد الطائفي يُقطف في الربيع ورائحته من أجمل الروائح في العالم.' },
      { q: 'ماذا يُصنع من الورد الطائفي؟', a: 'ماء الورد والعطر', w: ['الخبز', 'الزجاج', 'الحبال'], f: 'تُقطّر بتلات الورد لصنع ماء الورد ودهن الورد الثمين.' },
      { q: 'أي وسيلة ممتعة تنقل الزوار بين أعلى جبل الهدا وأسفله؟', a: 'التلفريك', w: ['الغواصة', 'السفينة', 'القطار السريع'], f: 'عربات التلفريك المعلّقة في الهدا تطل على مناظر جبلية خلّابة.' },
      { q: 'ما اسم السوق التاريخي قرب الطائف الذي كان العرب يلقون فيه الشعر؟', a: 'سوق عكاظ', w: ['سوق الزل', 'سوق القيصرية', 'سوق واقف'], f: 'سوق عكاظ من أشهر أسواق العرب قديمًا، وكان ملتقى الشعراء.' },
      { q: 'أي فاكهة تشتهر بها مزارع الطائف؟', a: 'الرمان', w: ['الأناناس', 'جوز الهند', 'الكيوي'], f: 'الطائف مشهورة بالرمان والعنب والتين اللذيذ.' }
    ]
  },
  abha: {
    name: 'أبها', emoji: '⛰️', at: [42.5, 18.22], label: [36, 5],
    intro: 'هذي أبها البهية! ☁️ السحاب قريب مرّة كأننا نلمسه بيدينا، والجبال خضراء حولنا.',
    qs: [
      { q: 'في أي منطقة تقع مدينة أبها؟', a: 'عسير', w: ['القصيم', 'تبوك', 'حائل'], f: 'أبها هي عاصمة منطقة عسير وتقع فوق جبال السروات.' },
      { q: 'ما اسم فن الزخرفة الملوّن الذي تتزيّن به جدران البيوت في عسير؟', a: 'القط العسيري', w: ['السدو', 'الخوص', 'الفخار'], f: 'القط العسيري فن ترسمه النساء بألوان زاهية، وهو مسجّل في اليونسكو.' },
      { q: 'أي قرية تراثية قريبة من أبها تشتهر ببيوتها الحجرية العالية؟', a: 'رجال ألمع', w: ['العلا', 'الدرعية', 'أشيقر'], f: 'قرية رجال ألمع عمرها مئات السنين وبيوتها مثل القلاع الحجرية.' },
      { q: 'ما اسم الجبل العالي قرب أبها الذي يرى الزوار السحاب من فوقه؟', a: 'جبل السودة', w: ['جبل أحد', 'جبل طويق', 'جبل اللوز'], f: 'السودة من أعلى الأماكن في المملكة، وتغطيها أشجار العرعر.' },
      { q: 'كيف يكون الجو في أبها في فصل الصيف؟', a: 'معتدل مع ضباب ومطر', w: ['حار جدًا', 'ثلوج دائمة', 'عواصف رملية'], f: 'لهذا يحب الناس زيارة أبها في الصيف والاستمتاع بالضباب والمطر.' }
    ]
  },
  baha: {
    name: 'الباحة', emoji: '🌲', at: [41.47, 20.01], label: [40, 5],
    intro: 'يا سلام على الباحة! 🌲 غابات خضراء وقرى حجرية قديمة بين الجبال.',
    qs: [
      { q: 'ما اسم الغابة المشهورة في الباحة؟', a: 'غابة رغدان', w: ['غابة الأمازون', 'غابة النخيل', 'غابة المانغروف'], f: 'غابة رغدان مليئة بالأشجار والمسارات الجميلة والإطلالات الجبلية.' },
      { q: 'بيوت قرية ذي عين الأثرية مبنية من…', a: 'الحجر', w: ['الخشب', 'الزجاج', 'الحديد'], f: 'قرية ذي عين مبنية بالحجر فوق تلة بيضاء، وعمرها مئات السنين.' },
      { q: 'أي فاكهة تُزرع في مزارع قرية ذي عين؟', a: 'الموز', w: ['التفاح', 'الفراولة', 'الكرز'], f: 'عين الماء الجارية في القرية تسقي مزارع الموز والريحان.' },
      { q: 'أي نوع من الأشجار يغطي جبال الباحة؟', a: 'العرعر', w: ['جوز الهند', 'الصبار العملاق', 'الخيزران'], f: 'أشجار العرعر دائمة الخضرة وتعيش مئات السنين في جبال السروات.' },
      { q: 'بأي منتج لذيذ تشتهر الباحة ويصنعه النحل؟', a: 'العسل', w: ['الجبن', 'السكر', 'الزيت'], f: 'عسل الباحة مشهور بجودته، ويُقام له مهرجان كل سنة.' }
    ]
  },
  jazan: {
    name: 'جازان', emoji: '🏝️', at: [42.55, 16.89], label: [-34, 12],
    intro: 'حيّاكم في جازان! 🏝️ بحر وجزر وجبال خضراء ومانجو لذيذة.',
    qs: [
      { q: 'على أي بحر تطل جازان؟', a: 'البحر الأحمر', w: ['الخليج العربي', 'البحر المتوسط', 'بحر العرب'], f: 'جازان تطل على البحر الأحمر المليء بالشعاب المرجانية الملونة.' },
      { q: 'ما اسم الجزر المشهورة التابعة لجازان؟', a: 'جزر فرسان', w: ['جزر المالديف', 'جزر الكناري', 'جزر هاواي'], f: 'جزر فرسان محمية طبيعية جميلة نصل إليها بالعبّارة.' },
      { q: 'أي فاكهة استوائية تشتهر بها مزارع جازان؟', a: 'المانجو', w: ['التفاح', 'الكرز', 'الكمثرى'], f: 'جازان تزرع أنواعًا كثيرة من المانجو ولها مهرجان خاص.' },
      { q: 'ما اسم الجبال الخضراء في جازان المشهورة بزراعة البن؟', a: 'جبال فيفا', w: ['جبال الألب', 'جبال طويق', 'جبال الهملايا'], f: 'في جبال فيفا مدرجات زراعية يُزرع فيها البن الخولاني السعودي.' },
      { q: 'أي حيوان رشيق يعيش في محمية جزر فرسان؟', a: 'الغزال', w: ['البطريق', 'الدب', 'الكنغر'], f: 'غزال فرسان يعيش بحرية في الجزر وهو محميّ.' }
    ]
  },
  najran: {
    name: 'نجران', emoji: '🏰', at: [44.13, 17.49], label: [40, 5],
    intro: 'وصلنا نجران! 🏰 أرض القصور الطينية والنخيل والآثار القديمة.',
    qs: [
      { q: 'ما اسم الموقع الأثري القديم المشهور في نجران؟', a: 'الأخدود', w: ['الأهرامات', 'البتراء', 'تدمر'], f: 'موقع الأخدود الأثري عمره أكثر من ألفي سنة.' },
      { q: 'قصر الإمارة التاريخي في نجران مبني من…', a: 'الطين', w: ['الزجاج', 'الحديد', 'الثلج'], f: 'بيوت وقصور نجران الطينية تبقى باردة في الصيف ودافئة في الشتاء.' },
      { q: 'ما اسم السد الكبير الموجود في نجران؟', a: 'سد وادي نجران', w: ['سد مأرب', 'السد العالي', 'سد الفرات'], f: 'سد وادي نجران من أكبر السدود في المملكة ويقع بين الجبال.' },
      { q: 'أي شجرة تنتشر كثيرًا في مزارع نجران؟', a: 'النخيل', w: ['الصنوبر', 'القيقب', 'الخيزران'], f: 'تشتهر نجران بالنخيل وبالحمضيات مثل البرتقال واليوسفي.' },
      { q: 'في أي جهة من المملكة تقع نجران؟', a: 'الجنوب', w: ['الشمال', 'الشرق', 'الغرب'], f: 'نجران في جنوب المملكة، قريبة من صحراء الربع الخالي.' }
    ]
  }
};
const CITY_IDS = Object.keys(CITIES);
const HOME = { name: 'الرياض', at: [46.7, 24.7] };

const PRAISE = ['أحسنت يا بطل! 🎉', 'إجابة صحيحة! ما شاء الله 👏', 'ممتاز! كفو عليك ⭐', 'صح صح صح! 🎯'];
const CHEER_UP = ['قريبة! جرّب مرة ثانية 💪', 'مو هذي… فكّر شوي وأنا معك 🤔', 'ولا يهمك، حاول مرة ثانية!'];
const TAPS = ['هههه! دغدغتني 😄', 'يلا نكمل الرحلة!', 'أحب السفر في بلادي 🇸🇦', 'ركّز… أنت قدّها! 💪'];

/* ================= backdrops ================= */
const tree = (x, y, s = 1, c = '#2f7d4f') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2.5" y="-6" width="5" height="14" fill="#7a5230"/><path d="M0-44L14-4H-14Z" fill="${c}"/><path d="M0-58L10-24H-10Z" fill="${c}"/></g>`;
const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0Q5-30-2-60" stroke="#8a5a2b" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="none" stroke="#2f8f4e" stroke-width="5" stroke-linecap="round"><path d="M-2-60Q-22-72-34-54"/><path d="M-2-60Q18-74 32-56"/><path d="M-2-60Q-14-84-30-80"/><path d="M-2-60Q12-86 28-82"/><path d="M-2-60Q0-82 2-92"/></g></g>`;
const cloud = (x, y, s = 1, o = .9) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity="${o}"><ellipse rx="26" ry="11"/><ellipse cx="-14" cy="-8" rx="13" ry="10"/><ellipse cx="8" cy="-11" rx="16" ry="12"/></g>`;
const cable = (x1, y1, x2, y2) => {
  const car = t => { const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; return `<path d="M${x} ${y}v8" stroke="#555" stroke-width="1.5"/><rect x="${x - 8}" y="${y + 8}" width="16" height="12" rx="3" fill="#e2574c"/><rect x="${x - 5}" y="${y + 10}" width="10" height="5" fill="#dff3ff"/>`; };
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#555" stroke-width="1.5"/>${car(.3)}${car(.68)}`;
};
const rose = (x, y) => `<ellipse cx="${x}" cy="${y + 9}" rx="17" ry="11" fill="#3f9457"/><circle cx="${x - 8}" cy="${y + 2}" r="6" fill="#ff5c8a"/><circle cx="${x - 8}" cy="${y + 2}" r="2.6" fill="#d6336c"/><circle cx="${x + 7}" cy="${y}" r="6.5" fill="#ff7aa2"/><circle cx="${x + 7}" cy="${y}" r="2.8" fill="#d6336c"/><circle cx="${x}" cy="${y + 10}" r="5.5" fill="#ff5c8a"/><circle cx="${x}" cy="${y + 10}" r="2.4" fill="#d6336c"/>`;
const house = (x, y, w, h) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#b08b63" stroke="#8d6c48"/><rect x="${x}" y="${y - h}" width="${w}" height="4" fill="#fff"/><rect x="${x}" y="${y - h + 8}" width="${w}" height="3" fill="#e2574c"/><rect x="${x}" y="${y - h + 13}" width="${w}" height="3" fill="#f8b93a"/><rect x="${x}" y="${y - h + 18}" width="${w}" height="3" fill="#2fae6b"/><rect x="${x + w / 2 - 4}" y="${y - 13}" width="8" height="13" fill="#5a4129"/>`;
const tier = (x, y, w, h) => { let teeth = ''; for (let i = 0; i < w; i += 8) teeth += `<path d="M${x + i} ${y - h}l4-7 4 7Z" fill="#fff"/>`; let wins = ''; for (let i = 10; i < w - 6; i += 16) wins += `<rect x="${x + i}" y="${y - h + 10}" width="6" height="10" rx="3" fill="#5a3d22" stroke="#fff" stroke-width="1.5"/>`; return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#c08a55" stroke="#a06f3f"/>${teeth}${wins}`; };

const BACKDROPS = {
  taif: () => `<rect width="400" height="260" fill="#ffdbe8"/><circle cx="70" cy="56" r="26" fill="#fff4c2"/>${cloud(170, 40, .8)}${cloud(320, 70, .6)}
    <path d="M0 150L60 90 120 140 190 70 260 130 330 80 400 140V260H0Z" fill="#d7a9cc"/>
    <path d="M0 190Q100 140 200 180T400 170V260H0Z" fill="#84c48f"/><path d="M0 222Q200 198 400 224V260H0Z" fill="#5aa86a"/>
    ${cable(190, 72, 16, 176)}${rose(40, 214)}${rose(110, 226)}${rose(180, 212)}${rose(250, 228)}${rose(330, 214)}`,
  abha: () => `<rect width="400" height="260" fill="#cfeaf7"/>${cloud(80, 44, 1)}${cloud(300, 52, .8)}
    <path d="M0 140L70 80 150 130 230 60 310 120 400 70V260H0Z" fill="#9cc7b0"/>
    ${cloud(150, 128, 1.5, .7)}${cloud(330, 136, 1.2, .7)}
    <path d="M0 184Q80 124 170 172T330 152 400 164V260H0Z" fill="#5fa777"/>
    <path d="M20 190Q90 150 160 186M190 180Q260 150 330 168" fill="none" stroke="#8fd0a0" stroke-width="3"/>
    <path d="M0 226Q200 200 400 228V260H0Z" fill="#3f8c5c"/>
    ${cable(232, 62, 30, 150)}${house(40, 222, 34, 40)}${house(82, 226, 28, 30)}${house(150, 222, 36, 46)}${tree(214, 226, .6)}${tree(120, 230, .5)}`,
  baha: () => `<rect width="400" height="260" fill="#dcf3e6"/><circle cx="330" cy="50" r="24" fill="#fff4c2"/>${cloud(110, 46, .9)}
    <path d="M0 150Q70 90 150 140T300 120 400 140V260H0Z" fill="#8cc79a"/>
    ${tree(30, 150, .7, '#3d8a58')}${tree(250, 132, .7, '#3d8a58')}${tree(290, 130, .8, '#3d8a58')}${tree(350, 140, .7, '#3d8a58')}
    <path d="M0 200Q120 160 240 196T400 186V260H0Z" fill="#4e9e68"/>
    <g transform="translate(150 200)"><path d="M-16 0L-11-74H11L16 0Z" fill="#9a8f84" stroke="#786f66"/><path d="M-13-50H13M-12-30H14M-12-64H12" stroke="#fff" stroke-width="3"/><rect x="-3" y="-44" width="6" height="9" fill="#3b342e"/></g>
    <g fill="#a79c90" stroke="#786f66"><rect x="182" y="174" width="26" height="26"/><rect x="204" y="160" width="24" height="40"/><rect x="92" y="180" width="28" height="22"/></g>
    ${tree(40, 224, 1)}${tree(84, 236, .8)}${tree(250, 228, 1.1)}${tree(300, 240, .9)}${tree(350, 226, 1)}
    <path d="M0 240Q200 224 400 242V260H0Z" fill="#3b8554"/>`,
  jazan: () => `<rect width="400" height="260" fill="#ffe7b0"/><circle cx="290" cy="78" r="32" fill="#ffb347"/>${cloud(90, 40, .8)}
    <path d="M0 150L50 96 96 132 140 104 190 150Z" fill="#5fa777"/>
    <rect y="148" width="400" height="112" fill="#39a9db"/>
    <path d="M10 170q10-7 20 0t20 0M240 164q10-7 20 0t20 0M150 214q10-7 20 0t20 0M320 206q10-7 20 0t20 0" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="96" cy="170" rx="54" ry="11" fill="#f4dfa6"/>${palm(84, 170, .8)}${palm(118, 170, .6)}
    <g transform="translate(230 196)"><path d="M-34 0H34L24 14H-24Z" fill="#8a5a2b"/><path d="M0-52V0" stroke="#5a3d22" stroke-width="3"/><path d="M2-50L30-6H2Z" fill="#fff"/><path d="M-2-44L-22-6H-2Z" fill="#fde9c9"/></g>
    <path d="M150 238l12-6v12Zm8-2a9 6 0 1 0 0 .1" fill="#ff8a4c"/>
    <path d="M0 236Q200 214 400 240V260H0Z" fill="#f4dfa6"/>`,
  najran: () => `<rect width="400" height="260" fill="#ffe9c7"/><circle cx="64" cy="54" r="26" fill="#ffd27a"/>${cloud(300, 44, .8)}
    <path d="M0 160L70 100 140 150 220 96 300 148 360 112 400 140V260H0Z" fill="#dba86c"/>
    <path d="M0 196Q200 170 400 198V260H0Z" fill="#edc98a"/>
    ${tier(84, 218, 150, 56)}${tier(108, 162, 102, 40)}${tier(134, 122, 50, 32)}
    <rect x="150" y="190" width="18" height="28" rx="9" fill="#5a3d22"/>
    ${palm(52, 224, 1)}${palm(262, 226, 1.1)}${palm(310, 218, .8)}${palm(22, 216, .7)}
    <path d="M0 236Q200 218 400 238V260H0Z" fill="#e2b872"/>`
};

/* ================= map ================= */
const proj = ([lon, lat]) => [+((lon - 37.2) * 34).toFixed(1), +((26.6 - lat) * 36.4).toFixed(1)];
const pts = list => list.map(p => proj(p).join(' ')).join('L');
const COAST = [[42.8, 16.4], [42.55, 16.9], [42, 17.7], [41.2, 19], [40.7, 19.8], [39.7, 20.6], [39.15, 21.4], [38.95, 22.3], [38.05, 24.1], [37.2, 25], [36.6, 25.9], [35.6, 27.3], [35.2, 28], [34.6, 28.1]];
const BORDER = [[34.9, 29.4], [36.1, 29.2], [37.5, 30], [38, 30.5], [37, 31.5], [39.2, 32.15], [40.4, 31.9], [42.1, 31.1], [44.7, 29.2], [46.4, 29.1], [47.45, 29], [47.7, 28.5], [48.4, 28.55], [48.9, 27.6], [49.3, 27.2], [50.2, 26.6], [50.15, 25.9], [50.8, 24.75], [51.6, 24.1], [52.6, 22.95], [55.1, 22.6], [55.67, 22], [55, 20], [52, 19], [49.1, 18.6], [48.2, 18.2], [47.5, 17.1], [47, 16.95], [46.75, 17.3], [45.4, 17.3], [44.6, 17.4], [43.4, 17.55], [43.1, 16.65]];

function pinSvg(id, xy, emoji, name, label, cls = '') {
  return `<g class="pin ${cls}" id="pin-${id}" transform="translate(${xy[0]} ${xy[1]})">
    <circle class="pin-bg" r="14"/><text y="5.5" text-anchor="middle" font-size="15">${emoji}</text>
    <g class="tick"><circle cx="11" cy="-11" r="7" fill="#2fae6b" stroke="#fff" stroke-width="1.5"/><path d="M7.5-11l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
    <text class="pin-label" x="${label[0]}" y="${label[1]}" text-anchor="middle">${name}</text></g>`;
}

function buildMap() {
  let hills = '';
  [[40.9, 21.6], [41.2, 20.6], [41.9, 19.4], [42.3, 18.9], [43, 17.9], [43.3, 18.6], [42, 20.3]].forEach(p => {
    const [x, y] = proj(p);
    hills += `<path d="M${x - 9} ${y}l9-13 9 13Z" fill="#9fcf8f"/><path d="M${x - 3} ${y - 9}l3-4 3 4Z" fill="#fff"/>`;
  });
  $('map').innerHTML = `
    <rect x="-400" y="-400" width="1200" height="1200" fill="#eadfc6"/>
    <path d="M${pts([...BORDER, ...COAST])}Z" fill="#ffe9a8" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
    <path d="M${pts([...COAST, [20, 34], [20, 5], [43.6, 5], [43.2, 15]])}Z" fill="#6cc5f0"/>
    <path d="M${pts(COAST)}" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" opacity=".8"/>
    <g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M22 250q7-5 14 0t14 0M60 330q7-5 14 0t14 0M30 120q7-5 14 0t14 0M96 372q7-5 14 0t14 0"/></g>
    <text x="44" y="296" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="inherit">البحر الأحمر</text>
    <ellipse cx="${proj([41.9, 16.75])[0]}" cy="${proj([41.9, 16.75])[1]}" rx="7" ry="4" fill="#ffe9a8"/>
    ${hills}
    <g id="trails"></g>
    ${pinSvg('home', proj(HOME.at), '🏠', HOME.name, [0, -20])}
    ${CITY_IDS.map(id => { const c = CITIES[id]; return pinSvg(id, proj(c.at), c.emoji, c.name, c.label); }).join('')}
    <g id="plane"><ellipse cx="2" cy="10" rx="17" ry="5" opacity=".15"/>
      <path d="M3 0L-7-17H-11L-5 0-11 17H-7Z" fill="#fff" stroke="#0b7a5c" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M-13 0L-18-7H-20L-17 0-20 7H-18Z" fill="#0b7a5c"/>
      <ellipse rx="18" ry="5" fill="#fff" stroke="#0b7a5c" stroke-width="1.5"/>
      <path d="M11-2.6Q16 0 11 2.6Z" fill="#39a9db"/><path d="M-10 0H6" stroke="#0b7a5c" stroke-width="1.5"/></g>`;
}

function placePlane([x, y], angle = -120, scale = 1) {
  $('plane').setAttribute('transform', `translate(${x} ${y}) rotate(${angle}) scale(${scale})`);
}

function flyPlane(from, to) {
  const dx = to[0] - from[0], dy = to[1] - from[1];
  // bend the route towards whichever side keeps it nearer the middle of the map
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  const side = [1, -1].map(s => [mid[0] - dy * .32 * s, mid[1] + dx * .32 * s])
    .sort((a, b) => Math.hypot(a[0] - 200, a[1] - 210) - Math.hypot(b[0] - 200, b[1] - 210))[0];
  const at = t => [0, 1].map(k => (1 - t) * (1 - t) * from[k] + 2 * (1 - t) * t * side[k] + t * t * to[k]);
  document.querySelectorAll('.trail').forEach(t => t.classList.add('old'));
  const trail = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  trail.setAttribute('class', 'trail');
  $('trails').appendChild(trail);
  let d = `M${from[0]} ${from[1]}`;
  const dur = 2700, t0 = performance.now();
  return new Promise(done => {
    (function frame(now) {
      const raw = Math.min(1, (now - t0) / dur);
      const t = raw < .5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      const p = at(t), q = at(Math.min(1, t + .01)), prev = at(Math.max(0, t - .01));
      d += `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      trail.setAttribute('d', d);
      placePlane(p, Math.atan2(q[1] - prev[1], q[0] - prev[0]) * 180 / Math.PI, 1 + .7 * Math.sin(Math.PI * t));
      raw < 1 ? requestAnimationFrame(frame) : done();
    })(t0);
  });
}

/* ================= game ================= */
const G = { hero: null, left: [], pos: null, stars: 0, city: null, q: null, tries: 3, busy: false };

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  $('hud').classList.toggle('hide', id === 's-start' || id === 's-end');
}

function confetti(n = 36) {
  const bits = ['🎉', '⭐', '🌹', '✨', '🎈', '💚'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('i');
    el.textContent = pick(bits);
    el.style.cssText = `left:${rand(100)}%;font-size:${16 + rand(18)}px;animation-duration:${1.6 + Math.random() * 1.6}s;animation-delay:${Math.random() * .4}s`;
    $('fx').appendChild(el);
    setTimeout(() => el.remove(), 3800);
  }
}

/* ---- start screen ---- */
const cards = [...document.querySelectorAll('.hero-card')];
cards.forEach(card => {
  put(card.querySelector('.fig'), card.dataset.hero);
  card.onclick = () => chooseHero(card.dataset.hero);
});

function chooseHero(id) {
  sfx.tap();
  G.hero = id;
  cards.forEach(c => {
    const mine = c.dataset.hero === id;
    c.classList.toggle('sel', mine);
    c.classList.toggle('unsel', !mine);
    setMood(c, mine ? 'happy' : 'idle');
  });
  const mine = cards.find(c => c.dataset.hero === id);
  setTimeout(() => { if (G.hero === id) say($('pickSay'), HEROES[id].hello, [mine], 'wave'); }, 650);
  $('goBtn').disabled = false;
  $('goBtn').classList.add('pulse');
  $('goBtn').textContent = `سافر مع ${HEROES[id].name} ✈️`;
}

$('goBtn').onclick = () => {
  if (!G.hero) return;
  sfx.ok();
  G.left = [...CITY_IDS]; G.stars = 0; G.pos = proj(HOME.at); G.busy = false;
  put($('hudFace'), G.hero, { head: true });
  put($('cabinFace'), G.hero, { head: true });
  $('stamps').innerHTML = CITY_IDS.map(id => `<span class="stamp" id="st-${id}" title="${CITIES[id].name}">${CITIES[id].emoji}</span>`).join('');
  $('stars').textContent = '⭐ ' + arNum(0);
  buildMap();
  placePlane(G.pos);
  openMap(false);
};

/* ---- map screen ---- */
function openMap(autoFly) {
  show('s-map');
  const n = G.left.length;
  $('mapTitle').textContent = n === CITY_IDS.length ? 'خمس مصايف بانتظارنا! 🗺️' : n === 1 ? 'باقي محطة واحدة! 🗺️' : `باقي ${arNum(n)} محطات 🗺️`;
  $('flyBtn').classList.toggle('hide', autoFly);
  $('flyBtn').disabled = false;
  if (autoFly) return takeOff();
  say($('cabinSay'), `أنا ${HEROES[G.hero].excited}! اضغط «أقلع» ونشوف وين تاخذنا الطيارة 😍`, [$('cabinFace')]);
}

$('flyBtn').onclick = () => takeOff();

async function takeOff() {
  if (G.busy) return;
  G.busy = true;
  $('flyBtn').disabled = true;
  const dest = pick(G.left);
  say($('cabinSay'), 'يا ترى وين المحطة الجاية؟ 🤔', [$('cabinFace')]);

  // roulette over the remaining pins, slowing down onto the destination
  const ring = G.left.length > 1 ? G.left : [];
  const spins = ring.length ? ring.length * 2 + ring.indexOf(dest) + 1 : 0;
  for (let i = 0; i < spins; i++) {
    ring.forEach((id, k) => $('pin-' + id).classList.toggle('lit', k === i % ring.length));
    sfx.tick();
    await wait(90 + i * 22);
  }
  ring.forEach(id => $('pin-' + id).classList.remove('lit'));
  $('pin-' + dest).classList.add('target');
  sfx.land();

  const city = CITIES[dest];
  setMood($('cabinFace'), 'happy');
  $('cabinSay').textContent = `طايرين إلى ${city.name}! ${city.emoji} اربطوا الأحزمة ✈️`;
  typing.set($('cabinSay'), null);
  await wait(900);
  sfx.fly();
  const to = proj(city.at);
  await flyPlane(G.pos, to);
  G.pos = to;
  G.left = G.left.filter(id => id !== dest);
  $('pin-' + dest).classList.remove('target');
  $('pin-' + dest).classList.add('done');
  sfx.land();
  await wait(700);
  G.busy = false;
  openScene(dest);
}

/* ---- scene screen ---- */
function openScene(id) {
  const city = CITIES[id];
  G.city = id; G.q = null;
  show('s-scene');
  $('backdrop').innerHTML = `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${BACKDROPS[id]()}</svg>`;
  $('cityName').textContent = `${city.emoji} ${city.name}`;
  put($('heroStand'), G.hero, { mood: 'wave' });
  $('heroStand').classList.remove('enter');
  void $('heroStand').offsetWidth;
  $('heroStand').classList.add('enter');
  $('qcard').classList.add('hide');
  $('stageSay').textContent = '';
  const btn = $('sceneBtn');
  btn.classList.remove('hide', 'green');
  btn.classList.add('pulse');
  btn.textContent = 'هات السؤال! 🎯';
  btn.onclick = askQuestion;
  setTimeout(() => { if (G.city === id && !G.q) say($('stageSay'), city.intro, [$('heroStand')]); }, 700);
}

function askQuestion() {
  sfx.tap();
  const city = CITIES[G.city];
  G.q = pick(city.qs);
  G.tries = 3;
  $('sceneBtn').classList.add('hide');
  $('qcard').classList.remove('hide');
  $('qFoot').classList.remove('hide');
  $('qPrompt').textContent = G.q.q;
  $('tries').textContent = '⭐⭐⭐';
  $('hintBtn').disabled = false;
  $('hintBtn').textContent = `💡 ساعدني يا ${HEROES[G.hero].name}`;
  const box = $('answers');
  box.className = 'answers';
  box.innerHTML = '';
  shuffle([G.q.a, ...G.q.w]).forEach(text => {
    const b = document.createElement('button');
    b.className = 'ans';
    b.textContent = text;
    b.onclick = () => answer(b, text);
    box.appendChild(b);
  });
  say($('stageSay'), 'ركّز معي واختر الإجابة الصحيحة 👇', [$('heroStand')]);
}

function answer(btn, text) {
  if (G.busy || btn.disabled) return;
  const hero = $('heroStand');
  if (text !== G.q.a) {
    sfx.bad();
    btn.classList.add('wrong');
    btn.disabled = true;
    G.tries = Math.max(1, G.tries - 1);
    $('tries').textContent = '⭐'.repeat(G.tries);
    typing.set($('stageSay'), null);
    $('stageSay').textContent = pick(CHEER_UP);
    setMood(hero, 'sad');
    setTimeout(() => { if (!G.busy) setMood(hero, 'idle'); }, 1300);
    return;
  }
  G.busy = true;
  sfx.ok();
  confetti();
  btn.classList.add('correct');
  $('answers').classList.add('solved');
  $('qFoot').classList.add('hide');
  G.stars += G.tries;
  $('stars').textContent = '⭐ ' + arNum(G.stars);
  $('st-' + G.city).classList.add('got');
  setMood(hero, 'happy');
  typing.set($('stageSay'), null);
  $('stageSay').textContent = pick(PRAISE);
  setTimeout(() => {
    say($('stageSay'), G.q.f, [hero]);
    const last = !G.left.length, next = $('sceneBtn');
    next.classList.remove('hide');
    next.classList.toggle('green', last);
    next.textContent = last ? 'شوف النتيجة 🏆' : 'إلى المحطة التالية ✈️';
    next.onclick = () => { sfx.tap(); G.busy = false; last ? finish() : openMap(true); };
  }, 1300);
}

$('hintBtn').onclick = () => {
  const wrong = [...document.querySelectorAll('.ans')].filter(b => !b.disabled && b.textContent !== G.q.a);
  if (!wrong.length) return;
  sfx.tap();
  const out = pick(wrong);
  out.classList.add('out');
  out.disabled = true;
  $('hintBtn').disabled = true;
  say($('stageSay'), `أكيد مو «${out.textContent}»! 😉`, [$('heroStand')]);
};

$('heroStand').onclick = () => {
  if (G.busy) return;
  sfx.tap();
  setMood($('heroStand'), 'happy');
  typing.set($('stageSay'), null);
  $('stageSay').textContent = pick(TAPS);
  setTimeout(() => { if (!G.busy) setMood($('heroStand'), 'idle'); }, 900);
};

/* ---- end screen ---- */
function finish() {
  show('s-end');
  sfx.win();
  confetti(70);
  const max = CITY_IDS.length * 3, other = G.hero === 'abdullah' ? 'abeer' : 'abdullah';
  $('endRank').textContent = G.stars >= max - 2 ? '🏆 مستكشف ذهبي' : G.stars >= max - 6 ? '🥈 مستكشف ماهر' : '🌟 مستكشف واعد';
  $('endStars').textContent = `⭐ ${arNum(G.stars)} من ${arNum(max)}`;
  put($('endA'), G.hero, { mood: 'happy' });
  put($('endB'), other, { mood: 'wave' });
  say($('endSay'), `زرنا الطائف وأبها والباحة وجازان ونجران! شكرًا لأنك سافرت مع ${HEROES[G.hero].name}، و${HEROES[other].name} بانتظارك في الرحلة الجاية 💚`, [], 'idle');
}

$('againBtn').onclick = () => {
  sfx.tap();
  G.hero = null;
  cards.forEach(c => { c.classList.remove('sel', 'unsel'); setMood(c, 'idle'); });
  typing.set($('pickSay'), null);
  $('pickSay').textContent = 'مين يسافر معك هذي المرة؟ 👆';
  $('goBtn').disabled = true;
  $('goBtn').classList.remove('pulse');
  $('goBtn').textContent = 'اختر شخصية للبدء';
  show('s-start');
};

/* ---- sound toggle & QR ---- */
$('muteBtn').onclick = () => { muted = !muted; $('muteBtn').textContent = muted ? '🔇' : '🔊'; };

// background music: off until the player turns it on
const music = new Audio('assets/saudi-arabia.mp3');
music.loop = true;
music.volume = .35;
music.preload = 'none';
function showMusic(on) {
  document.querySelectorAll('.music-btn').forEach(b => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  $('musicBtn2').textContent = on ? '🎵 إيقاف الموسيقى' : '🎵 تشغيل الموسيقى';
}
function toggleMusic() {
  if (music.paused) music.play().then(() => showMusic(true), () => showMusic(false));
  else { music.pause(); showMusic(false); }
}
$('musicBtn').onclick = $('musicBtn2').onclick = toggleMusic;
// keep it from playing on while the phone is locked or the tab is in the background
let resumeMusic = false;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { resumeMusic = !music.paused; music.pause(); }
  else if (resumeMusic) music.play().catch(() => showMusic(false));
});

function openQR() {
  sfx.tap();
  const url = location.href.split(/[?#]/)[0];
  const local = location.protocol === 'file:' || /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname);
  if (window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    $('qrBox').innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    $('qrBox').classList.remove('hide');
  } else {
    $('qrBox').classList.add('hide');
  }
  $('qrNote').textContent = local
    ? '⚠️ اللعبة مفتوحة الآن من هذا الجهاز فقط. انشرها على الإنترنت ثم افتح هذه النافذة ليعمل الرمز على الجوالات.'
    : window.qrcode ? 'وجّه كاميرا الجوال نحو الرمز لتبدأ اللعب.' : url;
  $('qrModal').classList.add('on');
}
$('qrBtn').onclick = $('qrBtn2').onclick = openQR;
$('qrClose').onclick = () => $('qrModal').classList.remove('on');
$('qrModal').onclick = e => { if (e.target === $('qrModal')) $('qrModal').classList.remove('on'); };
