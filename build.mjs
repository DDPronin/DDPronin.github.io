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
    intro: 'Stylometry can identify the most likely author of an anonymous text. But which features of the text contribute most to that attribution? My research explores how stylometric methods describe writing style and why they work.',
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
    research: 'My research', researchSub: 'My research questions, methods, and findings in a nutshell.',
    rankQ: 'Which words help a computer distinguish writing styles?',
    rankDesc: 'Burrows’s Delta and its variants can group texts by authorship with good accuracy. Yet not all words contribute equally to the result. Let’s decompose Delta into its components to identify the strongest authorial signals.',
    gwasQ: 'A genome-wide scan for the DNA of writing style',
    gwasDesc: '<strong>Genome-wide association studies</strong> (GWAS) have proved effective in genomics, revealing statistical links between genetic markers and traits such as height or disease. Let’s apply the same logic to authors’ word-frequency profiles.',
    read: 'Read the explanation', journal: 'Digital Scholarship in the Humanities · 2026', preprint: 'DH2026 presentation · 2026',
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
    intro: 'Стилометрия позволяет определить наиболее вероятного автора анонимного текста. Но какие именно особенности этого текста сильнее всего влияют на решение об авторстве? В своих исследованиях изучаю, как стилометрические методы описывают стиль и почему они эффективны.',
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
    research: 'Мои исследования', researchSub: 'Вопросы, методы и результаты моих исследований за минуту.',
    rankQ: 'Какие слова позволяют компьютеру различить стиль?',
    rankDesc: 'Дельта Берроуза и её разновидности позволяют с хорошей точностью группировать тексты согласно их авторству. Однако не все слова в равной степени влияют на результат. Попробуем выделить наиболее сильные авторские сигналы, разложив Дельту на компоненты.',
    gwasQ: 'Полногеномный анализ для ДНК авторского стиля',
    gwasDesc: '<strong>Полногеномный поиск ассоциаций</strong> (GWAS — Genome-Wide Association Studies) доказал свою эффективность в геномике, дав возможность устанавливать статистические связи между генетическими маркерами и признаками — например, ростом или заболеваниями. Попробуем применить такую же логику к частотным авторским профилям.',
    read: 'Как работает метод', journal: 'Digital Scholarship in the Humanities · 2026', preprint: 'Доклад на DH2026 · 2026',
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
    slug: 'rank-turbulence-delta', title: 'Rank-Turbulence Delta', pageTitle: 'Rank-Turbulence Delta and Interpretable Approaches to Stylometric Delta Metrics', year: '2026',
    formal: 'Rank-Turbulence Delta and interpretable approaches to stylometric Delta measures',
    venue: 'Digital Scholarship in the Humanities, 41(3), 1616–1630.',
    article: urls.rankPaper, preprint: urls.rankPreprint, code: urls.rankCode,
    image: 'rank-russian.png', imageWidth: 4457, imageHeight: 3120,
    imageSource: 'https://github.com/DDPronin/Rank-Turbulence-Delta/blob/main/figures/lexical_shift_RU_unigram.png',
    bib: '@article{pronin2026rank,\n  author = {Pronin, Dmitry and Kazartsev, Evgeny},\n  title = {Rank-Turbulence Delta and interpretable approaches to stylometric Delta measures},\n  journal = {Digital Scholarship in the Humanities},\n  year = {2026},\n  volume = {41},\n  number = {3},\n  pages = {1616--1630},\n  doi = {10.1093/llc/fqag072}\n}',
    en: {
      subtitle: '',
      overviewTitle: 'A five-second overview', briefTitle: 'In a nutshell',
      question: 'We decompose mathematical measures of difference between texts to identify the words that contribute most to that difference.',
      steps: [
        ['Represent the texts', 'Build comparable frequency profiles using the same preprocessing and feature vocabulary.'],
        ['Compare the profiles', 'We start with established distances: Burrows’s Delta, Euclidean Delta, and Cosine Delta. We then test Jensen–Shannon divergence on probability distributions derived from uncentred standardized frequencies, and rank-turbulence divergence, developed by <a href="https://doi.org/10.1140/epjds/s13688-023-00386-7">P. S. Dodds and colleagues</a>, on the corresponding word rankings. These extensions yield Jensen–Shannon Delta and Rank-Turbulence Delta.'],
        ['Inspect the contributions', 'Decompose the comparison into token-level contributions, then examine how the interpretation changes with the feature set and perturbations of the data.'],
      ],
      figure: 'The figure compares the styles of Fyodor Dostoevsky and Leo Tolstoy. For each author, we average the standardized frequency vectors of his texts, then decompose the distance between the two author profiles into word-level contributions.',
      figureAfter: '<p><strong>Orange bars on the left: Dostoevsky. Blue bars on the right: Tolstoy.</strong> Bar length shows the size of a word’s contribution; its direction identifies the author whose profile gives that word greater weight. A bar pointing left does not mean a negative distance.</p><p>For example, Burrows’s Delta highlights «давеча» (earlier today) and «давешний» (from earlier today) on Dostoevsky’s side, and «шопотом» (in a whisper, as spelled in the corpus) and «нынче» (today / nowadays) on Tolstoy’s side. Each panel applies a different measure to the same author pair, so the most prominent words change. Read the panels against their own scales.</p>',
      figureCaption: 'Figure 6 from the paper. Word contributions to the difference between Dostoevsky (orange, left) and Tolstoy (blue, right); Rank-Turbulence Delta uses α = 1.',
      alt: 'Four word-contribution charts comparing Dostoevsky, orange bars on the left, and Tolstoy, blue bars on the right: Burrows, Cosine, Jensen–Shannon, and Rank-Turbulence Delta.',
      limits: 'The study evaluates several languages and examines the stability of the explanations. A distance and its decomposition depend on the corpus, preprocessing, and feature selection. A highly ranked contribution is a feature of this comparison; interpreting it as a literary trait still requires reading the texts.',
      start: 'The repository contains notebooks, dependencies, and reproduction instructions. Begin with a supplied analysis, inspect the frequency profiles and contribution plots, then adapt the pipeline to a corpus whose composition you understand.',
    },
    ru: {
      subtitle: '',
      overviewTitle: 'Обзор за 5 секунд', briefTitle: 'Краткое содержание',
      question: 'Работа описывает, как разложить математическую меру различия между текстами на вклады отдельных слов и выделить те, которые сильнее всего влияют на это различие.',
      steps: [
        ['Представляем тексты', 'Строим сопоставимые частотные профили: одинаковая предобработка и общий набор признаков.'],
        ['Сравниваем профили', 'Начинаем с классических расстояний: Дельты Берроуза, евклидовой и косинусной Дельты. Затем тестируем дивергенцию Jensen–Shannon на вероятностных распределениях, полученных из нецентрированных стандартизированных частот, и ранговую турбулентность, разработанную <a href="https://doi.org/10.1140/epjds/s13688-023-00386-7">P. S. Dodds и коллегами</a>, — на соответствующих рангах слов. Так получаем Jensen–Shannon Delta и Rank-Turbulence Delta.'],
        ['Изучаем вклад слов', 'Раскладываем сравнение на вклады токенов и проверяем, как меняется интерпретация при выборе признаков и изменениях данных.'],
      ],
      figure: 'На графике сравниваются стили Фёдора Достоевского и Льва Толстого. Для каждого автора усредняем стандартизированные частотные векторы его произведений, а затем раскладываем расстояние между двумя авторскими профилями на вклады слов.',
      figureAfter: '<p><strong>Оранжевые столбцы слева — Достоевский. Синие справа — Толстой.</strong> Длина столбца показывает величину вклада слова, а направление — автора, в чьём профиле это слово имеет больший вес. Столбец слева не означает отрицательного расстояния.</p><p>Например, Дельта Берроуза выделяет на стороне Достоевского «давеча» и «давешний», на стороне Толстого — «шопотом» (написание в корпусе) и «нынче». Каждая панель показывает одну и ту же пару авторов через другую меру, поэтому самые заметные слова меняются. У панелей свои шкалы: численные величины между ними напрямую несопоставимы.</p>',
      figureCaption: 'Рисунок 6 из статьи. Вклады слов в различие между Достоевским (оранжевый, слева) и Толстым (синий, справа); для Rank-Turbulence Delta α = 1.',
      alt: 'Четыре диаграммы вкладов слов: Достоевский — оранжевые столбцы слева, Толстой — синие справа. Меры: Дельта Берроуза, косинусная, Jensen–Shannon и Rank-Turbulence Delta.',
      limits: 'В работе рассматриваются несколько языков и устойчивость интерпретаций. Расстояние и его разложение зависят от корпуса, предобработки и выбора признаков. Большой вклад слова — свойство конкретного сравнения; литературоведческий вывод требует возвращения к самим текстам.',
      start: 'В репозитории есть ноутбуки, зависимости и инструкции по воспроизведению. Начните с готового анализа, изучите частотные профили и графики вкладов, затем адаптируйте обработку к корпусу с понятным вам составом.',
    },
  },
  gwas: {
    slug: 'from-genes-to-tokens', title: 'From Genes to Tokens', pageTitle: 'From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis', year: '2026',
    formal: 'From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis',
    venue: 'arXiv:2606.09543 · Digital Humanities 2026.',
    preprint: urls.gwasPaper, code: urls.gwasCode,
    image: 'gwas-tolstoy.png', imageWidth: 3500, imageHeight: 2500,
    imageSource: 'https://github.com/DDPronin/GWAS-stylometry/blob/main/imgs/manhattan_tolstoy.png',
    bib: '@misc{pronin2026genes,\n  author = {Pronin, Dmitry and Kazartsev, Evgeny},\n  title = {From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis},\n  year = {2026},\n  eprint = {2606.09543},\n  archivePrefix = {arXiv},\n  url = {https://arxiv.org/abs/2606.09543}\n}',
    en: {
      subtitle: '', overviewTitle: 'A five-second overview', briefTitle: 'In a nutshell',
      question: 'We identify words whose frequencies are statistically associated with authorship, following the logic that GWAS uses to link genetic variants to traits.',
      steps: [
        ['Build comparable profiles', 'Lemmatize the texts and divide each work into non-overlapping chunks of 10,000 lemmas. The study analyses the 5,000 most frequent lemmas in each corpus and standardizes their frequencies.'],
        ['Test one word at a time', 'Fit a separate logistic regression for each lemma: is its frequency associated with the chunk belonging to the author being studied rather than another author? The coefficient β indicates the direction and strength of that association.'],
        ['Account for thousands of tests', 'Use the Bonferroni correction to make the significance threshold stricter. For example, with 5,000 tests and an overall level of 0.05, the threshold is 0.05 / 5,000 = 0.00001.'],
        ['Check the pattern', 'Plot the word associations and compare the number of significant words with what arises after randomly shuffling authorship labels. In the paper, all three authors studied show more significant features than expected under random labelling.'],
      ],
      figure: 'This Manhattan plot shows the analysis of Leo Tolstoy against the other authors in the Russian corpus. Each point is a lemma. Its horizontal position is its index in the feature list; its height, −log₁₀(p), represents evidence against the hypothesis of no association. Higher points have smaller p-values.',
      figureCaption: 'Figure 4 from the paper: word associations with Tolstoy’s authorship. The dashed line is the significance threshold after multiple-testing correction.',
      figureAfter: '<p><strong>Green:</strong> a higher word frequency is associated with Tolstoy. <strong>Red:</strong> a higher frequency is associated with the other authors. <strong>Grey:</strong> the association does not reach the corrected significance threshold. Colour shows direction; height shows statistical evidence, not effect size.</p><p>For instance, «сказать» (to say), «чувствовать» (to feel), «увидать» (to see), and «услыхать» (to hear) appear among the positive signals. They provide concrete starting points for reading how speech and perception are represented in these texts.</p><p>The study also finds lexical signals for H. G. Wells and Hermann Hesse in the English and German corpora. These associations describe the selected corpus; separating authorship from genre or period through additional model variables is a proposed next step.</p>',
      alt: 'Manhattan plot comparing Tolstoy with other authors: green points have positive associations, red negative, and grey do not reach significance. A dashed line marks the corrected threshold.',
      start: 'The repository includes the analysis notebook, lemmatization code, dependencies, figures, and the DH2026 presentation. Start by reproducing a supplied example and checking the outcome labels and preprocessing before substituting your own texts.',
    },
    ru: {
      subtitle: '', overviewTitle: 'Обзор за 5 секунд', briefTitle: 'Краткое содержание',
      question: 'Ищем слова, частота которых статистически связана с авторством, — по той же логике, по которой GWAS ищет связи генетических вариантов с признаками.',
      steps: [
        ['Готовим сопоставимые профили', 'Приводим слова к начальной форме и делим каждое произведение на непересекающиеся фрагменты по 10 000 лемм. В статье анализируем 5 000 самых частотных лемм каждого корпуса и стандартизируем их частоты.'],
        ['Проверяем каждое слово отдельно', 'Для каждой леммы строим отдельную логистическую регрессию: связана ли её частота с тем, что фрагмент принадлежит изучаемому автору, а не кому-то из остальных? Коэффициент β показывает направление и силу этой связи.'],
        ['Учитываем тысячи проверок', 'Используем поправку Бонферрони: делаем порог значимости строже с учётом числа проверок. Например, при 5 000 тестов и общем уровне 0,05 порог составит 0,05 / 5 000 = 0,00001.'],
        ['Проверяем общую картину', 'Строим карту связей слов с авторством и сравниваем число значимых слов с результатом случайного перемешивания авторских меток. Для всех трёх изученных авторов в статье значимых признаков оказалось больше, чем ожидалось при случайной разметке.'],
      ],
      figure: 'На Manhattan-графике показан анализ Льва Толстого в сравнении с остальными авторами русского корпуса. Каждая точка — лемма. По горизонтали указан её номер в списке признаков; по вертикали — −log₁₀(p), мера статистического свидетельства против гипотезы об отсутствии связи. Чем выше точка, тем меньше p-значение.',
      figureCaption: 'Рисунок 4 из статьи: связи слов с авторством Толстого. Пунктир — порог значимости после поправки на множественные проверки.',
      figureAfter: '<p><strong>Зелёный:</strong> более высокая частота слова связана с Толстым. <strong>Красный:</strong> с остальными авторами. <strong>Серый:</strong> связь не достигает скорректированного порога значимости. Цвет показывает направление связи, высота — статистическую убедительность, а не размер эффекта.</p><p>Например, среди положительных сигналов видны «сказать», «чувствовать», «увидать», «услыхать». Это конкретные отправные точки для чтения: можно исследовать, как в этих текстах передаются речь и восприятие.</p><p>В статье также выявлены лексические сигналы Герберта Уэллса и Германа Гессе в английском и немецком корпусах. Эти связи описывают выбранные данные; отделение авторства от жанра и эпохи с помощью дополнительных переменных модели предложено как следующий шаг.</p>',
      alt: 'Manhattan-график сравнения Толстого с другими авторами: зелёные точки — положительные связи, красные — отрицательные, серые не достигают значимости. Пунктир обозначает скорректированный порог.',
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
  const head = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="theme-color" content="#ffffff"><meta property="og:type" content="website"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:locale" content="${lang==='ru'?'ru_RU':'en_US'}">${currentUrl ? `<link rel="canonical" href="${currentUrl}"><meta property="og:url" content="${currentUrl}">` + ['en','ru'].map(l=>`<link rel="alternate" hreflang="${l}" href="${base}/${route(l,key)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${base}/${route('en',key)}">` : ''}<link rel="icon" href="${rel}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${rel}assets/style.css?v=3"><script defer src="${rel}assets/site.js"></script><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`;
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

function rankBrief(lang,c) {
  const ru=lang==='ru';
  const math=(label,body)=>`<div class="equation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="${esc(label)}">${body}</math></div>`;
  const z=(author)=>`<msubsup><mi>z</mi><mi>i</mi><mrow><mo>(</mo><mn>${author}</mn><mo>)</mo></mrow></msubsup>`;
  const p=(author)=>`<msubsup><mi>p</mi><mi>i</mi><mrow><mo>(</mo><mn>${author}</mn><mo>)</mo></mrow></msubsup>`;
  const sigma='<msub><mi>σ</mi><mi>i</mi></msub>';
  const sum='<munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover>';
  const delta='<mrow><mi>Δ</mi><mo>(</mo><msub><mi>T</mi><mn>1</mn></msub><mo>,</mo><msub><mi>T</mi><mn>2</mn></msub><mo>)</mo></mrow>';
  const contribution='<msub><mi>δ</mi><mi>i</mi></msub>';
  const distance=math(ru?'Дельта равна сумме абсолютных разностей стандартизированных частот слов в двух текстах':'Delta is the sum of absolute differences between standardized word frequencies in two texts',`${delta}<mo>=</mo>${sum}<mrow><mo>|</mo>${z(1)}<mo>−</mo>${z(2)}<mo>|</mo></mrow>`);
  const standard=math(ru?'Стандартизированная частота: из частоты слова вычитаем среднюю по корпусу и делим на стандартное отклонение':'Standardized frequency: subtract the corpus mean from the word frequency and divide by its standard deviation',`${z(1)}<mo>=</mo><mfrac><mrow>${p(1)}<mo>−</mo><msub><mi>μ</mi><mi>i</mi></msub></mrow>${sigma}</mfrac>`);
  const parts=math(ru?'Вклад слова равен модулю разности его частот, делённой на стандартное отклонение':'A word’s contribution is its absolute frequency difference divided by its standard deviation',`${contribution}<mo>=</mo><mrow><mo>|</mo>${z(1)}<mo>−</mo>${z(2)}<mo>|</mo></mrow><mo>=</mo><mfrac><mrow><mo>|</mo>${p(1)}<mo>−</mo>${p(2)}<mo>|</mo></mrow>${sigma}</mfrac>`);
  const total=math(ru?'Дельта равна сумме вкладов всех выбранных слов':'Delta equals the sum of all selected word contributions',`${delta}<mo>=</mo>${sum}${contribution}`);
  return `<section id="brief"><h2>${c.briefTitle}</h2>${ru?`
    <p>Стилометрические расстояния, например Дельта Берроуза, помогают определять авторство и группировать тексты по авторам, сравнивая их векторные представления. Но какие именно слова в этих векторах сильнее всего влияют на различие между конкретными текстами или их группами?</p>
    <p>Дельта Берроуза описывает степень отличия двух текстов как расстояние между их стандартизированными частотными векторами:</p>
    ${distance}
    <p class="formula-note">Здесь и далее используем Дельту без деления на число выбранных слов <i>n</i>. При фиксированном наборе слов это меняет только масштаб, но не порядок расстояний.</p>
    <p>Каждая координата <i>z</i> — частота одного слова, приведённая к общему масштабу. Из относительной частоты <i>p</i> вычитаем среднюю по корпусу <i>μ</i> и делим на стандартное отклонение <i>σ</i> этого слова:</p>
    ${standard}
    <p>До финального суммирования расстояние рассчитывается отдельно для каждого слова. При вычитании среднее сокращается, и вклад слова <i>i</i> можно записать так:</p>
    ${parts}${total}
    <p>Значит, можно оценить вклад каждого слова, сравнить его с остальными и выделить наиболее сильные лексические сигналы, по которым метод различает стили.</p>
    <details class="worked-example"><summary>Условный пример на трёх словах</summary><p>Возьмём два условных текста. Числа ниже придуманы для объяснения формулы и не являются результатами сравнения писателей.</p>
    <div class="table-scroll"><table><caption>Стандартизированные частоты и вклады</caption><thead><tr><th scope="col">Слово</th><th scope="col">z в T₁</th><th scope="col">z в T₂</th><th scope="col">Вклад δ</th></tr></thead><tbody><tr><th scope="row">давеча</th><td>2</td><td>0</td><td>2</td></tr><tr><th scope="row">шёпотом</th><td>0</td><td>1</td><td>1</td></tr><tr><th scope="row">и</th><td>0,5</td><td>0,5</td><td>0</td></tr></tbody></table></div>
    <p>Дельта равна 2 + 1 + 0 = <strong>3</strong>. В этом примере «давеча» даёт две трети расстояния, «шёпотом» — одну треть, а «и» не вносит вклада, поскольку его частоты совпадают.</p></details>
    <p class="formula-note">Формулы и разложение: <a href="https://arxiv.org/pdf/2604.19499#page=3">раздел 2</a> и <a href="https://arxiv.org/pdf/2604.19499#page=6">раздел 4 статьи</a>.</p>
  `:`
    <p>Stylometric distances such as Burrows’s Delta help attribute texts and group them by author by comparing their vector representations. But which words in those vectors contribute most to the difference between individual texts or groups of texts?</p>
    <p>Burrows’s Delta expresses the difference between two texts as a distance between their standardized frequency vectors:</p>
    ${distance}
    <p class="formula-note">Throughout this explanation, we omit division by the number of selected words, <i>n</i>. For a fixed word set, this changes the scale but not the ordering of distances.</p>
    <p>Each coordinate <i>z</i> is a word frequency expressed on a common scale: subtract the corpus mean <i>μ</i> from the relative frequency <i>p</i>, then divide by that word’s standard deviation <i>σ</i>:</p>
    ${standard}
    <p>Before the final sum, the distance is calculated separately for each word. The mean cancels in the subtraction, so the contribution of word <i>i</i> can be written as:</p>
    ${parts}${total}
    <p>We can therefore quantify each word’s contribution, compare it with the others, and identify the strongest lexical signals by which the method distinguishes writing styles.</p>
    <details class="worked-example"><summary>A worked example with three words</summary><p>Consider two hypothetical texts. These numbers illustrate the formula; they are not results from a comparison of writers.</p>
    <div class="table-scroll"><table><caption>Standardized frequencies and contributions</caption><thead><tr><th scope="col">Word</th><th scope="col">z in T₁</th><th scope="col">z in T₂</th><th scope="col">Contribution δ</th></tr></thead><tbody><tr><th scope="row">давеча</th><td>2</td><td>0</td><td>2</td></tr><tr><th scope="row">шёпотом</th><td>0</td><td>1</td><td>1</td></tr><tr><th scope="row">и</th><td>0.5</td><td>0.5</td><td>0</td></tr></tbody></table></div>
    <p>Delta is 2 + 1 + 0 = <strong>3</strong>. Here, «давеча» (earlier today) accounts for two thirds of the distance, «шёпотом» (in a whisper) for one third, and «и» (and) contributes nothing because its frequencies are identical.</p></details>
    <p class="formula-note">For the formulas and decomposition, see <a href="https://arxiv.org/pdf/2604.19499#page=3">Section 2</a> and <a href="https://arxiv.org/pdf/2604.19499#page=6">Section 4 of the paper</a>.</p>
  `}</section>`;
}

function gwasBrief(lang,c) {
  return `<section id="brief"><h2>${c.briefTitle}</h2>${lang==='ru'?`
    <p>Можно ли искать авторские особенности так же, как генетики ищут варианты ДНК, связанные с ростом или заболеванием? В GWAS каждый генетический маркер проверяют отдельно. Мы переносим эту логику на язык: маркером становится частота слова, а изучаемым признаком — авторство текста.</p>
    <p>Берём тексты с известными авторами, делим их на сопоставимые фрагменты и считаем частоты слов. Затем выбираем писателя и для каждого слова задаём один вопрос: меняется ли вероятность того, что фрагмент принадлежит этому автору, вместе с частотой слова?</p>
    <p>Так получаем карту лексических ассоциаций. У каждого слова есть направление и сила связи — коэффициент <i>β</i> — и <i>p</i>-значение для проверки гипотезы, что связи нет. Поправка на тысячи одновременно проверяемых слов помогает отсеять случайные находки. В результате можно увидеть и слова, характерные для автора, и те, которые сравнительно редко встречаются в его текстах.</p>
    <details class="worked-example" open><summary>Пример: что слово «чувствовать» говорит о Толстом?</summary>
    <p>Помечаем фрагменты Толстого числом 1, фрагменты остальных писателей — 0. Для каждого фрагмента берём стандартизированную частоту леммы «чувствовать» и строим модель только с этим словом.</p>
    <p>Положительный коэффициент означает: чем выше частота, тем выше оценённая моделью вероятность метки «Толстой». Отрицательный показал бы обратную связь. Если проверка проходит скорректированный порог значимости, слово попадает в список авторских сигналов.</p>
    <p>В результатах статьи «чувствовать» действительно находится среди положительных сигналов Толстого. Это позволяет перейти к литературоведческому вопросу: в каких сценах, сочетаниях и повествовательных функциях возникает это слово?</p></details>
    <p class="formula-note">Подход и результаты описаны в <a href="https://arxiv.org/pdf/2606.09543#page=2">разделах 2–3 статьи</a>. Работа представлена на DH2026 и доступна как препринт.</p>
  `:`
    <p>Can we look for features of writing style in the same way that geneticists look for DNA variants associated with height or disease? GWAS tests each genetic marker separately. We transfer that logic to language: word frequency becomes the marker, and authorship becomes the trait of interest.</p>
    <p>We take texts with known authors, split them into comparable chunks, and count word frequencies. We then choose an author and ask the same question for every word: does the probability that a chunk belongs to this author vary with that word’s frequency?</p>
    <p>The result is a map of lexical associations. Each word receives a coefficient, <i>β</i>, indicating the direction and strength of the association, and a <i>p</i>-value for testing the hypothesis of no association. Correcting for the thousands of words tested helps filter out chance findings. The map reveals both words characteristic of an author and words used comparatively rarely in that author’s texts.</p>
    <details class="worked-example" open><summary>An example: what does “to feel” tell us about Tolstoy?</summary>
    <p>Label Tolstoy’s chunks 1 and the other writers’ chunks 0. For each chunk, take the standardized frequency of «чувствовать» (to feel) and fit a model using that word alone.</p>
    <p>A positive coefficient means that a higher frequency corresponds to a higher model-estimated probability of the Tolstoy label. A negative coefficient would indicate the reverse association. If the test passes the corrected significance threshold, the word becomes a candidate authorial signal.</p>
    <p>In the paper’s results, «чувствовать» is indeed a positive signal for Tolstoy. This leads to a literary question: in which scenes, combinations, and narrative functions does the word appear?</p></details>
    <p class="formula-note">See <a href="https://arxiv.org/pdf/2606.09543#page=2">Sections 2–3 of the paper</a> for the method and results. The work was presented at DH2026 and is available as a preprint.</p>
  `}</section>`;
}

function researchPage(lang,key) {
  const r=research[key], c=r[lang], t=text[lang];
  const other=key==='rank'?'gwas':'rank';
  const sections=[['question',c.overviewTitle],['brief',c.briefTitle],['method',t.method],['figure',t.figure],['start',t.start]];
  return document(lang,key,({rel,local})=>`
  <header class="article-header wrap">${link(local(home(lang))+'#research',`← ${t.back}`,'back-link')}<p class="eyebrow">${key==='rank'?t.journal:t.preprint}</p><h1>${r.pageTitle || r.title}</h1>${c.subtitle?`<p class="article-subtitle">${c.subtitle}</p>`:''}<p class="authors">${t.authors}</p>${resourceLinks(r,t)}</header>
  <div class="article-body wrap"><aside class="article-toc"><span class="section-label">${lang==='ru'?'В этом разборе':'In this explanation'}</span><nav aria-label="${lang==='ru'?'Разделы исследования':'Research sections'}">${sections.map(([id,label])=>link('#'+id,label)).join('')}</nav></aside><div class="article-content"><section id="question"><h2>${c.overviewTitle || t.question}</h2><p class="lead">${c.question}</p></section>${key==='rank'?rankBrief(lang,c):gwasBrief(lang,c)}<section id="method"><h2>${t.method}</h2><ol class="method-steps">${c.steps.map(([title,body])=>`<li><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol></section><section id="figure"><h2>${t.figure}</h2><p>${c.figure}</p><figure><a href="${rel}assets/${r.image}" aria-label="${t.fullSize}"><img src="${rel}assets/${r.image}" alt="${esc(c.alt)}" width="${r.imageWidth}" height="${r.imageHeight}" loading="lazy"></a><figcaption>${c.figureCaption?esc(c.figureCaption)+' <br>':''}${link(`${rel}assets/${r.image}`,t.fullSize)} · ${link(r.imageSource,t.source)}</figcaption></figure>${c.figureAfter || ''}</section><section id="start"><h2>${t.start}</h2><p>${c.start}</p>${link(r.code,`${t.code} ↗`,'primary-link')}</section><section class="citation" id="citation"><h2>${t.bib}</h2><p>${esc(r.formal)}. ${r.venue}</p><details><summary>BibTeX</summary><button class="copy-button" type="button" data-copy="citation-bib" data-copied="${t.copied}" data-failed="${lang==='ru'?'Выделите и скопируйте текст ниже':'Select and copy the text below'}">${t.copy}</button><pre id="citation-bib"><code>${esc(r.bib)}</code></pre><span class="copy-status" aria-live="polite"></span></details>${resourceLinks(r,t)}</section><div class="related"><p class="meta">${t.next}</p><h3>${link(local(route(lang,other)),research[other].title+' →')}</h3></div></div></div>`,
  {title:`${r.pageTitle || r.title} — ${t.name}`,description:c.subtitle || c.question});
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
