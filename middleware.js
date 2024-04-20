export { default } from 'next-auth/middleware';

// Path: next.config.mjs

export const config = {
  matcher: ['/apartments/add', '/profile/', '/apartments/saved', '/messages'],
};
