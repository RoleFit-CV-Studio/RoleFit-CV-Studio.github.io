# **RoleFit CV Studio**

**Tagline:** *Generate truthful, job-aligned CV variants—locally in your browser.*

Why this name works:

* “RoleFit” communicates **job alignment** without sounding gimmicky.
* “Studio” implies a guided, high-quality **UX workflow**.

(Alternatives: **AlignCV**, **CVTailor**, **SemaCV**, **FitCV**)

---

## README.md (professional outline)

# RoleFit CV Studio

**RoleFit CV Studio** is a **browser-only** CV builder that helps users maintain one **Master Profile** and instantly generate **job-specific CV variants** using **ACM (Automatic Candidate/Resume Matching)** techniques: keyword extraction, skill/entity parsing, semantic similarity, role classification, and match-based section re-ordering.

> **Privacy-first:** All processing runs locally (LocalStorage/IndexedDB). No server required.

---

## 1. Problem Statement

Most applicants apply to multiple roles but don’t tailor their CV per job description. This causes:

* Low ATS match (missing keywords/skills)
* Weak role alignment (wrong emphasis, irrelevant bullets)
* Time waste rewriting the same CV repeatedly

RoleFit solves this by generating **truthful, structured, job-aligned CV variants** from the user’s stored profile, based on job title + job description + seniority.

---

## 2. Goals and Non-Goals

### Goals

* Create a **Master Profile** once and reuse everywhere
* Generate **Customized CV** variants per job
* Provide an **explainable match score** and suggestions
* Save locally (cache) + export/import **JSON/CSV**
* UX optimized: fast, guided, accessible, mobile responsive

### Non-Goals

* No fake content generation (no inventing roles/projects/skills)
* No automatic “apply” or scraping employer systems
* No server-side ATS bypass techniques

---

## 3. Key Features

### 3.1 Master Profile Builder

* Personal summary, roles, achievements, education, certifications
* Skills taxonomy (technical, tools, domain, soft skills)
* Projects portfolio and links
* Bullet library (STAR/CAR format)

### 3.2 Job Intake

* Paste job description + select:

  * **Job title**
  * **Seniority** (Intern/Junior/Mid/Senior/Lead)
  * **Focus** (e.g., Backend / Data / Product / QA)

### 3.3 ACM Engine (Matching + Classification)

* ATS keyword alignment + semantic alignment
* Role classification and skill-gap detection
* Section ranking + bullet prioritization
* Explanation layer: “Why this bullet was selected”

Modern semantic approaches like contrastive learning embeddings are commonly used for similarity-based retrieval/matching tasks (e.g., SimCSE / Contriever concepts). ([ScienceDirect][1])

### 3.4 CV Output Generator

* Choose templates:

  * Classic ATS (single column)
  * Modern (clean headings, subtle dividers)
* Export:

  * HTML (print-ready)
  * JSON / CSV data export
* Import JSON/CSV to restore profile

### 3.5 Offline-first Storage

* LocalStorage for settings + quick drafts
* IndexedDB for structured profile data (recommended)
* Optional “Reset local data”

---

## 4. ACM Techniques Used (Automatic CV Classification & Matching)

RoleFit combines **classic IR** + **modern embedding-based semantic matching**.

### 4.1 Text Preprocessing (Baseline)

* Tokenization, lowercasing, stop-word handling
* Phrase detection (n-grams) for skills like “machine learning”, “node.js”
* Section-aware parsing (Experience vs Projects vs Skills)

### 4.2 Keyword/Skill Extraction

* Dictionary + pattern extraction (regex for tools, certs, dates)
* Skill normalization (e.g., “JS” → “JavaScript”)
* Optional lightweight NER strategy (client-side)

### 4.3 Vectorization (Classic Matching)

* TF-IDF vectors for CV vs JD similarity
* Cosine similarity scoring (fast, transparent)
* Optional topic modeling (LDA) for domain grouping (advanced)

TF-IDF + cosine similarity is widely used in resume–job matching systems as a strong baseline. ([ijrar.org][2])

### 4.4 Semantic Embeddings (Modern Matching)

* Use sentence/document embeddings for JD, sections, bullets
* Cosine similarity on embeddings to rank:

  * best bullets
  * best projects
  * best skills to surface

A common practical model choice is **all-MiniLM-L6-v2**. ([Hugging Face][3])
Embeddings can be computed in-browser using **Transformers.js / ONNX runtime** examples. ([GitHub][4])

### 4.5 Classification (Optional)

* Predict best-fit role category from job description:

  * e.g., “Frontend”, “Backend”, “Data”, “DevOps”, “PM”
