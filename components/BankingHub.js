import { useState, useEffect } from "react";

// Complete UAE Banks Database — sourced from CBUAE Register (June 2025) + bank filings
// Categories: national_conventional, national_islamic, foreign_conventional, foreign_islamic, digital

const ALL_BANKS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL BANKS — CONVENTIONAL
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"enbd", name:"Emirates NBD", color:"#0066B3", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1963, profit2025:24.0, profit2024:23.0, totalAssets:1086, yoyGrowth:4, roe:21.0, featured:true, hasProducts:true },
  { id:"fab", name:"First Abu Dhabi Bank", color:"#003B5C", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1968, profit2025:21.1, profit2024:17.0, totalAssets:1200, yoyGrowth:24, roe:17.5, featured:true, hasProducts:true },
  { id:"adcb", name:"ADCB", color:"#D4145A", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1985, profit2025:11.4, profit2024:9.4, totalAssets:774, yoyGrowth:22, roe:18.2, featured:true, hasProducts:true },
  { id:"mashreq", name:"Mashreq", color:"#E8442A", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1967, profit2025:7.0, profit2024:8.8, totalAssets:335, yoyGrowth:-20, roe:20.0, featured:true, hasProducts:true },
  { id:"cbd", name:"Commercial Bank of Dubai", color:"#1C4587", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1969, profit2025:2.8, profit2024:2.5, totalAssets:120, yoyGrowth:12, roe:22.0, featured:true, hasProducts:true },
  { id:"rak", name:"RAKBANK", color:"#E31837", type:"Conventional", category:"national", hq:"Ras Al Khaimah", exchange:"ADX", est:1976, profit2025:2.6, profit2024:2.1, totalAssets:105, yoyGrowth:26, roe:22.1, featured:true, hasProducts:true },
  { id:"nbf", name:"National Bank of Fujairah", color:"#00695C", type:"Conventional", category:"national", hq:"Fujairah", exchange:"ADX", est:1984, profit2025:1.2, profit2024:1.0, totalAssets:65, yoyGrowth:20, roe:14.0, featured:false, hasProducts:false },
  { id:"bos", name:"Bank of Sharjah", color:"#2E7D32", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1973, profit2025:0.73, profit2024:0.39, totalAssets:40, yoyGrowth:89, roe:10.0, featured:false, hasProducts:false },
  { id:"cbi", name:"Commercial Bank International", color:"#5C6BC0", type:"Conventional", category:"national", hq:"Dubai", exchange:"ADX", est:1991, profit2025:0.30, profit2024:0.21, totalAssets:22, yoyGrowth:40, roe:12.0, featured:false, hasProducts:false },
  { id:"uab", name:"United Arab Bank", color:"#6D4C41", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:0.28, profit2024:0.22, totalAssets:18, yoyGrowth:27, roe:8.0, featured:false, hasProducts:false },
  { id:"investbank", name:"InvestBank", color:"#546E7A", type:"Conventional", category:"national", hq:"Sharjah", exchange:"Private", est:1975, profit2025:0.12, profit2024:0.10, totalAssets:12, yoyGrowth:20, roe:6.0, featured:false, hasProducts:false },
  { id:"nbq", name:"National Bank of Umm Al Qaiwain", color:"#795548", type:"Conventional", category:"national", hq:"Umm Al Quwain", exchange:"ADX", est:1982, profit2025:0.18, profit2024:0.15, totalAssets:14, yoyGrowth:20, roe:7.0, featured:false, hasProducts:false },
  { id:"abit", name:"Arab Bank for Inv. & Foreign Trade", color:"#37474F", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0.10, profit2024:0.08, totalAssets:8, yoyGrowth:25, roe:0, featured:false, hasProducts:false },
  { id:"eib", name:"Emirates Investment Bank", color:"#455A64", type:"Conventional", category:"national", hq:"Dubai", exchange:"Private", est:1976, profit2025:0.05, profit2024:0.04, totalAssets:4, yoyGrowth:25, roe:0, featured:false, hasProducts:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL BANKS — ISLAMIC
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"dib", name:"Dubai Islamic Bank", color:"#006838", type:"Islamic", category:"national", hq:"Dubai", exchange:"DFM", est:1975, profit2025:7.8, profit2024:7.2, totalAssets:416, yoyGrowth:8, roe:21.0, featured:true, hasProducts:true },
  { id:"adib", name:"Abu Dhabi Islamic Bank", color:"#7B2D8E", type:"Islamic", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1997, profit2025:7.1, profit2024:6.1, totalAssets:281, yoyGrowth:16, roe:29.0, featured:true, hasProducts:true },
  { id:"ei", name:"Emirates Islamic", color:"#00838F", type:"Islamic", category:"national", hq:"Dubai", exchange:"ENBD subsidiary", est:1976, profit2025:3.4, profit2024:2.9, totalAssets:100, yoyGrowth:17, roe:22.0, featured:false, hasProducts:false },
  { id:"sib", name:"Sharjah Islamic Bank", color:"#4E342E", type:"Islamic", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:0.85, profit2024:0.72, totalAssets:55, yoyGrowth:18, roe:12.0, featured:false, hasProducts:false },
  { id:"ajman", name:"Ajman Bank", color:"#C75B12", type:"Islamic", category:"national", hq:"Ajman", exchange:"DFM", est:2008, profit2025:0.50, profit2024:0.40, totalAssets:32.9, yoyGrowth:25, roe:15.6, featured:true, hasProducts:true },
  { id:"alhilal", name:"Al Hilal Bank", color:"#8B6914", type:"Islamic", category:"national", hq:"Abu Dhabi", exchange:"ADCB subsidiary", est:2007, profit2025:0.15, profit2024:0.13, totalAssets:45, yoyGrowth:15, roe:0, featured:true, hasProducts:true },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIGITAL BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"wio", name:"Wio Bank", color:"#FF6B00", type:"Digital", category:"digital", hq:"Abu Dhabi", exchange:"Private", est:2022, profit2025:0.62, profit2024:0.40, totalAssets:61, yoyGrowth:57, roe:0, featured:false, hasProducts:false },
  { id:"zand", name:"Zand Bank", color:"#FF4081", type:"Digital", category:"digital", hq:"Dubai", exchange:"Private", est:2022, profit2025:0.0, profit2024:0.0, totalAssets:5, yoyGrowth:0, roe:0, featured:false, hasProducts:false },

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

