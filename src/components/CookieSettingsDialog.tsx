import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ConsentState, Translation } from '../lib/types';

interface CookieSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (consent: ConsentState) => void;
  translations: Translation;
  privacyPolicyUrl: string;
}

export const CookieSettingsDialog: React.FC<CookieSettingsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  translations,
  privacyPolicyUrl,
}) => {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const handleSave = () => {
    onSave(consent);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <Dialog.Title className="text-lg font-semibold">
            {translations.title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {translations.description.replace(
              '{{privacyPolicyUrl}}',
              privacyPolicyUrl
            )}
          </Dialog.Description>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="necessary" checked disabled />
              <Label htmlFor="necessary">{translations.necessaryCookies}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={(checked) =>
                  setConsent({ ...consent, analytics: !!checked })
                }
              />
              <Label htmlFor="analytics">{translations.analyticsCookies}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={consent.marketing}
                onCheckedChange={(checked) =>
                  setConsent({ ...consent, marketing: !!checked })
                }
              />
              <Label htmlFor="marketing">{translations.marketingCookies}</Label>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={handleSave}>{translations.saveSettings}</Button>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
          </div>
          <Dialog.Close className="absolute top-2 right-2">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