* Approaches:

  * Lightweight rules (keywords + weights)
  * TF-IDF + linear classifier (small model)
  * Embedding + nearest-role-prototype matching

BERT-style approaches are often reported to improve automated screening accuracy compared to simpler methods, especially for contextual meaning. ([Springer][5])

### 4.6 Ranking & Personalization Logic

* Weighted scoring:

  * Skills match (hard skills higher weight)
  * Seniority alignment (leadership signals for Senior roles)
  * Recency boosting (recent experience weighted more)
  * Evidence weighting (measurable outcomes > responsibilities)

### 4.7 Explainability (Required for Trust)

Every suggestion shows:

* matched JD phrases/skills
* why a section/bullet moved up
* what is missing (skill-gap list)

---

## 5. UX / UI Principles (Tailwind + Accessibility)

### 5.1 UX Flow (Wizard)

1. **Create Master Profile**
2. **Paste Job Description**
3. **Review Match Summary**
4. **Generate CV Variant**
5. **Export / Save**

Multi-step “wizard” patterns reduce cognitive load for complex forms. ([FlyonUI][6])

### 5.2 UI Standards

* Tailwind CSS responsive layout
* Clear hierarchy (H1/H2, spacing, readable typography)
* Inline validation + autosave
* Keyboard navigation + ARIA labels
* “Preview as PDF” via browser print styles

Tailwind provides proven form layout building blocks and conventions for application UI. ([Tailwind CSS][7])

---

## 6. Data Model (Browser Storage)

### 6.1 Core Entities

* `profile`

  * `basics` (name, contact, links)
  * `summary`
  * `experience[]`
  * `projects[]`
  * `education[]`
  * `skills[]`
  * `certifications[]`
* `jobs[]` (saved job descriptions)
* `variants[]` (generated CVs, each tied to a job)

### 6.2 Export Formats

* **JSON:** complete fidelity (recommended)
* **CSV:** tables (experience, skills, projects) for portability

---

## 7. Architecture (HTML5 + JS + Tailwind)

### 7.1 Tech Stack

* HTML5
* Vanilla JavaScript (ES Modules)
* Tailwind CSS
* Optional client-side NLP:

  * Transformers.js (semantic embeddings) ([GitHub][4])
  * Or TF-IDF only mode (no model download)

### 7.2 Modules

* `/src/storage/` (IndexedDB + LocalStorage abstraction)
* `/src/parser/` (JD parsing, CV section parsing)
* `/src/matching/` (tfidf, embeddings, scoring)
* `/src/generator/` (template rendering, ordering)
* `/src/ui/` (wizard steps, preview, components)

---

## 8. Matching Algorithm (High-Level Spec)

1. Parse job description into:

   * required skills
   * responsibilities
   * seniority signals
2. Compute similarity:

   * TF-IDF similarity (fast baseline)
   * Optional embeddings similarity (semantic)
3. Rank and select:

   * top skills, top bullets, top projects
4. Rebuild CV:

   * reorder sections
   * rewrite headings (truthful)
   * keep content consistent (no fabrication)
5. Show:

   * match score + explainability + gap list

---

## 9. Responsible Use (Important)

RoleFit enforces:

* No invention of experience, employers, degrees, metrics
* Suggestions are **edits and prioritization** of existing user data
* Bias-aware design:

  * avoid sensitive attribute inference
  * do not “filter out” candidates; it’s a user-side drafting tool

---

## 10. Performance & Offline Strategy

* Baseline TF-IDF mode loads instantly
* Embedding mode:

  * caches model files in browser storage
  * shows download size + progress
  * offers “Low-power mode” (keyword-only)

---

## 11. Testing & Evaluation

* Unit tests for parsers and scoring
* Quality metrics:

  * keyword coverage %
  * semantic similarity score
  * user acceptance rate of suggested bullets
* UX testing:

  * time-to-first-variant
  * completion rate of wizard

---

## 12. Roadmap

* Multiple templates (ATS / Modern / Academic)
* Multilingual CV support
* Cover letter generator (truthful, based on profile)
* Versioned history of variants
* “Skill evidence” prompts (ask user to add proof, not auto-create)

---

## 13. Folder Structure (suggested)

* `index.html`
* `assets/`
* `src/`

  * `app.js`
  * `storage/`
  * `parser/`
  * `matching/`
  * `generator/`
  * `ui/`
* `styles/`

  * `tailwind.css`
  * `print.css`

---

## 14. License & Disclaimer

* MIT (or your preferred)
* Disclaimer: generated CV variants are drafts; user is responsible for correctness
