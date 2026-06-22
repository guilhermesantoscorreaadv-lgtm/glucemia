@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --color-brand-green: #16a34a; /* Precise Bento theme green */
  --color-brand-green-hover: #15803d;
  --color-brand-green-dark: #14532d;
}

body {
  font-family: var(--font-sans);
  background-color: #F9FAFB; /* Off-white background */
  color: #000000;
  -webkit-font-smoothing: antialiased;
}

/* Bento-specific utilities */
.bento-card {
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  padding: 24px;
  transition: all 0.2s ease-in-out;
}

.bento-card-dark {
  background: #111827;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 24px;
  transition: all 0.2s ease-in-out;
}

.bento-card-green {
  background: #F0FDF4;
  border: 1px solid rgba(22, 163, 74, 0.25);
  border-radius: 24px;
  padding: 24px;
  transition: all 0.2s ease-in-out;
}

