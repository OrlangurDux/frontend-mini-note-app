// Cookie Policy content. EN is written for an EU (GDPR/ePrivacy Directive)
// and US (CCPA/CPRA) audience; RU is written for a Russian audience under
// 152-FZ "On Personal Data" and Roskomnadzor guidance. MiniNote is
// open-source software with no registered legal entity — see
// privacyPolicy.js / personalDataPolicy.js for how "operator" is framed
// (an individual maintainer, with self-hosted deployments having their
// own operator). Site: mini-note.app.
export const cookiePolicy = {
  en: {
    title: 'Cookie Policy',
    updated: '2026-09-18',
    intro: 'This Cookie Policy explains what cookies and similar technologies MiniNote ("we", "us") uses on mini-note.app (the "Service"), why, and how you can control them. It should be read together with our Privacy Policy.',
    sections: [
      {
        heading: '1. What counts as a "cookie" here',
        body: [
          'A cookie is a small text file a website can ask your browser to store. This policy also covers similar technologies with the same effect, such as browser local storage and IndexedDB, in line with the EU ePrivacy Directive’s treatment of "cookies and similar technologies."',
        ],
      },
      {
        heading: '2. We don’t use tracking, advertising, or analytics cookies',
        body: [
          'MiniNote does not run third-party analytics, advertising, or social-media tracking scripts, and does not set any traditional HTTP cookies. Everything below is stored locally in your own browser (localStorage / IndexedDB) — it is never a tracking mechanism shared across sites.',
        ],
      },
      {
        heading: '3. What we store locally, and why',
        body: [
          'Strictly necessary (always on — these are required for the Service to work and are exempt from consent under ePrivacy Directive Art. 5(3) / Recital 66):',
        ],
        list: [
          'Your sign-in session (auth token and its expiry), so you stay logged in.',
          'The API server/domain you’ve selected, if you use more than one.',
          'Your offline note cache and pending sync queue, so the app keeps working without a connection.',
          'A single record of your cookie-preference decision itself (this is what makes the banner not reappear on every visit).',
        ],
      },
      {
        heading: '',
        body: ['Optional — preferences (only set if you accept them; legal basis: your consent, GDPR Art. 6(1)(a)):'],
        list: [
          'Your chosen interface language (English / Russian).',
          'Your chosen color theme (light / dark).',
        ],
      },
      {
        heading: '4. Third-party requests',
        body: [
          'Interface fonts are loaded from Google Fonts (fonts.googleapis.com, fonts.gstatic.com). This integration does not set cookies on our domain, but loading any remote resource necessarily discloses your IP address and browser details to that server. See Google’s own privacy documentation for how they handle that request.',
        ],
      },
      {
        heading: '5. How to change your choice',
        body: [
          'Use the "Cookie settings" link in the site footer at any time to reopen the consent banner and change your choice. Clearing your browser’s local storage for this site has the same effect as declining — the banner will reappear on your next visit.',
        ],
      },
      {
        heading: '6. Your rights',
        body: [
          'Because none of this involves tracking or profiling, there is little to opt out of beyond the preferences category above. For the full list of your rights over any personal data we do process (such as your account email), see our Privacy Policy.',
        ],
      },
      {
        heading: '7. Changes to this policy',
        body: [
          'If we materially change what we store or why, we will update this page and its date above, and — where the change affects the preferences category — ask for your consent again.',
        ],
      },
      {
        heading: '8. Contact',
        body: [
          'Questions about this policy: privacy@mini-note.app.',
          'MiniNote is open-source software maintained by an individual, not a company — see our Privacy Policy for who operates this deployment, and for self-hosted/forked instances.',
        ],
      },
    ],
  },

  ru: {
    title: 'Политика использования файлов cookie',
    updated: '18.09.2026',
    intro: 'Настоящая Политика объясняет, какие файлы cookie и аналогичные технологии использует MiniNote («мы») на сайте mini-note.app («Сервис»), для чего и как вы можете ими управлять. Её следует читать вместе с Политикой конфиденциальности и Политикой обработки персональных данных.',
    sections: [
      {
        heading: '1. Что здесь понимается под «cookie»',
        body: [
          'Cookie — небольшой файл, который сайт просит браузер сохранить. Настоящая Политика также распространяется на аналогичные по эффекту технологии — локальное хранилище браузера (localStorage) и IndexedDB, — которые Роскомнадзор и правоприменительная практика по Федеральному закону от 27.07.2006 № 152-ФЗ «О персональных данных» рассматривают наравне с cookie, если они позволяют идентифицировать пользователя.',
        ],
      },
      {
        heading: '2. Мы не используем рекламные и аналитические cookie',
        body: [
          'MiniNote не использует сторонние аналитические, рекламные скрипты и скрипты социальных сетей и не устанавливает классические HTTP cookie для слежения. Всё перечисленное ниже хранится локально в вашем браузере (localStorage / IndexedDB) и не передаётся другим сайтам.',
        ],
      },
      {
        heading: '3. Что мы храним локально и зачем',
        body: [
          'Строго необходимые (включены всегда — без них Сервис не может работать; согласие на их использование не требуется, так как это необходимо для оказания услуги по вашему запросу):',
        ],
        list: [
          'Сессия входа (токен авторизации и срок его действия) — чтобы не выходить из аккаунта при каждом визите.',
          'Выбранный вами сервер/домен API, если вы используете не один.',
          'Локальный кэш заметок и очередь отложенной синхронизации — чтобы приложение работало офлайн.',
          'Запись о самом вашем решении по cookie (именно она делает так, чтобы баннер не появлялся повторно).',
        ],
      },
      {
        heading: '',
        body: ['Необязательные — предпочтения (сохраняются только при вашем согласии; правовое основание — ваше согласие, ст. 9 152-ФЗ):'],
        list: [
          'Выбранный язык интерфейса (русский / английский).',
          'Выбранная цветовая тема (светлая / тёмная).',
        ],
      },
      {
        heading: '4. Запросы к сторонним сервисам',
        body: [
          'Шрифты интерфейса загружаются с серверов Google Fonts (fonts.googleapis.com, fonts.gstatic.com). Это не устанавливает cookie на нашем домене, однако сам факт загрузки удалённого ресурса означает, что ваш IP-адрес и данные браузера передаются серверу Google. Подробности — в документации Google о конфиденциальности.',
        ],
      },
      {
        heading: '5. Как изменить решение',
        body: [
          'В любой момент вы можете открыть баннер согласия заново по ссылке «Настройки cookie» в подвале сайта и изменить решение. Очистка локального хранилища браузера для этого сайта равносильна отказу — при следующем визите баннер появится снова.',
        ],
      },
      {
        heading: '6. Ваши права',
        body: [
          'Поскольку слежение и профилирование не осуществляются, отказываться, по сути, есть только от категории «предпочтения» выше. Полный перечень ваших прав в отношении обрабатываемых персональных данных (например, e-mail аккаунта) — в Политике обработки персональных данных.',
        ],
      },
      {
        heading: '7. Изменения Политики',
        body: [
          'При существенном изменении состава хранимых данных или целей их использования мы обновим эту страницу и дату выше, а если изменение касается категории «предпочтения» — запросим согласие повторно.',
        ],
      },
      {
        heading: '8. Контакты',
        body: [
          'По вопросам настоящей Политики: privacy@mini-note.app.',
          'MiniNote — открытое программное обеспечение, которое сопровождает физическое лицо, а не компания; о том, кто выступает оператором данного инстанса и как обстоит дело с self-hosted-копиями, — в Политике конфиденциальности.',
        ],
      },
    ],
  },
};
