import React from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Info, Target, Users, Shield, Phone, Mail, ExternalLink } from 'lucide-react';

export function AboutScreen() {
  const { language } = useApp();

  const features = [
    {
      icon: Target,
      title: language === 'en' ? 'Our Mission' : 'हमारा उद्देश्य',
      description: language === 'en'
        ? 'To provide transparent access to MGNREGA performance data and empower citizens with information about rural employment initiatives in their districts.'
        : 'मनरेगा प्रदर्शन डेटा तक पारदर्शी पहुंच प्रदान करना और नागरिकों को उनके जिलों में ग्रामीण रोजगार पहलों के बारे में जानकारी के साथ सशक्त बनाना।',
    },
    {
      icon: Users,
      title: language === 'en' ? 'For Citizens' : 'नागरिकों के लिए',
      description: language === 'en'
        ? 'Easy-to-understand dashboards, multilingual support, and voice assistance make MGNREGA data accessible to everyone, regardless of literacy level.'
        : 'समझने में आसान डैशबोर्ड, बहुभाषी समर्थन, और ध्वनि सहायता साक्षरता स्तर की परवाह किए बिना सभी के लिए मनरेगा डेटा सुलभ बनाती है।',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Data Integrity' : 'डेटा अखंडता',
      description: language === 'en'
        ? 'All data is sourced directly from official MGNREGA public data portals and government databases, ensuring accuracy and reliability.'
        : 'सभी डेटा सीधे आधिकारिक मनरेगा सार्वजनिक डेटा पोर्टल और सरकारी डेटाबेस से प्राप्त किया जाता है, जो सटीकता और विश्वसनीयता सुनिश्चित करता है।',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] px-4 py-6 text-white shadow-lg">
        <h2 className="mb-1">{t('about', language)}</h2>
        <p className="text-blue-100 text-sm opacity-90">
          {language === 'en' ? 'About DistrictConnect' : 'DistrictConnect के बारे में'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="rounded-2xl shadow-md border-0 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-3">
                  {language === 'en' ? 'About MGNREGA' : 'मनरेगा के बारे में'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {language === 'en'
                    ? 'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is an Indian labor law and social security measure that aims to guarantee the "right to work" and ensure livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.'
                    : 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जिसका उद्देश्य "काम का अधिकार" की गारंटी देना और ग्रामीण क्षेत्रों में आजीविका सुरक्षा सुनिश्चित करना है, प्रत्येक परिवार को एक वित्तीय वर्ष में कम से कम 100 दिनों का मजदूरी रोजगार प्रदान करके जिसके वयस्क सदस्य अकुशल मैनुअल काम करने के लिए स्वेच्छा से काम करते हैं।'}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Enacted in 2005, MGNREGA is one of the largest social security schemes in the world.'
                    : '2005 में अधिनियमित, मनरेगा दुनिया की सबसे बड़ी सामाजिक सुरक्षा योजनाओं में से एक है।'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="rounded-2xl shadow-md border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 mb-2">{feature.title}</CardTitle>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {language === 'en' ? 'Key Features' : 'मुख्य विशेषताएं'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Real-time district performance metrics and analytics'
                    : 'रियल-टाइम जिला प्रदर्शन मेट्रिक्स और विश्लेषण'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Compare your district with state averages'
                    : 'अपने जिले की राज्य औसत से तुलना करें'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Track ongoing and completed works in your area'
                    : 'अपने क्षेत्र में चल रहे और पूर्ण कार्यों को ट्रैक करें'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Download official reports and documentation'
                    : 'आधिकारिक रिपोर्ट और दस्तावेज़ डाउनलोड करें'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Multilingual support with voice assistance'
                    : 'ध्वनि सहायता के साथ बहुभाषी समर्थन'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">
                  {language === 'en'
                    ? 'Accessibility features including text size adjustment and high contrast mode'
                    : 'टेक्स्ट आकार समायोजन और उच्च कंट्रास्ट मोड सहित पहुंच सुविधाएं'}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {language === 'en' ? 'Contact & Support' : 'संपर्क और सहायता'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Helpline' : 'हेल्पलाइन'}
                </p>
                <p className="text-gray-900">1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Email' : 'ईमेल'}
                </p>
                <p className="text-gray-900">support@districtconnect.gov.in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Official MGNREGA Portal' : 'आधिकारिक मनरेगा पोर्टल'}
                </p>
                <a
                  href="https://nrega.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  nrega.nic.in
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
