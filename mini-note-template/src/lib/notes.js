// src/lib/notes.js — sample notes data + filter/sort/persist helpers.
// Notes live in localStorage under 'nimbus:notes' so edits survive across
// the list and detail pages without a backend.
(function () {
  const KEY = 'nimbus:notes';

  const TAGS = ['research', 'product', 'engineering', 'design', 'meeting', 'personal', 'reading', 'idea'];

  const SAMPLE = [
    { id: 'n01', title: 'Search relevance: BM25 vs hybrid retrieval', tags: ['engineering','research'], starred: true,  shared: false, archived: false,
      excerpt: 'Hybrid retrieval (BM25 + dense) wins on long-tail queries. Cohere\u2019s reranker bumps NDCG by ~14% on internal benchmark.',
      content: '# Search relevance\n\nHybrid retrieval beats BM25 alone on long-tail queries. Reranker adds another 14% NDCG.\n\n- **Setup**: 12k notes, 800 queries\n- **Baseline**: BM25 with bigram phrasing\n- **Hybrid**: alpha=0.6 dense, alpha=0.4 sparse\n- **Reranker**: Cohere rerank-english-v3\n\n## Findings\n\n1. Hybrid is best for queries 4+ tokens\n2. BM25 still wins on exact-match queries\n3. Reranker is dominant signal for top-3 precision\n\n> "The wins come from the tail, not the head."\n\nNext: try ColBERT v2 once we have GPU budget.',
      created: '2026-04-22T09:14:00Z', updated: '2026-05-04T16:42:00Z' },
    { id: 'n02', title: 'Q2 product review — themes & misses', tags: ['product','meeting'], starred: false, shared: true,  archived: false,
      excerpt: 'Three themes: search, mobile, and onboarding. Missed: API rate-limit redesign. Carry into Q3.',
      content: '# Q2 product review\n\n## What shipped\n- Hybrid search (n01)\n- Mobile gestures redesign\n- New onboarding flow\n\n## What slipped\n- API rate-limit redesign\n- Calendar v2\n\n## Takeaways\n- We over-indexed on search; mobile felt thin.\n- Onboarding completion 41% \u2192 67%, but day-7 retention only +2pp.',
      created: '2026-04-30T15:00:00Z', updated: '2026-05-02T10:08:00Z' },
    { id: 'n03', title: 'Reading: "The Beginning of Infinity"', tags: ['reading','personal'], starred: true,  shared: false, archived: false,
      excerpt: 'Deutsch on universal explainers. Knowledge as the kind of information that, once created, tends to persist.',
      content: '# The Beginning of Infinity\n\nKey arguments:\n\n- Good explanations are hard to vary\n- Universal explainers \u2192 unbounded reach\n- Knowledge persists because it causes things that protect it\n\nFavourite chapter: "The Spark."',
      created: '2026-04-12T20:30:00Z', updated: '2026-04-29T22:14:00Z' },
    { id: 'n04', title: 'Design crit \u2014 settings v3', tags: ['design','meeting'], starred: false, shared: true, archived: false,
      excerpt: 'Settings should feel like a single document, not a tree. Sidebar is fine; we don\u2019t need tabs.',
      content: '# Settings v3 crit\n\n- One scrollable surface > nested tabs\n- Sidebar pins the section as scroll-spy\n- Save is implicit on blur, with toast confirmation\n\n## Open questions\n- Where do destructive actions live? (current: bottom)\n- Do we expose advanced toggles by default?',
      created: '2026-04-25T11:00:00Z', updated: '2026-05-01T09:21:00Z' },
    { id: 'n05', title: 'Idea: weekly review template', tags: ['idea','personal'], starred: false, shared: false, archived: false,
      excerpt: 'Three columns: what shipped, what stuck, what to drop. Friday afternoon, 25 minutes.',
      content: '# Weekly review template\n\nThree columns, 25 min, Friday 16:30:\n\n- **Shipped**: things in production\n- **Stuck**: blocked or dragging\n- **Drop**: not worth carrying into next week',
      created: '2026-05-01T17:00:00Z', updated: '2026-05-03T08:00:00Z' },
    { id: 'n06', title: 'Hiring loop \u2014 staff PE rubric', tags: ['engineering','product'], starred: false, shared: true,  archived: false,
      excerpt: 'Four signals: scope, taste, leverage, calibration. Drop "culture fit" \u2014 it\u2019s a proxy.',
      content: '# Staff PE hiring rubric\n\n## Signals\n1. Scope \u2014 size of problems they own end-to-end\n2. Taste \u2014 quality bar in details\n3. Leverage \u2014 do they make others better?\n4. Calibration \u2014 self-assessment matches reality?\n\nDropped "culture fit" \u2014 it\u2019s a proxy for similarity.',
      created: '2026-04-18T13:00:00Z', updated: '2026-04-28T14:15:00Z' },
    { id: 'n07', title: 'Mobile gestures \u2014 user testing notes', tags: ['design','research'], starred: true, shared: false, archived: false,
      excerpt: '6/8 testers discovered swipe-to-archive without prompting. Pull-to-refresh confused 3/8.',
      content: '# Mobile gesture user testing\n\n8 participants, think-aloud, 30 min each.\n\n## Discoverability\n- Swipe-archive: 6/8 found unprompted\n- Long-press: 4/8\n- Pull-to-refresh: 5/8 but 3/8 confused with reload\n\n## Pain points\n- Tappable area on the chip row was too tight\n- Two-finger gestures conflict with iOS system',
      created: '2026-04-08T10:30:00Z', updated: '2026-04-26T17:50:00Z' },
    { id: 'n08', title: '1:1 with Vera \u2014 May 5', tags: ['meeting','personal'], starred: false, shared: false, archived: false,
      excerpt: 'Vera wants to take on the search relevance work. Agreed; pair with Tomek on eval setup.',
      content: '# 1:1 with Vera \u2014 May 5\n\n- Vera wants to lead search relevance\n- Pair with Tomek for eval scaffolding\n- Worried about scope creep \u2192 timebox to 6 weeks\n- Career: aiming for staff in next cycle',
      created: '2026-05-05T15:30:00Z', updated: '2026-05-05T15:50:00Z' },
    { id: 'n09', title: 'API rate-limit redesign', tags: ['engineering'], starred: false, shared: true, archived: false,
      excerpt: 'Token bucket per workspace, with burst cap of 5x the steady rate. Fairness over absolute throughput.',
      content: '# API rate-limit redesign\n\n## Goals\n- Fair: one workspace can\u2019t starve another\n- Predictable: clients can plan\n- Burst-friendly: 5x steady rate\n\n## Plan\n- Token bucket per workspace\n- Steady rate based on plan tier\n- 429 with Retry-After header\n- Soft warning at 80% utilization',
      created: '2026-04-15T09:00:00Z', updated: '2026-04-27T11:30:00Z' },
    { id: 'n10', title: 'Travel \u2014 Lisbon notes', tags: ['personal'],  starred: false, shared: false, archived: false,
      excerpt: 'Pasteis de Belem worth the queue. Skip the tram; walk Alfama at sunset.',
      content: '# Lisbon\n\n- Pasteis de Belem: worth the queue\n- Tram 28: skip, packed; walk Alfama instead\n- Sunset at Miradouro de Santa Catarina\n- LX Factory: Saturday brunch',
      created: '2026-04-02T08:15:00Z', updated: '2026-04-09T19:40:00Z' },
    { id: 'n11', title: 'Onboarding metrics \u2014 v3', tags: ['product','research'], starred: false, shared: false, archived: false,
      excerpt: 'Completion 41 \u2192 67%. Time to first note: 4m20s \u2192 1m48s. D7 retention barely moved.',
      content: '# Onboarding v3 metrics\n\n## Funnel\n- Completion: 41% \u2192 67%\n- Time to first note: 4m20s \u2192 1m48s\n- Skip rate on tutorial step: 38% \u2192 12%\n\n## Retention\n- D1: +6pp\n- D7: +2pp (within noise)\n- D30: TBD\n\nCompletion isn\u2019t the same as activation.',
      created: '2026-04-20T16:00:00Z', updated: '2026-04-30T18:22:00Z' },
    { id: 'n12', title: 'Side project \u2014 markdown linker', tags: ['idea','engineering'], starred: false, shared: false, archived: false,
      excerpt: 'CLI that scans a folder of .md, finds unlinked references, suggests backlinks. Weekend project.',
      content: '# Markdown linker (side project)\n\nCLI that:\n1. Scans a folder of .md\n2. Builds an index of titles + headings\n3. Finds plaintext mentions of those titles\n4. Suggests backlinks as a unified diff\n\nMVP in a weekend in Go.',
      created: '2026-04-28T22:00:00Z', updated: '2026-04-28T22:30:00Z' },
    { id: 'n13', title: 'Eng all-hands \u2014 May 7 talking points', tags: ['meeting','engineering'], starred: false, shared: true, archived: false,
      excerpt: 'Search wins, mobile wins, hiring update, Q3 themes (no commitments yet).',
      content: '# Eng all-hands May 7\n\n## Wins\n- Hybrid search live\n- Mobile gestures shipped\n- Onboarding v3\n\n## Hiring\n- 2 staff PE in pipeline\n- Closing senior frontend this week\n\n## Q3\n- API rate-limits\n- Calendar v2\n- (Don\u2019t commit yet)',
      created: '2026-05-04T20:00:00Z', updated: '2026-05-05T09:00:00Z' },
    { id: 'n14', title: 'Reading list \u2014 May', tags: ['reading','personal'], starred: false, shared: false, archived: true,
      excerpt: 'Six titles to get through. Three carryover from April.',
      content: '# May reading list\n\n- The Beginning of Infinity (in progress)\n- Working in Public \u2014 Eghbal\n- The Goal \u2014 Goldratt\n- Difficult Conversations\n- An Elegant Puzzle (re-read)\n- Antifragile (carryover)',
      created: '2026-05-01T07:00:00Z', updated: '2026-05-02T07:30:00Z' },
    { id: 'n15', title: 'Pricing experiment \u2014 annual discount', tags: ['product'], starred: true, shared: true,  archived: false,
      excerpt: 'A/B: 20% annual discount banner on settings. Significance after 11 days. Conversion +18%, no churn impact.',
      content: '# Pricing experiment \u2014 annual discount\n\n## Setup\n- 50/50 split, settings \u2192 billing page\n- Test: "Save 20% \u2014 switch to annual"\n- Control: existing copy\n\n## Result (11 days)\n- Annual conversion: +18%\n- ARR per upgrade: +12% (lower than 20% due to mix)\n- Churn unchanged at 30 days\n\nShip it. Move banner up.',
      created: '2026-04-19T12:00:00Z', updated: '2026-04-30T17:10:00Z' },
    { id: 'n16', title: 'Old idea \u2014 voice memo to note', tags: ['idea'], starred: false, shared: false, archived: true,
      excerpt: 'Record a voice memo, transcribe with Whisper, summarize and tag. Park: privacy concerns.',
      content: '# Voice memo \u2192 note (parked)\n\nFlow: record \u2192 Whisper \u2192 summarize \u2192 tag suggestions.\n\n**Why parked**: enterprise customers nervous about audio leaving device. Revisit when on-device Whisper is faster.',
      created: '2026-03-15T14:00:00Z', updated: '2026-03-22T18:00:00Z' },
  ];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { localStorage.setItem(KEY, JSON.stringify(SAMPLE)); return SAMPLE.slice(); }
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || !arr.length) { localStorage.setItem(KEY, JSON.stringify(SAMPLE)); return SAMPLE.slice(); }
      return arr;
    } catch (e) { return SAMPLE.slice(); }
  }
  function save(notes) {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) {}
  }
  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    return load();
  }
  function get(id) { return load().find((n) => n.id === id); }
  function upsert(note) {
    const all = load();
    const i = all.findIndex((n) => n.id === note.id);
    if (i >= 0) all[i] = note; else all.unshift(note);
    save(all);
    return note;
  }
  function remove(id) {
    const next = load().filter((n) => n.id !== id);
    save(next);
    return next;
  }
  function duplicate(id) {
    const all = load();
    const src = all.find((n) => n.id === id);
    if (!src) return null;
    const now = new Date().toISOString();
    const copy = Object.assign({}, src, {
      id: 'n' + Math.random().toString(36).slice(2, 8),
      title: src.title + ' (copy)',
      created: now, updated: now,
    });
    save([copy].concat(all));
    return copy;
  }
  function wordCount(s) {
    return ((s || '').trim().match(/\S+/g) || []).length;
  }
  function relativeTime(iso, lang) {
    const d = new Date(iso); const now = new Date();
    const diff = (now - d) / 1000;
    const mins = Math.round(diff / 60);
    const hrs = Math.round(diff / 3600);
    const days = Math.round(diff / 86400);
    if (lang === 'ru') {
      if (mins < 60) return mins + ' мин назад';
      if (hrs  < 24) return hrs  + ' ч назад';
      if (days < 14) return days + ' д назад';
      return d.toLocaleDateString('ru-RU');
    }
    if (mins < 60) return mins + ' min ago';
    if (hrs  < 24) return hrs  + ' h ago';
    if (days < 14) return days + ' d ago';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  window.NotesStore = { load: load, save: save, reset: reset, get: get, upsert: upsert, remove: remove, duplicate: duplicate, TAGS: TAGS, wordCount: wordCount, relativeTime: relativeTime };
})();
