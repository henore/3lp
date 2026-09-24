import type {Locale} from './locales';
type Benefit = readonly [title:string, description:string];
export const cbtiProBenefits:Record<Locale,readonly [Benefit,Benefit,Benefit]>={
en:[['Save time','Import sleep data from your smartwatch'],['Understand your sleep','Unlimited AI Daily Insights'],['See the bigger picture','Full history and long-term trends']],
ja:[['記録の手間を減らす','スマートウォッチから睡眠データを取り込み'],['自分の睡眠を理解する','AI Daily Insightを無制限に利用'],['長期的な変化を知る','全期間の履歴と長期的な傾向を確認']],
'zh-CN':[['节省时间','从智能手表导入睡眠数据'],['了解你的睡眠','无限使用AI每日洞察'],['纵览长期变化','完整历史记录与长期趋势']],
'zh-TW':[['節省時間','從智慧手錶匯入睡眠資料'],['了解你的睡眠','無限使用AI每日洞察'],['掌握長期變化','完整歷史記錄與長期趨勢']],
ko:[['시간 절약','스마트워치에서 수면 데이터 가져오기'],['나의 수면 이해하기','AI 데일리 인사이트 무제한 이용'],['더 넓게 살펴보기','전체 기록과 장기 추세 확인']],
de:[['Zeit sparen','Schlafdaten von Ihrer Smartwatch importieren'],['Ihren Schlaf verstehen','Unbegrenzte tägliche KI-Einblicke'],['Das Gesamtbild erkennen','Vollständiger Verlauf und langfristige Trends']],
fr:[['Gagnez du temps','Importez les données de sommeil de votre montre connectée'],['Comprenez votre sommeil','Analyses quotidiennes par IA illimitées'],['Prenez du recul','Historique complet et tendances à long terme']],
es:[['Ahorra tiempo','Importa datos de sueño de tu reloj inteligente'],['Comprende tu sueño','Análisis diarios con IA ilimitados'],['Obtén una visión más amplia','Historial completo y tendencias a largo plazo']],
it:[['Risparmia tempo','Importa i dati del sonno dal tuo smartwatch'],['Comprendi il tuo sonno','Approfondimenti giornalieri IA illimitati'],['Scopri il quadro completo','Cronologia completa e tendenze a lungo termine']],
'pt-BR':[['Economize tempo','Importe dados de sono do seu smartwatch'],['Entenda seu sono','Análises diárias com IA ilimitadas'],['Tenha uma visão mais ampla','Histórico completo e tendências de longo prazo']],
nl:[['Bespaar tijd','Importeer slaapgegevens van je smartwatch'],['Begrijp je slaap','Onbeperkte dagelijkse AI-inzichten'],['Zie het grotere geheel','Volledige geschiedenis en langetermijntrends']],
sv:[['Spara tid','Importera sömndata från din smartklocka'],['Förstå din sömn','Obegränsade dagliga AI-insikter'],['Se helhetsbilden','Fullständig historik och långsiktiga trender']],
pl:[['Oszczędzaj czas','Importuj dane snu ze smartwatcha'],['Zrozum swój sen','Nielimitowane codzienne analizy AI'],['Zobacz szerszy obraz','Pełna historia i długoterminowe trendy']],
ru:[['Экономьте время','Импортируйте данные сна со смарт-часов'],['Понимайте свой сон','Неограниченные ежедневные ИИ-анализы'],['Смотрите на общую картину','Полная история и долгосрочные тенденции']],
ar:[['وفّر الوقت','استورد بيانات النوم من ساعتك الذكية'],['افهم نومك','رؤى يومية غير محدودة بالذكاء الاصطناعي'],['شاهد الصورة الأشمل','السجل الكامل والاتجاهات طويلة المدى']],
hi:[['समय बचाएँ','अपनी स्मार्टवॉच से नींद का डेटा आयात करें'],['अपनी नींद को समझें','असीमित दैनिक AI इनसाइट्स'],['पूरी तस्वीर देखें','पूरा इतिहास और लंबे समय के रुझान']],
th:[['ประหยัดเวลา','นำเข้าข้อมูลการนอนจากสมาร์ตวอตช์ของคุณ'],['เข้าใจการนอนของคุณ','ข้อมูลเชิงลึกรายวันจาก AI แบบไม่จำกัด'],['มองเห็นภาพรวม','ประวัติทั้งหมดและแนวโน้มระยะยาว']],
vi:[['Tiết kiệm thời gian','Nhập dữ liệu giấc ngủ từ đồng hồ thông minh'],['Hiểu giấc ngủ của bạn','Nhận định hằng ngày từ AI không giới hạn'],['Nhìn rõ bức tranh tổng thể','Toàn bộ lịch sử và xu hướng dài hạn']],
id:[['Hemat waktu','Impor data tidur dari smartwatch Anda'],['Pahami tidur Anda','Wawasan harian AI tanpa batas'],['Lihat gambaran menyeluruh','Riwayat lengkap dan tren jangka panjang']],
tr:[['Zamandan tasarruf edin','Akıllı saatinizden uyku verilerini içe aktarın'],['Uykunuzu anlayın','Sınırsız günlük yapay zeka içgörüleri'],['Büyük resmi görün','Tam geçmiş ve uzun vadeli eğilimler']]
};
