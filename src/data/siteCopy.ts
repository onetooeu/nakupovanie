export type Lang = 'sk' | 'cz' | 'en';

export type ShowcaseVariant =
  | 'marketplace'
  | 'comparison'
  | 'affiliate'
  | 'content'
  | 'umbrella'
  | 'b2b';

export interface SiteCopy {
  lang: Lang;
  nav: {
    logo: string;
    menu: { label: string; href: string }[];
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
  };
  offer: {
    title: string;
    intro: string;
    domainA: { name: string; desc: string };
    domainB: { name: string; desc: string };
    footer: string;
  };
  strategic: {
    title: string;
    intro: string;
    points: { title: string; text: string }[];
  };
  showcase: {
    title: string;
    intro: string;
    items: { title: string; text: string; variant: ShowcaseVariant; tag: string }[];
    outro: string;
  };
  audience: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
    outro: string;
  };
  urgency: {
    title: string;
    intro: string;
    points: { title: string; text: string }[];
    outro: string;
  };
  process: {
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
    outro: string;
  };
  trust: {
    title: string;
    intro: string;
    cards: { title: string; text: string }[];
    endpoints: { label: string; href: string }[];
    outro: string;
  };
  form: {
    title: string;
    intro: string;
    submit: string;
    fields: {
      companyName: string;
      companyId: string;
      contactName: string;
      position: string;
      email: string;
      phone: string;
      country: string;
      website: string;
      industry: string;
      address: string;
      note: string;
      consentData: string;
      consentContact: string;
      consentTerms: string;
    };
  };
  buyNow: {
    title: string;
    intro: string;
    note: string;
    priceLabel: string;
    phoneLabel: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    contact: string;
    links: { label: string; href: string }[];
    disclaimer: string;
  };
  thankYou: {
    title: string;
    intro: string;
    auctionDate: string;
    buyNowText: string;
    contactText: string;
    cta: string;
  };
  privacy: {
    title: string;
    intro: string;
    sections: { title: string; body: string[] }[];
    contactTitle: string;
    contactBody: string;
  };
  terms: {
    title: string;
    intro: string;
    sections: { title: string; body: string[] }[];
  };
}

const common = {
  auctionDate: '1. 11. 2026',
  price: '100 000 €',
  phone: '+421 944 222 485',
  email: 'pato.ulicny@gmail.com',
  company: 'OneToo s. r. o.',
  address: 'Mostová 20, 034 01 Ružomberok',
};

