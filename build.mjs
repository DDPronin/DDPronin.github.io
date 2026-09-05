import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(await readFile(join(root, 'site.json'), 'utf8'));
const cv = JSON.parse(await readFile(join(root, 'cv.json'), 'utf8'));
const base = config.url.replace(/\/$/, '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const urls = {
  hse: 'https://www.hse.ru/org/persons/848712523/',
  scholar: 'https://scholar.google.com/citations?user=V0GgjkYAAAAJ',
  orcid: 'https://orcid.org/0009-0001-0521-1849',
  github: 'https://github.com/DDPronin',
  media: 'https://sysblok.ru/author/dmitrii_pronin/',
  telegram: 'https://t.me/DDPronin',
  rankPaper: 'https://doi.org/10.1093/llc/fqag072',
  rankPreprint: 'https://arxiv.org/abs/2604.19499',
  rankCode: 'https://github.com/DDPronin/Rank-Turbulence-Delta',
  gwasPaper: 'https://arxiv.org/abs/2606.09543',
  gwasCode: 'https://github.com/DDPronin/GWAS-stylometry',
};
const text = {
  en: {
    name: 'Dmitry Pronin', nav: ['Research', 'Publications', 'Writing', 'Contact'],
    skip: 'Skip to content', eyebrow: 'Digital Humanities · HSE University',
    title: 'Interpretable\ndigital stylometry',
    intro: 'I study how writers’ styles differ and which words account for those differences. I develop methods that let us trace statistical results back to specific features of a text.',
    see: 'Explore the research', about: 'About',
    bio: 'I am a programmer and visiting lecturer at HSE University’s School of Philological Studies, Faculty of Humanities. I develop research software and teach on the Literature and Digital Humanities course.',
    bio2: 'Together with Evgeny Kazartsev, I work on interpretable stylometric methods. I also contribute to SOCIOLIT and PROZIMETRON and write practical guides to computational text analysis.',
    cv: 'CV', cvLink: 'Academic CV', portraitAlt: 'Dmitry Pronin holding a camera outdoors',
    platformLabel: 'Research platform', platformTitle: 'SOCIOLIT',
    platformIntro: 'Tools for studying Russian literature and its relationship with society.',
    platformBody: 'SOCIOLIT is a project of HSE University’s School of Philological Studies. It brings together texts and tools for exploring word use, comparing corpora, and analysing sentiment through a web interface.',
    platformRole: 'As a core developer, I work on analytical modules, corpus processing, APIs, and interfaces for researchers.',
    platformFeatures: ['Search for words and lemmas in literary corpora', 'Compare word distributions across groups of texts', 'Explore word frequencies and the emotional tone of a text'],
    platformLink: 'Explore SOCIOLIT',
    affiliation: 'HSE University', location: 'School of Philological Studies',
    research: 'Research, explained', researchSub: 'The question, the method, and the words behind the result.',
    rankQ: 'Which words make two texts different?',
    rankDesc: 'Rank-Turbulence Delta compares word ranks and makes their contributions visible. A closer look at what stylometric distances actually measure.',
    gwasQ: 'Which tokens are associated with an author?',
    gwasDesc: 'A statistical workflow inspired by genome-wide association studies: test token associations, account for multiple comparisons, and inspect the evidence.',
    read: 'Read the explanation', journal: 'Journal article · 2026', preprint: 'Preprint · DH2026',
    publications: 'Selected publications', allPubs: 'Full list on Google Scholar', authors: 'Dmitry Pronin and Evgeny Kazartsev',
    paper: 'Publisher', open: 'Open preprint', code: 'Code & notebooks',
    writing: 'Writing & teaching', writingSub: 'Practical guides and field notes in Russian.',
    guides: [
      ['A practical guide to sentiment analysis', 'Tutorial · December 2024', 'https://sysblok.ru/courses/kak-provesti-analiz-tonalnosti-teksta/'],
      ['Exporting Telegram channels with Python', 'Tutorial · August 2025', 'https://sysblok.ru/courses/kak-skachat-ves-telegram-avtomatizacija-vygruzki-kanalov-s-pomoshhju-python/'],
      ['13 questions about large language models', 'Explainer · January 2026 · Co-authored', 'https://sysblok.ru/ai/llm/'],
      ['Notes from Digital Humanities 2026', 'Conference report · August 2026', 'https://sysblok.ru/blog/blog_dmitrii_pronin/obuchaja-ii-my-uchimsja-o-chem-govorili-na-glavnoj-mirovoj-konferencii-po-cifrovym-gumanitarnym-naukam/'],
    ],
    allWriting: 'All writing on System Block', contact: 'Let’s talk about texts.',
    contactBody: 'For questions about my research, collaboration, or teaching, email me at the address below. You can also find me on Telegram.',
    updated: 'Updated September 2026', back: 'All research', question: 'The question', method: 'The approach',
    figure: 'Reading the figure', limits: 'What the result can tell us', start: 'Try it on your texts',
    next: 'Related research', bib: 'Citation', copy: 'Copy BibTeX', copied: 'Copied',
    fullSize: 'Open full-size figure', source: 'Figure source', data: 'Research figures are reproduced from the authors’ project repositories.',
  },
  ru: {
    name: 'Дмитрий Пронин', nav: ['Исследования', 'Публикации', 'Материалы', 'Контакты'],
    skip: 'Перейти к содержанию', eyebrow: 'Digital Humanities · НИУ ВШЭ',
    title: 'Интерпретируемая\nцифровая стилометрия',
    intro: 'Изучаю, чем различается стиль писателей и какие слова создают эти различия. Разрабатываю методы анализа, которые позволяют проследить путь от статистического результата к конкретным особенностям текста.',
    see: 'Посмотреть исследования', about: 'Обо мне',
    bio: 'Работаю программистом и приглашённым преподавателем Школы филологических наук факультета гуманитарных наук НИУ ВШЭ. Разрабатываю исследовательские инструменты и участвую в преподавании курса «Литература и цифровая гуманитаристика».',
    bio2: 'Вместе с Евгением Казарцевым занимаюсь интерпретируемыми методами стилометрии. Участвую в разработке СОЦИОЛИТа и ПРОЗИМЕТРОНа, пишу практические руководства по компьютерному анализу текста.',
    cv: 'CV', cvLink: 'Академическое резюме', portraitAlt: 'Дмитрий Пронин с фотоаппаратом на улице',
    platformLabel: 'Исследовательская платформа', platformTitle: 'СОЦИОЛИТ',
    platformIntro: 'Инструменты для изучения русской литературы и её связи с обществом.',
    platformBody: 'СОЦИОЛИТ — проект Школы филологических наук НИУ ВШЭ. Платформа объединяет тексты и инструменты, с помощью которых можно изучать словоупотребление, сравнивать корпуса и анализировать тональность произведений через веб-интерфейс.',
    platformRole: 'Как один из основных разработчиков, занимаюсь аналитическими модулями, обработкой корпусов, API и интерфейсами для исследователей.',
    platformFeatures: ['Поиск слов и лемм в литературных корпусах', 'Сравнение распределений слов в группах текстов', 'Изучение частот слов и эмоциональной тональности текста'],
    platformLink: 'Открыть СОЦИОЛИТ',
    affiliation: 'НИУ ВШЭ', location: 'Школа филологических наук',
    research: 'Как устроены мои исследования', researchSub: 'Вопрос, метод и конкретные слова за результатом анализа.',
    rankQ: 'Какие слова делают тексты разными?',
    rankDesc: 'Rank-Turbulence Delta сравнивает ранги слов и показывает их вклад. Разбираемся, что именно измеряют стилометрические расстояния.',
    gwasQ: 'Какие слова связаны с авторством?',
    gwasDesc: 'Подход по аналогии с полногеномными исследованиями ассоциаций: проверяем связи токенов с авторством, учитываем множественные сравнения и изучаем результат.',
    read: 'Как работает метод', journal: 'Журнальная статья · 2026', preprint: 'Препринт · DH2026',
    publications: 'Избранные публикации', allPubs: 'Полный список в Google Scholar', authors: 'Дмитрий Пронин и Евгений Казарцев',
    paper: 'У издателя', open: 'Открытый препринт', code: 'Код и ноутбуки',
    writing: 'Материалы и обучение', writingSub: 'Практические руководства и заметки о цифровой гуманитаристике.',
    guides: [
      ['Как провести анализ тональности текста', 'Руководство · декабрь 2024', 'https://sysblok.ru/courses/kak-provesti-analiz-tonalnosti-teksta/'],
      ['Как скачать весь Telegram: выгрузка каналов с Python', 'Руководство · август 2025', 'https://sysblok.ru/courses/kak-skachat-ves-telegram-avtomatizacija-vygruzki-kanalov-s-pomoshhju-python/'],
      ['13 стыдных вопросов про LLM', 'Объясняющий материал · январь 2026 · в соавторстве', 'https://sysblok.ru/ai/llm/'],
      ['Обучая ИИ, мы учимся: о чём говорили на DH2026', 'Репортаж с конференции · август 2026', 'https://sysblok.ru/blog/blog_dmitrii_pronin/obuchaja-ii-my-uchimsja-o-chem-govorili-na-glavnoj-mirovoj-konferencii-po-cifrovym-gumanitarnym-naukam/'],
    ],
    allWriting: 'Все тексты в «Системном Блоке»', contact: 'Давайте поговорим о текстах.',
    contactBody: 'По вопросам исследований, совместных проектов и преподавания напишите мне на электронную почту. Также со мной можно связаться в Telegram.',
    updated: 'Обновлено в сентябре 2026', back: 'Все исследования', question: 'Исследовательский вопрос', method: 'Как устроен подход',
    figure: 'Как читать график', limits: 'Что можно заключить', start: 'Попробовать на своих текстах',
    next: 'Ещё одно исследование', bib: 'Как цитировать', copy: 'Скопировать BibTeX', copied: 'Скопировано',
    fullSize: 'Открыть график в полном размере', source: 'Источник графика', data: 'Научные графики взяты из репозиториев авторов исследований.',
  },
};

