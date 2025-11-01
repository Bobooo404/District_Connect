// import React, { useState } from 'react';
// import { useApp } from '../contexts/AppContext';
// import { t } from '../lib/translations';
// import { Card, CardContent, CardHeader } from './ui/card';
// import { Badge } from './ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import { Progress } from './ui/progress';
// import { Building2, CheckCircle2, Clock, MapPin } from 'lucide-react';

// export function WorksScreen() {
//   const { language, selectedDistrict } = useApp();
//   const [activeTab, setActiveTab] = useState('ongoing');

//   const ongoingWorks = [
//     {
//       id: 'W001',
//       name: language === 'en' ? 'Rural Road Construction - Block A' : 'ग्रामीण सड़क निर्माण - ब्लॉक ए',
//       location: 'Gram Panchayat: Rampur',
//       startDate: '2024-09-15',
//       progress: 65,
//       workers: 45,
//       budget: '₹12,50,000',
//     },
//     {
//       id: 'W002',
//       name: language === 'en' ? 'Water Conservation Tank' : 'जल संरक्षण टैंक',
//       location: 'Gram Panchayat: Shivpur',
//       startDate: '2024-10-01',
//       progress: 40,
//       workers: 32,
//       budget: '₹8,75,000',
//     },
//     {
//       id: 'W003',
//       name: language === 'en' ? 'Plantation Drive - Zone 3' : 'वृक्षारोपण अभियान - क्षेत्र 3',
//       location: 'Gram Panchayat: Motipur',
//       startDate: '2024-10-20',
//       progress: 80,
//       workers: 28,
//       budget: '₹3,20,000',
//     },
//   ];

//   const completedWorks = [
//     {
//       id: 'W101',
//       name: language === 'en' ? 'Drainage System Installation' : 'जल निकासी प्रणाली स्थापना',
//       location: 'Gram Panchayat: Bahadurpur',
//       completedDate: '2024-09-30',
//       workers: 38,
//       budget: '₹9,25,000',
//     },
//     {
//       id: 'W102',
//       name: language === 'en' ? 'Community Center Construction' : 'सामुदायिक केंद्र निर्माण',
//       location: 'Gram Panchayat: Narayanpur',
//       completedDate: '2024-08-15',
//       workers: 52,
//       budget: '₹15,60,000',
//     },
//     {
//       id: 'W103',
//       name: language === 'en' ? 'Pond Deepening Project' : 'तालाब गहरीकरण परियोजना',
//       location: 'Gram Panchayat: Sultanpur',
//       completedDate: '2024-07-22',
//       workers: 41,
//       budget: '₹6,80,000',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] px-4 py-6 text-white shadow-lg">
//         <h2 className="mb-1">{t('works', language)}</h2>
//         <p className="text-blue-100 text-sm opacity-90">
//           {selectedDistrict} {language === 'en' ? 'District' : 'जिला'}
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-blue-600 rounded-lg">
//                   <Clock className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-blue-700">{language === 'en' ? 'Ongoing Works' : 'चालू कार्य'}</p>
//                   <p className="text-blue-900">{ongoingWorks.length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-green-600 rounded-lg">
//                   <CheckCircle2 className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-green-700">{language === 'en' ? 'Completed Works' : 'पूर्ण कार्य'}</p>
//                   <p className="text-green-900">{completedWorks.length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-purple-50 to-purple-100">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-purple-600 rounded-lg">
//                   <Building2 className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-purple-700">{language === 'en' ? 'Total Works' : 'कुल कार्य'}</p>
//                   <p className="text-purple-900">{ongoingWorks.length + completedWorks.length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <TabsTrigger value="ongoing">
//               {language === 'en' ? 'Ongoing Works' : 'चालू कार्य'} ({ongoingWorks.length})
//             </TabsTrigger>
//             <TabsTrigger value="completed">
//               {language === 'en' ? 'Completed Works' : 'पूर्ण कार्य'} ({completedWorks.length})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="ongoing" className="space-y-4">
//             {ongoingWorks.map((work) => (
//               <Card key={work.id} className="rounded-2xl shadow-md border-0">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Badge variant="outline" className="text-xs">
//                           {work.id}
//                         </Badge>
//                         <Badge className="text-xs bg-blue-600">
//                           {language === 'en' ? 'In Progress' : 'प्रगति में'}
//                         </Badge>
//                       </div>
//                       <h3 className="text-gray-900 mb-2">{work.name}</h3>
//                       <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
//                         <MapPin className="h-4 w-4" />
//                         {work.location}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">{language === 'en' ? 'Progress' : 'प्रगति'}</span>
//                       <span className="text-gray-900">{work.progress}%</span>
//                     </div>
//                     <Progress value={work.progress} className="h-2" />
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Start Date' : 'प्रारंभ तिथि'}
//                       </p>
//                       <p className="text-gray-900">
//                         {new Date(work.startDate).toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN')}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Workers' : 'कर्मचारी'}
//                       </p>
//                       <p className="text-gray-900">{work.workers}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Budget' : 'बजट'}
//                       </p>
//                       <p className="text-gray-900">{work.budget}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </TabsContent>

//           <TabsContent value="completed" className="space-y-4">
//             {completedWorks.map((work) => (
//               <Card key={work.id} className="rounded-2xl shadow-md border-0">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Badge variant="outline" className="text-xs">
//                           {work.id}
//                         </Badge>
//                         <Badge className="text-xs bg-green-600">
//                           {language === 'en' ? 'Completed' : 'पूर्ण'}
//                         </Badge>
//                       </div>
//                       <h3 className="text-gray-900 mb-2">{work.name}</h3>
//                       <div className="flex items-center gap-1 text-sm text-gray-600">
//                         <MapPin className="h-4 w-4" />
//                         {work.location}
//                       </div>
//                     </div>
//                     <CheckCircle2 className="h-8 w-8 text-green-600" />
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Completed On' : 'पूर्ण तिथि'}
//                       </p>
//                       <p className="text-gray-900">
//                         {new Date(work.completedDate).toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN')}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Workers' : 'कर्मचारी'}
//                       </p>
//                       <p className="text-gray-900">{work.workers}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-xs mb-1">
//                         {language === 'en' ? 'Budget' : 'बजट'}
//                       </p>
//                       <p className="text-gray-900">{work.budget}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
