# AlgoFlow — Visualize. Solve. Learn.

**AlgoFlow** is an advanced, interactive platform designed to **visually simplify Data Structures and Algorithms (DSA)** for developers and learners at all levels. It bridges the gap between writing code and understanding it, offering an intuitive approach to problem-solving through **step-by-step visualizations, curated problems**, and **AI-powered insights** (coming soon).

Crafted with cutting-edge technologies like **Next.js 15+**, **TypeScript**, **Convex DB**, **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**, AlgoFlow delivers a clean, responsive user experience with real-time filtering, problem routing, animations, and more.

---

![AlgoFlow Screenshot](/public/image.png)
![Mobile view](/public/image1.png)
![feedback](/public/image9.png)
![contact us](/public/image-1.png)
![navbar](/public/image-2.png)
![leetcode](/public/image-3.png)
![algorithm](/public/image-4.png)
![visualizer](/public/image-5.png)
![striver'dsa](/public/image-6.png)
![dsa problems](/public/image-7.png)
---

## Why AlgoFlow?

- Go beyond static code — **understand algorithms visually**
- Solve curated **LeetCode** and **Striver A2Z** problems
- Gain insights into each step of your code execution
- All built in a blazing-fast, scalable web experience

---

## Core Features

- **DSA Problem Explorer**  
  Explore handpicked DSA problems with filters by topic, difficulty, and status. Includes both LeetCode and Striver A2Z sheets.

- **Interactive Algorithm Visualizer**  
  Learn sorting and graph algorithms step-by-step with animation timelines and play/pause controls.

- **AI Insights (Coming Soon)**  
  Receive automated explanations, complexity breakdowns, and smart hints from AI.

- **Solution Cards & Live Editor**  
  View optimized solutions in read-only mode or edit/practice in a live multi-language editor (C++, Java, JavaScript).

- **Feedback Console**  
  Write and validate your code with test cases and get real-time feedback on outputs.

- **Striver A2Z Sheet Visualizer**  
  Solve problems step-by-step based on the well-known DSA roadmap by Striver.

---

## Tech Stack

| Layer        | Technology Stack                                  |
| ------------ | ------------------------------------------------- |
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui   |
| **Backend**  | Convex Database                                   |
| **Animations** | Framer Motion                                   |
| **UX Enhancements** | GSAP, Sonner, Formspree                    |

---

## Project Structure (Simplified)

```

/components
│   ├── a2zProblems/
│   ├── dashboard/
│   ├── dropdown/
│   ├── faq/
│   ├── feedbackcomponent/
│   ├── footer/
│   ├── nav/ & navbar/
│   ├── problems/           # ProblemCards, Filters, Visualizer
│   ├── providers/
│   ├── themeToggle/
│   ├── ui/                 # shadcn/ui Components
│   ├── visualizerLayout/
│   └── whychooseus/

/app
│   ├── a2zProblems/
│   ├── about/
│   ├── contact/
│   ├── dashboard/visualizer/ & \[slug]/
│   ├── feedback/
│   ├── problems/
│   ├── api/
│   └── comingSoon/

/data
/hooks
/lib
/script
/seed                  # Convex DB Functions
/styles
/types

````

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/algoflow.git
cd algoflow
````

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

```bash
# .env.local
NEXT_PUBLIC_CONVEX_URL=your_convex_project_url
```

### 4. Run the Development Server

```bash
pnpm dev
```

---

## Contact & Feedback

Have suggestions or want to get in touch?

Email: [support@algoflow.dev](mailto:anuk35168@gmail.com)
Or use the [Contact Us](https://algoflow-three.vercel.app/contact) page on the site.

---

##  Contributing

We’re working toward open-sourcing AlgoFlow soon.
Stay tuned for contribution guidelines and GitHub project boards.

---

##  Follow the Journey

AlgoFlow is crafted by an indie developer passionate about education, dev tools, and open knowledge.
Your support, feedback, and ideas are always welcome!

---

##  License

Licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

> Ready to master DSA with the power of visuals?
> Try AlgoFlow today and experience algorithms like never before.