const PRODUCTS = {
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

const CATEGORY_LABELS = {
  national: "National Bank",
  digital: "Digital Bank",
  foreign: "Foreign Bank (Retail)",
  foreign_wholesale: "Foreign Bank (Wholesale)",
};

const CATEGORY_FILTERS = [
  { key: "all", label: "All Banks" },
  { key: "national", label: "National" },
  { key: "foreign", label: "Foreign (Retail)" },
  { key: "foreign_wholesale", label: "Foreign (Wholesale)" },
  { key: "digital", label: "Digital" },
  { key: "islamic", label: "Islamic" },
  { key: "conventional", label: "Conventional" },
];

const fmtProfit = (v) => {
  if (v <= 0) return "—";
  return v >= 1 ? `AED ${v.toFixed(1)}B` : `AED ${(v * 1000).toFixed(0)}M`;
};


const Badge = ({ bank, size = 32 }) => (
  <div style={{ width:size, height:size, borderRadius:'50%', background:bank.color, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:size*0.28, color:'#fff', boxShadow:`0 2px 8px ${bank.color}33` }}>
    {bank.name.replace(/Bank of |Bank|Commercial /g,'').trim().split(' ')[0].slice(0,3).toUpperCase()}
  </div>
)

function AddBankDrawer({ visible, activeBankIds, onToggle, onClose }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const available = ALL_BANKS.filter(b => {
    const mQ = b.name.toLowerCase().includes(q.toLowerCase()) || b.type.toLowerCase().includes(q.toLowerCase()) || b.hq.toLowerCase().includes(q.toLowerCase()) || b.exchange.toLowerCase().includes(q.toLowerCase())
    const mF = filter === 'all' || (filter === 'national' && b.category === 'national') || (filter === 'foreign' && b.category === 'foreign') || (filter === 'foreign_wholesale' && b.category === 'foreign_wholesale') || (filter === 'digital' && b.category === 'digital') || (filter === 'islamic' && b.type === 'Islamic') || (filter === 'conventional' && b.type === 'Conventional')
    return mQ && mF
  })
  if (!visible) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div style={{ width:'100%', maxWidth:520, maxHeight:'85vh', background:'#111827', borderRadius:'20px 20px 0 0', padding:'18px 16px', display:'flex', flexDirection:'column', animation:'slideUp 0.3s ease' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:'#2A3448', margin:'0 auto 14px' }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:17, fontWeight:700, color:'#F0C850' }}>All UAE Banks ({ALL_BANKS.length})</h3>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:'none', cursor:'pointer', background:'rgba(255,255,255,0.06)', color:'#8A96A8', fontSize:15, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>&#x2715;</button>
        </div>
        <div style={{ position:'relative', marginBottom:10 }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#4A5568' }}>&#x1F50D;</span>
          <input type="text" placeholder="Search by name, type, HQ, exchange..." value={q} onChange={e=>setQ(e.target.value)} autoFocus style={{ width:'100%', padding:'10px 12px 10px 34px', borderRadius:9, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.03)', fontFamily:"'Outfit',sans-serif", fontSize:12.5, color:'#E0E6ED', outline:'none' }} />
        </div>
        <div style={{ display:'flex', gap:4, marginBottom:12, overflowX:'auto', flexWrap:'nowrap' }}>
          {CATEGORY_FILTERS.map(f => (
            <button key={f.key} onClick={()=>setFilter(f.key)} style={{ padding:'5px 10px', borderRadius:6, border:'none', cursor:'pointer', whiteSpace:'nowrap', background:filter===f.key?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)', color:filter===f.key?'#F0C850':'#5A6878', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>{f.label}</button>
          ))}
        </div>
        <div style={{ fontSize:10.5, color:'#3A4558', marginBottom:8 }}>{activeBankIds.length} active &middot; {available.length} showing</div>
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          {available.map(bank => {
            const active = activeBankIds.includes(bank.id)
            return (
              <div key={bank.id} onClick={()=>onToggle(bank.id)} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:8, cursor:'pointer', transition:'all 0.2s', background:active?`${bank.color}12`:'rgba(255,255,255,0.012)', border:active?`1px solid ${bank.color}40`:'1px solid rgba(255,255,255,0.025)' }}>
                <Badge bank={bank} size={26} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#E0E6ED' }}>{bank.name}</div>
                  <div style={{ fontSize:10, color:'#4A5568' }}>{bank.type} &middot; {bank.hq} &middot; {bank.exchange} {bank.profit2025 > 0 ? ` · ${fmtProfit(bank.profit2025)}` : ''}</div>
                </div>
                <div style={{ width:22, height:22, borderRadius:5, background:active?bank.color:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', color:active?'#fff':'#3A4558', fontSize:12, fontWeight:700, transition:'all 0.2s' }}>{active?'\u2713':'+'}</div>
              </div>
            )
          })}
          {available.length===0 && <div style={{ textAlign:'center', padding:24, color:'#3A4558', fontSize:12 }}>No banks found for: {q}</div>}
        </div>
      </div>
    </div>
  )
}

function CompareTab({ activeBankIds, onOpenDrawer }) {
  const [cat, setCat] = useState('savings')
  const [selected, setSelected] = useState(['adcb','enbd','dib','alhilal','ajman'])
  const [showTable, setShowTable] = useState(false)
  const prod = PRODUCTS[cat]
  const banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && prod.data[b.id])
  const toggle = id => setSelected(p => p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const selBanks = banks.filter(b => selected.includes(b.id))

  return (
    <div>
      <div style={{ display:'flex', gap:5, overflowX:'auto', padding:3, marginBottom:16, background:'rgba(255,255,255,0.035)', borderRadius:100, border:'1px solid rgba(255,255,255,0.05)' }}>
        {Object.entries(PRODUCTS).map(([k,v]) => <button key={k} onClick={()=>{setCat(k);setShowTable(false)}} style={{ padding:'9px 15px', border:'none', borderRadius:100, whiteSpace:'nowrap', cursor:'pointer', background:cat===k?'#F0C850':'transparent', color:cat===k?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:cat===k?700:500, fontSize:12.5 }}><span style={{marginRight:4}}>{v.icon}</span>{v.label}</button>)}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, gap:8, flexWrap:'wrap' }}>
        <div style={{ display:'flex', gap:7, alignItems:'center' }}>
          <button onClick={onOpenDrawer} style={{ padding:'8px 14px', borderRadius:9, border:'1px dashed rgba(240,200,80,0.35)', background:'rgba(240,200,80,0.05)', color:'#F0C850', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11.5, display:'flex', alignItems:'center', gap:4 }}><span style={{fontSize:14}}>+</span> Add Banks</button>
          <span style={{ fontSize:11, color:'#3A4558' }}>{banks.length} with products</span>
        </div>
        {selBanks.length>=2 && <button onClick={()=>setShowTable(!showTable)} style={{ padding:'8px 18px', borderRadius:100, border:'none', cursor:'pointer', background:showTable?'#2A3448':'linear-gradient(135deg,#F0C850,#D4A830)', color:showTable?'#8A96A8':'#0B1120', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12, boxShadow:showTable?'none':'0 3px 12px rgba(240,200,80,0.2)' }}>{showTable ? '\u2190 Cards' : `Compare ${selBanks.length} \u2192`}</button>}
      </div>
      {showTable && selBanks.length>=2 ? (
        <div style={{ background:'rgba(255,255,255,0.025)', borderRadius:13, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:"'Outfit',sans-serif", minWidth:Math.max(420,selBanks.length*120) }}>
              <thead><tr>
                <th style={{ padding:'13px 13px', textAlign:'left', background:'#0F1A2E', color:'#F0C850', fontWeight:600, fontSize:10.5, letterSpacing:'0.06em', textTransform:'uppercase', position:'sticky', left:0, zIndex:2 }}>Feature</th>
                {selBanks.map(b=><th key={b.id} style={{ padding:'11px 8px', textAlign:'center', background:'#0F1A2E', color:'#C0C8D4', fontWeight:600, fontSize:10.5 }}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><Badge bank={b} size={24}/><span style={{maxWidth:72,lineHeight:1.2}}>{b.name}</span></div></th>)}
              </tr></thead>
              <tbody>{prod.fields.map((f,fi)=><tr key={f}><td style={{ padding:'10px 13px', fontWeight:600, fontSize:11, color:'#A0A8B4', borderBottom:'1px solid rgba(255,255,255,0.025)', background:'#0B1120', position:'sticky', left:0, zIndex:1 }}>{f}</td>{selBanks.map(b=><td key={b.id} style={{ padding:'10px 8px', textAlign:'center', fontSize:11, fontWeight:500, color:'#C0C8D4', borderBottom:'1px solid rgba(255,255,255,0.025)', background:fi%2===0?'rgba(255,255,255,0.012)':'transparent' }}>{prod.data[b.id]?.[fi] || '\u2014'}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(245px,1fr))', gap:9 }}>
          {banks.map((bank,i)=>{const sel=selected.includes(bank.id);return(
            <div key={bank.id} onClick={()=>toggle(bank.id)} style={{ background:sel?`${bank.color}10`:'rgba(255,255,255,0.02)', border:sel?`2px solid ${bank.color}48`:'2px solid rgba(255,255,255,0.035)', borderRadius:12, padding:13, cursor:'pointer', transition:'all 0.25s', position:'relative', animation:`fadeUp 0.3s ease ${i*0.03}s both` }}>
              {sel&&<div style={{position:'absolute',top:8,right:8,width:19,height:19,borderRadius:'50%',background:bank.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:10.5,fontWeight:700}}>{'\u2713'}</div>}
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:11}}><Badge bank={bank} size={32}/><div><div style={{fontFamily:"'Fraunces',serif",fontSize:13.5,fontWeight:700,color:'#E0E6ED'}}>{bank.name}</div><div style={{fontSize:10,color:'#4A5568'}}>{bank.type}</div></div></div>
              {prod.fields.map((f,fi)=><div key={f} style={{display:'flex',justifyContent:'space-between',padding:'3.5px 0',borderBottom:fi<prod.fields.length-1?'1px solid rgba(255,255,255,0.025)':'none'}}><span style={{fontSize:10.5,color:'#4A5568'}}>{f}</span><span style={{fontSize:11,color:'#A0A8B4',fontWeight:600}}>{prod.data[bank.id]?.[fi] || '\u2014'}</span></div>)}
            </div>
          )})}
        </div>
      )}
      <p style={{marginTop:12,fontSize:10,color:'#2D3A4E',fontStyle:'italic'}}>* Islamic banks offer profit rates (Murabaha/Ijarah). All rates indicative.</p>
    </div>
  )
}

function ProfitTab({ activeBankIds, onOpenDrawer }) {
  const [sortBy, setSortBy] = useState('profit')
  const banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && b.profit2025 > 0)
  const sorted = [...banks].sort((a,b)=>sortBy==='profit'?b.profit2025-a.profit2025:sortBy==='growth'?b.yoyGrowth-a.yoyGrowth:sortBy==='assets'?b.totalAssets-a.totalAssets:b.roe-a.roe)
  const maxP = Math.max(...banks.map(b=>b.profit2025))

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,color:'#F0C850',marginBottom:2}}>FY 2025 Net Profit</h3>
          <p style={{fontSize:11,color:'#4A5568'}}>AED (after tax) &middot; {banks.length} banks with data</p>
        </div>
        <button onClick={onOpenDrawer} style={{padding:'7px 12px',borderRadius:8,border:'1px dashed rgba(240,200,80,0.3)',background:'rgba(240,200,80,0.04)',color:'#F0C850',cursor:'pointer',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11}}>+ Banks</button>
      </div>
      <div style={{display:'flex',gap:5,marginBottom:14,overflowX:'auto'}}>
        {[{key:'profit',label:'Net Profit'},{key:'growth',label:'YoY %'},{key:'assets',label:'Assets'},{key:'roe',label:'ROE'}].map(s=><button key={s.key} onClick={()=>setSortBy(s.key)} style={{padding:'6px 11px',borderRadius:6,border:'none',cursor:'pointer',whiteSpace:'nowrap',background:sortBy===s.key?'#F0C850':'rgba(255,255,255,0.04)',color:sortBy===s.key?'#0B1120':'#6B7A8D',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11}}>{s.label}</button>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:7}}>
        {sorted.map((bank,i)=>(
          <div key={bank.id} style={{background:'rgba(255,255,255,0.02)',borderRadius:12,padding:'11px 13px',border:'1px solid rgba(255,255,255,0.035)',animation:`fadeUp 0.3s ease ${i*0.025}s both`}}>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:7}}>
              <div style={{width:20,height:20,borderRadius:5,background:'rgba(240,200,80,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:10.5,color:'#F0C850'}}>{i+1}</div>
              <Badge bank={bank} size={28}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:12.5,fontWeight:700,color:'#E0E6ED'}}>{bank.name}</div>
                <div style={{fontSize:10,color:'#4A5568'}}>{bank.type} &middot; {bank.hq} &middot; {bank.exchange}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:800,color:'#F0C850'}}>{fmtProfit(bank.profit2025)}</div>
                <div style={{fontSize:10,fontWeight:700,color:bank.yoyGrowth>=0?'#4ADE80':'#F87171'}}>{bank.yoyGrowth>=0?'\u25B2':'\u25BC'} {Math.abs(bank.yoyGrowth)}%</div>
              </div>
            </div>
            <div style={{height:4,background:'rgba(255,255,255,0.025)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,width:`${Math.max(2,(bank.profit2025/maxP)*100)}%`,background:`linear-gradient(90deg,${bank.color},${bank.color}66)`,transition:'width 0.5s'}}/></div>
            <div style={{display:'flex',gap:12,marginTop:7,flexWrap:'wrap'}}>
              <span style={{fontSize:10,color:'#4A5568'}}>Assets: <b style={{color:'#A0A8B4'}}>AED {bank.totalAssets}B</b></span>
              {bank.roe>0&&<span style={{fontSize:10,color:'#4A5568'}}>ROE: <b style={{color:'#A0A8B4'}}>{bank.roe}%</b></span>}
              <span style={{fontSize:10,color:'#4A5568'}}>FY24: <b style={{color:'#A0A8B4'}}>{fmtProfit(bank.profit2024)}</b></span>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,padding:12,background:'rgba(240,200,80,0.04)',borderRadius:9,borderLeft:'3px solid #F0C850'}}>
        <p style={{fontSize:10,color:'#6B7A8D',lineHeight:1.7}}>
          <b style={{color:'#F0C850'}}>Sources:</b> Bank annual reports, ADX/DFM filings, AGBI, Khaleej Times, The National, Zawya (Jan-Mar 2026). Foreign bank UAE-specific profits not separately reported.
        </p>
      </div>
    </div>
  )
}

