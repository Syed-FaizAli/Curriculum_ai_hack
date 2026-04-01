# 📚 Curriculum.ai

> **AI-Powered Curriculum Analysis Platform** — Instantly evaluate how well your academic curriculum aligns with real-world industry demands using Gemini AI, live web search, and semantic embeddings.

Built by **CodeVengers** 🚀

---

## ✨ What It Does

Curriculum.ai lets educators upload syllabus PDFs, then uses a multi-layer AI pipeline to:

1. **Extract** text from uploaded PDF syllabi.
2. **Search** current industry trends in real-time via the Serper.dev API.
3. **Score** relevance using a hybrid approach:
   - **Semantic Embeddings** (40%) — cosine similarity between curriculum content and industry trends using `all-MiniLM-L6-v2`.
   - **LLM Analysis** (60%) — Google Gemini `gemini-2.5-flash` evaluates curriculum alignment against a scoring rubric.
4. **Identify** critical skill gaps and missing topics.
5. **Recommend** specific curriculum updates with resource links.
6. **Chat** — An AI-powered chatbot (powered by Gemini) that lets faculty ask follow-up questions about the analysis report.

---

## 🛠 Tech Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| Frontend   | React 19, Vite 7, Tailwind CSS v4, Ant Design 6, Framer Motion            |
| Backend    | Django 5, Django REST Framework, SQLite                                    |
| AI/ML      | Google Gemini API (`gemini-2.5-flash`), Sentence Transformers (`all-MiniLM-L6-v2`) |
| Search     | Serper.dev API (live Google Search)                                        |
| PDF Parsing| pdfplumber, pypdf                                                          |

---

## 📁 Project Structure

```
Curriculum_ai_hack/
├── backend/                    # Django backend (API + AI pipeline)
│   ├── analysis/               # Django app — models, views, serializers, URLs
│   │   ├── models.py           # AnalysisResult model
│   │   ├── views.py            # API endpoints (upload, report, chat, etc.)
│   │   ├── urls.py             # API route definitions
│   │   └── serializers.py      # DRF serializers
│   ├── curriculum_ai/          # Django project config
│   │   ├── settings.py         # Django settings (CORS, DB, apps)
│   │   └── urls.py             # Root URL config
│   ├── analyze_curriculum.py   # Core AI analysis pipeline
│   ├── requirements.txt        # Python dependencies
│   ├── manage.py               # Django management script
│   ├── db.sqlite3              # SQLite database
│   └── .env                    # API keys (GEMINI_API_KEY, SERPER_API_KEY)
│
├── src/                        # React frontend source
│   ├── pages/
│   │   ├── Landing.jsx         # Landing / marketing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Sign up page
│   │   ├── Welcome.jsx         # Post-login welcome page
│   │   ├── Dashboard.jsx       # Dashboard with stats & recent analyses
│   │   ├── Upload.jsx          # Upload syllabus files for analysis
│   │   ├── Report.jsx          # Detailed analysis report view
│   │   ├── Recent.jsx          # History of past analyses
│   │   ├── Pricing.jsx         # Pricing plans page
│   │   ├── Support.jsx         # Support / contact page
│   │   └── About.jsx           # About page
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar (with theme toggle)
│   │   ├── GlassCard.jsx       # Reusable glassmorphic card component
│   │   ├── ChatBot.jsx         # Floating AI chatbot (report assistant)
│   │   └── TypewriterHeading.jsx # Typewriter text animation
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/light theme provider
│   ├── App.jsx                 # React Router setup & protected routes
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles & Tailwind config
│
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json                # Node.js dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── install.bat                 # Windows: install frontend dependencies
├── run.bat                     # Windows: start both servers
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **Python** (v3.10 or higher) — [Download](https://www.python.org/downloads/)
- **pip** (comes with Python)
- **Git** (optional, for cloning) — [Download](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Curriculum_ai_hack.git
cd Curriculum_ai_hack
```

### 2. Set Up API Keys

