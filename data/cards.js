// UAE Credit Cards Database — comprehensive comparison data
// Sources: Bank websites, MoneySouq, Soulwallet, Daleel, UAEExpertHub (Mar 2026)

export const CREDIT_CARDS = [
  // ═══ FREE FOR LIFE CARDS ═══
  { id:"enbd-plat", bank:"Emirates NBD", name:"Platinum", color:"#0066B3", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1%", network:"Visa", cinema:true, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"enbd-titan", bank:"Emirates NBD", name:"Titanium", color:"#0066B3", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1%", network:"Mastercard", cinema:true, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"enbd-go4it", bank:"Emirates NBD", name:"Go4it", color:"#0066B3", free:true, annualFee:0, minSalary:5000, cashback:"Up to 5%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"fab-easy", bank:"FAB", name:"Easy Credit Card", color:"#003B5C", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:false, airmiles:false, sharia:false, tier:"Entry" },
  { id:"fab-blue-inf", bank:"FAB", name:"Blue Infinite", color:"#003B5C", free:true, annualFee:0, minSalary:15000, cashback:"Up to 5 pts/AED", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Premium" },
  { id:"adcb-talabat", bank:"ADCB", name:"Talabat Platinum", color:"#D4145A", free:true, annualFee:0, minSalary:5000, cashback:"35% Talabat", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"adcb-now", bank:"ADCB", name:"Now Credit Card", color:"#D4145A", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:false, airmiles:false, sharia:false, tier:"Entry" },
  { id:"mashreq-cb", bank:"Mashreq", name:"Cashback Card", color:"#E8442A", free:true, annualFee:0, minSalary:5000, cashback:"Up to 2%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"mashreq-noon", bank:"Mashreq", name:"noon Card", color:"#E8442A", free:true, annualFee:0, minSalary:5000, cashback:"5% noon", network:"Mastercard", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:false, airmiles:false, sharia:false, tier:"Entry" },
  { id:"rak-pulse", bank:"RAKBANK", name:"Pulse Card", color:"#E31837", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1.5%", network:"Mastercard", cinema:false, golf:false, valet:false, lounge:false, travel:true, dining:false, airmiles:false, sharia:false, tier:"Entry" },
  { id:"rak-titan", bank:"RAKBANK", name:"Titanium", color:"#E31837", free:true, annualFee:0, minSalary:5000, cashback:"50% entertainment", network:"Mastercard", cinema:true, golf:false, valet:false, lounge:true, travel:true, dining:false, airmiles:false, sharia:false, tier:"Mid" },
  { id:"cbd-plat", bank:"CBD", name:"Visa Platinum", color:"#1C4587", free:true, annualFee:0, minSalary:8000, cashback:"Rewards", network:"Visa", cinema:true, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Entry" },
  { id:"dib-cashback", bank:"DIB", name:"Cashback Card", color:"#006838", free:true, annualFee:0, minSalary:5000, cashback:"Up to 3%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:true, dining:false, airmiles:false, sharia:true, tier:"Entry" },
  { id:"dib-prime-inf", bank:"DIB", name:"Prime Infinite", color:"#006838", free:true, annualFee:0, minSalary:15000, cashback:"Up to 5%", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:true, tier:"Premium" },
  { id:"adib-cashback", bank:"ADIB", name:"Visa Cashback", color:"#7B2D8E", free:true, annualFee:0, minSalary:5000, cashback:"Up to 4%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:true, tier:"Entry" },
  { id:"ei-cashback", bank:"Emirates Islamic", name:"Switch Cashback", color:"#00838F", free:true, annualFee:0, minSalary:5000, cashback:"Up to 10%", network:"Mastercard", cinema:false, golf:false, valet:false, lounge:true, travel:false, dining:true, airmiles:false, sharia:true, tier:"Mid" },
  { id:"citi-simplicity", bank:"Citibank", name:"Simplicity", color:"#003B70", free:true, annualFee:0, minSalary:5000, cashback:"Up to 1%", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:false, airmiles:false, sharia:false, tier:"Entry" },
  { id:"deem-plat", bank:"Deem Finance", name:"Platinum Cashup", color:"#FF8F00", free:true, annualFee:0, minSalary:5000, cashback:"Up to 2%", network:"Mastercard", cinema:false, golf:false, valet:false, lounge:true, travel:false, dining:false, airmiles:false, sharia:false, tier:"Entry" },

  // ═══ PAID PREMIUM CARDS ═══
  { id:"enbd-beyond", bank:"Emirates NBD", name:"Beyond Infinite", color:"#0066B3", free:false, annualFee:1500, minSalary:25000, cashback:"3x Skywards", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Ultra Premium" },
  { id:"enbd-dnata", bank:"Emirates NBD", name:"Dnata World", color:"#0066B3", free:false, annualFee:700, minSalary:15000, cashback:"Dnata points", network:"Mastercard", cinema:true, golf:false, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Premium" },
  { id:"enbd-starwood", bank:"Emirates NBD", name:"Marriott Bonvoy", color:"#0066B3", free:false, annualFee:750, minSalary:15000, cashback:"Marriott pts", network:"Visa", cinema:false, golf:false, valet:false, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Premium" },
  { id:"fab-rewards-elite", bank:"FAB", name:"Rewards Elite Infinite", color:"#003B5C", free:false, annualFee:1500, minSalary:25000, cashback:"5 pts/AED", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Ultra Premium" },
  { id:"fab-etihad-inf", bank:"FAB", name:"Etihad Guest Infinite", color:"#003B5C", free:false, annualFee:900, minSalary:20000, cashback:"7 miles/AED 10", network:"Visa", cinema:false, golf:true, valet:true, lounge:true, travel:true, dining:false, airmiles:true, sharia:false, tier:"Premium" },
  { id:"fab-travel", bank:"FAB", name:"Travel Card", color:"#003B5C", free:false, annualFee:500, minSalary:10000, cashback:"FAB Miles", network:"Mastercard", cinema:true, golf:false, valet:false, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Mid" },
  { id:"fab-cashback", bank:"FAB", name:"Cashback Card", color:"#003B5C", free:false, annualFee:300, minSalary:8000, cashback:"Up to 5%", network:"Visa", cinema:false, golf:false, valet:false, lounge:true, travel:false, dining:true, airmiles:false, sharia:false, tier:"Mid" },
  { id:"adcb-touchpts-inf", bank:"ADCB", name:"TouchPoints Infinite", color:"#D4145A", free:false, annualFee:750, minSalary:15000, cashback:"Up to 5%", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Premium" },
  { id:"adcb-etihad-inf", bank:"ADCB", name:"Etihad Guest Infinite", color:"#D4145A", free:false, annualFee:900, minSalary:20000, cashback:"3 miles/AED", network:"Visa", cinema:false, golf:true, valet:true, lounge:true, travel:true, dining:false, airmiles:true, sharia:false, tier:"Premium" },
  { id:"mashreq-solitaire", bank:"Mashreq", name:"Solitaire World", color:"#E8442A", free:false, annualFee:1500, minSalary:25000, cashback:"Up to 7%", network:"Mastercard", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Ultra Premium" },
  { id:"mashreq-gold", bank:"Mashreq", name:"Gold Card", color:"#E8442A", free:false, annualFee:300, minSalary:8000, cashback:"Vantage pts", network:"Visa", cinema:false, golf:false, valet:false, lounge:false, travel:false, dining:true, airmiles:false, sharia:false, tier:"Mid" },
  { id:"rak-world-elite", bank:"RAKBANK", name:"World Elite", color:"#E31837", free:false, annualFee:500, minSalary:15000, cashback:"Up to 5%", network:"Mastercard", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Premium" },
  { id:"rak-elevate", bank:"RAKBANK", name:"Elevate World Elite", color:"#E31837", free:false, annualFee:1000, minSalary:25000, cashback:"Up to 10%", network:"Mastercard", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Ultra Premium" },
  { id:"dib-prime-sig", bank:"DIB", name:"Prime Signature", color:"#006838", free:false, annualFee:500, minSalary:10000, cashback:"Up to 3%", network:"Visa", cinema:true, golf:false, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:true, tier:"Mid" },
  { id:"adib-infinite", bank:"ADIB", name:"Visa Infinite", color:"#7B2D8E", free:false, annualFee:600, minSalary:15000, cashback:"Up to 5%", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:false, sharia:true, tier:"Premium" },
  { id:"adib-etihad-plat", bank:"ADIB", name:"Etihad Guest Platinum", color:"#7B2D8E", free:false, annualFee:700, minSalary:15000, cashback:"3 miles/USD", network:"Visa", cinema:false, golf:true, valet:true, lounge:true, travel:true, dining:false, airmiles:true, sharia:true, tier:"Premium" },
  { id:"ei-skywards-blk", bank:"Emirates Islamic", name:"Skywards Black", color:"#00838F", free:false, annualFee:4200, minSalary:35000, cashback:"Skywards Miles", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:true, tier:"Ultra Premium" },
  { id:"ei-etihad-inf", bank:"Emirates Islamic", name:"Etihad Guest Infinite", color:"#00838F", free:false, annualFee:900, minSalary:20000, cashback:"3 miles/USD", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:true, tier:"Premium" },
  { id:"cbd-world", bank:"CBD", name:"World Mastercard", color:"#1C4587", free:false, annualFee:600, minSalary:12000, cashback:"Up to 3%", network:"Mastercard", cinema:true, golf:false, valet:false, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Mid" },
  { id:"hsbc-live", bank:"HSBC", name:"Live+ Card", color:"#DB0011", free:false, annualFee:500, minSalary:10000, cashback:"Up to 6%", network:"Mastercard", cinema:true, golf:false, valet:false, lounge:true, travel:true, dining:true, airmiles:false, sharia:false, tier:"Mid" },
  { id:"hsbc-premier", bank:"HSBC", name:"Premier Card", color:"#DB0011", free:false, annualFee:1500, minSalary:30000, cashback:"Air Miles", network:"Visa", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Ultra Premium" },
  { id:"sc-journey", bank:"Standard Chartered", name:"Journey Card", color:"#0072AA", free:false, annualFee:1500, minSalary:20000, cashback:"SC Rewards", network:"Mastercard", cinema:true, golf:true, valet:false, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Premium" },
  { id:"citi-prestige", bank:"Citibank", name:"Prestige", color:"#003B70", free:false, annualFee:1800, minSalary:30000, cashback:"Citi Miles", network:"Mastercard", cinema:true, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Ultra Premium" },
  { id:"amex-plat", bank:"American Express", name:"Platinum Card", color:"#006FCF", free:false, annualFee:2800, minSalary:30000, cashback:"Membership Rewards", network:"Amex", cinema:false, golf:true, valet:true, lounge:true, travel:true, dining:true, airmiles:true, sharia:false, tier:"Ultra Premium" },
  { id:"ajman-plat", bank:"Ajman Bank", name:"Visa Platinum", color:"#C75B12", free:false, annualFee:350, minSalary:8000, cashback:"Up to 2%", network:"Visa", cinema:false, golf:false, valet:false, lounge:true, travel:false, dining:false, airmiles:false, sharia:true, tier:"Entry" },
];

export const BENEFIT_FILTERS = [
  { key:"all", label:"All", icon:"\uD83C\uDFB4" },
  { key:"cinema", label:"Cinema", icon:"\uD83C\uDFAC" },
  { key:"golf", label:"Golf", icon:"\u26F3" },
  { key:"valet", label:"Valet", icon:"\uD83D\uDE97" },
  { key:"lounge", label:"Lounge", icon:"\u2708\uFE0F" },
  { key:"dining", label:"Dining", icon:"\uD83C\uDF7D\uFE0F" },
  { key:"airmiles", label:"Air Miles", icon:"\uD83D\uDEEB" },
  { key:"sharia", label:"Sharia", icon:"\u2622\uFE0F" },
];

export const TIER_COLORS = {
  "Entry": "#4ADE80",
  "Mid": "#60A5FA",
  "Premium": "#F0C850",
  "Ultra Premium": "#A78BFA",
};
