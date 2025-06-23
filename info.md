# NutriSense: Indian Nutrition Tracker - [![Visit Project (GitHub Pages)](https://img.shields.io/badge/Visit_Project-004080?style=for-the-badge&logo=github&logoColor=white)](https://neo-athelios.github.io/CodeClash2.0/)

**Eat Healthy, Live Strong**

## About NutriSense

**NutriSense directly confronts India's critical lack of accessible, authentic nutrition data for its diverse culinary traditions, a gap significantly impacting public well-being.** This intelligent, interactive web platform offers a transformative solution. As depicted in the project's interface, it enables users to effortlessly search, browse, and filter specific Indian food items.

Beyond rudimentary calorie tracking, NutriSense provides **comprehensive breakdowns of macronutrients, vital vitamins, and fiber**, delivering "actual data that matters" for Indian meals. Its intuitive interface and visual cues empower individuals to make wiser, informed decisions about their dietary patterns. The ultimate impact of NutriSense is to **demystify healthy eating for the masses**, eliminating nutritional guesswork and fostering precise, personalized well-being within India's rich gastronomic landscape.

---

## The Problem

In multicultural India, food is deeply intertwined with tradition, culture, and identity. However, this rich gastronomic diversity presents a challenge: **the lack of accessible, affordable, and authentic nutrition information**. Global nutrition monitoring primarily focuses on Western diets, leaving us unaware of the specific health effects of our Indian diet. This information gap creates significant barriers to well-being, impacting everything from diabetes control to the ability to make genuinely healthier food choices.

---

## The Solution

NutriSense emerges as the definitive answer to this complex nutritional challenge. We envision it as a **smart, interactive web platform** specifically engineered to empower users with precise dietary knowledge. It transcends conventional calorie counting by providing **comprehensive, authentic nutrition information** tailored for diverse Indian meals. Through an **intuitive interface and clear visual cues**, NutriSense guides users to effortlessly search, browse, and filter food items. Our solution ensures individuals can make wiser, data-driven decisions on their intake patterns, offering detailed breakdowns of macronutrients, vitamins, fiber, and calorie levels. This transforms healthy eating from a guessing game into an informed choice, making vital nutrition accessible to all.

---

## Key Features

NutriSense is designed as a **smart, interactive website** with the following core functionalities, driven by its underlying files:

* **Comprehensive Indian Food Database:** Built from `foods.json`, offering a rich collection of Indian dishes with detailed breakdowns of calories, macronutrients, vitamins, and fiber.
* **Advanced Search & Filtering:** Utilizes `index.html` to provide dynamic search capabilities and extensive filters (nutritional ranges, categories, cuisines, dietary restrictions) for precise food discovery.
* **Intuitive User Interface & Responsive Design:** Crafted with `index.html` and `style.css` to ensure an easy-to-navigate layout that adapts seamlessly across all devices, featuring clear visual cues.
* **Detailed Nutritional Breakdowns:** Beyond simple calorie counts, it presents granular data on all key nutrients, directly from `foods.json`, empowering users with "actual data that matters."
* **Empowering Decisions:** Designed to help users make wiser, informed choices about their food intake, effectively eliminating guesswork in daily nutrition.
* **User Engagement:** Includes interactive elements and information sections (`index.html`) for feedback and project understanding.

---

For detailed submission guidelines and additional project documentation, please check here:
[Submission Details](submission.md)

---
## Tech Stack