Create (or edit) the file `backend/.env` with your own API keys:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
SERPER_API_KEY=your_serper_api_key_here
```

| Key              | Where to get it                                      | Required? |
| ---------------- | ---------------------------------------------------- | --------- |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | ✅ Yes    |
| `SERPER_API_KEY` | [Serper.dev](https://serper.dev/)                    | ⚡ Optional (enables live industry trend search) |

### 3. Install Dependencies

#### Frontend (React)

```bash
npm install
```

#### Backend (Django + AI Libraries)

```bash
cd backend
pip install -r requirements.txt
```

> **Note:** The `sentence-transformers` package will download the `all-MiniLM-L6-v2` model (~80MB) on first run.

### 4. Set Up the Database

```bash
cd backend
python manage.py migrate
```

### 5. Start the Application

#### Option A: Use the batch file (Windows — easiest)

Just double-click **`run.bat`** in the project root. It starts both servers automatically.

#### Option B: Start manually (any OS)

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

### 6. Open in Browser

| Service         | URL                          |
| --------------- | ---------------------------- |
| 🌐 Frontend UI  | http://localhost:5173         |
| 🔧 Backend API  | http://127.0.0.1:8000/api/   |

---

## 🛑 Stopping the Application

- **If using `run.bat`:** Close the two terminal windows that were opened (Backend and Frontend).
- **If running manually:** Press `Ctrl + C` in each terminal.

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/`.

| Method   | Endpoint                  | Description                              |
| -------- | ------------------------- | ---------------------------------------- |
| `POST`   | `/api/upload/`            | Upload syllabus PDFs for analysis        |
| `GET`    | `/api/recent/`            | Get the 10 most recent analyses          |
| `GET`    | `/api/report/<id>/`       | Get a specific analysis report           |
| `DELETE` | `/api/report/<id>/delete/`| Delete a specific analysis               |
| `POST`   | `/api/report/<id>/chat/`  | Chat with AI about a specific report     |
| `POST`   | `/api/summary/<id>/`      | Generate executive summary (placeholder) |
| `GET`    | `/api/pdf/<id>/`          | Generate PDF report (placeholder)        |

---

## 🎨 Frontend Features

- **Glassmorphic Dark UI** — Polished dark theme with glass-panel aesthetics.
- **Light/Dark Mode Toggle** — Switch themes via the navbar.
- **Animated Landing Page** — Framer Motion animations, floating SVG hero, typewriter text.
- **Drag & Drop Upload** — Upload multiple PDF syllabi at once.
- **Interactive Report** — Dashboard gauges, collapsible recommendations, critical gap lists.
- **AI Chatbot** — Floating chatbot on the report page to ask follow-up questions about the analysis.
- **Export to PDF** — Print-optimized report layout (via `Ctrl+P` / browser print).
- **Share Reports** — Copy link, Gmail, WhatsApp, and Google Drive sharing options.
- **Protected Routes** — Dashboard, Upload, Report, and Recent pages are behind authentication (currently mocked for demo).

---

## 🧠 How the AI Pipeline Works

```
PDF Upload
    │
    ▼
┌──────────────────────┐
│  1. PDF Text Extract │  ← pdfplumber
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  2. Live Web Search  │  ← Serper.dev API (2026 industry trends)
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌──────────┐
│Embedding│ │  Gemini  │
│  Score  │ │ Analysis │
│  (40%)  │ │  (60%)   │
└────┬────┘ └────┬─────┘
     │           │
     └─────┬─────┘
           ▼
┌──────────────────────┐
│  Hybrid Score (0-100)│
│  + Gaps + Suggestions│
└──────────────────────┘
```

---

## 🧪 Troubleshooting

| Problem                                    | Solution                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `npm` commands fail in PowerShell           | Use **Command Prompt** instead, or double-click `install.bat` / `run.bat`.                     |
| `GEMINI_API_KEY not found`                  | Make sure `backend/.env` exists and contains your key. Restart the backend after editing.       |
| `ModuleNotFoundError` in Python             | Run `pip install -r requirements.txt` inside the `backend/` directory.                         |
| Frontend can't connect to backend           | Ensure the Django server is running on port `8000`. Check the terminal for errors.              |
| PDF text extraction returns empty            | The PDF may be image-based (scanned). Use a text-based PDF instead.                            |
| `sentence-transformers` download is slow    | First run downloads the ML model (~80MB). Subsequent runs use the cached version.              |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Team — CodeVengers

Made with ❤️ from Hyderabad, India.
