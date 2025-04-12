import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CookieSettingsDialog } from './CookieSettingsDialog';
import { CookieConsentProps, ConsentState } from '../lib/types';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import { getCookie, setCookie } from '../lib/utils';

export const CookieConsent: React.FC<CookieConsentProps> = ({
  privacyPolicyUrl,
  language = 'en',
  onConsentChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const translations = language === 'hi' ? hiTranslations : enTranslations;

  useEffect(() => {
    const consent = getCookie('cookie-consent');
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookie('cookie-consent', JSON.stringify(consent), 365);
    setIsOpen(false);
    onConsentChange?.(consent);
  };

  const handleAcceptNecessary = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setCookie('cookie-consent', JSON.stringify(consent), 365);
    setIsOpen(false);
    onConsentChange?.(consent);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
      <h2 className="text-lg font-semibold">{translations.title}</h2>
      <p
        className="mt-2 text-sm text-gray-600 dark:text-gray-300"
        dangerouslySetInnerHTML={{
          __html: translations.description.replace(
            '{{privacyPolicyUrl}}',
            privacyPolicyUrl
          ),
        }}
      />
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Button onClick={handleAcceptAll}>{translations.acceptAll}</Button>
        <Button variant="outline" onClick={handleAcceptNecessary}>
          {translations.acceptNecessary}
        </Button>
        <Button variant="link" onClick={() => setShowSettings(true)}>
          {translations.customize}
        </Button>
      </div>
      <CookieSettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        onSave={(consent) => {
          setCookie('cookie-consent', JSON.stringify(consent), 365);
          setIsOpen(false);
          onConsentChange?.(consent);
        }}
        translations={translations}
        privacyPolicyUrl={privacyPolicyUrl}
      />
    </div>
  );
};