* **Our Core Building Blocks:** We built NutriSense using the fundamental languages of the web!
    * **HTML5:** This is like the skeleton of our website, giving it all its structure, from the main sections to the buttons and forms.
    * **CSS3:** This is where the magic happens to make it look good! We used it to style everything, make it look awesome on any phone or computer (that's "responsive design"!), and even added some cool animations.
    * **Vanilla JavaScript (ES6+):** This is the brain of our website! It handles all the interactive parts, making the search work, applying filters, and updating what you see on the screen without reloading the page. We didn't use any big frameworks, just pure JavaScript!

* **Our Data Source:**
    * **`foods.json`:** All the detailed nutrition information for Indian foods (like calories, protein, etc.) is stored right here in a simple JSON file. Our JavaScript reads this file directly in your browser, so everything loads super fast!

* **How It Works (Architecture):**
    * NutriSense is a "Single Page Application" (SPA) that runs **100% in your browser**. This means we don't need a complex server running in the background, which makes our website super fast and easy to deploy on platforms like GitHub Pages.

* **Key Features We Coded:**
    * We built a powerful search! You can type in food names, use sliders to find specific calorie or protein ranges, and even filter by different Indian food categories and cuisines.
    * Everything updates instantly as you search or filter, giving you real-time feedback.

* **Cool External Tools We Used:**
    * **Font Awesome:** Gave us cool icons to make the user interface more intuitive and visually appealing.
    * **Google Fonts:** Helped us pick nice, readable fonts to give our website a modern look.
    * **Formspree:** This was awesome for our "Contact Us" form – it lets users send messages without us needing to set up any complicated server-side code!

* **User Experience Focus:**
    * We paid special attention to making the website work well on all devices (phones, tablets, computers) and made sure it's easy for everyone to use, even with unique features like floating controls. We also designed some smart filtering rules in our JavaScript to keep the results super relevant to Indian cuisine.

---

### Staying Secure & Private

* And don't worry about your data! We don't store any of your personal info on a server; everything happens securely right in your browser. Our contact form uses **Formspree**, which helps keep out spam, and we haven't added any tracking stuff.

---

### Growing & Expanding (Scalability & Extensibility)

* This project is awesome for showing off what client-side web dev can do! It's great for handling a good amount of food data, and because our code is neatly organized (modular JS and CSS), it's actually pretty easy for us to add more foods to `foods.json` or even build new features later on.

---

### Quick Look at Our Tech

| Layer        | What We Used             | Why We Used It (Purpose)                  |
| :----------- | :----------------------- | :---------------------------------------- |
| **Markup** | HTML5                    | For the page layout and content structure |
| **Styling** | CSS3, Google Fonts       | For awesome visuals, animations, and fonts |
| **Logic** | JavaScript               | To make everything interactive, like search and filters |
| **Data** | `foods.json`             | Our local database for all the food info  |
| **Icons** | Font Awesome             | To add cool icons to the website          |
| **Forms** | Formspree                | To handle contact messages easily (no backend needed!) |
| **Hosting** | Static (GitHub Pages)    | To put our website online for everyone to see |

---

### Tools

The development and design of this project were powered by:

* **VS Code:** Our primary integrated development environment.
* **GitHub:** For version control, collaboration, and hosting (including GitHub Pages).
* **GitHub Copilot:** For AI-powered code suggestions.
* **Unsplash:** Provided the captivating hero section image.
* **Formspree:** For seamless form submissions.
* **Icons8:** Source for high-quality design icons.
* **Gemini 2.5 Flash:** For documentation and content ideas.


---

## Credits

This section acknowledges key contributions to the project.

### Contributors

We are grateful to the following individuals for their contributions:

* [@MukundXplore](https://github.com/MukundXplore)
* [@Ark0B](https://github.com/Ark0B)
* [@TheCodeCipher](https://github.com/TheCodeCipher)

**Source of Data:**

The raw data for the Exploratory Data Analysis (EDA) was sourced in JSON format from:
* [Indian-Food-Insights - EDA](https://github.com/BatthulaVinay/Indian-Food-Insights---Exploratory-Data-Analysis-EDA) - thanks to [@BatthulaVinay](https://github.com/BatthulaVinay)
Code example if applicable

---

## How to Use This Project Locally

Getting NutriSense running on your computer is super easy since it's a client-side project that works directly in your web browser!

### Step 1: Get the Project Files

* **Download as a ZIP (Easiest!)**: Go to the project's GitHub page (`https://github.com/neo-athelios/CodeClash2.0`), click the green **`Code`** button, then **`Download ZIP`**. Once downloaded, unzip the file (e.g., `CodeClash2.0-main.zip`) to create the project folder.

### Step 2: Launch in Your Web Browser!

* Open the newly unzipped project folder (e.g., `CodeClash2.0-main`).
* **Double-click** on the `index.html` file inside. It will automatically open in your default web browser.

### Step 3: Explore NutriSense!

That's it! Your NutriSense project is now running locally. You can use the search and filter options to explore different Indian food nutrition data.

---
### Our Takeaway (Conclusion)

Overall, building NutriSense taught us so much! It's a fully client-side website (everything runs in our browser!), uses external libraries easily, has a super interactive look, works on any device, and is simple to get online. We're really proud of this project!

---
## Team Progress

We've successfully built a **functional basic prototype** of NutriSense with complete core documentation. Additional updates and future enhancements can be tracked through our [issues history](https://github.com/Neo-Athelios/CodeClash2.0/issues) on GitHub.

---
*Last Updated: Tuesday, June 24, 2025, 2:45 AM IST*
