# 🛡️ AegisSandbox: An Interactive Prompt Injection Playground
### Presented by OWASP JISU × GDG JISU

**AegisSandbox** is an open-source cybersecurity education tool designed to provide a live, hands-on demonstration of prompt injection vulnerabilities and modern defense mechanisms. This interactive playground allows students, developers, and security enthusiasts to explore how Large Language Models (LLMs) can be manipulated and how to build robust, multi-layered defenses against such attacks.

---

## 🎮 Core Mechanics: The 5 Tiers of Defense

AegisSandbox is built around a 5-level defense system, allowing users to progressively increase the security posture of the AI agent and observe the effectiveness of each layer against adversarial prompts.

| Level | Defense Strategy | Description |
| :---: | :--- | :--- |
| **0** | **Raw Append (No Defenses)** | The user's input is directly concatenated with the system's base prompt. This represents a completely vulnerable, unsecured LLM pipeline, susceptible to basic instruction hijacking. |
| **1** | **Instruction Reinforcement** | The system prompt is hardened with explicit warnings, instructing the AI to never override its core duties or reveal sensitive information. This can defeat naive attacks but is easily bypassed by more sophisticated roleplaying or logic-based prompts. |
| **2** | **Input Sandboxing** | The user's input is encapsulated within XML tags (e.g., `<user_input>...</user_input>`). This creates a logical separation, helping the model distinguish between trusted system instructions and untrusted user data. |
| **3** | **Programmatic Middleware** | A layer of code runs before and after the LLM call. An **input scanner** inspects the user's prompt for adversarial keywords, blocking suspicious requests. An **output scanner** redacts sensitive information (like secrets or flags) if the model is tricked into leaking them. |
| **4** | **Dual-LLM Verification** | The gold standard of prompt defense. A secondary, independent "supervisor" LLM is used to inspect the user's prompt and the primary AI's proposed response. If the supervisor detects a policy violation or a potential security breach, it blocks the transaction entirely. |

---

## 🛠️ Deployment Configuration: Hosting on Vercel

AegisSandbox is a fully static web application and can be deployed for free in seconds on platforms like Vercel or Netlify.

### Step-by-Step Vercel Deployment:

1.  **Fork or Clone this Repository:**
    Start by creating your own copy of the AegisSandbox repository on GitHub.

2.  **Sign Up & Connect to Vercel:**
    - Create a free account at [vercel.com](https://vercel.com).
    - Connect your GitHub account to Vercel to import your projects.

3.  **Import the Project:**
    - From your Vercel dashboard, click **"Add New..."** -> **"Project"**.
    - Select the AegisSandbox repository you just forked.
    - Vercel will automatically detect that it is a static site. No special build commands are needed.

4.  **Configure Environment Variables (Optional):**
    To enable the **Live API Mode**, you need to provide a Gemini API key.
    - In the Vercel project settings, navigate to **"Settings"** -> **"Environment Variables"**.
    - Create a new variable named `GEMINI_API_KEY`.
    - Paste your API key into the value field.
    - **Crucially, this key is stored securely as a Vercel secret and is NOT exposed in your public repository.**

5.  **Deploy!**
    - Click the **"Deploy"** button. Vercel will build and host your application, providing you with a public URL.

### ⚠️ **Security Warning: Never Commit API Keys**

It is critical to remember that you should **NEVER** hardcode or commit your `GEMINI_API_KEY` (or any other secret) directly into your source code (`app.js`, `.env` on the client-side, etc.) and push it to a public GitHub repository.

- **Always** use the environment variable features provided by your hosting platform (like Vercel) to manage secrets.
- If you are running the application locally, use a `.env` file and ensure your `.gitignore` file includes `.env` to prevent it from being tracked by Git.
