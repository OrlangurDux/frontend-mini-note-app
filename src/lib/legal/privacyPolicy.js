// Privacy Policy content. EN is written to satisfy EU/EEA/UK GDPR and US
// (CCPA/CPRA, California) disclosure requirements; RU covers Russian
// residents at a summary level and defers the formal 152-FZ detail to the
// separate Personal Data Processing Policy, as is customary for RU sites.
//
// MiniNote is open-source software with no registered legal entity behind
// it — the "operator"/"controller" language below deliberately describes
// an individual maintainer, not a company (152-FZ Art. 3 and GDPR both
// allow a natural person to be the operator/controller). Site: mini-note.app.
export const privacyPolicy = {
  en: {
    title: 'Privacy Policy',
    updated: '2026-09-18',
    intro: 'This Privacy Policy explains how MiniNote ("we", "us", "our") collects, uses, and protects personal data when you use mini-note.app (the "Service"). It is written to meet the disclosure requirements of the EU/UK General Data Protection Regulation ("GDPR") and the California Consumer Privacy Act as amended by the California Privacy Rights Act ("CCPA/CPRA"). MiniNote is open-source software: this policy covers only the reference deployment at mini-note.app. If you run your own copy of this software (self-hosted or forked), you — not the MiniNote project — are the controller for your own deployment, and you should publish your own policy.',
    sections: [
      {
        heading: '1. Who we are',
        body: [
          'MiniNote is an open-source project with no registered company or other legal entity behind it. For the mini-note.app deployment, the data controller (GDPR) / business (CCPA) is the project’s maintainer, acting as an individual. Contact: privacy@mini-note.app.',
          'Because there is no incorporated entity, there is no company registration number or corporate address to list here. Where GDPR Article 27 requires us to appoint a representative in the EU or UK, we will do so and publish their contact details on this page.',
        ],
      },
      {
        heading: '2. Personal data we collect',
        body: ['We collect the following categories of personal data:'],
        list: [
          'Account data: the email address and (optional) display name and avatar you provide when you register or edit your profile.',
          'Your content: note titles, note bodies, and category names you create. You control this content, and it may contain personal data about you or third parties that you choose to include.',
          'Technical data: IP address, browser/device type, and timestamps, generated automatically by standard web-server request logs.',
          'Local preferences: your chosen theme and language, stored only in your browser and only with your consent (see our Cookie Policy).',
        ],
      },
      {
        heading: '3. Why we process it, and our legal basis',
        body: [],
        list: [
          'To create and operate your account and provide the note-taking service you requested — performance of a contract (GDPR Art. 6(1)(b)).',
          'To keep the Service secure and prevent abuse (e.g. rate-limiting, fraud prevention) — legitimate interest (Art. 6(1)(f)).',
          'To remember your interface preferences — your consent (Art. 6(1)(a)), withdrawable at any time.',
          'To comply with legal obligations we are subject to — legal obligation (Art. 6(1)(c)).',
        ],
      },
      {
        heading: '4. Who we share data with',
        body: [
          'We do not sell or rent your personal data, and we do not share it with third parties for their own advertising or marketing purposes. Limited processors act on our behalf strictly to run the Service:',
        ],
        list: [
          'Infrastructure/hosting provider(s) that run our servers and databases, acting strictly on our instructions and bound by confidentiality.',
          'Google Fonts, for loading interface fonts (see Cookie Policy — no account data is sent to Google).',
        ],
        after: ['We may also disclose data where required by law, court order, or to protect our rights, users, or the public.'],
      },
      {
        heading: '5. International data transfers',
        body: [
          'If your data is processed in a country outside the EEA/UK, we rely on an adequacy decision or appropriate safeguards such as the European Commission’s Standard Contractual Clauses.',
        ],
      },
      {
        heading: '6. How long we keep data',
        body: [
          'We keep your account and content for as long as your account is active. If you delete your account from Profile → Danger zone, your account record and content are deleted from our production database; residual copies in backups are purged on our normal backup-rotation schedule.',
        ],
      },
      {
        heading: '7. Your rights under GDPR (EEA / UK)',
        body: ['If GDPR or UK GDPR applies to you, you have the right to:'],
        list: [
          'Access the personal data we hold about you.',
          'Rectify inaccurate data (you can also edit your profile and notes directly).',
          'Erase your data ("right to be forgotten") — available in-app via Profile → Danger zone → Delete account.',
          'Restrict or object to certain processing.',
          'Receive your data in a portable format.',
          'Withdraw consent at any time (for the preferences category), without affecting processing carried out before withdrawal.',
          'Lodge a complaint with your national data protection authority.',
        ],
      },
      {
        heading: '8. Your rights under CCPA/CPRA (California)',
        body: ['If you are a California resident, you have the right to:'],
        list: [
          'Know what personal information we collect, use, and disclose.',
          'Delete your personal information (Profile → Danger zone → Delete account).',
          'Correct inaccurate personal information.',
          'Opt out of the sale or sharing of personal information — we do not sell or share personal information, so there is nothing to opt out of.',
          'Non-discrimination for exercising any of these rights.',
          'Designate an authorized agent to make a request on your behalf.',
        ],
        after: ['To exercise these rights, contact privacy@mini-note.app. We may need to verify your identity before acting on a request.'],
      },
      {
        heading: '9. Children’s privacy',
        body: [
          'The Service is not directed to children and we do not knowingly collect personal data from children under 13 (US, per COPPA) or under 16 (EU, per GDPR Art. 8, unless a lower age applies in your member state). If you believe a child has provided us with personal data, contact us and we will delete it.',
        ],
      },
      {
        heading: '10. Security',
        body: [
          'We use industry-standard measures to protect your data, including encryption in transit (HTTPS) and hashed password storage. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: '11. Cookies and local storage',
        body: ['See our separate Cookie Policy for full detail on what we store in your browser and why.'],
      },
      {
        heading: '12. Changes to this policy',
        body: ['We will update the date above whenever this policy changes, and will provide more prominent notice for material changes.'],
      },
      {
        heading: '13. Contact',
        body: ['Questions or requests regarding this policy: privacy@mini-note.app.'],
      },
    ],
  },

  ru: {
    title: 'Политика конфиденциальности',
    updated: '18.09.2026',
    intro: 'Настоящая Политика конфиденциальности описывает, как MiniNote («мы») собирает, использует и защищает данные пользователей сайта mini-note.app («Сервис»). Подробный порядок обработки персональных данных, права субъекта и правовые основания раскрыты в отдельной Политике обработки персональных данных, которая является неотъемлемой частью настоящего документа. MiniNote — программное обеспечение с открытым исходным кодом; настоящая Политика описывает только эталонный (референсный) инстанс на mini-note.app. Если вы самостоятельно разворачиваете собственную копию этого ПО (self-hosted или форк), оператором персональных данных вашего инстанса являетесь вы, а не проект MiniNote, и вам следует опубликовать собственную политику.',
    sections: [
      {
        heading: '1. Кто мы',
        body: [
          'MiniNote — проект с открытым исходным кодом, не имеющий статуса юридического лица. В отношении инстанса, развёрнутого на mini-note.app, оператором персональных данных выступает мейнтейнер (сопровождающий) проекта, действующий как физическое лицо — статья 3 152-ФЗ прямо допускает, что оператором может быть как юридическое, так и физическое лицо. Контакты: privacy@mini-note.app.',
          'Поскольку зарегистрированного юридического лица нет, реквизиты вида ОГРН/ИНН и юридический адрес организации здесь не указываются.',
        ],
      },
      {
        heading: '2. Какие данные мы обрабатываем',
        body: ['Мы обрабатываем следующие категории данных:'],
        list: [
          'Данные аккаунта: адрес электронной почты и (по желанию) отображаемое имя и аватар, указанные при регистрации или в профиле.',
          'Ваш контент: заголовки и тексты заметок, названия категорий. Этот контент создаёте вы сами и он может содержать персональные данные о вас или третьих лицах, если вы решите их туда включить.',
          'Технические данные: IP-адрес, тип браузера/устройства и отметки времени — формируются автоматически стандартными журналами веб-сервера.',
          'Локальные настройки: выбранная тема и язык интерфейса — хранятся только в вашем браузере и только с вашего согласия (см. Политику использования cookie).',
        ],
      },
      {
        heading: '3. Зачем мы это обрабатываем',
        body: [],
        list: [
          'Для создания и работы вашего аккаунта, предоставления функций заметок — в целях исполнения договора/оказания услуги по вашему запросу.',
          'Для обеспечения безопасности Сервиса и предотвращения злоупотреблений.',
          'Чтобы запоминать ваши настройки интерфейса — на основании вашего согласия, которое можно отозвать в любой момент.',
          'Для исполнения обязанностей, возложенных на нас применимым законодательством РФ.',
        ],
      },
      {
        heading: '4. Кому мы передаём данные',
        body: [
          'Мы не продаём и не передаём ваши персональные данные третьим лицам для их собственных рекламных или маркетинговых целей. К обработке привлекаются только лица, обеспечивающие работу Сервиса:',
        ],
        list: [
          'Поставщик(и) хостинга/инфраструктуры, на серверах которых работает Сервис, действующие исключительно по нашему поручению и в рамках обязательств о конфиденциальности.',
          'Google Fonts — для загрузки шрифтов интерфейса (см. Политику cookie; данные аккаунта в Google не передаются).',
        ],
        after: ['Мы можем раскрыть данные, если это прямо требуется законодательством РФ, по законному запросу государственного органа, либо для защиты наших прав, пользователей или общества.'],
      },
      {
        heading: '5. Трансграничная передача данных',
        body: [
          'Первичный сбор и запись персональных данных граждан РФ осуществляются с использованием баз данных, находящихся на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ). Если отдельные операции по обработке данных осуществляются за пределами Российской Федерации, трансграничная передача производится с соблюдением требований ст. 12 152-ФЗ, включая (при необходимости) уведомление Роскомнадзора.',
        ],
      },
      {
        heading: '6. Срок хранения',
        body: [
          'Мы храним данные аккаунта и контент, пока аккаунт активен. При удалении аккаунта (Профиль → Опасная зона → Удалить аккаунт) запись об аккаунте и контент удаляются из рабочей базы данных; остаточные копии в резервных копиях удаляются по обычному графику ротации бэкапов.',
        ],
      },
      {
        heading: '7. Ваши права',
        body: ['В соответствии со 152-ФЗ вы вправе:'],
        list: [
          'получать информацию, касающуюся обработки ваших персональных данных;',
          'требовать уточнения, блокирования или уничтожения данных, если они неполны, устарели, неточны, незаконно получены или не являются необходимыми для заявленной цели;',
          'отозвать согласие на обработку персональных данных;',
          'обжаловать наши действия или бездействие в Роскомнадзоре или в судебном порядке.',
        ],
        after: ['Полный порядок реализации этих прав — в Политике обработки персональных данных.'],
      },
      {
        heading: '8. Безопасность',
        body: [
          'Мы применяем организационные и технические меры защиты, включая шифрование соединения (HTTPS) и хранение паролей в хешированном виде. Ни один способ передачи или хранения данных не может быть гарантированно защищён на 100%.',
        ],
      },
      {
        heading: '9. Файлы cookie и локальное хранилище',
        body: ['Подробности о том, что и зачем мы храним в вашем браузере — в отдельной Политике использования файлов cookie.'],
      },
      {
        heading: '10. Изменения Политики',
        body: ['При изменении настоящей Политики мы обновим дату выше; при существенных изменениях уведомление будет более заметным.'],
      },
      {
        heading: '11. Контакты',
        body: ['По вопросам настоящей Политики: privacy@mini-note.app.'],
      },
    ],
  },
};
