# Royal Flight Support - Corporate Website

This repository contains the source code for the Royal Flight Support corporate website. The application is designed to showcase luxury aviation services, including private charters, permits, fuel, and catering. It features a modern, responsive design with full internationalization support.

## Project Overview

The website is built using Next.js and TypeScript, focusing on performance, SEO, and a premium user experience. It implements a dark-themed aesthetic consistent with the luxury aviation industry standards.

### Key Features

*   **Internationalization (i18n):** Complete bilingual support (English and Spanish) with URL-based routing and instant language toggling.
*   **Responsive Design:** Fully adaptive layout that functions seamlessly across mobile devices, tablets, and desktop screens.
*   **Contact System:** Integrated contact form that processes submissions and sends email notifications via SMTP.
*   **Interactive Gallery:** Dynamic image gallery with hover effects and scroll animations.
*   **Performance:** Server-side rendering and static generation for optimal load times.

## Technology Stack

*   **Framework:** Next.js 14
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Internationalization:** next-i18next
*   **Email Services:** Nodemailer

## Getting Started

### Prerequisites

*   Node.js (Version 18 or higher recommended)
*   npm (Node Package Manager)

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory.
3.  Install the dependencies:

    ```bash
    npm install
    ```

### Configuration

Create a `.env.local` file in the root directory to configure the email service. You can use the provided example below:

```env
# Destination email address for contact form submissions
CONTACT_EMAIL=recipient@example.com

# SMTP Server Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

To build the application for production:

```bash
npm run build
npm start
```

## Project Structure

*   `public/`: Static assets (images) and translation files (`locales`).
*   `src/components/`: Reusable UI components (Header, Footer, ContactForm).
*   `src/pages/`: Application routes and views.
*   `src/styles/`: Global styles and Tailwind configuration.
*   `src/pages/api/`: Server-side API routes for handling email submissions.

## License

Proprietary software. All rights reserved by Royal Flight Support.
