// Personal Data Processing Policy.
//
// RU: this is the formal document required by Art. 18.1(2) of Federal Law
// No. 152-FZ "On Personal Data" (27.07.2006) — Russian operators must
// publish a standalone "Политика в отношении обработки персональных
// данных" distinct from a general privacy notice.
//
// EN: English-speaking jurisdictions don't mandate a separate document of
// this kind — GDPR/CCPA disclosures normally live in one privacy notice.
// This page is kept as a distinct, more technical companion (lawful
// bases, processing operations, and the formal rights-request procedure)
// for parity with the RU version and for readers who want that detail
// without re-reading the whole Privacy Policy.
//
// MiniNote is open-source software with no registered legal entity — the
// "Operator"/"controller" identified below is the project's individual
// maintainer for the mini-note.app reference deployment only. Both 152-FZ
// Art. 3 and GDPR allow a natural person to be the operator/controller,
// so this is not a gap to paper over with a fake company, just a fact to
// state plainly. Self-hosted/forked deployments have their own operator.
// Site: mini-note.app.
export const personalDataPolicy = {
  en: {
    title: 'Data Processing Policy',
    updated: '2026-09-24',
    intro: 'This Data Processing Policy is a technical companion to our Privacy Policy. It sets out, in more detail, what personal data MiniNote processes, on what legal basis, through which operations, and how to exercise your rights under the GDPR/UK GDPR and the CCPA/CPRA. In case of any conflict, the Privacy Policy’s plain-language summary and this page should be read together, not as alternatives. This policy applies to the reference deployment at mini-note.app; a self-hosted or forked instance has its own operator.',
    sections: [
      {
        heading: '1. Controller / business',
        body: [
          'MiniNote is open-source software published without a registered company. For the mini-note.app deployment, the project’s maintainer acts as data controller (GDPR) and business (CCPA), as an individual rather than a corporate entity. Contact: privacy@mini-note.app.',
          'Where GDPR Article 27 requires us to appoint a representative in the EU or UK, we will do so and publish their contact details on this page.',
        ],
      },
      {
        heading: '2. Categories of data subjects',
        body: [],
        list: ['Registered users of the Service (account holders).', 'Visitors to public, unauthenticated pages (landing, sign-up, sign-in) who are not yet registered.'],
      },
      {
        heading: '3. Categories of personal data and processing operations',
        body: [],
        list: [
          'Identification data (email, display name, avatar) — collection, storage, use for authentication, update, deletion.',
          'User content (notes, categories) — storage, retrieval, update, deletion, at your direction.',
          'Technical/log data (IP address, user agent, timestamps) — collection via standard server logs, use for security and abuse prevention, automatic rotation/deletion.',
          'Local preference data (theme, language, notes view) — storage in your browser only, with your consent, never transmitted to our servers.',
        ],
      },
      {
        heading: '4. Legal bases for each purpose',
        body: [],
        list: [
          'Providing the Service you signed up for — performance of a contract (GDPR Art. 6(1)(b)).',
          'Security, fraud and abuse prevention — legitimate interest (Art. 6(1)(f)), balanced against your rights.',
          'Local UI preferences — consent (Art. 6(1)(a)), freely given and revocable at any time via the Cookie Policy’s settings link.',
          'Responding to legal process or fulfilling statutory obligations — legal obligation (Art. 6(1)(c)).',
        ],
      },
      {
        heading: '5. Processors and recipients',
        body: [
          'We use a limited number of processors acting strictly on our instructions: our hosting/infrastructure provider(s), and Google Fonts for font delivery (no personal data is sent to Google as part of this). We do not sell personal information as defined by the CCPA/CPRA, and we do not disclose personal data for cross-context behavioral advertising.',
        ],
      },
      {
        heading: '6. Retention',
        body: [
          'Account and content data are retained for the life of your account. Server logs are retained only as long as needed for security purposes and are rotated automatically. Deleting your account (Profile → Danger zone) triggers deletion from production systems; backup copies age out on our normal backup-rotation cycle.',
        ],
      },
      {
        heading: '7. How to exercise your rights',
        body: [
          'Most rights are self-service in-app: edit your profile and notes directly, or delete your account entirely from Profile → Danger zone. For anything not available in-app (e.g. a full data export, or a question about a specific disclosure), email privacy@mini-note.app. We will respond within one month for GDPR requests, or as required by CCPA/CPRA for California requests, and may ask you to verify your identity first.',
        ],
      },
      {
        heading: '8. Automated decision-making',
        body: ['We do not use your personal data for automated decision-making or profiling that produces legal or similarly significant effects on you.'],
      },
      {
        heading: '9. Supervisory authorities',
        body: [
          'EEA/UK residents may lodge a complaint with their national data protection authority (or the ICO in the UK). California residents may contact the California Privacy Protection Agency or the Office of the Attorney General.',
        ],
      },
      {
        heading: '10. Version and changes',
        body: ['This page is versioned alongside our Cookie Policy consent mechanism; the date above reflects the last substantive update.'],
      },
    ],
  },

  ru: {
    title: 'Политика обработки персональных данных',
    updated: '24.09.2026',
    intro: 'Настоящая Политика обработки персональных данных разработана в соответствии с пунктом 2 части 1 статьи 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет политику MiniNote (далее — «Оператор») в отношении обработки персональных данных. MiniNote — программное обеспечение с открытым исходным кодом; настоящая Политика применяется к эталонному инстансу на mini-note.app. У самостоятельно развёрнутого (self-hosted) или форкнутого инстанса — свой оператор.',
    sections: [
      {
        heading: '1. Основные понятия',
        body: [],
        list: [
          'Персональные данные — любая информация, относящаяся к прямо или косвенно определённому физическому лицу (субъекту персональных данных).',
          'Обработка персональных данных — любое действие (операция) или совокупность действий с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, блокирование, удаление, уничтожение.',
          'Оператор — лицо, самостоятельно или совместно с другими лицами организующее и (или) осуществляющее обработку персональных данных, а также определяющее цели, состав данных и действия с ними; в силу ст. 3 152-ФЗ оператором может быть как юридическое, так и физическое лицо.',
          'Сайт/Сервис — веб-приложение MiniNote, размещённое на домене mini-note.app.',
          'Пользователь — субъект персональных данных, зарегистрировавший аккаунт в Сервисе либо посетивший публичные страницы Сайта.',
        ],
      },
      {
        heading: '2. Оператор персональных данных',
        body: [
          'MiniNote распространяется как программное обеспечение с открытым исходным кодом и не имеет статуса юридического лица. Оператором персональных данных, обрабатываемых в рамках инстанса mini-note.app, является мейнтейнер (сопровождающий) проекта, выступающий как физическое лицо. Контакты для обращений по вопросам обработки персональных данных: privacy@mini-note.app.',
          'Поскольку зарегистрированного юридического лица нет, наименование, ОГРН, ИНН и юридический адрес организации в настоящем документе не указываются.',
          'Если вы самостоятельно разворачиваете собственную копию Сервиса (self-hosted или форк), оператором персональных данных такого инстанса являетесь вы как лицо, осуществившее развёртывание, а не мейнтейнер проекта MiniNote.',
        ],
      },
      {
        heading: '3. Правовые основания обработки',
        body: [
          'Обработка персональных данных осуществляется на основании 152-ФЗ, Гражданского кодекса РФ, а также:',
        ],
        list: [
          'согласия субъекта персональных данных на обработку (ст. 9 152-ФЗ) — для целей, требующих согласия (например, локальные настройки интерфейса);',
          'необходимости исполнения договора (пользовательского соглашения), стороной которого либо выгодоприобретателем по которому является субъект персональных данных (п. 5 ч. 1 ст. 6 152-ФЗ) — для регистрации и функционирования аккаунта;',
          'необходимости осуществления прав и законных интересов Оператора (п. 7 ч. 1 ст. 6 152-ФЗ) — для обеспечения безопасности Сервиса.',
        ],
      },
      {
        heading: '4. Цели обработки',
        body: [],
        list: [
          'регистрация и идентификация Пользователя, предоставление доступа к функциям Сервиса;',
          'исполнение обязательств по пользовательскому соглашению;',
          'обеспечение информационной безопасности и предотвращение злоупотреблений;',
          'сохранение пользовательских настроек интерфейса (язык, тема, вид списка заметок) — только с согласия Пользователя;',
          'ответы на обращения Пользователя.',
        ],
      },
      {
        heading: '5. Категории и объём обрабатываемых персональных данных',
        body: [],
        list: [
          'идентификационные данные: адрес электронной почты, отображаемое имя, изображение аватара (по желанию Пользователя);',
          'пользовательский контент: заголовки и тексты заметок, названия категорий, которые Пользователь создаёт самостоятельно и которые могут содержать персональные данные, включённые по усмотрению Пользователя;',
          'технические данные: IP-адрес, тип браузера и устройства, отметки времени запросов;',
          'данные, обрабатываемые исключительно локально в браузере Пользователя с его согласия: язык интерфейса, цветовая тема.',
        ],
        after: ['Обработка специальных категорий персональных данных (ст. 10 152-ФЗ) и биометрических персональных данных (ст. 11 152-ФЗ) Оператором не осуществляется.'],
      },
      {
        heading: '6. Способы и сроки обработки, трансграничная передача',
        body: [
          'Обработка персональных данных осуществляется с использованием средств автоматизации (автоматизированная обработка). Персональные данные хранятся не дольше, чем этого требуют цели обработки, а именно — в течение срока действия аккаунта Пользователя. Запись, систематизация, накопление, хранение, уточнение и извлечение персональных данных граждан Российской Федерации осуществляются с использованием баз данных, находящихся на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ). Трансграничная передача персональных данных, если она осуществляется, производится с соблюдением требований статьи 12 152-ФЗ.',
        ],
      },
      {
        heading: '7. Поручение обработки третьим лицам',
        body: [
          'Оператор вправе поручить обработку персональных данных иному лицу с согласия субъекта персональных данных, если иное не предусмотрено федеральным законом, на основании заключаемого договора (ч. 3 ст. 6 152-ФЗ). К таким лицам могут относиться:',
        ],
        list: [
          'поставщик(и) хостинга и серверной инфраструктуры, на которой размещён Сервис;',
          'Google Fonts — исключительно для доставки шрифтов интерфейса; персональные данные аккаунта Google не передаются.',
        ],
      },
      {
        heading: '8. Права субъекта персональных данных',
        body: ['В соответствии со статьёй 14 152-ФЗ Пользователь вправе:'],
        list: [
          'получить сведения, касающиеся обработки его персональных данных, включая подтверждение факта обработки, правовые основания и цели обработки, способы обработки, сведения о лицах, которым передаются данные;',
          'требовать от Оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если они являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки;',
          'отозвать согласие на обработку персональных данных (см. п. 9);',
          'обжаловать действия или бездействие Оператора в Роскомнадзоре либо в судебном порядке;',
          'требовать возмещения убытков и (или) компенсации морального вреда в судебном порядке.',
        ],
      },
      {
        heading: '9. Порядок отзыва согласия',
        body: [
          'Согласие на обработку данных, требующих согласия (категория «предпочтения» в Политике cookie), может быть отозвано в любой момент по ссылке «Настройки cookie» в подвале Сайта. Для отзыва согласия на обработку данных аккаунта в целом Пользователь вправе удалить аккаунт через Профиль → Опасная зона → Удалить аккаунт, либо направить запрос на privacy@mini-note.app.',
        ],
      },
      {
        heading: '10. Меры по обеспечению безопасности персональных данных',
        body: [
          'Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных в соответствии со статьёй 19 152-ФЗ, включая шифрование соединения (HTTPS), хранение паролей в хешированном виде и ограничение доступа к данным.',
        ],
      },
      {
        heading: '11. Заключительные положения',
        body: [
          'Настоящая Политика подлежит опубликованию на Сайте. Оператор вправе вносить изменения в настоящую Политику; актуальная редакция всегда доступна на данной странице, дата последнего обновления указана в начале документа.',
        ],
      },
    ],
  },
};
