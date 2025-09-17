// Mapbox utilities and validation

export const validateMapboxToken = (token: string): boolean => {
  // Basic validation for Mapbox token format
  if (!token) return false;
  
  // Mapbox tokens start with 'pk.' for public tokens
  if (!token.startsWith('pk.')) {
    console.warn('Mapbox token should start with "pk." for public tokens');
    return false;
  }
  
  // Basic length check (Mapbox tokens are typically quite long)
  if (token.length < 50) {
    console.warn('Mapbox token appears to be too short');
    return false;
  }
  
  return true;
};

export const getMapboxTokenStatus = () => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!token) {
    return {
      isValid: false,
      error: 'MISSING_TOKEN',
      message: 'Mapbox access token is not set in environment variables',
    };
  }
  
  if (!validateMapboxToken(token)) {
    return {
      isValid: false,
      error: 'INVALID_FORMAT',
      message: 'Mapbox access token format appears to be invalid',
    };
  }
  
  return {
    isValid: true,
    error: null,
    message: 'Mapbox token is properly configured',
  };
};

export const MAPBOX_SETUP_INSTRUCTIONS = {
  title: 'How to Set Up Mapbox Token',
  steps: [
    '1. Go to https://account.mapbox.com/',
    '2. Sign in or create a free account',
    '3. Go to "Access Tokens" section',
    '4. Create a new token or copy your default public token',
    '5. Make sure the token has these scopes: "styles:tiles", "fonts:read", "datasets:read"',
    '6. Add the token to your .env.local file as NEXT_PUBLIC_MAPBOX_TOKEN',
    '7. Restart your development server',
  ],
  note: 'Public tokens start with "pk." and are safe to use in client-side code',
};