const research = {
  rank: {
    slug: 'rank-turbulence-delta', title: 'Rank-Turbulence Delta', year: '2026',
    formal: 'Rank-Turbulence Delta and interpretable approaches to stylometric Delta measures',
    venue: 'Digital Scholarship in the Humanities, 41(3), 1616–1630.',
    article: urls.rankPaper, preprint: urls.rankPreprint, code: urls.rankCode,
    image: 'rank-russian.png', imageWidth: 4457, imageHeight: 3120,
    imageSource: 'https://github.com/DDPronin/Rank-Turbulence-Delta/blob/main/figures/lexical_shift_RU_unigram.png',
    bib: '@article{pronin2026rank,\n  author = {Pronin, Dmitry and Kazartsev, Evgeny},\n  title = {Rank-Turbulence Delta and interpretable approaches to stylometric Delta measures},\n  journal = {Digital Scholarship in the Humanities},\n  year = {2026},\n  volume = {41},\n  number = {3},\n  pages = {1616--1630},\n  doi = {10.1093/llc/fqag072}\n}',
    en: {
      subtitle: 'From a distance between texts to the contribution of individual words.',
      question: 'A stylometric distance can tell us that two texts differ. But which words drive that difference? This work treats Delta measures as tools for exploration and asks how their results can be interpreted at the token level.',
      steps: [
        ['Represent the texts', 'Build comparable frequency profiles using the same preprocessing and feature vocabulary.'],
        ['Compare the profiles', 'Rank-Turbulence Delta works with word ranks. The study also examines classical, cosine, and Jensen–Shannon forms of Delta.'],
        ['Inspect the contributions', 'Decompose the comparison into token-level contributions, then examine how the interpretation changes with the feature set and perturbations of the data.'],
      ],
      figure: 'Each panel shows token contributions for a different Delta measure in the Russian-language analysis. The selected tokens and their relative importance vary across methods. Read each panel against its own horizontal scale; the numerical magnitudes are not directly interchangeable.',
      alt: 'Four horizontal bar charts compare token contributions for Burrows, Cosine, Jensen–Shannon, and Rank-Turbulence Delta in Russian-language texts.',
      limits: 'The study evaluates several languages and examines the stability of the explanations. A distance and its decomposition depend on the corpus, preprocessing, and feature selection. A highly ranked contribution is a feature of this comparison; interpreting it as a literary trait still requires reading the texts.',
      start: 'The repository contains notebooks, dependencies, and reproduction instructions. Begin with a supplied analysis, inspect the frequency profiles and contribution plots, then adapt the pipeline to a corpus whose composition you understand.',
    },
    ru: {
      subtitle: 'От расстояния между текстами — к вкладу отдельных слов.',
      question: 'Стилометрическое расстояние показывает, что два текста различаются. Но какие слова создают это различие? В этой работе меры Delta рассматриваются как инструменты исследования: их результат можно разложить и интерпретировать на уровне отдельных токенов.',
      steps: [
        ['Представляем тексты', 'Строим сопоставимые частотные профили: одинаковая предобработка и общий набор признаков.'],
        ['Сравниваем профили', 'Rank-Turbulence Delta работает с рангами слов. В исследовании также рассматриваются классическая, косинусная и Jensen–Shannon версии Delta.'],
        ['Изучаем вклад слов', 'Раскладываем сравнение на вклады токенов и проверяем, как меняется интерпретация при выборе признаков и изменениях данных.'],
      ],
      figure: 'Каждая панель показывает вклады токенов для одной из мер Delta в анализе русскоязычных текстов. Набор выделенных слов и их относительная значимость различаются. У каждой панели своя горизонтальная шкала: численные величины между панелями напрямую несопоставимы.',
      alt: 'Четыре горизонтальные столбчатые диаграммы: вклады русских токенов для Burrows Delta, Cosine Delta, Jensen–Shannon Delta и Rank-Turbulence Delta.',
      limits: 'В работе рассматриваются несколько языков и устойчивость интерпретаций. Расстояние и его разложение зависят от корпуса, предобработки и выбора признаков. Большой вклад слова — свойство конкретного сравнения; литературоведческий вывод требует возвращения к самим текстам.',
      start: 'В репозитории есть ноутбуки, зависимости и инструкции по воспроизведению. Начните с готового анализа, изучите частотные профили и графики вкладов, затем адаптируйте обработку к корпусу с понятным вам составом.',
    },
  },
  gwas: {
    slug: 'from-genes-to-tokens', title: 'From Genes to Tokens', year: '2026',
    formal: 'From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis',
    venue: 'arXiv:2606.09543 · Digital Humanities 2026.',
    preprint: urls.gwasPaper, code: urls.gwasCode,
    image: 'gwas-tolstoy.png', imageWidth: 3500, imageHeight: 2500,
    imageSource: 'https://github.com/DDPronin/GWAS-stylometry/blob/main/imgs/manhattan_tolstoy.png',
    bib: '@misc{pronin2026genes,\n  author = {Pronin, Dmitry and Kazartsev, Evgeny},\n  title = {From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis},\n  year = {2026},\n  eprint = {2606.09543},\n  archivePrefix = {arXiv},\n  url = {https://arxiv.org/abs/2606.09543}\n}',
    en: {
      subtitle: 'A statistical map of token associations with authorship.',
      question: 'Instead of stopping at an authorship prediction, can we identify the individual tokens associated with an author in a corpus? This work adapts the logic of genome-wide association studies to text analysis.',
      steps: [
        ['Test token associations', 'Fit token-level logistic regression models to examine associations with authorship.'],
        ['Account for many tests', 'Testing thousands of tokens creates a multiple-comparison problem. Apply a correction before interpreting statistical significance.'],
        ['Read the statistical map', 'Use Manhattan, volcano, and Q–Q plots to inspect significance, effect direction, and the behaviour of the tests.'],
      ],
      figure: 'This Manhattan plot comes from the Tolstoy analysis. Each point is a token; its height represents −log₁₀(p). Green and red indicate positive and negative regression coefficients, while grey points are not significant under the displayed threshold. Height indicates statistical evidence, not effect size.',
      alt: 'Manhattan plot for the Tolstoy analysis. Tokens appear along the horizontal axis and negative log-ten p-values on the vertical axis. A dashed line marks the significance threshold.',
      limits: 'The method identifies statistical associations within a chosen corpus. Topic, genre, period, and corpus composition can also influence token use. An association does not establish a causal or universal marker of an author’s style. The work is available as a preprint and was presented at DH2026.',
      start: 'The repository includes the analysis notebook, lemmatization code, dependencies, figures, and the DH2026 presentation. Start by reproducing a supplied example and checking the outcome labels and preprocessing before substituting your own texts.',
    },
    ru: {
      subtitle: 'Статистическая карта связей между токенами и авторством.',
      question: 'Можно ли не только предсказать автора, но и найти отдельные токены, связанные с его текстами в корпусе? В этой работе логика полногеномных исследований ассоциаций переносится в анализ литературных текстов.',
      steps: [
        ['Проверяем связи токенов', 'Используем логистическую регрессию на уровне отдельных токенов для анализа связи с авторством.'],
        ['Учитываем число проверок', 'Тысячи токенов означают тысячи статистических проверок. Перед интерпретацией значимости нужна поправка на множественные сравнения.'],
        ['Читаем статистическую карту', 'Manhattan-, volcano- и Q–Q-графики помогают оценить значимость, направление эффектов и поведение статистических тестов.'],
      ],
      figure: 'Manhattan-график из анализа текстов Толстого. Каждая точка — токен; высота соответствует −log₁₀(p). Зелёные и красные точки обозначают положительные и отрицательные коэффициенты регрессии; серые не достигают показанного порога значимости. Высота отражает статистическое свидетельство, а не размер эффекта.',
      alt: 'Manhattan-график анализа текстов Толстого: по горизонтали токены, по вертикали минус десятичный логарифм p-значения. Пунктир обозначает порог значимости.',
      limits: 'Метод выявляет статистические связи внутри выбранного корпуса. На использование слов также влияют тема, жанр, эпоха и состав данных. Связь не доказывает причинность и не даёт универсального маркера авторского стиля. Работа доступна как препринт и была представлена на DH2026.',
      start: 'В репозитории есть ноутбук анализа, код лемматизации, зависимости, иллюстрации и презентация DH2026. Сначала воспроизведите готовый пример и проверьте разметку авторства и предобработку, затем подставляйте собственные тексты.',
    },
  },
};