export const siteCopy: Record<Lang, SiteCopy> = {
  sk: {
    lang: 'sk',
    nav: {
      logo: 'nakupovanie.sk / nakupovani.cz',
      menu: [
        { label: 'Ponuka', href: '#ponuka' },
        { label: 'Showcase', href: '#showcase' },
        { label: 'Proces', href: '#proces' },
        { label: 'TFWS 2.0', href: '#tfws' },
        { label: 'Registrácia', href: '#registracia' },
      ],
      languageLabel: 'Jazyk',
    },
    hero: {
      eyebrow: 'Private acquisition process • B2B only • TFWS 2.0 ready',
      title:
        'www.nakupovanie.sk / www.nakupovani.cz  unikátna ponuka na predaj dvojice prémiových domén pre internetové projekty na Slovensku a v Česku, ktorá sa na trhu objavuje len výnimočne.',
      subtitle:
        'Záujemcovia z radov firiem sa môžu jednoducho registrovať, získať prístup do uzavretého procesu a zároveň využiť možnosť okamžitej kúpy.',
      ctaPrimary: 'Registrovať firmu',
      ctaSecondary: 'Zobraziť ponuku',
      trust: [
        'Uzavretý proces pre firmy',
        'Dvojica domén ako jednotný balík',
        'Okamžitá kúpa po registrácii',
      ],
    },
    offer: {
      title: 'Predmet ponuky',
      intro:
        `Predmetom ponuky je výhradne dvojica domén nakupovanie.sk a nakupovani.cz ako jednotný balík.

Ide o prémiové domény s rovnakým významom pre slovenský aj český trh, ktoré tvoria prirodzený základ pre internetové projekty s regionálnym dosahom.`,
      domainA: {
        name: 'nakupovanie.sk',
        desc: 'Slovenská prémiová doména s veľmi silným a prirodzeným významom.',
      },
      domainB: {
        name: 'nakupovani.cz',
        desc: 'Česká prémiová doména s rovnakou logikou a regionálnym presahom.',
      },
      footer: 'Spolu tvoria unikátny balík, ktorý je možné získať iba ako celok.',
    },
    strategic: {
      title: 'Prečo je to strategické',
      intro:
        `Dvojica domén nakupovanie.sk a nakupovani.cz predstavuje mimoriadne silný základ pre budovanie internetových projektov s regionálnym presahom.

Ich názov je okamžite zrozumiteľný, prirodzene zapamätateľný a zároveň vhodný pre viacero obchodných modelov.`,
      points: [
        {
          title: 'Okamžitá zrozumiteľnosť',
          text: 'Názov je jednoduchý, prirodzený a ľudia mu rozumejú bez vysvetlenia.',
        },
        {
          title: 'Regionálne pokrytie',
          text: 'Jedna doména pre Slovensko, druhá pre Česko. Spolu vytvárajú silný cezhraničný základ.',
        },
        {
          title: 'Univerzálne využitie',
          text: 'Domény nie sú obmedzené na jeden typ projektu. Vhodné sú pre e-commerce, marketplace, obsahové projekty, affiliate aj korporátne platformy.',
        },
        {
          title: 'Prémiový dojem',
          text: 'Generický názov pôsobí dôveryhodne, seriózne a profesionálne od prvého kontaktu.',
        },
        {
          title: 'Strategická hodnota pre firmu',
          text: 'Kupujúci nezískava len doménu, ale základ pre dlhodobú digitálnu prítomnosť v dvoch krajinách.',
        },
      ],
    },
    showcase: {
      title: 'Ako môže tento priestor vyzerať',
      intro:
        `Dvojica domén vytvára univerzálny základ pre viacero typov internetových projektov.

Nižšie sú ukážky, ako môže byť tento priestor využitý v praxi.`,
      items: [
        {
          title: 'Marketplace platforma',
          text: 'Silný základ pre platformu, ktorá prepája ponuku, dopyt a obchod v jednom prostredí.',
          variant: 'marketplace',
          tag: 'Marketplace',
        },
        {
          title: 'Cenový porovnávač',
          text: 'Prirodzený smer pre projekt, ktorý pomáha zákazníkom porovnávať ceny a vyberať produkty.',
          variant: 'comparison',
          tag: 'Comparison',
        },
        {
          title: 'Affiliate shopping hub',
          text: 'Obsahový a performance model pre produktové odporúčania, rebríčky a výbery najlepších ponúk.',
          variant: 'affiliate',
          tag: 'Affiliate',
        },
        {
          title: 'Content commerce magazín',
          text: 'Prémiový editoriálny priestor pre články, odporúčania, trendy a nákupné inšpirácie.',
          variant: 'content',
          tag: 'Media',
        },
        {
          title: 'E-commerce umbrella brand',
          text: 'Názov môže slúžiť ako hlavná strecha pre viacero produktových alebo obchodných projektov.',
          variant: 'umbrella',
          tag: 'Umbrella',
        },
        {
          title: 'B2B/B2C obchodná platforma',
          text: 'Flexibilný základ pre projekt, ktorý vie fungovať medzi firmami aj koncovými zákazníkmi.',
          variant: 'b2b',
          tag: 'Commerce',
        },
      ],
      outro:
        'Každý z týchto modelov ukazuje, že hodnota domén nie je len v názve, ale v tom, čo na ňom môže dlhodobo vzniknúť.',
    },
    audience: {
      title: 'Pre koho je akvizícia vhodná',
      intro:
        'Táto ponuka je vhodná pre subjekty, ktoré pôsobia v online priestore a hľadajú silný názov s regionálnym presahom a dlhodobým obchodným potenciálom.',
      items: [
        {
          title: 'E-commerce spoločnosti',
          text: 'Pre firmy, ktoré chcú posilniť svoju značku a vstúpiť do dvoch trhov pod prirodzeným a dôveryhodným názvom.',
        },
        {
          title: 'Marketplace projekty',
          text: 'Pre platformy, ktoré prepájajú predajcov a zákazníkov v jednom prostredí.',
        },
        {
          title: 'Porovnávače cien a nákupní radcovia',
          text: 'Pre projekty, ktoré pracujú s produktmi, ponukami, recenziami a výberom tovaru.',
        },
        {
          title: 'Affiliate a performance projekty',
          text: 'Pre modely založené na obsahu, odporúčaniach a partnerských províziách.',
        },
        {
          title: 'Retail a obchodné skupiny',
          text: 'Pre firmy, ktoré chcú vytvoriť silný zastrešujúci názov pre svoju online prítomnosť.',
        },
        {
          title: 'Mediálne a obsahové projekty',
          text: 'Pre weby, ktoré chcú spájať obsah, inšpiráciu a obchodný dosah.',
        },
      ],
      outro:
        'Ak firma uvažuje o dlhodobej digitálnej stratégii v Slovensku a v Česku, ide o názov s jasným obchodným potenciálom.',
    },
    urgency: {
      title: 'Prečo konať teraz',
      intro:
        `Dvojica domén je dostupná v jedinečnej kombinácii, ktorá sa na trhu objavuje len zriedkavo.

Pre firmy, ktoré chcú rásť v online priestore, môže rozhodnutie v správnom momente znamenať zásadný strategický rozdiel.`,
      points: [
        {
          title: 'Obmedzená príležitosť',
          text: 'Takáto dvojica sa na trhu neobjavuje často a jej dostupnosť je prirodzene limitovaná.',
        },
        {
          title: 'Strategická výhoda pre prvého kupujúceho',
          text: 'Kto získa tento názov skôr, získa aj silnú pozíciu v priestore, ktorý už nebude ľahko dostupný konkurencii.',
        },
        {
          title: 'Zmysluplný časový rámec',
          text: 'Proces je nastavený tak, aby mal dostatočný priestor na rozhodnutie, ale zároveň si zachoval tlak a exkluzivitu.',
        },
        {
          title: 'Okamžitá kúpa bez čakania',
          text: 'Pre firmy, ktoré nechcú vstupovať do uzavretého procesu, je pripravená aj okamžitá kúpa.',
        },
      ],
      outro:
        'Rozhodnutie dnes môže znamenať konkurenčnú výhodu na dlhé roky dopredu.',
    },
    process: {
      title: 'Ako prebieha uzavretý proces',
      intro:
        `Proces je navrhnutý tak, aby bol jednoduchý pre záujemcu a zároveň plne pod kontrolou predávajúceho.

Firmy sa najprv zaregistrujú, následne sú zaradené do databázy a potom môžu vstúpiť do uzavretého kola alebo využiť okamžitú kúpu.`,
      steps: [
        {
          title: '1. Registrácia firmy',
          text: 'Záujemca vyplní základné údaje o spoločnosti a kontaktnej osobe.',
        },
        {
          title: '2. Zaradenie do databázy',
          text: 'Firma sa dostane do interného zoznamu záujemcov a bude informovaná o ďalšom postupe.',
        },
        {
          title: '3. Automatický email s potvrdením',
          text: 'Po registrácii firma dostane okamžité potvrdenie.',
        },
        {
          title: '4. Poštové oznámenie o začatí procesu',
          text: 'Vybraným firmám sa pošle oznámenie klasickou poštou.',
        },
        {
          title: '5. Uzavreté prihadzovanie',
          text: 'Registrované firmy môžu v stanovenom časovom okne zadávať svoje ponuky.',
        },
        {
          title: '6. Okamžitá kúpa',
          text: 'Ak firma nechce čakať, môže domény získať ihneď za fixnú cenu.',
        },
      ],
      outro:
        'Celý proces je postavený tak, aby bol pre firmy jednoduchý, prehľadný a zároveň časovo obmedzený.',
    },
    trust: {
      title: 'TFWS 2.0 / Overiteľná publikácia',
      intro:
        'Tento web je publikovaný ako statický, hashovateľný trust surface. Každý dôležitý artefakt je linkovateľný, overiteľný a pripravený na podpis v TFWS 2.0 štýle.',
      cards: [
        {
          title: 'Human entrypoint',
          text: 'Web obsahuje čitateľné vstupné stránky pre SK, CZ a EN, aby bol proces zrozumiteľný aj pre vedenie firmy.',
        },
        {
          title: 'Machine entrypoint',
          text: 'Strojovo čitateľné artefakty žijú v /.well-known/ a umožňujú automatizované overenie bez centrálnej autority.',
        },
        {
          title: 'Hash inventory',
          text: 'Dumps s sha256 inventory umožňujú auditovať, čo presne bolo publikované, kedy a v akom stave.',
        },
        {
          title: 'Signing-ready flow',
          text: 'Projekt je pripravený na Ed25519 / minisign signing flow a na budúce doplnenie produkčného kľúča.',
        },
      ],
      endpoints: [
        { label: '/.well-known/ai-trust-hub.json', href: '/.well-known/ai-trust-hub.json' },
        { label: '/.well-known/llms.txt', href: '/.well-known/llms.txt' },
        { label: '/.well-known/minisign.pub', href: '/.well-known/minisign.pub' },
        { label: '/.well-known/key-history.json', href: '/.well-known/key-history.json' },
        { label: '/dumps/sha256.json', href: '/dumps/sha256.json' },
        { label: '/verify.html', href: '/verify.html' },
      ],
      outro:
        'Tento prístup prepája predajný web s dôveryhodnou publikačnou vrstvou a ukazuje technickú disciplínu, ktorú očakáva TFWS ekosystém.',
    },
    form: {
      title: 'Registrovať firmu',
      intro:
        'Zaregistrujte vašu spoločnosť a získajte prístup do uzavretého procesu dražby. Po registrácii sa zobrazí aj možnosť okamžitej kúpy a kontaktné údaje na priame rokovanie.',
      submit: 'Registrovať firmu',
      fields: {
        companyName: 'Názov firmy',
        companyId: 'IČO / Company ID',
        contactName: 'Meno kontaktnej osoby',
        position: 'Funkcia v spoločnosti',
        email: 'Firemný email',
        phone: 'Telefónne číslo',
        country: 'Krajina',
        website: 'Web firmy',
        industry: 'Odvetvie / typ spoločnosti',
        address:
          'Doručovacia adresa spoločnosti pre zaslanie oznámenia o začatí uzavretého procesu dražby',
        note: 'Krátka poznámka k využitiu domén',
        consentData: 'Súhlas so spracovaním osobných údajov',
        consentContact: 'Súhlas s kontaktovaním ohľadom ponuky',
        consentTerms: 'Súhlas s podmienkami registrácie a uzavretého procesu',
      },
    },
    buyNow: {
      title: 'Okamžitá kúpa',
      intro:
        'Pre firmy, ktoré nechcú čakať na uzavreté prihadzovanie, je k dispozícii aj možnosť okamžitého odkúpenia.',
      note: `Ďakujeme za registráciu. Vaša firma bola zaradená do procesu dražby, ktorá bude spustená ${common.auctionDate}. Ak máte záujem o okamžitú kúpu, fixná cena a telefónny kontakt sú uvedené nižšie.`,
      priceLabel: common.price,
      phoneLabel: common.phone,
    },
    faq: {
      title: 'Najčastejšie otázky',
      items: [
        { q: 'Predávajú sa obe domény samostatne?', a: 'Nie. Predmetom ponuky je výhradne dvojica domén ako jednotný balík.' },
        { q: 'Je web určený aj pre súkromné osoby?', a: 'Nie. Ponuka je určená výhradne pre firmy a organizácie.' },
        { q: 'Ako prebieha registrácia?', a: 'Firma vyplní jednoduchý registračný formulár so základnými údajmi.' },
        { q: 'Čo sa deje po registrácii?', a: `Firma je zaradená do uzavretého procesu dražby, ktorý bude spustený ${common.auctionDate}.` },
        { q: 'Dá sa domény získať aj bez čakania na dražbu?', a: `Áno. Okamžitá kúpa je možná za fixnú cenu ${common.price}.` },
        { q: 'Kedy sa zobrazí fixná cena?', a: 'Po odoslaní registračného formulára, spolu s kontaktnými údajmi na priame rokovanie.' },
        { q: 'Prečo je potrebná doručovacia adresa?', a: 'Na zaslanie oznámenia o začatí uzavretého procesu dražby klasickou poštou.' },
        { q: 'Ako dlho bude dražba trvať?', a: 'Plánovaná dĺžka uzavretého kola je 14 dní.' },
        { q: 'Môžu sa zúčastniť aj firmy zo zahraničia?', a: 'Áno, pokiaľ majú relevantný záujem o SK/CZ online trh.' },
        { q: 'Je registrácia záväzná?', a: 'Nie, registrácia slúži na zaradenie firmy do procesu a na ďalšiu komunikáciu.' },
      ],
    },
    footer: {
      contact: `${common.company} · ${common.email} · ${common.phone}`,
      links: [
        { label: 'Ochrana osobných údajov', href: '/sk/privacy' },
        { label: 'Podmienky registrácie', href: '/sk/terms' },
        { label: 'TFWS verify', href: '/verify.html' },
      ],
      disclaimer:
        'Registrácia nezakladá nárok na úspech v procese ani na pridelenie domén. Predávajúci si vyhradzuje právo určiť priebeh a podmienky uzavretého procesu.',
    },
    thankYou: {
      title: 'Ďakujeme za registráciu',
      intro:
        `Vaša firma bola zaradená do procesu dražby, ktorá bude spustená ${common.auctionDate}. Ak máte záujem o okamžitú kúpu, fixná cena a telefónny kontakt sú uvedené nižšie.`,
      auctionDate: common.auctionDate,
      buyNowText: 'Okamžitá kúpa je dostupná po registrácii.',
      contactText: common.phone,
      cta: 'Späť na úvod',
    },
    privacy: {
      title: 'Ochrana osobných údajov',
      intro:
        'Tento dokument vysvetľuje, ako spracúvame osobné údaje pri registrácii firiem do procesu predaja domén.',
      sections: [
        {
          title: '1. Prevádzkovateľ',
          body: [
            `${common.company}, ${common.address}, email ${common.email}, telefón ${common.phone}.`,
          ],
        },
        {
          title: '2. Aké údaje spracúvame',
          body: [
            'Názov firmy, IČO, meno a funkciu kontaktnej osoby, firemný email, telefónne číslo, krajinu, web firmy, doručovaciu adresu a ďalšie údaje, ktoré nám poskytnete dobrovoľne.',
          ],
        },
        {
          title: '3. Na aký účel údaje používame',
          body: [
            'Údaje používame na evidenciu firiem, komunikáciu o uzavretom procese predaja, zaslanie oznámenia poštou, administráciu procesu, potvrdenie záujmu o okamžitú kúpu a splnenie prípadných zákonných povinností.',
          ],
        },
        {
          title: '4. Právny základ',
          body: [
            'Spracúvanie môže byť založené na predzmluvných opatreniach, oprávnenom záujme prevádzkovateľa, súhlase tam, kde je potrebný, a na plnení zákonných povinností.',
          ],
        },
        {
          title: '5. Doba uchovávania',
          body: [
            'Údaje uchovávame len po dobu nevyhnutnú na splnenie účelu, spravidla počas trvania procesu a následne po dobu potrebnú na administratívne, právne alebo účtovné účely.',
          ],
        },
        {
          title: '6. Práva dotknutej osoby',
          body: [
            'Máte právo na prístup, opravu, výmaz, obmedzenie spracúvania, námietku, prenosnosť, ak sú splnené podmienky, a právo podať sťažnosť dozornému orgánu.',
          ],
        },
      ],
      contactTitle: 'Kontakt pre uplatnenie práv',
      contactBody: `${common.email} · ${common.phone}`,
    },
    terms: {
      title: 'Podmienky registrácie a uzavretého procesu',
      intro:
        'Nasledujúce podmienky nastavujú základné pravidlá registrácie, komunikácie a uzavretého procesu dražby.',
      sections: [
        {
          title: '1. Predmet ponuky',
          body: [
            'Predmetom ponuky je výhradne dvojica domén nakupovanie.sk a nakupovani.cz ako jednotný balík.',
          ],
        },
        {
          title: '2. Určenie ponuky',
          body: ['Ponuka je určená výhradne pre firmy, organizácie a profesionálnych záujemcov.'],
        },
        {
          title: '3. Registrácia',
          body: [
            'Registráciou firma potvrdzuje, že poskytuje pravdivé a úplné údaje a súhlasí so zaradením do interného zoznamu záujemcov.',
          ],
        },
        {
          title: '4. Doručovacia adresa',
          body: ['Firma je povinná uviesť doručovaciu adresu spoločnosti pre zaslanie oznámenia o začatí uzavretého procesu dražby.'],
        },
        {
          title: '5. Uzavretý proces',
          body: [`Uzavretý proces dražby je plánovaný na spustenie ${common.auctionDate}.`],
        },
        {
          title: '6. Okamžitá kúpa',
          body: ['Popri uzavretom procese je možná aj okamžitá kúpa domén za fixnú cenu, ktorá sa zobrazí po registrácii.'],
        },
        {
          title: '7. Komunikácia',
          body: ['Prevádzkovateľ môže záujemcov kontaktovať emailom, telefonicky alebo poštou.'],
        },
        {
          title: '8. Zodpovednosť za údaje',
          body: ['Firma zodpovedá za správnosť údajov, ktoré pri registrácii uvedie.'],
        },
        {
          title: '9. Právo odmietnuť účasť',
          body: ['Prevádzkovateľ si vyhradzuje právo zaradiť alebo nezaradiť firmu do finálneho kola, upraviť pravidlá procesu, ukončiť proces alebo uzavrieť predaj s vybraným záujemcom.'],
        },
        {
          title: '10. Záverečné ustanovenie',
          body: ['Registráciou firma potvrdzuje, že si tieto podmienky prečítala, rozumie im a súhlasí s nimi v rozsahu potrebnom na spracovanie registrácie a komunikáciu o ponuke.'],
        },
      ],
    },
  },
  cz: {
    lang: 'cz',
    nav: {
      logo: 'nakupovanie.sk / nakupovani.cz',
      menu: [
        { label: 'Nabídka', href: '#ponuka' },
        { label: 'Showcase', href: '#showcase' },
        { label: 'Proces', href: '#proces' },
        { label: 'TFWS 2.0', href: '#tfws' },
        { label: 'Registrace', href: '#registracia' },
      ],
      languageLabel: 'Jazyk',
    },
    hero: {
      eyebrow: 'Private acquisition process • B2B only • TFWS 2.0 ready',
      title:
        'www.nakupovanie.sk / www.nakupovani.cz  unikátní nabídka dvojice prémiových domén na prodej pro internetové projekty na Slovensku a v Česku, která se na trhu objevuje jen výjimečně.',
      subtitle:
        'Zájemci z řad firem se mohou jednoduše registrovat, získat přístup do uzavřeného procesu a zároveň využít možnost okamžité koupě.',
      ctaPrimary: 'Registrovat firmu',
      ctaSecondary: 'Zobrazit nabídku',
      trust: [
        'Uzavřený proces pro firmy',
        'Dvojice domén jako jednotný balík',
        'Okamžitá koupě po registraci',
      ],
    },
    offer: {
      title: 'Předmět nabídky',
      intro:
        `Předmětem nabídky je výhradně dvojice domén nakupovanie.sk a nakupovani.cz jako jednotný balík.

Jde o prémiové domény se stejným významem pro slovenský i český trh, které tvoří přirozený základ pro internetové projekty s regionálním dosahem.`,
      domainA: {
        name: 'nakupovanie.sk',
        desc: 'Slovenská prémiová doména s velmi silným a přirozeným významem.',
      },
      domainB: {
        name: 'nakupovani.cz',
        desc: 'Česká prémiová doména se stejnou logikou a regionálním přesahem.',
      },
      footer: 'Spolu tvoří unikátní balík, který lze získat pouze jako celek.',
    },
    strategic: {
      title: 'Proč je to strategické',
      intro:
        `Dvojice domén nakupovanie.sk a nakupovani.cz představuje mimořádně silný základ pro budování internetových projektů s regionálním přesahem.

Jejich název je okamžitě srozumitelný, přirozeně zapamatovatelný a zároveň vhodný pro více obchodních modelů.`,
      points: [
        { title: 'Okamžitá srozumitelnost', text: 'Název je jednoduchý, přirozený a lidé mu rozumějí bez vysvětlení.' },
        { title: 'Regionální pokrytí', text: 'Jedna doména pro Slovensko, druhá pro Česko. Spolu vytvářejí silný přeshraniční základ.' },
        { title: 'Univerzální využití', text: 'Domény nejsou omezené na jeden typ projektu. Vhodné jsou pro e-commerce, marketplace, obsahové projekty, affiliate i korporátní platformy.' },
        { title: 'Prémiový dojem', text: 'Generický název působí důvěryhodně, seriózně a profesionálně od prvního kontaktu.' },
        { title: 'Strategická hodnota pro firmu', text: 'Kupující nezískává jen doménu, ale základ pro dlouhodobou digitální přítomnost ve dvou zemích.' },
      ],
    },
    showcase: {
      title: 'Jak může tento prostor vypadat',
      intro:
        `Dvojice domén vytváří univerzální základ pro více typů internetových projektů.

Níže jsou ukázky, jak může být tento prostor využit v praxi.`,
      items: [
        { title: 'Marketplace platforma', text: 'Silný základ pro platformu, která propojuje nabídku, poptávku a obchod v jednom prostředí.', variant: 'marketplace', tag: 'Marketplace' },
        { title: 'Cenový srovnávač', text: 'Přirozený směr pro projekt, který pomáhá zákazníkům porovnávat ceny a vybírat produkty.', variant: 'comparison', tag: 'Comparison' },
        { title: 'Affiliate shopping hub', text: 'Obsahový a performance model pro produktová doporučení, žebříčky a výběry nejlepších nabídek.', variant: 'affiliate', tag: 'Affiliate' },
        { title: 'Content commerce magazín', text: 'Prémiový editoriální prostor pro články, doporučení, trendy a nákupní inspirace.', variant: 'content', tag: 'Media' },
        { title: 'E-commerce umbrella brand', text: 'Název může sloužit jako hlavní střecha pro více produktových nebo obchodních projektů.', variant: 'umbrella', tag: 'Umbrella' },
        { title: 'B2B/B2C obchodní platforma', text: 'Flexibilní základ pro projekt, který může fungovat mezi firmami i koncovými zákazníky.', variant: 'b2b', tag: 'Commerce' },
      ],
      outro:
        'Každý z těchto modelů ukazuje, že hodnota domén není jen v názvu, ale v tom, co na něm může dlouhodobě vzniknout.',
    },
    audience: {
      title: 'Pro koho je akvizice vhodná',
      intro:
        'Tato nabídka je vhodná pro subjekty, které působí v online prostoru a hledají silný název s regionálním přesahem a dlouhodobým obchodním potenciálem.',
      items: [
        { title: 'E-commerce společnosti', text: 'Pro firmy, které chtějí posílit svoji značku a vstoupit do dvou trhů pod přirozeným a důvěryhodným názvem.' },
        { title: 'Marketplace projekty', text: 'Pro platformy, které propojují prodejce a zákazníky v jednom prostředí.' },
        { title: 'Srovnávače cen a nákupní rádci', text: 'Pro projekty, které pracují s produkty, nabídkami, recenzemi a výběrem zboží.' },
        { title: 'Affiliate a performance projekty', text: 'Pro modely založené na obsahu, doporučeních a partnerských provizích.' },
        { title: 'Retail a obchodní skupiny', text: 'Pro firmy, které chtějí vytvořit silný zastřešující název pro svoji online přítomnost.' },
        { title: 'Mediální a obsahové projekty', text: 'Pro weby, které chtějí spojovat obsah, inspiraci a obchodní dosah.' },
      ],
      outro:
        'Pokud firma uvažuje o dlouhodobé digitální strategii na Slovensku a v Česku, jde o název s jasným obchodním potenciálem.',
    },
    urgency: {
      title: 'Proč jednat nyní',
      intro:
        `Dvojice domén je dostupná v jedinečné kombinaci, která se na trhu objevuje jen zřídka.

Pro firmy, které chtějí růst v online prostoru, může rozhodnutí ve správném momentu znamenat zásadní strategický rozdíl.`,
      points: [
        { title: 'Omezená příležitost', text: 'Taková dvojice se na trhu neobjevuje často a její dostupnost je přirozeně omezená.' },
        { title: 'Strategická výhoda pro prvního kupujícího', text: 'Kdo získá tento název dříve, získá i silnou pozici v prostoru, který už nebude snadno dostupný konkurenci.' },
        { title: 'Smysluplný časový rámec', text: 'Proces je nastaven tak, aby měl dostatečný prostor pro rozhodnutí, ale zároveň si zachoval tlak a exkluzivitu.' },
        { title: 'Okamžitá koupě bez čekání', text: 'Pro firmy, které nechtějí vstupovat do uzavřeného procesu, je připravena i okamžitá koupě.' },
      ],
      outro:
        'Rozhodnutí dnes může znamenat konkurenční výhodu na dlouhá léta dopředu.',
    },
    process: {
      title: 'Jak probíhá uzavřený proces',
      intro:
        `Proces je navržen tak, aby byl jednoduchý pro zájemce a zároveň plně pod kontrolou prodávajícího.

Firmy se nejprve zaregistrují, následně jsou zařazeny do databáze a poté mohou vstoupit do uzavřeného kola nebo využít okamžitou koupi.`,
      steps: [
        { title: '1. Registrace firmy', text: 'Zájemce vyplní základní údaje o společnosti a kontaktní osobě.' },
        { title: '2. Zařazení do databáze', text: 'Firma se dostane do interního seznamu zájemců a bude informována o dalším postupu.' },
        { title: '3. Automatický email s potvrzením', text: 'Po registraci firma dostane okamžité potvrzení.' },
        { title: '4. Poštovní oznámení o začátku procesu', text: 'Vybraným firmám se pošle oznámení klasickou poštou.' },
        { title: '5. Uzavřené přihazování', text: 'Registrované firmy mohou ve stanoveném časovém okně zadávat své nabídky.' },
        { title: '6. Okamžitá koupě', text: 'Pokud firma nechce čekat, může domény získat ihned za fixní cenu.' },
      ],
      outro:
        'Celý proces je postaven tak, aby byl pro firmy jednoduchý, přehledný a zároveň časově omezený.',
    },
    trust: {
      title: 'TFWS 2.0 / Ověřitelná publikace',
      intro:
        'Tento web je publikovaný jako statický, hashovatelný trust surface. Každý důležitý artefakt je linkovatelný, ověřitelný a připravený na podpis ve stylu TFWS 2.0.',
      cards: [
        {
          title: 'Human entrypoint',
          text: 'Web obsahuje čitelné vstupní stránky pro SK, CZ a EN, aby byl proces srozumitelný i pro vedení firmy.',
        },
        {
          title: 'Machine entrypoint',
          text: 'Strojově čitelné artefakty žijí v /.well-known/ a umožňují automatizované ověření bez centrální autority.',
        },
        {
          title: 'Hash inventory',
          text: 'Dumpy se sha256 inventory umožňují auditovat, co přesně bylo publikováno, kdy a v jakém stavu.',
        },
        {
          title: 'Signing-ready flow',
          text: 'Projekt je připraven na Ed25519 / minisign signing flow a na budoucí doplnění produkčního klíče.',
        },
      ],
      endpoints: [
        { label: '/.well-known/ai-trust-hub.json', href: '/.well-known/ai-trust-hub.json' },
        { label: '/.well-known/llms.txt', href: '/.well-known/llms.txt' },
        { label: '/.well-known/minisign.pub', href: '/.well-known/minisign.pub' },
        { label: '/.well-known/key-history.json', href: '/.well-known/key-history.json' },
        { label: '/dumps/sha256.json', href: '/dumps/sha256.json' },
        { label: '/verify.html', href: '/verify.html' },
      ],
      outro:
        'Tento přístup propojuje prodejní web s důvěryhodnou publikační vrstvou a ukazuje technickou disciplínu, kterou očekává TFWS ekosystém.',
    },
    form: {
      title: 'Registrovat firmu',
      intro:
        'Zaregistrujte svou společnost a získejte přístup do uzavřeného procesu dražby. Po registraci se zobrazí i možnost okamžité koupě a kontaktní údaje pro přímé jednání.',
      submit: 'Registrovat firmu',
      fields: {
        companyName: 'Název firmy',
        companyId: 'IČO / Company ID',
        contactName: 'Jméno kontaktní osoby',
        position: 'Funkce ve společnosti',
        email: 'Firemní email',
        phone: 'Telefonní číslo',
        country: 'Země',
        website: 'Web firmy',
        industry: 'Odvětví / typ společnosti',
        address:
          'Doručovací adresa společnosti pro zaslání oznámení o začátku uzavřeného procesu dražby',
        note: 'Krátká poznámka k využití domén',
        consentData: 'Souhlas se zpracováním osobních údajů',
        consentContact: 'Souhlas s kontaktováním ohledně nabídky',
        consentTerms: 'Souhlas s podmínkami registrace a uzavřeného procesu',
      },
    },
    buyNow: {
      title: 'Okamžitá koupě',
      intro:
        'Pro firmy, které nechtějí čekat na uzavřené přihazování, je k dispozici i možnost okamžitého odkupu.',
      note: `Děkujeme za registraci. Vaše firma byla zařazena do procesu dražby, která bude spuštěna ${common.auctionDate}. Pokud máte zájem o okamžitou koupi, fixní cena a telefonní kontakt jsou uvedeny níže.`,
      priceLabel: common.price,
      phoneLabel: common.phone,
    },
    faq: {
      title: 'Nejčastější otázky',
      items: [
        { q: 'Prodávají se obě domény samostatně?', a: 'Ne. Předmětem nabídky je výhradně dvojice domén jako jednotný balík.' },
        { q: 'Je web určen i pro soukromé osoby?', a: 'Ne. Nabídka je určena výhradně pro firmy a organizace.' },
        { q: 'Jak probíhá registrace?', a: 'Firma vyplní jednoduchý registrační formulář se základními údaji.' },
        { q: 'Co se děje po registraci?', a: `Firma je zařazena do uzavřeného procesu dražby, který bude spuštěn ${common.auctionDate}.` },
        { q: 'Dá se domény získat i bez čekání na dražbu?', a: `Ano. Okamžitá koupě je možná za fixní cenu ${common.price}.` },
        { q: 'Kdy se zobrazí fixní cena?', a: 'Po odeslání registračního formuláře spolu s kontaktními údaji pro přímé jednání.' },
        { q: 'Proč je potřeba doručovací adresa?', a: 'Pro zaslání oznámení o začátku uzavřeného procesu dražby klasickou poštou.' },
        { q: 'Jak dlouho bude dražba trvat?', a: 'Plánovaná délka uzavřeného kola je 14 dní.' },
        { q: 'Mohou se zúčastnit i firmy ze zahraničí?', a: 'Ano, pokud mají relevantní zájem o SK/CZ online trh.' },
        { q: 'Je registrace závazná?', a: 'Ne, registrace slouží k zařazení firmy do procesu a pro další komunikaci.' },
      ],
    },
    footer: {
      contact: `${common.company} · ${common.email} · ${common.phone}`,
      links: [
        { label: 'Ochrana osobních údajů', href: '/cz/privacy' },
        { label: 'Podmínky registrace', href: '/cz/terms' },
        { label: 'TFWS verify', href: '/verify.html' },
      ],
      disclaimer:
        'Registrace nezakládá nárok na úspěch v procesu ani na přidělení domén. Prodávající si vyhrazuje právo určit průběh a podmínky uzavřeného procesu.',
    },
    thankYou: {
      title: 'Děkujeme za registraci',
      intro:
        `Vaše firma byla zařazena do procesu dražby, která bude spuštěna ${common.auctionDate}. Pokud máte zájem o okamžitou koupi, fixní cena a telefonní kontakt jsou uvedeny níže.`,
      auctionDate: common.auctionDate,
      buyNowText: `Fixní cena okamžité koupě: ${common.price}`,
      contactText: `Přímé jednání: ${common.phone} · ${common.email}`,
      cta: 'Zpět na úvod',
    },
    privacy: {
      title: 'Ochrana osobních údajů',
      intro:
        'Tento dokument vysvětluje, jak zpracováváme osobní údaje při registraci firem do procesu prodeje domén.',
      sections: [
        { title: '1. Správce', body: [`${common.company}, ${common.address}, email ${common.email}, telefon ${common.phone}.`] },
        { title: '2. Jaké údaje zpracováváme', body: ['Název firmy, IČO, jméno a funkci kontaktní osoby, firemní email, telefonní číslo, zemi, web firmy, doručovací adresu a další údaje, které nám poskytnete dobrovolně.'] },
        { title: '3. Pro jaký účel údaje používáme', body: ['Údaje používáme pro evidenci firem, komunikaci o uzavřeném procesu prodeje, zaslání oznámení poštou, administraci procesu, potvrzení zájmu o okamžitou koupi a splnění případných zákonných povinností.'] },
        { title: '4. Právní základ', body: ['Zpracování může být založeno na předsmluvních opatřeních, oprávněném zájmu správce, souhlasu tam, kde je potřeba, a na plnění zákonných povinností.'] },
        { title: '5. Doba uchování', body: ['Údaje uchováváme jen po dobu nezbytnou k naplnění účelu, zpravidla po dobu trvání procesu a následně po dobu potřebnou k administrativním, právním nebo účetním účelům.'] },
        { title: '6. Práva subjektu údajů', body: ['Máte právo na přístup, opravu, výmaz, omezení zpracování, námitku, přenosnost, pokud jsou splněny podmínky, a právo podat stížnost dozorovému orgánu.'] },
      ],
      contactTitle: 'Kontakt pro uplatnění práv',
      contactBody: `${common.email} · ${common.phone}`,
    },
    terms: {
      title: 'Podmínky registrace a uzavřeného procesu',
      intro:
        'Následující podmínky nastavují základní pravidla registrace, komunikace a uzavřeného procesu dražby.',
      sections: [
        { title: '1. Předmět nabídky', body: ['Předmětem nabídky je výhradně dvojice domén nakupovanie.sk a nakupovani.cz jako jednotný balík.'] },
        { title: '2. Určení nabídky', body: ['Nabídka je určena výhradně pro firmy, organizace a profesionální zájemce.'] },
        { title: '3. Registrace', body: ['Registrací firma potvrzuje, že poskytuje pravdivé a úplné údaje a souhlasí se zařazením do interního seznamu zájemců.'] },
        { title: '4. Doručovací adresa', body: ['Firma je povinna uvést doručovací adresu společnosti pro zaslání oznámení o začátku uzavřeného procesu dražby.'] },
        { title: '5. Uzavřený proces', body: [`Uzavřený proces dražby je plánován ke spuštění ${common.auctionDate}.`] },
        { title: '6. Okamžitá koupě', body: ['Vedle uzavřeného procesu je možná i okamžitá koupě domén za fixní cenu, která se zobrazí po registraci.'] },
        { title: '7. Komunikace', body: ['Provozovatel může zájemce kontaktovat emailem, telefonicky nebo poštou.'] },
        { title: '8. Odpovědnost za údaje', body: ['Firma odpovídá za správnost údajů, které při registraci uvede.'] },
        { title: '9. Právo odmítnout účast', body: ['Provozovatel si vyhrazuje právo zařadit nebo nezařadit firmu do finálního kola, upravit pravidla procesu, ukončit proces nebo uzavřít prodej s vybraným zájemcem.'] },
        { title: '10. Závěrečné ustanovení', body: ['Registrací firma potvrzuje, že si tyto podmínky přečetla, rozumí jim a souhlasí s nimi v rozsahu potřebném pro zpracování registrace a komunikaci o nabídce.'] },
      ],
    },
  },
  en: {
    lang: 'en',
    nav: {
      logo: 'nakupovanie.sk / nakupovani.cz',
      menu: [
        { label: 'Offer', href: '#ponuka' },
        { label: 'Showcase', href: '#showcase' },
        { label: 'Process', href: '#proces' },
        { label: 'TFWS 2.0', href: '#tfws' },
        { label: 'Register', href: '#registracia' },
      ],
      languageLabel: 'Language',
    },
    hero: {
      eyebrow: 'Private acquisition process • B2B only • TFWS 2.0 ready',
      title:
        'www.nakupovanie.sk / www.nakupovani.cz  a unique offer of two premium domains for sale for internet projects in Slovakia and the Czech Republic, appearing on the market only exceptionally.',
      subtitle:
        'Companies can register in a simple way, gain access to a closed process, and also use the option of immediate purchase.',
      ctaPrimary: 'Register company',
      ctaSecondary: 'View offer',
      trust: [
        'Closed process for companies',
        'Two domains as one package',
        'Immediate purchase after registration',
      ],
    },
    offer: {
      title: 'What is being sold',
      intro:
        `The offer consists exclusively of the pair of domains nakupovanie.sk and nakupovani.cz as a single package.

These are premium domains with the same meaning for the Slovak and Czech markets, forming a natural base for internet projects with regional reach.`,
      domainA: {
        name: 'nakupovanie.sk',
        desc: 'A Slovak premium domain with a strong and natural meaning.',
      },
      domainB: {
        name: 'nakupovani.cz',
        desc: 'A Czech premium domain with the same logic and regional reach.',
      },
      footer: 'Together they form a unique package that can only be acquired as a whole.',
    },
    strategic: {
      title: 'Why it is strategic',
      intro:
        `The pair of domains nakupovanie.sk and nakupovani.cz is a very strong foundation for building internet projects with regional reach.

The name is immediately understandable, naturally memorable, and suitable for multiple business models.`,
      points: [
        { title: 'Immediate clarity', text: 'The name is simple, natural, and self-explanatory.' },
        { title: 'Regional coverage', text: 'One domain for Slovakia and one for the Czech Republic. Together they create a strong cross-border base.' },
        { title: 'Versatile use', text: 'The domains are not limited to one project type. They fit e-commerce, marketplaces, content projects, affiliate and corporate platforms.' },
        { title: 'Premium feel', text: 'A generic name feels trustworthy, serious, and professional from the first contact.' },
        { title: 'Strategic business value', text: 'The buyer gets more than a domain — they get the foundation for a long-term digital presence in two countries.' },
      ],
    },
    showcase: {
      title: 'How this space can look',
      intro:
        `The pair of domains creates a universal base for several kinds of internet projects.

Below are examples of how this space can be used in practice.`,
      items: [
        { title: 'Marketplace platform', text: 'A strong base for a platform connecting supply, demand, and commerce in one environment.', variant: 'marketplace', tag: 'Marketplace' },
        { title: 'Price comparison engine', text: 'A natural fit for a project helping users compare prices and choose products.', variant: 'comparison', tag: 'Comparison' },
        { title: 'Affiliate shopping hub', text: 'A content and performance model for product recommendations, rankings, and best-offers curation.', variant: 'affiliate', tag: 'Affiliate' },
        { title: 'Content commerce magazine', text: 'A premium editorial space for articles, recommendations, trends, and shopping inspiration.', variant: 'content', tag: 'Media' },
        { title: 'E-commerce umbrella brand', text: 'The name can serve as the main umbrella for multiple product or retail projects.', variant: 'umbrella', tag: 'Umbrella' },
        { title: 'B2B/B2C commerce platform', text: 'A flexible base for a project that can work between businesses and end consumers.', variant: 'b2b', tag: 'Commerce' },
      ],
      outro:
        'Each of these models shows that the value of the domains is not only in the name, but in what can grow on top of it over time.',
    },
    audience: {
      title: 'Who this acquisition is for',
      intro:
        'This offer is suitable for entities operating online and looking for a strong name with regional reach and long-term commercial potential.',
      items: [
        { title: 'E-commerce companies', text: 'For businesses that want to strengthen their brand and enter two markets under a natural and trustworthy name.' },
        { title: 'Marketplace projects', text: 'For platforms connecting sellers and customers in one environment.' },
        { title: 'Price comparison and shopping-advice projects', text: 'For projects working with products, offers, reviews, and product selection.' },
        { title: 'Affiliate and performance projects', text: 'For models based on content, recommendations, and partner commissions.' },
        { title: 'Retail and commerce groups', text: 'For companies that want a strong umbrella name for their digital presence.' },
        { title: 'Media and content projects', text: 'For websites that combine content, inspiration, and commercial reach.' },
      ],
      outro:
        'If a company is thinking long-term about its digital strategy in Slovakia and the Czech Republic, this is a name with clear commercial potential.',
    },
    urgency: {
      title: 'Why act now',
      intro:
        `The domain pair is available in a unique combination that appears only rarely on the market.

For companies looking to grow online, choosing at the right moment can create a meaningful strategic advantage.`,
      points: [
        { title: 'Limited opportunity', text: 'This kind of pair does not appear often, and its availability is naturally limited.' },
        { title: 'First-mover advantage', text: 'Whoever acquires the name first also gains a strong position in a space that will no longer be easily available to competitors.' },
        { title: 'Clear time window', text: 'The process is designed to allow enough decision time while preserving pressure and exclusivity.' },
        { title: 'Immediate buy now', text: 'For companies that do not want to wait for the closed process, immediate purchase is available.' },
      ],
      outro:
        'A decision today can mean a competitive advantage for years to come.',
    },
    process: {
      title: 'How the closed process works',
      intro:
        `The process is designed to be easy for the buyer while remaining fully under the seller’s control.

Companies first register, are added to the database, and then can enter the closed round or use the immediate purchase option.`,
      steps: [
        { title: '1. Company registration', text: 'The interested party fills in basic company and contact details.' },
        { title: '2. Database inclusion', text: 'The company is added to the internal list of interested parties and informed about next steps.' },
        { title: '3. Automatic confirmation email', text: 'The company receives an immediate confirmation after registration.' },
        { title: '4. Postal notice', text: 'Selected companies receive a physical notice by post.' },
        { title: '5. Closed bidding', text: 'Registered companies can submit offers during the defined time window.' },
        { title: '6. Immediate purchase', text: 'If a company does not want to wait, it can acquire the domains immediately for a fixed price.' },
      ],
      outro:
        'The whole process is designed to be simple, clear, and time-bound for companies.',
    },
    trust: {
      title: 'TFWS 2.0 / Verifiable publishing',
      intro:
        'This site is published as a static, hashable trust surface. Every important artifact is linkable, verifiable, and ready for a TFWS 2.0 style signing flow.',
      cards: [
        {
          title: 'Human entrypoint',
          text: 'Readable pages exist in SK, CZ, and EN so the acquisition flow is understandable to company leadership at a glance.',
        },
        {
          title: 'Machine entrypoint',
          text: 'Machine-readable artifacts live under /.well-known/ and enable automated verification without a central authority.',
        },
        {
          title: 'Hash inventory',
          text: 'sha256 inventory dumps make it auditable what was published, when it was published, and in which state.',
        },
        {
          title: 'Signing-ready flow',
          text: 'The project is ready for Ed25519 / minisign signing and later production-key integration.',
        },
      ],
      endpoints: [
        { label: '/.well-known/ai-trust-hub.json', href: '/.well-known/ai-trust-hub.json' },
        { label: '/.well-known/llms.txt', href: '/.well-known/llms.txt' },
        { label: '/.well-known/minisign.pub', href: '/.well-known/minisign.pub' },
        { label: '/.well-known/key-history.json', href: '/.well-known/key-history.json' },
        { label: '/dumps/sha256.json', href: '/dumps/sha256.json' },
        { label: '/verify.html', href: '/verify.html' },
      ],
      outro:
        'This approach connects the sales site with a trustworthy publication layer and demonstrates the technical discipline expected by the TFWS ecosystem.',
    },
    form: {
      title: 'Register company',
      intro:
        'Register your company to gain access to the closed auction process. After registration you will also see the immediate purchase option and direct contact details.',
      submit: 'Register company',
      fields: {
        companyName: 'Company name',
        companyId: 'Company ID',
        contactName: 'Contact person name',
        position: 'Position in company',
        email: 'Company email',
        phone: 'Phone number',
        country: 'Country',
        website: 'Company website',
        industry: 'Industry / company type',
        address:
          'Postal address for sending the notice about the start of the closed auction process',
        note: 'Short note on intended use',
        consentData: 'Consent to personal data processing',
        consentContact: 'Consent to be contacted about the offer',
        consentTerms: 'Consent to registration and closed-process terms',
      },
    },
    buyNow: {
      title: 'Immediate purchase',
      intro:
        'For companies that do not want to wait for the closed bidding process, immediate acquisition is also available.',
      note: `Thank you for registering. Your company has been added to the auction process, which will start on ${common.auctionDate}. If you are interested in an immediate purchase, the fixed price and phone contact are listed below.`,
      priceLabel: common.price,
      phoneLabel: common.phone,
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Are both domains sold separately?', a: 'No. The offer consists exclusively of the pair as a single package.' },
        { q: 'Is the site also for private individuals?', a: 'No. The offer is intended exclusively for companies and organizations.' },
        { q: 'How does registration work?', a: 'The company fills in a simple registration form with basic details.' },
        { q: 'What happens after registration?', a: `The company is added to the closed auction process, which starts on ${common.auctionDate}.` },
        { q: 'Can the domains be purchased without waiting for the auction?', a: `Yes. Immediate purchase is available at a fixed price of ${common.price}.` },
        { q: 'When is the fixed price shown?', a: 'After submitting the registration form, together with the direct contact details.' },
        { q: 'Why is a postal address required?', a: 'To send the notice about the start of the closed auction process by post.' },
        { q: 'How long will the auction last?', a: 'The planned length of the closed round is 14 days.' },
        { q: 'Can international companies participate?', a: 'Yes, if they have a relevant interest in the SK/CZ online market.' },
        { q: 'Is registration binding?', a: 'No, registration is used to add the company to the process and to enable further communication.' },
      ],
    },
    footer: {
      contact: `${common.company} · ${common.email} · ${common.phone}`,
      links: [
        { label: 'Privacy policy', href: '/en/privacy' },
        { label: 'Terms and conditions', href: '/en/terms' },
        { label: 'TFWS verify', href: '/verify.html' },
      ],
      disclaimer:
        'Registration does not guarantee success in the process or allocation of the domains. The seller reserves the right to define the course and conditions of the closed process.',
    },
    thankYou: {
      title: 'Thank you for registering',
      intro:
        `Your company has been added to the auction process, which will start on ${common.auctionDate}. If you are interested in immediate purchase, the fixed price and phone contact are listed below.`,
      auctionDate: common.auctionDate,
      buyNowText: 'Immediate purchase is available after registration.',
      contactText: common.phone,
      cta: 'Back to home',
    },
    privacy: {
      title: 'Privacy policy',
      intro:
        'This document explains how we process personal data when companies register for the domain sale process.',
      sections: [
        { title: '1. Controller', body: [`${common.company}, ${common.address}, email ${common.email}, phone ${common.phone}.`] },
        { title: '2. What data we process', body: ['Company name, company ID, contact person name and position, company email, phone number, country, company website, postal address, and any additional information you voluntarily provide.'] },
        { title: '3. Purpose of processing', body: ['We use the data to keep a record of companies, communicate about the closed sales process, send postal notices, administer the process, confirm interest in immediate purchase, and comply with any legal obligations.'] },
        { title: '4. Legal basis', body: ['Processing may be based on pre-contractual steps, the controller’s legitimate interest, consent where required, and compliance with legal obligations.'] },
        { title: '5. Retention', body: ['Data is retained only for as long as necessary to fulfill the purpose, typically during the process and then for the period needed for administrative, legal, or accounting purposes.'] },
        { title: '6. Data subject rights', body: ['You have the right to access, rectify, erase, restrict processing, object, portability where applicable, and the right to lodge a complaint with a supervisory authority.'] },
      ],
      contactTitle: 'Contact for exercising your rights',
      contactBody: `${common.email} · ${common.phone}`,
    },
    terms: {
      title: 'Registration and closed-process terms',
      intro:
        'The following terms define the basic rules of registration, communication, and the closed auction process.',
      sections: [
        { title: '1. Subject of the offer', body: ['The subject of the offer is exclusively the pair of domains nakupovanie.sk and nakupovani.cz as a single package.'] },
        { title: '2. Who the offer is for', body: ['The offer is intended exclusively for companies, organizations, and professional buyers.'] },
        { title: '3. Registration', body: ['By registering, the company confirms that it provides truthful and complete data and agrees to be added to the internal list of interested parties.'] },
        { title: '4. Postal address', body: ['The company must provide a postal address for the notice about the start of the closed auction process.'] },
        { title: '5. Closed process', body: [`The closed auction process is planned to start on ${common.auctionDate}.`] },
        { title: '6. Immediate purchase', body: ['In addition to the closed process, an immediate purchase option is available at a fixed price shown after registration.'] },
        { title: '7. Communication', body: ['The controller may contact interested parties by email, phone, or postal mail.'] },
        { title: '8. Data responsibility', body: ['The company is responsible for the accuracy of the data it submits.'] },
        { title: '9. Right to refuse participation', body: ['The controller reserves the right to include or exclude a company from the final round, modify the process rules, end the process, or conclude a sale with a selected buyer.'] },
        { title: '10. Final provision', body: ['By registering, the company confirms that it has read these terms, understands them, and agrees to them to the extent necessary for processing the registration and communicating about the offer.'] },
      ],
    },
  },
};
