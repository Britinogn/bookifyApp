# Bookify Application

Bookify is a modern event booking platform built with Nuxt 4, designed to allow users to seamlessly browse and book events.

## Features

- **User Authentication**: Secure Login and Signup functionality.
- **Event Browsing**: Browse events via interactive event cards.
- **Responsive Design**: Built with Tailwind CSS 4 for a mobile-first experience.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Language**: TypeScript
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Modules**: [Lucide Vue Next](https://lucide.dev/), [Axios](https://axios-http.com/)
- **Backend**: [Go](https://go.dev/)

## Project Structure

The project follows the standard Nuxt directory structure inside the `app` directory:

- `app/pages`: Application routes and views (e.g., `auth/login.vue`, `auth/signup.vue`).
- `app/components`: Reusable Vue components (e.g., `events/EventCard.vue`).
- `app/layouts`: Layout wrappers for pages.
- `app/stores`: Pinia state management stores.
- `app/assets`: Static assets like CSS and images.

## Setup & Development

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

Previews the production build locally:

```bash
npm run preview
```

## License

[MIT License](LICENSE)
