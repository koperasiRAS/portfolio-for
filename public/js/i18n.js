(function () {
  // Embedded translation data (subset for UI labels shown on all pages)
  const T = {
    id: {
      'nav.home': 'Beranda',
      'nav.about': 'Tentang',
      'nav.photo': 'Fotografi',
      'nav.video': 'Video',
      'nav.design': 'Desain',
      'nav.web': 'Web',
      'nav.contact': 'Kontak',
      'nav.getInTouch': 'Hubungi Saya',
      'nav.studioPortal': 'Studio Portal',
      'nav.indexDirectory': 'Indeks Direktori',
      'footer.tagline': 'Berkarya. Mengabadikan. Menginspirasi.',
      'footer.description': 'Visual storyteller & direktur multidisiplin yang beroperasi di ranah fotografi, pengarahan sinematik, sistem grafis, dan pengalaman web spasial.',
      'footer.index': 'Indeks',
      'footer.dispatches': 'Sosial',
      'footer.rightsReserved': 'Hak cipta dilindungi.',
      'footer.location': 'Jakarta & Depok, Indonesia (WIB GMT+7)',
      'footer.home': 'Beranda',
      'footer.about': 'Tentang Saya',
      'footer.photo': 'Arsip Foto',
      'footer.video': 'Video & Film',
      'footer.design': 'Identitas Desain',
      'footer.web': 'Web Interaktif',
      'footer.socialLabel': 'Sosial',
      'about.indexLabel': '02 / TENTANG MONOGRAP',
      'about.edition': 'EDISI 2026',
      'about.monographSubtitle': 'Monograph & Pengarahan',
      'about.aboutSub': 'Visual storyteller & direktur berbasis di Jakarta &amp; Depok, Indonesia. Menciptakan sinema emosional, fotografi cahaya mentah, dan antarmuka spasial yang taktil.',
      'about.yearsLabel': 'Tahun Praktik',
      'about.worksLabel': 'Karya Pesan',
      'about.disciplinesLabel': 'Disiplin Inti',
      'about.founder': 'Pendiri &amp; Direktur Utama',
      'about.contextSection': '01 — Konteks',
      'about.storyTitle': 'Kisah Saya &amp; Etos',
      'about.storySub': 'Dari arsip jalanan analog di Nusantara hingga mengarahkan film naratif berskala besar dan identitas digital yang bersih.',
      'about.expertiseSection': '02 — Keahlian',
      'about.disciplinesSub': 'Metodologi studio empat pilar yang dirancang untuk menjaga koherensi estetika di seluruh media fisik dan permukaan digital.',
      'about.trajectorySection': '03 — Trajectory',
      'about.journeySub': 'Kronologi yang mendokumentasikan eksplorasi berkelanjutan, dari diari visual independen hingga komisi kreatif global.',
      'about.currentState': 'Status Operasional Saat Ini',
      'about.accepting': 'Menerima Proyek Terpilih',
      'about.clientsLabel': 'Klien &amp; Partner Pilihan',
      'about.philosophySection': 'Filsafat &amp; Etos',
      'about.specsLabel': 'Spesifikasi Studio &amp; Peralatan',
      'about.availabilityText': 'Tersedia untuk pengarahan film komersial, penugasan fotografi, konsultasi identitas merek, dan proyek web kreatif.',
      'about.signatureSub': 'Direktur / Fotografer / Perancang Visual',
      'photo.title': 'Arsip Fotografi',
      'photo.filterAll': 'Semua',
      'video.title': 'Video &amp; Film Reel',
      'video.reelNote': 'Reel Kurasi 2024–2026',
      'design.title': 'Identitas Desain',
      'web.title': 'Pengalaman Web Interaktif',
      'cta.ready': 'Siap Membawa Cerita Anda ke Level Berikutnya?',
      'cta.sub': 'Tukar ide, diskusikan proyek, atau mulailah dari sini.',
      'cta.initiate': 'Mulai Kolaborasi',
      'cta.exploreArchive': 'Jelajahi Arsip Foto',
      'home.subtitle': 'Studio Visual &amp; Pengarahan',
      'home.curatedWorks': 'Karya Kurasi',
      'home.curationNote': 'Pilihan karya terbaik dari portfolio multi-disiplin',
      'home.exploreAll': 'Lihat Semua Karya',
      'home.marqueeTitle': 'Karya Terkini',
      'home.browseWork': 'Jelajahi Karya',
      'home.inquire': 'Tanya Proyek',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.photo': 'Photo',
      'nav.video': 'Video',
      'nav.design': 'Design',
      'nav.web': 'Web',
      'nav.contact': 'Contact',
      'nav.getInTouch': 'Get in Touch',
      'nav.studioPortal': 'Studio Portal',
      'nav.indexDirectory': 'Index Directory',
      'footer.tagline': 'Create. Capture. Inspire.',
      'footer.description': 'Multi-disciplinary visual storyteller &amp; director operating across photography, cinematic direction, graphic systems, and spatial web experiences.',
      'footer.index': 'Index',
      'footer.dispatches': 'Dispatches',
      'footer.rightsReserved': 'All rights reserved.',
      'footer.location': 'Jakarta &amp; Depok, Indonesia (WIB GMT+7)',
      'footer.home': 'Home',
      'footer.about': 'About Monograph',
      'footer.photo': 'Photo Archive',
      'footer.video': 'Video &amp; Film Reel',
      'footer.design': 'Design Identities',
      'footer.web': 'Interactive Web',
      'footer.socialLabel': 'Social',
      'about.indexLabel': '02 / ABOUT MONOGRAPH',
      'about.edition': 'EDITION 2026',
      'about.monographSubtitle': 'Monograph &amp; Direction',
      'about.aboutSub': 'Visual storyteller &amp; director based in Jakarta &amp; Depok, Indonesia. Crafting emotional cinema, raw light photography, and tactile spatial interfaces.',
      'about.yearsLabel': 'Years in Practice',
      'about.worksLabel': 'Commissioned Works',
      'about.disciplinesLabel': 'Core Disciplines',
      'about.founder': 'Founder &amp; Principal Director',
      'about.contextSection': '01 — Context',
      'about.storyTitle': 'My Story &amp; Ethos',
      'about.storySub': 'From analog street archives across the archipelago to orchestrating large-scale narrative films and clean digital identities.',
      'about.expertiseSection': '02 — Expertise',
      'about.disciplinesSub': 'A four-pillar studio methodology engineered to maintain aesthetic cohesion across physical medium and digital surface.',
      'about.trajectorySection': '03 — Trajectory',
      'about.journeySub': 'A chronological timeline documenting continuous exploration, from independent visual diaries to global creative commissions.',
      'about.currentState': 'Current Operational State',
      'about.accepting': 'Accepting Selected Projects',
      'about.clientsLabel': 'Selected Clients &amp; Partners',
      'about.philosophySection': 'Philosophy &amp; Ethos',
      'about.specsLabel': 'Studio Specifications &amp; Arsenal',
      'about.availabilityText': 'Available for commercial film direction, photography assignments, brand identity consultations, and creative web commissions.',
      'about.signatureSub': 'Director / Photographer / Visual Designer',
      'photo.title': 'Photo Archive',
      'photo.filterAll': 'All',
      'video.title': 'Video &amp; Film Reel',
      'video.reelNote': 'Curated Reel 2024–2026',
      'design.title': 'Design Identities',
      'web.title': 'Interactive Web Experiences',
      'cta.ready': 'Ready to Bring Your Story to the Next Level?',
      'cta.sub': 'Exchange ideas, discuss a project, or start from here.',
      'cta.initiate': 'Initiate Collaboration',
      'cta.exploreArchive': 'Explore Photo Archive',
      'home.subtitle': 'Visual &amp; Direction Studio',
      'home.curatedWorks': 'Curated Works',
      'home.curationNote': 'Selected works from a multi-disciplinary portfolio',
      'home.exploreAll': 'Explore All Works',
      'home.marqueeTitle': 'Recent Works',
      'home.browseWork': 'Browse Works',
      'home.inquire': 'Inquire',
    },
  };

  function getLang() {
    return localStorage.getItem('for_lang') || 'en';
  }

  function applyTranslations() {
    const lang = getLang();
    const dict = T[lang] || T.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val !== undefined) {
        el.innerHTML = val;
      }
    });
  }

  // Listen for language change events
  document.addEventListener('langchange', function (e) {
    applyTranslations();
  });

  // Also listen to the LanguageToggle button clicks for sync
  var toggleBtn = document.getElementById('langToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      setTimeout(applyTranslations, 50);
    });
  }

  // Apply on load
  applyTranslations();
})();
