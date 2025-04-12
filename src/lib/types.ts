export interface CookieConsentProps {
  privacyPolicyUrl: string;
  language?: 'en' | 'hi';
  onConsentChange?: (consent: ConsentState) => void;
}

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface Translation {
  title: string;
  description: string;
  acceptAll: string;
  acceptNecessary: string;
  customize: string;
  saveSettings: string;
  privacyPolicy: string;
  necessaryCookies: string;
  analyticsCookies: string;
  marketingCookies: string;
}
