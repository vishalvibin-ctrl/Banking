// Complete UAE Banks Database — sourced from CBUAE Register (June 2025) + bank filings
// Categories: national_conventional, national_islamic, foreign_conventional, foreign_islamic, digital

export const ALL_BANKS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL BANKS — CONVENTIONAL
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"enbd", name:"Emirates NBD", color:"#0066B3", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1963, profit2025:24.0, profit2024:23.0, totalAssets:1086, yoyGrowth:4, roe:21.0, featured:true, hasProducts:true },
  { id:"fab", name:"First Abu Dhabi Bank", color:"#003B5C", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1968, profit2025:21.1, profit2024:17.0, totalAssets:1200, yoyGrowth:24, roe:17.5, featured:true, hasProducts:true },
  { id:"adcb", name:"ADCB", color:"#D4145A", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1985, profit2025:11.4, profit2024:9.4, totalAssets:774, yoyGrowth:22, roe:18.2, featured:true, hasProducts:true },
  { id:"mashreq", name:"Mashreq", color:"#E8442A", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1967, profit2025:7.0, profit2024:8.8, totalAssets:335, yoyGrowth:-20, roe:20.0, featured:true, hasProducts:true },
  { id:"cbd", name:"Commercial Bank of Dubai", color:"#1C4587", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1969, profit2025:2.8, profit2024:2.5, totalAssets:120, yoyGrowth:12, roe:22.0, featured:true, hasProducts:true },
  { id:"rak", name:"RAKBANK", color:"#E31837", type:"Conventional", category:"national", hq:"Ras Al Khaimah", exchange:"ADX", est:1976, profit2025:2.6, profit2024:2.1, totalAssets:105, yoyGrowth:26, roe:22.1, featured:true, hasProducts:true },
  { id:"nbf", name:"National Bank of Fujairah", color:"#00695C", type:"Conventional", category:"national", hq:"Fujairah", exchange:"ADX", est:1984, profit2025:1.2, profit2024:0.85, totalAssets:65, yoyGrowth:42, roe:14.0, featured:true, hasProducts:false },
  { id:"bos", name:"Bank of Sharjah", color:"#2E7D32", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1973, profit2025:0.73, profit2024:0.39, totalAssets:40, yoyGrowth:89, roe:10.0, featured:true, hasProducts:false },
  { id:"cbi", name:"Commercial Bank International", color:"#5C6BC0", type:"Conventional", category:"national", hq:"Dubai", exchange:"ADX", est:1991, profit2025:0.30, profit2024:0.21, totalAssets:22, yoyGrowth:40, roe:12.0, featured:true, hasProducts:false },
  { id:"uab", name:"United Arab Bank", color:"#6D4C41", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:0.42, profit2024:0.28, totalAssets:26, yoyGrowth:49, roe:15.6, featured:true, hasProducts:false },
  { id:"investbank", name:"InvestBank", color:"#546E7A", type:"Conventional", category:"national", hq:"Sharjah", exchange:"Private", est:1975, profit2025:0.12, profit2024:0.10, totalAssets:12, yoyGrowth:20, roe:0, featured:true, hasProducts:false, note:"Est." },
  { id:"nbq", name:"National Bank of Umm Al Qaiwain", color:"#795548", type:"Conventional", category:"national", hq:"Umm Al Quwain", exchange:"ADX", est:1982, profit2025:0.62, profit2024:0.53, totalAssets:23, yoyGrowth:17, roe:10.0, featured:true, hasProducts:false },
  { id:"abit", name:"Arab Bank for Inv. & Foreign Trade", color:"#37474F", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0.10, profit2024:0.08, totalAssets:8, yoyGrowth:25, roe:0, featured:true, hasProducts:false, note:"Est." },
  { id:"eib", name:"Emirates Investment Bank", color:"#455A64", type:"Conventional", category:"national", hq:"Dubai", exchange:"Private", est:1976, profit2025:0.05, profit2024:0.04, totalAssets:4, yoyGrowth:25, roe:0, featured:true, hasProducts:false, note:"Est." },

  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL BANKS — ISLAMIC
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"dib", name:"Dubai Islamic Bank", color:"#006838", type:"Islamic", category:"national", hq:"Dubai", exchange:"DFM", est:1975, profit2025:7.8, profit2024:7.2, totalAssets:416, yoyGrowth:8, roe:21.0, featured:true, hasProducts:true },
  { id:"adib", name:"Abu Dhabi Islamic Bank", color:"#7B2D8E", type:"Islamic", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1997, profit2025:7.1, profit2024:6.1, totalAssets:281, yoyGrowth:16, roe:29.0, featured:true, hasProducts:true },
  { id:"ei", name:"Emirates Islamic", color:"#00838F", type:"Islamic", category:"national", hq:"Dubai", exchange:"ENBD subsidiary", est:1976, profit2025:3.4, profit2024:2.9, totalAssets:100, yoyGrowth:17, roe:22.0, featured:true, hasProducts:false },
  { id:"sib", name:"Sharjah Islamic Bank", color:"#4E342E", type:"Islamic", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:1.32, profit2024:1.05, totalAssets:90, yoyGrowth:26, roe:17.0, featured:true, hasProducts:false },
  { id:"ajman", name:"Ajman Bank", color:"#C75B12", type:"Islamic", category:"national", hq:"Ajman", exchange:"DFM", est:2008, profit2025:0.50, profit2024:0.40, totalAssets:32.9, yoyGrowth:25, roe:15.6, featured:true, hasProducts:true },
  { id:"alhilal", name:"Al Hilal Bank", color:"#8B6914", type:"Islamic", category:"national", hq:"Abu Dhabi", exchange:"ADCB subsidiary", est:2007, profit2025:-0.12, profit2024:-0.12, totalAssets:13.6, yoyGrowth:0, roe:0, featured:true, hasProducts:true, note:"Loss-making" },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIGITAL BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"wio", name:"Wio Bank", color:"#FF6B00", type:"Digital", category:"digital", hq:"Abu Dhabi", exchange:"Private", est:2022, profit2025:0.62, profit2024:0.40, totalAssets:61, yoyGrowth:57, roe:0, featured:true, hasProducts:false },
  { id:"zand", name:"Zand Bank", color:"#FF4081", type:"Digital", category:"digital", hq:"Dubai", exchange:"Private", est:2022, profit2025:0, profit2024:0, totalAssets:5, yoyGrowth:0, roe:0, featured:true, hasProducts:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOREIGN BANKS — RETAIL (operating branches in UAE)
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"hsbc", name:"HSBC Middle East", color:"#DB0011", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"LSE: HSBA", est:1946, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"sc", name:"Standard Chartered", color:"#0072AA", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"LSE: STAN", est:1958, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"citi", name:"Citibank", color:"#003B70", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"NYSE: C", est:1964, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"hbl", name:"Habib Bank Ltd.", color:"#006341", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"PSX: HBL", est:1967, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"ubl", name:"United Bank Ltd.", color:"#1A237E", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"PSX: UBL", est:1967, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"bob", name:"Bank of Baroda", color:"#F15A29", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"NSE: BANKBARODA", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"habibag", name:"Habib Bank AG Zurich", color:"#1B5E20", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"bnp", name:"BNP Paribas", color:"#00965E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"Euronext: BNP", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"arab", name:"Arab Bank", color:"#003366", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"ASE: ARBK", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"banquemisr", name:"Banque Misr", color:"#B71C1C", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"State-owned", est:1972, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"aahli_kw", name:"Al Ahli Bank of Kuwait", color:"#0D47A1", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Boursa Kuwait", est:1969, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"doha", name:"Doha Bank", color:"#880E4F", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"QSE", est:2007, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"snb", name:"Saudi National Bank", color:"#004D40", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Tadawul: SNB", est:2007, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"nbk", name:"National Bank of Kuwait", color:"#1565C0", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Boursa Kuwait", est:2008, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"creditag", name:"Credit Agricole", color:"#009688", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Euronext: ACA", est:1975, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"aaic", name:"Arab African International Bank", color:"#E65100", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1970, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"nbo", name:"National Bank of Oman", color:"#33691E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"MSX: NBOB", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"nbb", name:"National Bank of Bahrain", color:"#AD1457", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"BSB: NBB", est:1982, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"rafidain", name:"Rafidain Bank", color:"#4A148C", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"State-owned", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"janata", name:"Janata Bank", color:"#1A237E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"State-owned", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"banorient", name:"Banque Banorient France", color:"#263238", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"khaliji", name:"Al Khaliji (France)", color:"#827717", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"QSE", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"saderat", name:"Bank Saderat Iran", color:"#BF360C", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"TSE", est:1968, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"melli", name:"Bank Melli Iran", color:"#E64A19", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"TSE", est:1969, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"elnilein", name:"El Nilein Bank", color:"#558B2F", type:"Islamic", category:"foreign", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },

  // FOREIGN BANKS — WHOLESALE
  { id:"icbc", name:"ICBC (China)", color:"#C62828", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"HKEX / SSE", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"deutsche", name:"Deutsche Bank", color:"#0018A8", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"FWB: DBK", est:1968, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"barclays", name:"Barclays", color:"#00AEEF", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"LSE: BARC", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"boc", name:"Bank of China", color:"#C41230", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"HKEX: 3988", est:2012, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"gib", name:"Gulf International Bank", color:"#0277BD", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"intesa", name:"Intesa Sanpaolo", color:"#1B5E20", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"BIT: ISP", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"abc", name:"Agricultural Bank of China", color:"#D32F2F", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"HKEX / SSE", est:2014, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"natwest", name:"NatWest Markets", color:"#5C2D91", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"LSE: NWG", est:1978, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"hana", name:"KEB Hana Bank", color:"#00C853", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"KRX", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"amex", name:"American Express", color:"#006FCF", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"NYSE: AXP", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"mcb", name:"MCB Bank", color:"#0D47A1", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"PSX: MCB", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"alfalah", name:"Bank Alfalah", color:"#1B5E20", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"PSX: BAFL", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
  { id:"bok", name:"BOK International Bank", color:"#4E342E", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"Private", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, featured:false, hasProducts:false },
];

export const PRODUCTS = {
  savings: {
    label: "Savings", icon: "🏦",
    fields: ["Min Balance", "Rate", "Monthly Fee", "Transfers", "App Rating"],
    data: {
      adcb: ["AED 3K", "Up to 4.25%", "Free", "Unlimited", "4.5★"],
      enbd: ["AED 3K", "Up to 4.00%", "Free", "Unlimited", "4.6★"],
      fab: ["AED 5K", "Up to 3.75%", "Free", "10/mo", "4.3★"],
      dib: ["AED 3K", "Up to 3.50%*", "Free", "Unlimited", "4.4★"],
      mashreq: ["AED 1K", "Up to 4.10%", "Free", "Unlimited", "4.5★"],
      adib: ["AED 3K", "Up to 3.40%*", "Free", "Unlimited", "4.3★"],
      rak: ["AED 1K", "Up to 4.00%", "Free", "Unlimited", "4.2★"],
      cbd: ["AED 5K", "Up to 3.50%", "Free", "10/mo", "4.0★"],
      alhilal: ["AED 3K", "Up to 3.25%*", "Free", "15/mo", "4.1★"],
      ajman: ["AED 3K", "Up to 3.00%*", "Free", "Unlimited", "3.9★"],
    },
  },
  cards: {
    label: "Credit Cards", icon: "💳",
    fields: ["Top Card", "Annual Fee", "Cashback/Rewards", "Lounge", "Min Salary"],
    data: {
      adcb: ["TouchPoints Infinite", "AED 750", "Up to 5%", "Unlimited", "AED 15K"],
      enbd: ["Beyond Infinite", "AED 1,500", "3x Skywards", "Unlimited", "AED 25K"],
      fab: ["Rewards World Elite", "AED 800", "Up to 3 pts/AED", "6/yr", "AED 15K"],
      dib: ["Prime Infinite", "Free for life*", "Up to 5%", "Unlimited", "AED 15K"],
      mashreq: ["Solitaire World", "Free 1st yr", "Up to 7%", "Unlimited", "AED 20K"],
      adib: ["Visa Infinite", "AED 600", "Up to 5%", "Unlimited", "AED 15K"],
      rak: ["World Elite", "AED 500", "Up to 5%", "4/yr", "AED 15K"],
      cbd: ["World Mastercard", "AED 600", "Up to 3%", "2/yr", "AED 12K"],
      alhilal: ["Visa Infinite", "AED 500", "Up to 4%", "4/yr", "AED 12K"],
      ajman: ["Visa Platinum", "AED 350", "Up to 2%", "2/yr", "AED 8K"],
    },
  },
  loans: {
    label: "Personal Loans", icon: "📋",
    fields: ["Rate (Flat)", "Max Tenure", "Max Amount", "Processing", "Min Salary"],
    data: {
      adcb: ["From 4.49%", "48 mo", "AED 3M", "1.05%", "AED 8K"],
      enbd: ["From 4.99%", "48 mo", "AED 4M", "1.0%", "AED 5K"],
      fab: ["From 4.75%", "48 mo", "AED 3M", "1.0%", "AED 8K"],
      dib: ["From 4.49%*", "48 mo", "AED 3M", "1.05%", "AED 5K"],
      mashreq: ["From 4.50%", "48 mo", "AED 2.5M", "1.0%", "AED 5K"],
      adib: ["From 4.50%*", "48 mo", "AED 2.5M", "1.05%", "AED 5K"],
      rak: ["From 4.99%", "48 mo", "AED 2.5M", "1.0%", "AED 7.5K"],
      cbd: ["From 5.25%", "48 mo", "AED 2M", "1.0%", "AED 7K"],
      alhilal: ["From 4.75%*", "48 mo", "AED 2M", "1.05%", "AED 5K"],
      ajman: ["From 5.25%*", "48 mo", "AED 1.5M", "1.0%", "AED 5K"],
    },
  },
  auto: {
    label: "Auto Finance", icon: "🚗",
    fields: ["Rate (Flat)", "Max Tenure", "Down Payment", "Max LTV", "Insurance"],
    data: {
      adcb: ["From 2.49%", "60 mo", "From 0%", "90%", "Comprehensive"],
      enbd: ["From 2.49%", "60 mo", "From 0%", "85%", "Comprehensive"],
      fab: ["From 2.75%", "60 mo", "From 10%", "85%", "Comprehensive"],
      dib: ["From 2.49%*", "60 mo", "From 0%", "90%", "Comprehensive"],
      mashreq: ["From 2.99%", "60 mo", "From 10%", "85%", "Comprehensive"],
      adib: ["From 2.75%*", "60 mo", "From 0%", "85%", "Comprehensive"],
      rak: ["From 2.99%", "60 mo", "From 10%", "80%", "Comprehensive"],
      cbd: ["From 3.25%", "60 mo", "From 15%", "80%", "Comprehensive"],
      alhilal: ["From 2.75%*", "60 mo", "From 0%", "85%", "Comprehensive"],
      ajman: ["From 3.25%*", "60 mo", "From 10%", "80%", "Comprehensive"],
    },
  },
};

export const CATEGORY_LABELS = {
  national: "National Bank",
  digital: "Digital Bank",
  foreign: "Foreign Bank (Retail)",
  foreign_wholesale: "Foreign Bank (Wholesale)",
};

export const CATEGORY_FILTERS = [
  { key: "all", label: "All Banks" },
  { key: "national", label: "National" },
  { key: "foreign", label: "Foreign (Retail)" },
  { key: "foreign_wholesale", label: "Foreign (Wholesale)" },
  { key: "digital", label: "Digital" },
  { key: "islamic", label: "Islamic" },
  { key: "conventional", label: "Conventional" },
];

export const fmtProfit = (v) => {
  if (v === 0) return "—";
  if (v < 0) { const abs = Math.abs(v); return abs >= 1 ? `(AED ${abs.toFixed(1)}B)` : `(AED ${(abs * 1000).toFixed(0)}M)`; }
  return v >= 1 ? `AED ${v.toFixed(1)}B` : `AED ${(v * 1000).toFixed(0)}M`;
};
