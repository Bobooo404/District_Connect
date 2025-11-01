import React from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

export function ReportsScreen() {
  const { language, selectedDistrict } = useApp();

  const reports = [
    {
      id: 'monthly',
      icon: Calendar,
      title: language === 'en' ? 'Monthly Performance Report' : 'मासिक प्रदर्शन रिपोर्ट',
      description: language === 'en' 
        ? 'Detailed monthly breakdown of all MGNREGA activities' 
        : 'सभी मनरेगा गतिविधियों का विस्तृत मासिक विवरण',
      date: new Date().toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', { month: 'long', year: 'numeric' }),
      size: '2.4 MB',
    },
    {
      id: 'quarterly',
      icon: TrendingUp,
      title: language === 'en' ? 'Quarterly Analysis Report' : 'त्रैमासिक विश्लेषण रिपोर्ट',
      description: language === 'en'
        ? 'Comprehensive quarterly performance analysis with trends'
        : 'रुझानों के साथ व्यापक त्रैमासिक प्रदर्शन विश्लेषण',
      date: language === 'en' ? 'Q4 2024' : 'तिमाही 4 2024',
      size: '5.1 MB',
    },
    {
      id: 'annual',
      icon: FileText,
      title: language === 'en' ? 'Annual Progress Report' : 'वार्षिक प्रगति रिपोर्ट',
      description: language === 'en'
        ? 'Year-end comprehensive report with all key metrics'
        : 'सभी प्रमुख मेट्रिक्स के साथ वर्ष के अंत की व्यापक रिपोर्ट',
      date: '2024',
      size: '8.7 MB',
    },
    {
      id: 'works',
      icon: FileText,
      title: language === 'en' ? 'Works Completion Report' : 'कार्य पूर्णता रिपोर्ट',
      description: language === 'en'
        ? 'List of all completed and ongoing works with status'
        : 'स्थिति के साथ सभी पूर्ण और चालू कार्यों की सूची',
      date: language === 'en' ? 'Updated Today' : 'आज अपडेट किया गया',
      size: '3.2 MB',
    },
  ];

  const handleDownload = (reportId: string) => {
    // Mock download functionality
    console.log(`Downloading report: ${reportId}`);
    alert(language === 'en' 
      ? 'In a real application, this would download the PDF report.' 
      : 'वास्तविक एप्लिकेशन में, यह PDF रिपोर्ट डाउनलोड करेगा।');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] px-4 py-6 text-white shadow-lg">
        <h2 className="mb-1">{t('reports', language)}</h2>
        <p className="text-blue-100 text-sm opacity-90">
          {selectedDistrict} {language === 'en' ? 'District' : 'जिला'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="rounded-2xl shadow-md border-0 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-gray-800 mb-2">
                  {language === 'en'
                    ? 'Access official MGNREGA reports for your district. All reports are generated from verified government data sources.'
                    : 'अपने जिले के लिए आधिकारिक मनरेगा रिपोर्ट एक्सेस करें। सभी रिपोर्ट सत्यापित सरकारी डेटा स्रोतों से उत्पन्न होती हैं।'}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Reports are available in PDF format for download and sharing.'
                    : 'रिपोर्ट डाउनलोड और साझा करने के लिए PDF प्रारूप में उपलब्ध हैं।'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <report.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-gray-900 mb-1">{report.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload(report.id)}
                    className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] hover:from-[#0D47A1] hover:to-[#1976D2]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Download' : 'डाउनलोड'}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl shadow-md border-yellow-200 bg-yellow-50 mt-6">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-900">
              <span className="mr-2">⚠️</span>
              {language === 'en'
                ? 'These reports contain aggregated public data. For detailed grievance redressal or specific queries, please contact your local MGNREGA office.'
                : 'इन रिपोर्टों में एकत्रित सार्वजनिक डेटा होता है। विस्तृत शिकायत निवारण या विशिष्ट प्रश्नों के लिए, कृपया अपने स्थानीय मनरेगा कार्यालय से संपर्क करें।'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
