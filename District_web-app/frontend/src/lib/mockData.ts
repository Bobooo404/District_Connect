import { DistrictData, StateAverage, GlossaryTerm } from '../types';

export const districts = [
  'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya',
  'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki',
  'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli',
  'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad',
  'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur',
  'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj',
  'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri',
  'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau',
  'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
  'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar',
  'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra',
  'Sultanpur', 'Unnao', 'Varanasi'
];

function generateTrends(): number[] {
  return Array.from({ length: 12 }, (_, i) => {
    const base = 100;
    const trend = Math.random() > 0.5 ? 1 : -1;
    return Math.floor(base + (Math.random() * 30 * trend) + (i * 2));
  });
}

export function getMockDistrictData(districtName: string): DistrictData {
  const baseHouseholds = Math.floor(Math.random() * 50000) + 30000;
  const basePersonDays = Math.floor(Math.random() * 500000) + 200000;
  const baseWage = Math.floor(Math.random() * 50) + 220;
  const baseWorks = Math.floor(Math.random() * 1000) + 500;

  return {
    districtId: districtName.toLowerCase().replace(/\s+/g, '-'),
    districtName,
    householdsWorked: baseHouseholds,
    personDays: basePersonDays,
    averageWage: baseWage,
    worksCompleted: baseWorks,
    trends: {
      householdsWorked: generateTrends().map(v => baseHouseholds * (v / 100)),
      personDays: generateTrends().map(v => basePersonDays * (v / 100)),
      averageWage: generateTrends().map(v => baseWage * (v / 100)),
      worksCompleted: generateTrends().map(v => baseWorks * (v / 100)),
    },
    lastUpdated: new Date().toISOString(),
  };
}

export const stateAverage: StateAverage = {
  householdsWorked: 42000,
  personDays: 380000,
  averageWage: 235,
  worksCompleted: 750,
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'job-card',
    term: {
      en: 'Job Card',
      hi: 'जॉब कार्ड',
      aw: 'जॉब कार्ड',
      bh: 'जॉब कार्ड',
    },
    definition: {
      en: 'An official document issued to households that allows them to apply for work under MGNREGA. Each card lists all adult members of the household.',
      hi: 'एक आधिकारिक दस्तावेज़ जो परिवारों को मनरेगा के तहत काम के लिए आवेदन करने की अनुमति देता है। प्रत्येक कार्ड में परिवार के सभी वयस्क सदस्यों की सूची होती है।',
      aw: 'एक सरकारी कागज जवन परिवार के लोगन का मनरेगा में काम मांगे खातिर मिलत बा।',
      bh: 'एगो सरकारी दस्तावेज़ जवन घर के लोगन के मनरेगा में काम मांगे के इजाज़त देला।',
    },
    icon: '📋',
  },
  {
    id: 'person-days',
    term: {
      en: 'Person-Days',
      hi: 'व्यक्ति-दिवस',
      aw: 'व्यक्ति-दिवस',
      bh: 'व्यक्ति-दिवस',
    },
    definition: {
      en: 'One person working for one day equals one person-day. It measures the total amount of employment provided under MGNREGA.',
      hi: 'एक व्यक्ति एक दिन काम करता है तो वह एक व्यक्ति-दिवस होता है। यह मनरेगा के तहत प्रदान किए गए कुल रोजगार को मापता है।',
      aw: 'एक आदमी एक दिन काम करे त एक व्यक्ति-दिवस होत बा। ई मनरेगा में कुल रोजगार नापत बा।',
      bh: 'एगो आदमी एक दिन काम करे त एगो व्यक्ति-दिवस होला। ई मनरेगा में कुल रोज़गार नापेला।',
    },
    icon: '👷',
  },
  {
    id: 'muster-roll',
    term: {
      en: 'Muster Roll',
      hi: 'मस्टर रोल',
      aw: 'मस्टर रोल',
      bh: 'मस्टर रोल',
    },
    definition: {
      en: 'An attendance register that records when workers come to work. Workers sign or give thumbprint to confirm their attendance.',
      hi: 'एक उपस्थिति रजिस्टर जो रिकॉर्ड करता है कि श्रमिक कब काम पर आते हैं। श्रमिक अपनी उपस्थिति की पुष्टि के लिए हस्ताक्षर या अंगूठे का निशान देते हैं।',
      aw: 'एक हाजिरी रजिस्टर जवन बतावत बा कि मजदूर कब काम पर आइल बा। मजदूर दस्तखत या अंगुठा लगावत बा।',
      bh: 'एगो हाज़िरी रजिस्टर जवन बतावेला कि मजूर कब काम पर आइल बा। मजूर दस्तखत या अंगुठा लगावेला।',
    },
    icon: '📝',
  },
  {
    id: 'fto',
    term: {
      en: 'FTO (Fund Transfer Order)',
      hi: 'एफटीओ (फंड ट्रांसफर ऑर्डर)',
      aw: 'एफटीओ (फंड ट्रांसफर ऑर्डर)',
      bh: 'एफटीओ (फंड ट्रांसफर ऑर्डर)',
    },
    definition: {
      en: 'An electronic payment instruction that transfers wages directly to workers\' bank accounts or post office accounts.',
      hi: 'एक इलेक्ट्रॉनिक भुगतान निर्देश जो सीधे श्रमिकों के बैंक खातों या डाकघर खातों में मजदूरी हस्तांतरित करता है।',
      aw: 'एक इलेक्ट्रॉनिक भुगतान जवन सीधे मजदूर के बैंक या पोस्ट ऑफिस खाता में पइसा भेजत बा।',
      bh: 'एगो इलेक्ट्रॉनिक भुगतान जवन सीधे मजूर के बैंक या पोस्ट ऑफिस खाता में पइसा भेजेला।',
    },
    icon: '💸',
  },
];
