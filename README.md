# nakupovanie.sk / nakupovani.cz

Prémiový predajný web pre dvojicu domén, postavený ako:
- dark corporate showcase,
- firemný registračný funnel,
- okamžitá kúpa po registrácii,
- uzavretý proces dražby,
- TFWS 2.0 trust layer,
- discovery manifest pre agentov a indexovanie.

## Stack

- Astro
- TypeScript
- Cloudflare Pages / Pages Functions
- D1 databáza pre registrácie
- jednoduchý admin panel na `/control/panel/`
- TFWS 2.0 public artifacts v `/.well-known/`

## Rýchly štart

1. Nainštaluj závislosti
2. Skopíruj `.dev.vars.example` na `.dev.vars`
3. Spusť `npm run dev`
4. Pred nasadením vytvor D1 databázu a doplň `database_id` vo `wrangler.toml`
5. Pre emaily doplň `RESEND_API_KEY` a `EMAIL_FROM`

## TFWS

Repo obsahuje:
- `/.well-known/ai-trust-hub.json`
- `/.well-known/llms.txt`
- `/.well-known/search-discovery.json`
- `/.well-known/key-history.json`
- `/.well-known/minisign.pub`
- `/.well-known/security.txt`
- `dumps/sha256.json`
- `dumps/sigs/sha256.json.minisig` (placeholder, pripravené na podpis)

### Generovanie hash inventory

```bash
npm run tfws:generate
```

### Podpisovanie

Ak doplníš vlastný podpisovací workflow, môžeš použiť:

```bash
npm run tfws:sign
```

## Admin

Admin rozhranie je dostupné na:
- `/control/panel/`
- `/admin` (redirect)
- `/panel` (redirect)

Panel ukazuje:
- registrácie,
- všetky polia formulára,
- email logy,
- export dát,
- TFWS odkazy.

## Emaily

Email odosielanie používa Resend.
Ak `RESEND_API_KEY` nie je nastavený, odoslanie sa len zaloguje do D1 tabuľky `email_outbox`, aby bolo jasné, prečo mail neodišiel.

## Poznámka k TFWS 2.0

Tento balík je pripravený v duchu TFWS v2:
- statický, auditovateľný web,
- `.well-known` manifesty,
- hash inventory,
- podpísateľné artefakty,
- ľudský vstup + strojová vrstva.

Real signatures si vieš doplniť po nasadení s vlastným signing workflow.
