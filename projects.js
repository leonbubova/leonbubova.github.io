/* Single source of truth for all site versions. Plain script, exposes window.LEON. */
window.LEON = {
  person: {
    name: "Leon Bubova", city: "Köln", email: "bubova.leon@gmail.com",
    github: "https://github.com/leonbubova", linkedin: "https://www.linkedin.com/in/leonbubova",
    cv: "files/leon_bubova_cv.pdf",
    line: "software engineer · payments backend at scale, now building products with AI in the loop"
  },
  experience: [
    { when: "2025 – now", where: "Independent", role: "Freelance & own products, Köln",
      what: "Deliberate break from employment to build. Shipped Subrosa (voice dictation, Android + desktop, own German speech model), client automation and websites, and a stack of agent tooling. Building in public on LinkedIn." },
    { when: "Jun – Dec 2024", where: "Ivy GmbH", role: "Backend Engineer",
      what: "Architected the internal API flow for subscriptions inside Ivy's account-to-account payment platform: data model, service communication, external provider integrations with webhooks and error recovery across multiple providers." },
    { when: "Oct 2021 – May 2024", where: "Klarna Bank AB", role: "Engineer",
      what: "Built and ran three Node.js microservices for tokenized payments used by 500+ merchants (Uber, Voi, Instacart) inside the Klarna App (40M+ users). Weekly on-call with full ownership, Datadog. Led the adoption of Kafka for external messaging and built the notification service (10k+ sends/day). Defined growth KPIs for the subscription feature (~400k MAU) in Amplitude. React Native contributions to the app." },
    { when: "Dec 2020 – Sep 2021", where: "os-cillation GmbH", role: "Fullstack Developer",
      what: "Validation logic for automated landing-page generation, up to 80,000 pages per request, across interconnected Symfony and Laravel services. Refactored legacy modules in a 2M+ line codebase." },
    { when: "Oct 2018 – Nov 2020", where: "econius GmbH", role: "Web Developer & DevOps, working student",
      what: "Designed, built and hosted a full-stack web app with 15 sewage utility companies (PHP, JS, SQL, custom WordPress theme). Servers, domains, uptime." },
    { when: "2014 –", where: "Universität Siegen", role: "Computer Science", what: "Where the fear of pointers was born." }
  ],
  tags: { ai: "AI / speech", mobile: "mobile & desktop", bots: "bots & automation", infra: "infra & ops", web: "web", work: "day job", archive: "archive" },
  projects: [
    {
      id: "shush", title: "Shush / Subrosa", year: "2025 – 2026", status: "in daily use", tags: ["ai", "mobile"],
      tagline: "Voice dictation that lands in whatever app you're in. Android, desktop, and its own German speech model.",
      what: "Double-tap volume-down on Android (or hold a hotkey on the desktop app), talk, double-tap again. The transcribed, cleaned-up text is inserted into the focused text field: WhatsApp, Notion, Google Docs, anything. Early-access users get 1,000 words per rolling 3 hours; usage stats show how many hours of typing they've saved.",
      how: [
        "Android app in Kotlin: catches the volume-button pattern from any app and injects the text into the active field.",
        "Desktop app in Electron + React + TypeScript: uiohook global hotkey (rebindable, short press toggles, long hold is push-to-talk), WebM → M4A via FFmpeg, paste at cursor with clipboard fallback, history, DMG and NSIS installers.",
        "Transcription runs on Voxtral (Mistral) behind Supabase Edge Functions, with optional Haiku 4.5 post-processing for punctuation and formatting.",
        "Word counting and the 1,000 words / 3 h limit are tracked per user."
      ],
      hard: "Getting text into the focused field of any app on Android, reliably, without root. Everything else is a web service.",
      next: "Fully on-device German dictation using the fine-tuned Moonshine model (see moonshine-de), then the Play Store.",
      stack: "kotlin · electron · react · typescript · supabase · voxtral · haiku 4.5 · ffmpeg",
      links: { "subrosa-voice.de": "https://subrosa-voice.de", "landing page code": "https://github.com/leonbubova/subrosa-landingpage", "android (private)": "https://github.com/leonbubova/shush-app", "desktop (private)": "https://github.com/leonbubova/shush-app-electron" },
      demo: { type: "term", lines: [["", "// volume-down ×2"], ["rec ", "● 00:04  „Hey, ich schick dir die Rechnung heute Abend"], ["", "// volume-down ×2"], ["", "voxtral 1.1 s → haiku cleanup 0.3 s"], ["ok ", "pasted into WhatsApp"], ["", "usage: 214 / 1000 words this window"]] }
    },
    {
      id: "moonshine-de", title: "moonshine-de", year: "2025", status: "iterating", tags: ["ai"],
      tagline: "Fine-tuning a 27M-parameter speech model so German dictation can run on the phone, offline.",
      what: "Moonshine Tiny is an English ASR model built for edge devices. This project teaches it German, so Subrosa can transcribe on-device instead of sending audio to a server: no latency, no cost per word, no data leaving the phone.",
      how: [
        "Training on Kaggle's free T4 with the finetune-moonshine-asr toolkit and HuggingFace Seq2SeqTrainer.",
        "Data: Multilingual LibriSpeech German. Iteration 1 used 15 h and 200 steps as a proof of concept; iteration 2 an overnight run on 100 h, 2,500 steps, full model unfrozen; iterations 3–6 are continued experiments (notebooks in the repo).",
        "A separate export repo converts checkpoints to ONNX for the Android runtime."
      ],
      hard: "The proof of concept (15 h of data, 200 steps) already produced German instead of English, at 54.8 % WER. Iteration 2 ran overnight on 100 h with the full model unfrozen; iterations 3–6 are ongoing experiments. Numbers for those are not published yet.",
      stack: "python · pytorch · huggingface · kaggle T4 · onnx",
      links: { "training (private)": "https://github.com/leonbubova/shush-model-training", "export (private)": "https://github.com/leonbubova/shush-model-export" },
      demo: { type: "plain", text: "iter1  15 h MLS-de · 200 steps · WER 54.8 % (PoC: it speaks German)\niter2  100 h · 2 500 steps · full model unfrozen · overnight T4\niter3–6  data mix + hyperparameter experiments, in progress" }
    },
    {
      id: "kaputt", title: "kaputt", year: "2026", status: "live", tags: ["infra"],
      tagline: "A break/fix wargame. Something is broken; you fix it with real tools; a checker proves it.",
      what: "No slides, no multiple choice. `wg level 1` spins up a real environment on your machine, quietly sabotages one thing, and hands you the incident the way a teammate would. You debug with kubectl, docker, psql, git, helm in your own terminal. `wg check` verifies the system genuinely works again, not how you got there. Every level resets clean.",
      how: [
        "install.sh installs docker, k3d, kubectl and helm and puts `wg` on the PATH.",
        "Tracks (k8s by default) contain levels; each level has a sabotage script, an incident text and a checker.",
        "3 hints per level, counted on the scoreboard. `wg progress` across all tracks.",
        "GitHub Actions CI on every commit; MIT licensed; a demo GIF in the README shows a CrashLoopBackOff level being solved."
      ],
      hard: "Checkers that verify the system actually works again, not that you typed the expected command.",
      stack: "shell · k3d · kubectl · helm · docker · psql · github actions",
      links: { "site": "https://leonbubova.github.io/kaputt/", "code": "https://github.com/leonbubova/kaputt" },
      demo: { type: "term", lines: [["$ ", "wg level 1"], ["", "incident: api pods keep restarting since the 14:02 deploy"], ["$ ", "kubectl get pods"], ["", "api-7d9f   0/1   CrashLoopBackOff   5 (40s ago)"], ["$ ", "kubectl logs api-7d9f | tail -1"], ["", "FATAL DATABASE_URL is not set"], ["$ ", "kubectl set env deploy/api DATABASE_URL=postgres://…"], ["$ ", "wg check"], ["ok ", "LEVEL SOLVED  (2 hints left)"]] }
    },
    {
      id: "hausbert", title: "Hausbert", year: "2025", status: "shipped", tags: ["bots", "ai"],
      tagline: "Automated apartment hunting for Köln. Scrapes, scores, pushes to Telegram, drafts the application.",
      what: "Finding a flat in Köln is a speed game. Hausbert scrapes WG-Gesucht, Kleinanzeigen and Immowelt once globally, scores every listing against each user's profile, and pushes matches as photo cards with [Favorit] [Bewerben] [Teilen] buttons. Tap Bewerben and Claude drafts a personal application from your profile; you accept, tweak or discard.",
      how: [
        "Two bots: Hausbert for users, Hausenberg for the admin (scraper health, logs, user management). Users never see the admin bot.",
        "Hard filters first (price, rooms, district), then a weighted score with reasons; `/gefiltert` shows what was dropped and why.",
        "Profile by free text: describe what you want, an LLM parses it into a search profile, you confirm the preview. Export/import as JSON.",
        "Commands: /neue, /favoriten, /gesendet, /aussortiert, /gefiltert, /suche. One global scrape serves all users."
      ],
      hard: "Scrapers break. The admin bot exists so I notice: scraper health, logs and user management live there, and the user-facing bot never references it.",
      stack: "typescript · node · telegram bot api · claude api",
      links: { "code (private)": "https://github.com/leonbubova/hausbert" },
      demo: { type: "card", title: "Hausbert", body: "🏠 Neues Listing · Ehrenfeld · 2 Zi · 58 m² · 890 € warm\nscore 87 · balkon ✔ · altbau ✔ · ≤ 950 € ✔", buttons: ["Favorit", "Bewerben", "Teilen"], after: "claude: „Guten Tag, ich bin Leon, Softwareentwickler in Köln …\"\n[Übernehmen] [Anpassen] [Verwerfen]" }
    },
    {
      id: "kummerkasten", title: "Kummerkasten", year: "2025", status: "hackathon", tags: ["bots", "ai", "mobile"],
      tagline: "A physical push-to-talk button for bakery staff. Speak, and a sick note organises its own cover.",
      what: "Built at the Bäko hackathon. Bakery workers have flour on their hands and no time for apps. A LilyGO T-Display S3 with one button sits on the wall: hold, speak, release. The voice note goes over Bluetooth to an Android app, gets transcribed and analysed, and if it's a sick call the app finds a replacement in the team and notifies everyone via Telegram.",
      how: [
        "ESP32-S3 firmware: button on pin 14, TFT status display, BLE notify/write with CMD_START 0x01 / CMD_STOP 0x02.",
        "React Native app with a foreground service: BLE manager, audio recorder, upload.",
        "Cloud: Telegram Bot API for audio + text, Mistral Voxtral for transcription, an LLM classifies intent (sick, late, feedback, complaint) and drafts the roster change."
      ],
      hard: "Keeping the BLE link and the recorder alive in an Android foreground service. The AI part was the easy part.",
      stack: "esp32 · arduino · ble · react native · voxtral · telegram",
      links: { "code (private)": "https://github.com/leonbubova/kummerkasten" },
      demo: { type: "term", lines: [["ble ", "CMD_START 0x01 → recording"], ["", "„Ich bin krank, kann heute nicht kommen, Frühschicht"], ["ble ", "CMD_STOP 0x02 → upload 6 s"], ["", "voxtral → intent: sick_leave · shift: früh · today"], ["ok ", "Vertretung: Ayşe (frei, Frühschicht-qualifiziert) → Telegram an Team"]] }
    },
    {
      id: "salieri", title: "Salieri + harness", year: "2025 – 2026", status: "in progress", tags: ["ai"],
      tagline: "My own coding agents: one in 450 lines to understand the loop, one grown-up enough to use daily.",
      what: "I use Claude Code all day and wanted to know exactly what a coding agent is. harness is the answer in ~450 lines: a tool loop, a bash tool, an editor, a TUI and a plain renderer, no build step (Node 25 strips the TypeScript itself). Salieri is the version that grew from it: a daemon that holds sessions, a terminal client, skills, and a live-test suite that talks to the real API.",
      how: [
        "harness reads the API key once at startup from 1Password (or an env var), keeps it in-process only, never in a dotfile and never visible to the bash tool. `--resume` continues the newest session.",
        "Salieri is a pnpm + turbo monorepo: packages/daemon, packages/terminal, a legacy maestro package, a REPL client, Docker image, vitest projects for unit, integration and live tests.",
        "A separate benchmark project pits them against off-the-shelf harnesses on terminal-bench style tasks."
      ],
      hard: "Keeping the loop small enough to read in one sitting while still being useful.",
      stack: "typescript · node 25 · pnpm · turbo · vitest · claude api · docker",
      links: { "salieri (private)": "https://github.com/leonbubova/salieri" },
      demo: { type: "term", lines: [["$ ", "HARNESS_ROOT=~/vault/kaputt npm start"], ["", "session 0042 · model claude · tools: bash, read, edit"], ["> ", "why does level 3's checker pass on an unfixed cluster?"], ["", "→ read levels/k8s/03/check.sh"], ["", "→ bash: kubectl get svc -n level3 -o json | jq .spec.ports"], ["", "The checker only curls the service; it never checks the endpoints list is non-empty…"], ["> ", "fix it and add a failing case"]] }
    },
    {
      id: "infra", title: "infra + dotfiles", year: "2026", status: "proven", tags: ["infra"],
      tagline: "A bare-metal dev server done properly: locked down, backed up, and restore-drilled before it went live.",
      what: "My MacBook Air has 8 GB of RAM. Model training, k3d clusters and long agent runs don't fit. So: a Hetzner bare-metal box reachable only over Tailscale, with public SSH closed, root SSH off, snapshots, and restic backups to a storage box. The whole provisioning was rehearsed end to end on a cheap cloud VM first. The rehearsal found 12 real bugs.",
      how: [
        "Phased provisioning scripts: tailnet join with auto-tags, lockdown with a two-stage commit (you must prove you can still get in after a reboot before the firewall persists), deadman timer that reopens access if the second stage never arrives.",
        "btrfs + snapper for local snapshots; delete/recover verified hash-identical.",
        "restic to a Hetzner storage box with retention and a scripted, verified restore drill (RTO 6 s).",
        "dotfiles bootstrap the same shell (zsh, pure, tmux, kitty, nvim) on Mac and server."
      ],
      hard: "Three of the twelve bugs were of the kind that never show up until production: a failsafe that parsed tailscale's JSON with a regex that never matched, so it kept reopening public SSH 15 minutes after every lockdown; a stage that required a firewall table the mandated reboot deliberately removes. Rehearse the failure paths, not the happy path.",
      stack: "shell · tailscale · nftables · btrfs · snapper · restic · systemd",
      links: { "infra (private)": "https://github.com/leonbubova/infra", "dotfiles (private)": "https://github.com/leonbubova/dotfiles" },
      demo: { type: "term", lines: [["$ ", "restic restore latest --target /srv/restore"], ["", "restoring snapshot 3f9a… to /srv/restore"], ["ok ", "restore complete · 6 s · checksums verified"], ["$ ", "ssh -o ConnectTimeout=3 root@<public-ip>"], ["", "ssh: connect to host: Connection refused   ← good"]] }
    },
    {
      id: "libertas", title: "Libertas — mail triage", year: "2026", status: "client, running", tags: ["bots", "ai"],
      tagline: "Inbox triage for a client, delivered as an operation: system doc, risk register, handover, hooks.",
      what: "Inbox triage for a client: classify incoming mail, route it, flag what needs a human. The interesting part is not the LLM call; it is that the client's team can run and change it without me.",
      how: [
        "Workflow automation with an LLM classification step and hard rules around it; every external call has an explicit failure path that stops loudly instead of writing a fake success.",
        "Repo holds SYSTEM.md (what runs where), RISIKEN.md (what can go wrong, what we do then), HANDOVER.md, and git hooks that validate workflow exports before commit.",
        "Validated against pinned test data before every publish."
      ],
      hard: "Error handling across a graph of nodes. A single `continue on error` in the wrong place turns a failed classification into a confidently misrouted mail.",
      stack: "workflow automation · llm · shell · docs",
      links: { "repo (private, client)": "https://github.com/leonbubova/libertas" },
      demo: { type: "card", title: "Libertas (illustrative)", body: "✉ 14:02  Rechnung 2026-0912 von Lieferant X\n→ class: invoice · route: buchhaltung@", buttons: ["OK", "Umleiten", "Mensch"], after: "✉ 14:03  „kurze Frage zur Lieferung…\"\n→ class: support · route: human queue" }
    },
    {
      id: "research-paper-reader", title: "Research Paper Reader", year: "2026", status: "live", tags: ["web", "ai"],
      tagline: "Harvard CS197 lecture notes as a reader for humans and a context pack for agents.",
      what: "Pranav Rajpurkar's AI Research Experiences notes, rendered as a calm dark reader with themes, adjustable type, a table of contents, per-sentence bookmarks and link previews. The same Markdown files are fetchable raw, so an agent can load a lecture as context in one request.",
      how: [
        "No build step, no framework, no node_modules: Markdown is parsed in the browser at runtime.",
        "A benchmark page sketches the experiment I actually care about: does an agent grounded in these notes beat a bare frontier model at real research tasks?"
      ],
      hard: "Serving humans and agents from the same files without a build step.",
      stack: "html · css · js · markdown",
      links: { "site": "https://leonbubova.github.io/research-paper-reader/", "code": "https://github.com/leonbubova/research-paper-reader" },
      demo: { type: "term", lines: [["$ ", "curl -s …/research-paper-reader/md/lecture-03.md | head -3"], ["", "# Lecture 3 — Reading papers at speed"], ["", "..."], ["", "→ 11 k tokens, straight into the agent's context"]] }
    },
    {
      id: "dueling-book-killer", title: "dueling-book-killer", year: "2025 – 2026", status: "engine done", tags: ["web"],
      tagline: "A Yu-Gi-Oh! duel simulator built the right way round: event-sourced state machine first, UI later.",
      what: "Existing simulators are UI first and rules nowhere. This one is a pure JSON state machine: every action is an event, state is a fold over events, so replay, undo and testing are free. Today it's a terminal REPL for goldfishing and combo training; a Vite + React front end will consume the exact same engine.",
      how: [
        "One ETL call to ygoprodeck builds data/cards.json and a sample Blue-Eyes deck.",
        "REPL: `move hand1 monster`, `move deck/blue-eyes-white hand`, `train blue-eyes` for drilling opening lines.",
        "vitest covers the engine and the trainer; Docker for the eventual web deploy."
      ],
      hard: "Keeping UI concerns out of the engine so the REPL and the future web front end share one truth.",
      stack: "typescript · event sourcing · vitest · docker",
      links: { "code (private)": "https://github.com/leonbubova/dueling-book-killer" },
      demo: { type: "term", lines: [["duel> ", "move hand1 monster"], ["", "event 07 SUMMON  Blue-Eyes White Dragon → M1"], ["duel> ", "train blue-eyes"], ["", "opening line 3/12: hand [Sage, Melody, Trade-In, …]"], ["duel> ", "undo"], ["", "state ← fold(events[0..6])"]] }
    },
    {
      id: "cv-screening", title: "LLM as recruiter support", year: "2026", status: "research", tags: ["ai"],
      tagline: "Can an LLM rank CVs as well as a recruiter, and how would you prove it without fooling yourself?",
      what: "Started as a joke on LinkedIn (\"just upload the CVs to ChatGPT\"). Turned into a proper experiment with a recruiter and a copywriter: one real job, 30 real anonymised CVs plus 30 synthetic ones, recruiter and LLM rank independently, then compare overlap, reasoning and whether the recruiter can spot the synthetic ones.",
      how: [
        "A 5-step scoring pipeline mirroring how recruiters actually read: hard knockout → relevance → career logic → positive outliers → ranking, every score with a written reason.",
        "Synthetic CVs deliberately imperfect: gaps, typos, career changers, exaggerations, three education paths.",
        "Bias double-test: same CV, different name and age; anonymisation as a separate step before the model ever sees the text. GDPR Art. 22: decision support, never the decision.",
        "Everything is Markdown: prompts, criteria, results. The medium is the documentation."
      ],
      hard: "The middle of the ranking. Top 5 and bottom 15 were trivially separated; ranks 6–15 are where a human weighs differently and where the real learning is.",
      stack: "claude code · markdown · eval design",
      links: { "ask for the write-up": "mailto:bubova.leon@gmail.com?subject=CV%20screening%20case%20study" },
      demo: { type: "chart", label: "LLM score, 30 synthetic CVs (first run)", points: [["#1", 9.7], ["#2", 9.5], ["#3", 9.2], ["#4", 8.8], ["#5", 8.0], ["#6", 7.1], ["#7", 7.0], ["#8", 6.4], ["#10", 5.8], ["#15", 5.0], ["#16", 0], ["#30", 0]], note: "all 15 weak candidates correctly knocked out" }
    },
    {
      id: "the-gradient", title: "The Gradient", year: "2026", status: "community", tags: ["web"],
      tagline: "A network for creatives in Köln who treat AI as material, not a trend.",
      what: "A WhatsApp channel with curated tool finds and workflows for designers, marketers and builders, growing towards real meetups. The landing page is a zero-dependency Node server on Fly.io in Frankfurt that suspends when idle and auto-starts on request.",
      how: ["server.js on node:http only, clean URLs, health check. Static HTML + CSS, no build. Alpine Docker image, non-root, auto-suspend."],
      hard: "",
      stack: "node:http · html · fly.io · docker",
      links: { "code": "https://github.com/leonbubova/the-gradient" },
      demo: { type: "plain", text: "Weekly: 5 tools, 2 workflows, 1 opinion. Köln first, then everywhere." }
    },
    {
      id: "soft-landing", title: "soft-landing", year: "2026", status: "shipped", tags: ["web"],
      tagline: "A counselling practice's one-pager where the test harness is the interesting part.",
      what: "Plain HTML, CSS and JS bundled with Vite and deployed to GitHub Pages. What makes it worth listing: `npm test` drives the quiz paths, contact form, legal modal and mobile menu in a real Chrome on desktop and mobile viewports, and blocks the deploy on failure. `npm run screens` takes full-page shots at 10 viewport sizes and asserts layout.",
      how: ["Playwright against the preview build; screenshot index as an HTML report; both run in the deploy workflow."],
      hard: "",
      stack: "vite · playwright · github actions · github pages",
      links: { "code": "https://github.com/leonbubova/soft-landing" },
      demo: { type: "term", lines: [["$ ", "npm test"], ["", "✓ quiz: all 7 paths end in a CTA"], ["", "✓ form: validation + submit"], ["", "✓ legal modal · mobile menu · no console errors"], ["ok ", "12 passed (19.8 s) → deploy"]] }
    },
    {
      id: "klarna", title: "Klarna App payments", year: "2021 – 2024", status: "day job", tags: ["work"],
      tagline: "Three Node.js microservices for tokenized payments, 500+ merchants, 40M+ app users.",
      what: "In a cross-functional team inside the Klarna App: the services that let merchants like Uber, Voi and Instacart charge a stored payment method. Weekly on-call with full ownership: Datadog dashboards, incident triage in production.",
      how: ["Led the adoption of Kafka for external messaging and built the notification service: 10k+ email and push sends per day.", "Defined and tracked growth KPIs for the subscription feature (~400k MAU) in Amplitude with programmatic event tracking.", "React Native + TypeScript work in the app itself."],
      hard: "",
      stack: "node · typescript · kafka · aws · datadog · amplitude · react native",
      links: {}, demo: { type: "plain", text: "500+ merchants · 40M+ users · 10k+ notifications/day · ~400k MAU tracked" }
    },
    {
      id: "ivy", title: "Ivy subscriptions", year: "2024", status: "day job", tags: ["work"],
      tagline: "Recurring billing inside an account-to-account payment platform.",
      what: "Architected the internal API flow for subscription services at Ivy: end-to-end data model and service communication for the core, plus integrations with external payment providers for recurring billing, including auth, webhook processing and error recovery across multiple providers. The reusable service components became the base for Ivy's subscription product line.",
      how: [], hard: "",
      stack: "typescript · node · postgres · payment provider apis",
      links: {}, demo: { type: "plain", text: "subscriptions on account-to-account rails · multi-provider webhooks · error recovery" }
    },
    {
      id: "paper-hands", title: "paper-hands (2021)", year: "2021", status: "archive", tags: ["archive"],
      tagline: "Paper trading app: buy and sell stocks at live prices without money. Built twice, Symfony then Laravel.",
      what: "Register, log in, manage a portfolio; every buy/sell hits financialmodelingprep.com for the live price and updates the balance. A weekend proof of concept that I rebuilt in Laravel to compare the frameworks.",
      how: [], hard: "", stack: "php · symfony · laravel · twig · mysql",
      links: { "code": "https://github.com/leonbubova/paper-hands", "laravel rebuild": "https://github.com/leonbubova/paper-hands-v2" }, image: "paper_hands.png", demo: { type: "image" }
    },
    {
      id: "klimfab", title: "KlimfAb (2019 – 2020)", year: "2019 – 2020", status: "archive", tags: ["archive"],
      tagline: "Government-funded consulting tool for 15 sewage utilities preparing for climate change.",
      what: "A 26-topic questionnaire with saved evaluations, comparisons between variants and a knowledge base written with domain specialists, embedded into a WordPress site that connects the network members. Built and hosted at econius.",
      how: [], hard: "", stack: "php · javascript · jquery · mysql · wordpress",
      links: { "klimfab.de": "http://klimfab.de/" }, image: "klimfabtool.png", demo: { type: "image" }
    },
    {
      id: "easychords", title: "easychords (2022)", year: "2022", status: "archive", tags: ["archive"],
      tagline: "Turns hard guitar chord patterns into beginner-friendly ones by transposing across the fretboard.",
      what: "Pick a chord pattern, the app transposes it by half-tone steps and lists the easy-to-play equivalents. Plain HTML, CSS and JS.",
      how: [], hard: "", stack: "javascript · html · css",
      links: { "code": "https://github.com/leonbubova/easychords" }, image: "easychords.png", demo: { type: "image" }
    }
  ],
  ideas: [
    ["Dictation demo", "S", "Web Speech API mic button. Speak, text appears, then: “Subrosa does this in every app, offline.”"],
    ["kaputt in the browser", "M", "Three real levels as a fake terminal. Already prototyped in the terminal version."],
    ["/now page", "S", "Building, reading, available-for. Dated monthly, linked from the header."],
    ["Commit heatmap", "S", "Contribution grid from the GitHub events API."],
    ["Build-in-public log", "M", "Weekly numbers, what broke, what shipped. One Markdown folder feeds site and LinkedIn."],
    ["moonshine-de model card", "M", "WER per iteration, audio sample, in-browser ONNX demo of German dictation."],
    ["Uses page", "S", "Hardware, kitty + tmux + pure, the Hetzner box, Claude Code setup. Links to dotfiles."],
    ["Köln footer", "S", "Local time, weather, next Gradient meetup."]
  ]
};
