# Profolio - Your Professional Showcase

![Profolio Homepage](https://placehold.co/1200x630.png?text=Profolio%20Showcase)

**Profolio** is a modern, fully-responsive, and highly customizable personal portfolio website template built with Next.js, Tailwind CSS, and ShadCN UI. It's designed to help you showcase your work, skills, and experience in a clean, professional, and elegant manner. The standout feature of Profolio is its powerful, password-protected content management system that allows you to update almost every aspect of your site without touching a single line of code.

## ✨ Features

Profolio is packed with features designed to make managing your online presence as easy as possible.

### 🔑 Content Management System (CMS)

A secure admin dashboard located at `/admin` allows you to update your website's content dynamically.

*   **Password Protected**: Your content is safe behind a password-protected admin panel.
*   **Centralized Content File**: Update your entire site by editing a single Markdown file (`portfolio-template.md`).
*   **Navigation Control**: Edit, reorder, or hide navigation tabs.
*   **Resume/CV Uploads**: Directly upload your full and brief resumes in PDF format.
*   **Dynamic Content**: Edit your contact information, homepage hero text, "About Me" narrative, and more.
*   **Section Toggles**: Easily show or hide the "Testimonials" and "Featured Projects" sections on your homepage.
*   **Custom Branding**: Set your own logo and background (supports images and videos) via URLs.

### 🤖 AI-Powered Enhancements (Powered by Genkit)

Leverage the power of generative AI to enrich your portfolio.

*   **AI Core Competencies**: Automatically generate a list of core competencies based on your portfolio content. You can switch between AI-generated keywords and a manually curated list of skills.
*   **AI Alt Text Generation**: Automatically generate descriptive alt text for your project images to improve accessibility and SEO.

### 🎨 Design & UI

*   **Fully Responsive**: Looks great on all devices, from small phones (480p) to large 4K TVs.
*   **Modern Tech Stack**: Built with Next.js App Router, React, and TypeScript.
*   **Beautifully Styled**: Utilizes Tailwind CSS and pre-built components from ShadCN UI for a polished, professional look.
*   **Themeable**: Easily change the color scheme by editing CSS variables in `src/app/globals.css`.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root of your project. You can copy the structure from the example below.

    ```bash
    # Admin Panel Password
    CONTENT_UPDATE_PASSWORD="your_secure_password_here"

    # Google AI API Key (for AI features)
    GOOGLE_API_KEY="your_google_api_key_here"

    # Email (Contact Form) SMTP Settings - Optional
    SMTP_HOST="smtp.example.com"
    SMTP_PORT="587"
    SMTP_USER="your_smtp_user"
    SMTP_PASS="your_smtp_password"
    SMTP_FROM_EMAIL="noreply@example.com"
    SMTP_TO_EMAIL="your_inbox@example.com"
    ```
    *   `CONTENT_UPDATE_PASSWORD`: Set a secure password for accessing the admin panel.
    *   `GOOGLE_API_KEY`: Your Google AI API key (from Google AI Studio) is required for the Genkit AI features to work.
    *   `SMTP_*` variables: (Optional) If you want the contact form to send emails, you need to configure your SMTP server details.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

---

## ⚙️ How to Manage Your Content

Updating your website is simple with Profolio's built-in CMS.

1.  **Navigate to the Admin Panel**: Go to `http://localhost:9002/admin`.
2.  **Log In**: Enter the password you set in your `.env` file for `CONTENT_UPDATE_PASSWORD`.
3.  **Download the Template**: In the "Website Content" card, click **"Download Content Template"**. This gives you the latest `portfolio-template.md` file with all your current content and settings.
4.  **Edit the Template**: Open the downloaded file in a text editor.
    *   The settings at the top (frontmatter) control your logo, background, navigation, social links, and feature toggles.
    *   The sections below (like `# Skills` and `# Portfolio Items`) control the main content of your pages. Follow the YAML format for lists.
5.  **Upload Your Files**:
    *   **Content**: Upload your edited `portfolio-template.md` file in the "Website Content" card.
    *   **Resumes**: Upload your new `resume.pdf` or `brief-resume.pdf` in the "Resume / CV Files" card.
6.  **Publish**: Click the "Upload and Update Content" button. Your changes will be live instantly!

---

## 🌐 Hosting & Deployment

This Next.js app is optimized for deployment on various platforms.

*   **Firebase App Hosting**: The project includes an `apphosting.yaml` file, making it ready for deployment on Firebase App Hosting with minimal configuration.
*   **Vercel**: As the creators of Next.js, Vercel is an excellent platform for hosting. Simply connect your Git repository, and Vercel will handle the build and deployment process automatically.
*   **Other Platforms**: You can host your site on any platform that supports Node.js. Run `npm run build` to create a production-ready build in the `.next` folder.

**Important**: Before deploying, ensure you have set all the necessary environment variables (especially `CONTENT_UPDATE_PASSWORD` and `GOOGLE_API_KEY`) on your hosting provider's platform.

---

## ❓ Frequently Asked Questions (FAQ)

**Q: How do I change the admin password?**
**A:** Simply change the value of the `CONTENT_UPDATE_PASSWORD` variable in your `.env` file (for local development) or in your hosting provider's environment variable settings (for production).

**Q: The AI features are not working. Why?**
**A:** The AI features require a valid `GOOGLE_API_KEY` from Google AI Studio. Make sure you have added it to your `.env` file or your production environment variables.

**Q: Can I change the website's colors?**
**A:** Yes! The site's color scheme is controlled by HSL CSS variables in `src/app/globals.css`. You can edit the `--primary`, `--secondary`, `--background`, and other variables to match your personal brand.

**Q: Where are my uploaded resumes stored?**
**A:** When you upload resume PDFs through the admin panel, they are saved to the `public/` directory of your project (e.g., `public/resume.pdf`). These files are then publicly accessible at `your-site.com/resume.pdf`.

---

Built with ❤️ for professionals who love to build.