const pages = [];
const home = lang => lang === 'en' ? '' : 'ru/';
const route = (lang, key) => `${home(lang)}${key === 'cv' ? 'cv/' : key ? `research/${research[key].slug}/` : ''}`;
const link = (url, label, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}">${label}</a>`;

function document(lang, key, body, meta) {
  const t = text[lang], path = route(lang, key);
  const isResearch = Boolean(key && key !== 'cv');
  const depth = path.split('/').filter(Boolean).length;
  const rel = '../'.repeat(depth) || './';
  const local = p => `${rel}${p}index.html`;
  const currentUrl = base ? `${base}/${path}` : '';
  const langs = ['en', 'ru'].map(l => `<a href="${local(route(l,key))}" lang="${l}" hreflang="${l}" ${l === lang ? 'aria-current="page"' : ''}>${l.toUpperCase()}</a>`).join('');
  const schema = { '@context': 'https://schema.org', '@type': isResearch ? 'WebPage' : 'ProfilePage', name: meta.title, inLanguage: lang, ...(currentUrl ? {url: currentUrl} : {}), mainEntity: { '@type': isResearch ? 'ScholarlyArticle' : 'Person', name: isResearch ? research[key].formal : 'Dmitry Pronin', ...(isResearch ? {author: [{ '@type': 'Person', name:'Dmitry Pronin' }, {'@type':'Person',name:'Evgeny Kazartsev'}], sameAs: research[key].article || research[key].preprint} : {alternateName:'Дмитрий Пронин', email:config.email, image:base+'/assets/dmitry-pronin.jpg?v=2', sameAs:[urls.hse,urls.orcid,urls.scholar,urls.github], affiliation:{'@type':'Organization',name:'HSE University'}}) } };
  const head = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="theme-color" content="#ffffff"><meta property="og:type" content="website"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:locale" content="${lang==='ru'?'ru_RU':'en_US'}">${currentUrl ? `<link rel="canonical" href="${currentUrl}"><meta property="og:url" content="${currentUrl}">` + ['en','ru'].map(l=>`<link rel="alternate" hreflang="${l}" href="${base}/${route(l,key)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${base}/${route('en',key)}">` : ''}<link rel="icon" href="${rel}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${rel}assets/style.css?v=2"><script defer src="${rel}assets/site.js"></script><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`;
  return head + `<body><a class="skip" href="#main">${t.skip}</a><header class="header wrap"><a class="wordmark" href="${local(home(lang))}">${t.name}<span>Digital Humanities</span></a><nav aria-label="${lang==='ru'?'Основная навигация':'Main navigation'}">${t.nav.slice(0,3).map((label,i)=>link(`${local(home(lang))}#${['research','publications','writing'][i]}`,label)).join('')}${link(local(route(lang,'cv')),t.cv)}${link(`${local(home(lang))}#contact`,t.nav[3])}</nav><div class="languages" aria-label="${lang==='ru'?'Язык':'Language'}">${langs}</div></header><main id="main">${body({t,rel,local})}</main><footer class="wrap footer"><span>© 2026 ${t.name}</span><span>${t.updated}</span><div>${link(urls.orcid,'ORCID')}${link(urls.github,'GitHub')}</div></footer></body></html>`;
}

function resourceLinks(r,t) {
  return `<div class="resource-links">${r.article?link(r.article,t.paper):''}${link(r.preprint,t.open)}${link(r.code,t.code)}</div>`;
}

function mainPage(lang) {
  const t = text[lang];
  return document(lang, null, ({rel,local}) => `
  <section class="hero wrap"><div class="hero-copy"><p class="eyebrow">${t.eyebrow}</p><h1>${t.title.split('\n').map(esc).join('<br>')}</h1><p class="intro">${t.intro}</p><div class="hero-links">${link('#research',`${t.see} <span aria-hidden="true">↓</span>`,'primary-link')}${link(local(route(lang,'cv')),t.cvLink)}${link(urls.scholar,'Google Scholar')}</div></div><figure class="portrait"><img src="${rel}assets/dmitry-pronin.jpg?v=2" alt="${t.portraitAlt}" width="1179" height="1701" fetchpriority="high"></figure></section>
  <section class="about wrap" aria-labelledby="about-title"><h2 class="section-label" id="about-title">${t.about}</h2><div><p>${t.bio}</p><p>${t.bio2}</p></div><aside>${link(urls.hse,t.affiliation)}<p>${t.location}</p>${link(urls.orcid,'ORCID ↗')}</aside></section>
  <section class="research-section wrap" id="research"><div class="section-heading"><h2>${t.research}</h2><p>${t.researchSub}</p></div>${Object.entries(research).map(([key,r],i)=>`<article class="research-row"><div class="research-number">0${i+1}</div><div class="research-copy"><p class="meta">${key==='rank'?t.journal:t.preprint}</p><h3>${link(local(route(lang,key)),key==='rank'?t.rankQ:t.gwasQ)}</h3><p>${key==='rank'?t.rankDesc:t.gwasDesc}</p><p class="method-name">${r.title}</p>${link(local(route(lang,key)),`${t.read} <span aria-hidden="true">→</span>`,'read-link')}</div><a class="research-image" href="${local(route(lang,key))}" tabindex="-1" aria-hidden="true"><img src="${rel}assets/${r.image}" alt="" width="${r.imageWidth}" height="${r.imageHeight}" loading="lazy"></a></article>`).join('')}</section>
  <section class="wrap publications-section" id="publications"><div class="section-heading"><h2>${t.publications}</h2>${link(urls.scholar,`${t.allPubs} ↗`)}</div><div class="pub-list">${Object.values(research).map(r=>`<article class="publication"><span class="year">${r.year}</span><div><h3>${link(r.article||r.preprint,r.formal)}</h3><p>${t.authors}</p><p class="venue">${r.venue}</p>${resourceLinks(r,t)}</div></article>`).join('')}<article class="publication"><span class="year">2024</span><div><h3>${lang==='ru'?'Основы цифровой филологии: методы и принципы компьютерного анализа текста':'Основы цифровой филологии: методы и принципы компьютерного анализа текста'}</h3><p>${lang==='ru'?'Евгений Казарцев и Дмитрий Пронин':'Evgeny Kazartsev and Dmitry Pronin'}</p><p class="venue">${lang==='ru'?'Санкт-Петербург: Политехника. Книга.':'St Petersburg: Politekhnika. Book in Russian.'}</p>${link(urls.scholar,lang==='ru'?'Библиография в Google Scholar':'Bibliography on Google Scholar','read-link')}</div></article></div></section>
  <section class="platform-section wrap" id="sociolit"><div><p class="eyebrow">${t.platformLabel}</p><h2>${t.platformTitle}</h2>${link('https://sociolit.ru/',t.platformLink+' ↗','primary-link')}</div><div class="platform-copy"><p class="platform-intro">${t.platformIntro}</p><p>${t.platformBody}</p><ul>${t.platformFeatures.map(s=>`<li>${s}</li>`).join('')}</ul><p>${t.platformRole}</p></div></section>
  <section class="writing-section" id="writing"><div class="wrap"><div class="section-heading"><h2>${t.writing}</h2><p>${t.writingSub}</p></div><div class="writing-grid">${t.guides.map(([title,meta,url])=>`<article><p class="meta">${meta}</p><h3>${link(url,title+' <span aria-hidden="true">↗</span>')}</h3><p class="publication-name">${lang==='ru'?'Системный Блокъ':'System Block · In Russian'}</p></article>`).join('')}</div>${link(urls.media,`${t.allWriting} ↗`,'read-link')}</div></section>
  <section class="wrap contact-section" id="contact"><p class="eyebrow">${t.nav[3]}</p><h2>${t.contact}</h2><p>${t.contactBody}</p><div class="hero-links">${config.email?link('mailto:'+config.email,esc(config.email),'primary-link'):''}${link(urls.telegram,'Telegram ↗','primary-link')}${link(urls.hse,lang==='ru'?'Профиль ВШЭ ↗':'HSE profile ↗')}</div></section>`,
  {title:`${t.name} — ${lang==='ru'?'стилометрия и digital humanities':'stylometry & digital humanities'}`,description:t.intro});
}

function cvPage(lang) {
  const c=cv[lang];
  return document(lang,'cv',({t,rel,local})=>`
  <header class="article-header wrap cv-header">${link(local(home(lang)),lang==='ru'?'← На главную':'← Home','back-link')}<p class="eyebrow">${c.title}</p><h1>${c.name}</h1><p class="cv-tagline">${c.tagline}</p><p class="cv-affiliation">${c.affiliation}</p><div class="resource-links">${link('mailto:'+config.email,esc(config.email))}${link(urls.hse,lang==='ru'?'Профиль ВШЭ':'HSE profile')}${link(urls.scholar,'Google Scholar')}${link(urls.orcid,'ORCID')}</div><div class="cv-downloads"><a class="primary-link" href="${rel}cv-files/Dmitry-Pronin-CV-${lang.toUpperCase()}.pdf" download>${lang==='ru'?'Скачать PDF':'Download PDF'} ↓</a><a href="${rel}cv-files/Dmitry-Pronin-CV-${lang.toUpperCase()}.docx" download>${lang==='ru'?'Скачать Word':'Download Word'} ↓</a></div></header>
  <div class="article-body wrap"><aside class="article-toc"><span class="section-label">${lang==='ru'?'В резюме':'CV contents'}</span><nav aria-label="${lang==='ru'?'Разделы резюме':'CV sections'}">${c.sections.map(s=>link('#'+s.id,s.title)).join('')}</nav></aside><div class="article-content cv-content"><section id="profile"><h2>${lang==='ru'?'Профиль':'Profile'}</h2><p class="lead">${c.profile}</p><p class="cv-interests">${c.interests}</p></section>${c.sections.map(s=>`<section id="${s.id}"><h2>${s.title}</h2>${s.entries.map(e=>`<article class="cv-entry">${e.title?`<div class="cv-entry-heading"><h3>${e.title}</h3>${e.date?`<span>${e.date}</span>`:''}</div>`:''}${e.subtitle?`<p class="cv-subtitle">${e.subtitle}</p>`:''}${e.body?`<p>${e.body}</p>`:''}${e.items?`<ul>${e.items.map(i=>`<li>${i}</li>`).join('')}</ul>`:''}${e.url?link(e.url,e.linkLabel+' ↗','read-link'):''}</article>`).join('')}</section>`).join('')}</div></div>`, {title:`${c.name} — ${c.title}`,description:c.profile});
}

function researchPage(lang,key) {
  const r=research[key], c=r[lang], t=text[lang];
  const other=key==='rank'?'gwas':'rank';
  return document(lang,key,({rel,local})=>`
  <header class="article-header wrap">${link(local(home(lang))+'#research',`← ${t.back}`,'back-link')}<p class="eyebrow">${key==='rank'?t.journal:t.preprint}</p><h1>${r.title}</h1><p class="article-subtitle">${c.subtitle}</p><p class="authors">${t.authors}</p>${resourceLinks(r,t)}</header>
  <div class="article-body wrap"><aside class="article-toc"><span class="section-label">${lang==='ru'?'В этом разборе':'In this explanation'}</span><nav aria-label="${lang==='ru'?'Разделы исследования':'Research sections'}">${['question','method','figure','limits','start'].map(id=>link('#'+id,t[id])).join('')}</nav></aside><div class="article-content"><section id="question"><h2>${t.question}</h2><p class="lead">${c.question}</p></section><section id="method"><h2>${t.method}</h2><ol class="method-steps">${c.steps.map(([title,body])=>`<li><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol></section><section id="figure"><h2>${t.figure}</h2><p>${c.figure}</p><figure><a href="${rel}assets/${r.image}" aria-label="${t.fullSize}"><img src="${rel}assets/${r.image}" alt="${esc(c.alt)}" width="${r.imageWidth}" height="${r.imageHeight}" loading="lazy"></a><figcaption>${link(`${rel}assets/${r.image}`,t.fullSize)} · ${link(r.imageSource,t.source)}</figcaption></figure></section><section id="limits"><h2>${t.limits}</h2><p>${c.limits}</p></section><section id="start"><h2>${t.start}</h2><p>${c.start}</p>${link(r.code,`${t.code} ↗`,'primary-link')}</section><section class="citation" id="citation"><h2>${t.bib}</h2><p>${esc(r.formal)}. ${r.venue}</p><details><summary>BibTeX</summary><button class="copy-button" type="button" data-copy="citation-bib" data-copied="${t.copied}" data-failed="${lang==='ru'?'Выделите и скопируйте текст ниже':'Select and copy the text below'}">${t.copy}</button><pre id="citation-bib"><code>${esc(r.bib)}</code></pre><span class="copy-status" aria-live="polite"></span></details>${resourceLinks(r,t)}</section><div class="related"><p class="meta">${t.next}</p><h3>${link(local(route(lang,other)),research[other].title+' →')}</h3></div></div></div>`,
  {title:`${r.title} — ${t.name}`,description:c.subtitle});
}

for (const lang of ['en','ru']) {
  for (const key of [null,'rank','gwas','cv']) {
    const path=route(lang,key), out=join(root,path,'index.html');
    await mkdir(dirname(out),{recursive:true});
    await writeFile(out,key==='cv'?cvPage(lang):key?researchPage(lang,key):mainPage(lang),'utf8');
    pages.push(path);
  }
}
await writeFile(join(root,'.nojekyll'),'');
await writeFile(join(root,'robots.txt'), `User-agent: *\nAllow: /\n${base?'Sitemap: '+base+'/sitemap.xml\n':''}`);
if(base) await writeFile(join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(p=>`<url><loc>${esc(base+'/'+p)}</loc></url>`).join('')+'</urlset>');
await writeFile(join(root,'404.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Dmitry Pronin</title><body style="font:18px system-ui;max-width:40rem;margin:12vh auto;padding:24px"><h1>Page not found / Страница не найдена</h1><p><a href="${base||'/'}">Home / На главную</a></p></body></html>`);
console.log(`Built ${pages.length} bilingual pages. ${base?'Public URL: '+base:'No public URL configured; canonical URLs and sitemap are deferred.'}`);