function NewsTab() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{fetchNews()},[])
  const fetchNews = async () => {
    setLoading(true);setError(null)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,tools:[{type:'web_search_20250305',name:'web_search'}],messages:[{role:'user',content:'Search for the latest UAE banking and finance news from this week (March 2026). Return ONLY a JSON array of exactly 8 items. Each: "title" (string), "source" (string), "date" (string), "summary" (1 sentence), "category" (Banking|Markets|Regulation|Digital|Islamic Finance|Economy). JSON only, no markdown/backticks/preamble.'}]})})
      const data = await res.json()
      const text = data.content?.filter(c=>c.type==='text').map(c=>c.text).join('').replace(/```json|```/g,'').trim()
      if(text) setNews(JSON.parse(text)); else throw new Error('empty')
    } catch(err) {
      setError('Live news unavailable. Showing cached headlines.')
      setNews([
        {title:'Emirates NBD delivers record AED 29.8B profit before tax for FY 2025',source:'Emirates NBD',date:'Jan 2026',summary:'Total assets exceeded AED 1 trillion with record lending growth of AED 129B.',category:'Banking'},
        {title:'FAB posts 24% surge in net profit to AED 21.1 billion',source:'The National',date:'Jan 28, 2026',summary:'Highest cash dividend in FAB history at 80 fils per share.',category:'Banking'},
        {title:'Wio Bank to launch Islamic banking platform after 57% profit jump',source:'The National',date:'Mar 17, 2026',summary:'Customer deposits climbed 66% to AED 57B, on track for AED 100B assets.',category:'Digital'},
        {title:'Bank of Sharjah profit surges 89% to AED 729M in FY 2025',source:'Sharjah24',date:'Mar 17, 2026',summary:'Transformation continues with diversified income and improved asset quality.',category:'Banking'},
        {title:'Ajman Bank approves 50% dividend after record AED 548M profit before tax',source:'Zawya',date:'Mar 5, 2026',summary:'Total assets grew 44% to AED 32.9B; debut $500M Sukuk 5.4x oversubscribed.',category:'Islamic Finance'},
        {title:'ADCB reports AED 11.4B net profit, 18th consecutive quarter of PBT growth',source:'Business Today ME',date:'Jan 30, 2026',summary:'Total assets AED 774B with cost-to-income at 28.2%.',category:'Banking'},
        {title:'ADIB posts record AED 7.1B net profit with industry-leading 29% ROE',source:'TradeArabia',date:'Jan 2026',summary:'Non-performing asset ratio fell to record low of 2.8%.',category:'Islamic Finance'},
        {title:'RAKBANK FY 2025 net profit rises 26% to AED 2.6 billion',source:'Zawya',date:'Jan 28, 2026',summary:'Non-interest income rose 29% with impairment charges falling 42%.',category:'Banking'},
      ])
    } finally { setLoading(false) }
  }
  const cc={Banking:'#3B82F6',Markets:'#F59E0B',Regulation:'#EF4444',Digital:'#8B5CF6','Islamic Finance':'#10B981',Economy:'#F97316'}
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div>
          <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,color:'#F0C850',marginBottom:2}}>UAE Banking News</h3>
          <p style={{fontSize:11,color:'#4A5568'}}>Latest headlines {"&"} earnings</p>
        </div>
        <button onClick={fetchNews} disabled={loading} style={{padding:'6px 12px',borderRadius:6,border:'none',cursor:loading?'default':'pointer',background:loading?'#1A2438':'rgba(240,200,80,0.08)',color:'#F0C850',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11,opacity:loading?0.5:1}}>{loading?'Loading...':'\u21BB Refresh'}</button>
      </div>
      {error&&<div style={{padding:'8px 11px',background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.1)',marginBottom:12,fontSize:11,color:'#F59E0B'}}>{error}</div>}
      {loading?<div style={{display:'flex',flexDirection:'column',gap:7}}>{[...Array(5)].map((_,i)=><div key={i} style={{height:80,borderRadius:12,background:'rgba(255,255,255,0.02)',animation:`shimmer 1.5s ease ${i*0.1}s infinite alternate`}}/>)}</div>:(
        <div style={{display:'flex',flexDirection:'column',gap:7}}>
          {news.map((item,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.02)',borderRadius:12,padding:'11px 13px',border:'1px solid rgba(255,255,255,0.035)',animation:`fadeUp 0.3s ease ${i*0.03}s both`}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:6}}>
                <span style={{fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:4,background:`${cc[item.category]||'#4A5568'}18`,color:cc[item.category]||'#4A5568',textTransform:'uppercase',letterSpacing:'0.04em'}}>{item.category}</span>
                <span style={{fontSize:10,color:'#2D3A4E'}}>{item.date}</span>
              </div>
              <h4 style={{fontFamily:"'Fraunces',serif",fontSize:13,fontWeight:700,color:'#E0E6ED',lineHeight:1.3,marginBottom:4}}>{item.title}</h4>
              <p style={{fontSize:11,color:'#6B7A8D',lineHeight:1.4,marginBottom:3}}>{item.summary}</p>
              <span style={{fontSize:10,color:'#2D3A4E',fontWeight:500}}>{item.source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DirectoryTab({ activeBankIds, onOpenDrawer }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const banks = ALL_BANKS.filter(b => {
    const mQ = b.name.toLowerCase().includes(q.toLowerCase()) || b.hq.toLowerCase().includes(q.toLowerCase())
    const mF = filter === 'all' || (filter === 'national' && b.category === 'national') || (filter === 'foreign' && b.category === 'foreign') || (filter === 'foreign_wholesale' && b.category === 'foreign_wholesale') || (filter === 'digital' && b.category === 'digital') || (filter === 'islamic' && b.type === 'Islamic') || (filter === 'conventional' && b.type === 'Conventional')
    return mQ && mF
  })
  const grouped = {}
  banks.forEach(b => { const c = CATEGORY_LABELS[b.category] || b.category; if(!grouped[c]) grouped[c]=[]; grouped[c].push(b) })

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
        <div>
          <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,color:'#F0C850',marginBottom:2}}>Bank Directory</h3>
          <p style={{fontSize:11,color:'#4A5568'}}>All {ALL_BANKS.length} CBUAE-licensed banks</p>
        </div>
      </div>
      <div style={{position:'relative',marginBottom:10}}>
        <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'#4A5568'}}>&#x1F50D;</span>
        <input type="text" placeholder="Search banks..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:'10px 12px 10px 34px',borderRadius:9,border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',fontFamily:"'Outfit',sans-serif",fontSize:12.5,color:'#E0E6ED',outline:'none'}}/>
      </div>
      <div style={{display:'flex',gap:4,marginBottom:14,overflowX:'auto'}}>
        {CATEGORY_FILTERS.map(f=><button key={f.key} onClick={()=>setFilter(f.key)} style={{padding:'5px 10px',borderRadius:6,border:'none',cursor:'pointer',whiteSpace:'nowrap',background:filter===f.key?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)',color:filter===f.key?'#F0C850':'#5A6878',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:10.5}}>{f.label}</button>)}
      </div>
      {Object.entries(grouped).map(([catName, list]) => (
        <div key={catName} style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:'#F0C850',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,paddingBottom:4,borderBottom:'1px solid rgba(240,200,80,0.15)'}}>{catName} ({list.length})</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:6}}>
            {list.map(bank=>(
              <div key={bank.id} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:8,background:'rgba(255,255,255,0.015)',border:'1px solid rgba(255,255,255,0.025)'}}>
                <Badge bank={bank} size={26}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11.5,fontWeight:600,color:'#E0E6ED'}}>{bank.name}</div>
                  <div style={{fontSize:9.5,color:'#4A5568'}}>{bank.hq} &middot; Est. {bank.est} &middot; {bank.exchange}</div>
                </div>
                {bank.profit2025>0&&<div style={{fontSize:10,fontWeight:700,color:'#F0C850'}}>{fmtProfit(bank.profit2025)}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{padding:12,background:'rgba(240,200,80,0.04)',borderRadius:9,borderLeft:'3px solid #F0C850'}}>
        <p style={{fontSize:10,color:'#6B7A8D',lineHeight:1.7}}>
          <b style={{color:'#F0C850'}}>Source:</b> CBUAE Register (June 2025). All nationally licensed and foreign banks with retail/wholesale licences in the UAE.
        </p>
      </div>
    </div>
  )
}

export default function BankingHub() {
  const [tab, setTab] = useState('profit')
  const [activeBankIds, setActiveBankIds] = useState(()=>ALL_BANKS.filter(b=>b.featured).map(b=>b.id))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleBank = id => setActiveBankIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const tabs = [{key:'profit',label:'Profits',icon:'\uD83D\uDCCA'},{key:'directory',label:'Directory',icon:'\uD83C\uDFDB\uFE0F'},{key:'news',label:'News',icon:'\uD83D\uDCF0'},{key:'compare',label:'Compare',icon:'\u2696\uFE0F'}]

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(180deg,#080E1A 0%,#0B1120 40%,#0E1528 100%)',fontFamily:"'Outfit',sans-serif",color:'#E0E6ED'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fraunces:wght@600;700;800&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{from{opacity:.2}to{opacity:.05}}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{height:3px;width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2A3448;border-radius:3px}input::placeholder{color:#4A5568}`}</style>

      <div style={{background:'linear-gradient(160deg,#0F1A2E 0%,#162440 50%,#1A2D4A 100%)',padding:'30px 16px 22px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-35,right:-35,width:140,height:140,borderRadius:'50%',background:'radial-gradient(circle,rgba(240,200,80,0.07) 0%,transparent 70%)'}}/>
        <div style={{maxWidth:900,margin:'0 auto',position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
            <span style={{fontSize:9,letterSpacing:'0.14em',color:'#F0C850',fontWeight:700,textTransform:'uppercase'}}>UAE Banking Hub</span>
            <span style={{width:20,height:1,background:'#F0C85030'}}/>
            <span style={{fontSize:9,color:'#3A4558'}}>{ALL_BANKS.length} banks</span>
          </div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(22px,5vw,34px)',fontWeight:800,color:'#F0E6D3',lineHeight:1.15,marginBottom:4}}>
            Smart Banking<br/><span style={{color:'#F0C850'}}>Intelligence</span>
          </h1>
          <p style={{fontSize:12,color:'#4A5568',maxWidth:360,lineHeight:1.5}}>
            {"Complete UAE banking directory \u2014 compare, track profits & stay informed."}
          </p>
        </div>
      </div>

      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(11,17,32,0.92)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(255,255,255,0.035)'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex'}}>
          {tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{flex:1,padding:'12px 0',border:'none',cursor:'pointer',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',gap:4,fontFamily:"'Outfit',sans-serif",fontWeight:tab===t.key?700:500,fontSize:11.5,color:tab===t.key?'#F0C850':'#4A5568',borderBottom:tab===t.key?'2px solid #F0C850':'2px solid transparent',transition:'all 0.25s'}}><span style={{fontSize:13}}>{t.icon}</span>{t.label}</button>)}
        </div>
      </div>

      <div style={{maxWidth:900,margin:'0 auto',padding:'16px 12px 65px'}}>
        {tab==='profit'&&<ProfitTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)}/>}
        {tab==='directory'&&<DirectoryTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)}/>}
        {tab==='news'&&<NewsTab/>}
        {tab==='compare'&&<CompareTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)}/>}
      </div>

      <div style={{textAlign:'center',padding:'16px 12px',borderTop:'1px solid rgba(255,255,255,0.025)',fontSize:9.5,color:'#2D3A4E'}}>
        {"CBUAE Register (June 2025) \u00B7 FY 2025 bank filings \u00B7 Data indicative \u2014 verify with your bank"}
      </div>

      <AddBankDrawer visible={drawerOpen} activeBankIds={activeBankIds} onToggle={toggleBank} onClose={()=>setDrawerOpen(false)}/>
    </div>
  )
}
