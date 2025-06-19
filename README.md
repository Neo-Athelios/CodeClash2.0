![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-264de4?style=for-the-badge&logo=css3&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue?style=for-the-badge)
![Project-Type](https://img.shields.io/badge/Project-Landing--Page-lightgrey?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
---
![Repo Size](https://img.shields.io/github/repo-size/Neo-Athelios/WebDash)
![Code Size](https://img.shields.io/github/languages/code-size/Neo-Athelios/WebDash)
![Top Language](https://img.shields.io/github/languages/top/Neo-Athelios/WebDash)
---
# 🚀 TechnixCRM – Modern Customer Relationship Management

TechnixCRM is a beautifully designed front-end website project for a CRM (Customer Relationship Management) platform. The layout, aesthetics, and user flows are crafted to reflect a real-world SaaS product with marketing, sales, and support capabilities.

This is perfect as a **landing page demo**, a **prototype for pitching** a CRM solution, or a **starter UI for developers building CRM systems**.

Snapshot :
-
![Screenshot_20-4-2025_10277_neo-athelios github io](https://github.com/user-attachments/assets/b20ad13f-bef2-4466-8f65-261baa48bb5c)


---
## 📋 Table of Contents
- [Features]
- [How to Run & Use this Project]
- [Tech Stack]
- [Credits]
- [Badges]
---

## ✨ Features

✔️ Sticky navbar with gradient logo branding  
✔️ Hero section with CTA buttons and animated banner  
✔️ Feature carousel using glass morphism UI style  
✔️ 12 detailed CRM feature cards with icons  
✔️ Interactive vertical sidebar for CRM modules  
✔️ Fully responsive layout with media queries  
✔️ Contact and footer section for branding  
✔️ Fast loading with zero external JS frameworks

---

## 💻 How to Run & Use This Project

TechnixCRM is a front-end project that runs entirely in your browser—**no dependencies or build tools needed**.

### 🚀 Running the Project

#### 🔹 Method 1: Open in Browser (Quickest)
1. Rename the file `!DOCTYPE html.txt` to `index.html`.
2. Double-click `index.html` to launch it in your browser.

#### 🔹 Method 2: Use Live Server in VS Code
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension (if not already).
3. Right-click `index.html` → select **"Open with Live Server"** for real-time preview.

---

### 🧭 Using the Interface

Once the page loads:

- Use the **sticky navigation header** to jump between `Home`, `Features`, `Contact`, etc.
- Click on **Book a Demo** or **Free Trial** buttons to simulate call-to-actions.
- Scroll down to explore beautifully animated sections like:
  - 💼 **Lead Capture**
  - ✅ **Task Assignment**
  - 💳 **Payment Tracking**
  - 📢 **Marketing Automation**
- Play with the **glass-style slider** to visually experience CRM benefits.
- On **mobile devices**, test how everything responsively adjusts for smaller screens.

---
## 🧰 Tech Stack

| Tech           | Purpose                       |
|----------------|-------------------------------|
| **HTML5**      | Page structure                |
| **CSS3**       | Styling and layout            |
| **Google Fonts** | Custom typography (Poppins, Open Sans) |
| **JavaScript (Vanilla)** | Minor interactions (optional future enhancement) |
| **Responsive Design** | Mobile-friendly layout via media queries |

---

## 🙌 Credits

## 👥 Contributors

[![Contributors](https://contrib.rocks/image?repo=Neo-Athelios/WebDash)](https://github.com/Neo-Athelios/WebDash/graphs/contributors)

Thanks to the following people for their contributions:
- 🧠 [@MukundXplore](https://github.com/MukundXplore)
- ⚙️ [@TheCodeCipher](https://github.com/TheCodeCipher)
- 🛠️ [@Ark0B](https://github.com/Ark0B)

Design & Development
- 🔧 **CRM Inspiration**: [TechnixCRM](https://technixcrm.com)
- 📸 **Graphics & Icons**: TechnixCRM.com and public SVG sources
- 📍 **Fonts**: Google Fonts (Poppins, Open Sans)
---

## 💡 Code Examples

### 📌 1. Sticky Navigation Header with Gradient Logo

```html
<header class="sticky-header">
  <nav class="navbar">
    <a href="https://neo-athelios.github.io/WebDash/" class="logo">
      <img src="logo.png" alt="TechnixCRM Logo">
      <span class="logo-text"><pre> Technix - CRM </pre></span>
    </a>
    <ul class="nav-links">
      <li><a href="#home" class="active">Home</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#footer">Quick Links</a></li>
      <li><a href="http://app.technixcrm.com/login" class="btn-primary">Login</a></li>
    </ul>
  </nav>
</header>
```

📘 *Explanation:*  
This code creates a **sticky header** with a branded logo and navigation menu. The `sticky-header` class ensures it stays on top while scrolling. The `btn-primary` class styles the login button.

---

### 📌 2. Hero Section with CTA Buttons

```html
<section id="home" class="hero">
  <h1><span class="highlight">The Foundation for Building and Retaining Customer Relationships</span></h1>
  <p>Generate leads, track prospects, avail opportunities, close deals and retain clients...</p>
  <img src="https://technixcrm.com/assets/images/banner-img.gif" alt="CRM Banner">
</section>
```

📘 *Explanation:*  
This section forms the **main hero area**, including a headline, subtext, and animated banner. The `highlight` class uses a text gradient to draw attention.

---

### 📌 3. Glassmorphism Slider for Features

```html
<div class="slider-container">
  <div class="slider">
    <div class="slide slide-1">
      <div class="glass-card">
        <h2>Increase Sales</h2>
        <ul>
          <li>Target new customers</li>
          <li>Improve conversion rate</li>
        </ul>
      </div>
    </div>
    <!-- More slides -->
  </div>
</div>
```

📘 *Explanation:*  
This is a **glass-style sliding component** that shows key selling points in visually engaging panels. Each `slide` uses a linear gradient background with blur effects from `.glass-card`.

---

### 📌 4. CRM Feature Cards Grid

```html
<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">📈</div>
    <h3>Lead Capture</h3>
    <p>Automatically gather and organize leads from various channels...</p>
  </div>
  <!-- More feature cards -->
</div>
```

📘 *Explanation:*  
This is a **responsive grid** of feature cards. Each card uses a box-shadow and icon header, perfect for explaining key modules like lead capture, task management, or payment tracking.

---

### 📌 5. Call-to-Action Buttons (Floating)

```html
<div class="below-header-buttons">
  <a href="#" class="btn btn-primary">Book a Demo</a>
  <a href="#" class="btn btn-outline">Free Trial</a>
</div>
```

📘 *Explanation:*  
These are **floating CTA buttons** that stay right below the navbar. The `btn-primary` is solid blue, and `btn-outline` has a bordered, subtle design.

---
## Scope of Improvement 
- Mobile Responsiveness
---



WebDash 2025 - A Website Development Challenge by IEEE JMI Submission
-
Website:    https://neo-athelios.github.io/WebDash
-
Video:    https://youtu.be/JRVpPbL6JA0
-
Style Guide :    https://shorturl.at/qDGtE
-
Problem Statement:    https://shorturl.at/GM9fk
-
