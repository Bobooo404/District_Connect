import React from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../lib/translations';
import { glossaryTerms } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Volume2 } from 'lucide-react';
import { speak, getLangCode } from '../lib/voiceAssist';

export function GlossaryScreen() {
  const { language, voiceEnabled } = useApp();

  const handleSpeak = (text: string) => {
    if (voiceEnabled) {
      speak(text, getLangCode(language));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] px-4 py-6 text-white shadow-lg">
        <h2 className="mb-1">{t('glossary', language)}</h2>
        <p className="text-blue-100 text-sm opacity-90">
          {language === 'hi' ? 'मनरेगा शब्दावली' : 'MGNREGA Terms'}
        </p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {glossaryTerms.map((term) => (
          <Card key={term.id} className="rounded-2xl shadow-md border-0">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{term.icon}</span>
                  <CardTitle className="text-blue-900">{term.term[language]}</CardTitle>
                </div>
                {voiceEnabled && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSpeak(`${term.term[language]}. ${term.definition[language]}`)}
                    className="hover:bg-blue-100"
                  >
                    <Volume2 className="h-5 w-5 text-blue-600" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 leading-relaxed">{term.definition[language]}</p>
              {voiceEnabled && (
                <p className="text-blue-600 text-xs mt-3 flex items-center gap-1">
                  <Volume2 className="h-3 w-3" />
                  {t('tapToHear', language)}
                </p>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="rounded-2xl shadow-md border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-blue-900">
              {language === 'hi'
                ? '💡 मनरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम) ग्रामीण परिवारों को प्रति वर्ष कम से कम 100 दिनों के रोजगार की गारंटी देता है।'
                : '💡 MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) guarantees at least 100 days of employment per year to rural households.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
