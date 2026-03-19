'use client'
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { ALL_BANKS, PRODUCTS, CATEGORY_LABELS, CATEGORY_FILTERS, fmtProfit } from '../data/banks'

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
  const [view, setView] = useState('profit')
  const [sortBy, setSortBy] = useState('profit')
  const [nplSort, setNplSort] = useState('npl')
  const allBanks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && (b.profit2025 !== 0 || b.note))
  const sorted = [...allBanks].sort((a,b)=>sortBy==='profit'?b.profit2025-a.profit2025:sortBy==='growth'?b.yoyGrowth-a.yoyGrowth:sortBy==='assets'?b.totalAssets-a.totalAssets:b.roe-a.roe)
  const maxP = Math.max(...allBanks.map(b=>b.profit2025), 1)

  const nplBanks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && b.nplRatio > 0)
  const nplSorted = [...nplBanks].sort((a,b)=>nplSort==='npl'?b.nplRatio-a.nplRatio:nplSort==='nplAmt'?(b.grossLoans*b.nplRatio/100)-(a.grossLoans*a.nplRatio/100):nplSort==='coverage'?a.coverageRatio-b.coverageRatio:b.grossLoans-a.grossLoans)

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
        <div>
          <h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,color:'#F0C850',marginBottom:2}}>Financial Performance</h3>
          <p style={{fontSize:11,color:'#4A5568'}}>FY 2025 &middot; {allBanks.length} banks</p>
        </div>
        <button onClick={onOpenDrawer} style={{padding:'7px 12px',borderRadius:8,border:'1px dashed rgba(240,200,80,0.3)',background:'rgba(240,200,80,0.04)',color:'#F0C850',cursor:'pointer',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11}}>+ Banks</button>
      </div>

      <div style={{display:'flex',gap:5,marginBottom:14,background:'rgba(255,255,255,0.035)',borderRadius:100,padding:3,border:'1px solid rgba(255,255,255,0.05)'}}>
        <button onClick={()=>setView('profit')} style={{flex:1,padding:'8px 0',border:'none',borderRadius:100,cursor:'pointer',background:view==='profit'?'#F0C850':'transparent',color:view==='profit'?'#0B1120':'#6B7A8D',fontFamily:"'Outfit',sans-serif",fontWeight:view==='profit'?700:500,fontSize:12}}>Profit / Loss</button>
        <button onClick={()=>setView('npl')} style={{flex:1,padding:'8px 0',border:'none',borderRadius:100,cursor:'pointer',background:view==='npl'?'#F87171':'transparent',color:view==='npl'?'#fff':'#6B7A8D',fontFamily:"'Outfit',sans-serif",fontWeight:view==='npl'?700:500,fontSize:12}}>NPL Analysis</button>
      </div>

      {view==='profit'?(
        <div>
          <div style={{display:'flex',gap:5,marginBottom:14,overflowX:'auto'}}>
            {[{key:'profit',label:'Net Profit'},{key:'growth',label:'YoY %'},{key:'assets',label:'Assets'},{key:'roe',label:'ROE'}].map(s=><button key={s.key} onClick={()=>setSortBy(s.key)} style={{padding:'6px 11px',borderRadius:6,border:'none',cursor:'pointer',whiteSpace:'nowrap',background:sortBy===s.key?'#F0C850':'rgba(255,255,255,0.04)',color:sortBy===s.key?'#0B1120':'#6B7A8D',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11}}>{s.label}</button>)}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {sorted.map((bank,i)=>(
              <div key={bank.id} style={{background:bank.profit2025<0?'rgba(248,113,113,0.04)':'rgba(255,255,255,0.02)',borderRadius:12,padding:'11px 13px',border:bank.profit2025<0?'1px solid rgba(248,113,113,0.15)':'1px solid rgba(255,255,255,0.035)',animation:`fadeUp 0.3s ease ${i*0.025}s both`}}>
                <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:7}}>
                  <div style={{width:20,height:20,borderRadius:5,background:bank.profit2025<0?'rgba(248,113,113,0.12)':'rgba(240,200,80,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:10.5,color:bank.profit2025<0?'#F87171':'#F0C850'}}>{i+1}</div>
                  <Badge bank={bank} size={28}/>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:12.5,fontWeight:700,color:'#E0E6ED'}}>{bank.name}</div>
                    <div style={{fontSize:10,color:'#4A5568'}}>{bank.type} &middot; {bank.hq} &middot; {bank.exchange}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:800,color:bank.profit2025<0?'#F87171':'#F0C850'}}>{fmtProfit(bank.profit2025)}</div>
                    {bank.profit2025!==0&&<div style={{fontSize:10,fontWeight:700,color:bank.yoyGrowth>=0?'#4ADE80':'#F87171'}}>{bank.yoyGrowth>=0?'\u25B2':'\u25BC'} {Math.abs(bank.yoyGrowth)}%</div>}
                  </div>
                </div>
                {bank.profit2025>0&&<div style={{height:4,background:'rgba(255,255,255,0.025)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,width:`${Math.max(2,(bank.profit2025/maxP)*100)}%`,background:`linear-gradient(90deg,${bank.color},${bank.color}66)`,transition:'width 0.5s'}}/></div>}
                <div style={{display:'flex',gap:12,marginTop:7,flexWrap:'wrap'}}>
                  <span style={{fontSize:10,color:'#4A5568'}}>Assets: <b style={{color:'#A0A8B4'}}>AED {bank.totalAssets}B</b></span>
                  {bank.roe>0&&<span style={{fontSize:10,color:'#4A5568'}}>ROE: <b style={{color:'#A0A8B4'}}>{bank.roe}%</b></span>}
                  {bank.profit2024!==0&&<span style={{fontSize:10,color:'#4A5568'}}>FY24: <b style={{color:bank.profit2024<0?'#F87171':'#A0A8B4'}}>{fmtProfit(bank.profit2024)}</b></span>}
                  {bank.note&&<span style={{fontSize:10,color:bank.profit2025<0?'#F87171':'#6B7A8D',fontWeight:600}}>{bank.profit2025<0?'Net loss \u2014 ADCB subsidiary':bank.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ):(
        <div>
          <div style={{display:'flex',gap:5,marginBottom:14,overflowX:'auto'}}>
            {[{key:'npl',label:'NPL % (High\u2192Low)'},{key:'nplAmt',label:'NPL Amount'},{key:'coverage',label:'Coverage (Low\u2192High)'},{key:'loans',label:'Gross Loans'}].map(s=><button key={s.key} onClick={()=>setNplSort(s.key)} style={{padding:'6px 11px',borderRadius:6,border:'none',cursor:'pointer',whiteSpace:'nowrap',background:nplSort===s.key?'#F87171':'rgba(255,255,255,0.04)',color:nplSort===s.key?'#fff':'#6B7A8D',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11}}>{s.label}</button>)}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {nplSorted.map((bank,i)=>{
              const nplAmt = (bank.grossLoans * bank.nplRatio / 100);
              const nplChg = bank.nplPrior ? bank.nplRatio - bank.nplPrior : 0;
              const maxNpl = Math.max(...nplBanks.map(b=>Math.max(b.nplRatio, b.nplPrior||0)));
              return (
              <div key={bank.id} style={{background:bank.nplRatio>5?'rgba(248,113,113,0.04)':bank.nplRatio>3?'rgba(245,158,11,0.04)':'rgba(255,255,255,0.02)',borderRadius:12,padding:'11px 13px',border:bank.nplRatio>5?'1px solid rgba(248,113,113,0.15)':bank.nplRatio>3?'1px solid rgba(245,158,11,0.12)':'1px solid rgba(255,255,255,0.035)',animation:`fadeUp 0.3s ease ${i*0.025}s both`}}>
                <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:7}}>
                  <div style={{width:20,height:20,borderRadius:5,background:bank.nplRatio>5?'rgba(248,113,113,0.12)':bank.nplRatio>3?'rgba(245,158,11,0.12)':'rgba(74,222,128,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:10.5,color:bank.nplRatio>5?'#F87171':bank.nplRatio>3?'#F59E0B':'#4ADE80'}}>{i+1}</div>
                  <Badge bank={bank} size={28}/>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:12.5,fontWeight:700,color:'#E0E6ED'}}>{bank.name}</div>
                    <div style={{fontSize:10,color:'#4A5568'}}>{bank.type} &middot; {bank.hq}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800,color:bank.nplRatio>5?'#F87171':bank.nplRatio>3?'#F59E0B':'#4ADE80'}}>{bank.nplRatio}%</div>
                    {bank.nplPrior>0&&<div style={{fontSize:10,fontWeight:700,color:nplChg<0?'#4ADE80':'#F87171'}}>{nplChg<0?'\u25BC':nplChg>0?'\u25B2':'\u25CF'} {Math.abs(nplChg).toFixed(1)}pp vs FY24</div>}
                  </div>
                </div>
                <div style={{display:'flex',gap:4,marginBottom:7}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:'#4A5568',marginBottom:2}}>FY2025</div>
                    <div style={{height:4,background:'rgba(255,255,255,0.025)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,width:`${Math.max(2,(bank.nplRatio/maxNpl)*100)}%`,background:bank.nplRatio>5?'#F87171':bank.nplRatio>3?'#F59E0B':'#4ADE80',transition:'width 0.5s'}}/></div>
                  </div>
                  {bank.nplPrior>0&&<div style={{flex:1}}>
                    <div style={{fontSize:9,color:'#4A5568',marginBottom:2}}>FY2024</div>
                    <div style={{height:4,background:'rgba(255,255,255,0.025)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,width:`${Math.max(2,(bank.nplPrior/maxNpl)*100)}%`,background:'rgba(255,255,255,0.15)',transition:'width 0.5s'}}/></div>
                  </div>}
                </div>
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  <span style={{fontSize:10,color:'#4A5568'}}>NPL Amt: <b style={{color:bank.nplRatio>5?'#F87171':'#A0A8B4'}}>AED {nplAmt.toFixed(1)}B</b></span>
                  <span style={{fontSize:10,color:'#4A5568'}}>Gross Loans: <b style={{color:'#A0A8B4'}}>AED {bank.grossLoans}B</b></span>
                  {bank.nplPrior>0&&<span style={{fontSize:10,color:'#4A5568'}}>Prior NPL: <b style={{color:'#6B7A8D'}}>{bank.nplPrior}%</b></span>}
                  {bank.coverageRatio>0&&<span style={{fontSize:10,color:'#4A5568'}}>Coverage: <b style={{color:bank.coverageRatio>=100?'#4ADE80':bank.coverageRatio>=80?'#F59E0B':'#F87171'}}>{bank.coverageRatio}%</b> {bank.coverageRatio>=100?'\u2705':bank.coverageRatio>=80?'\u26A0\uFE0F':'\u274C'}</span>}
                </div>
              </div>
            )})}
          </div>
        </div>
      )}

      <div style={{marginTop:16,padding:12,background:'rgba(240,200,80,0.04)',borderRadius:9,borderLeft:'3px solid #F0C850'}}>
        <p style={{fontSize:10,color:'#6B7A8D',lineHeight:1.7}}>
          <b style={{color:'#F0C850'}}>Sources:</b> Bank annual reports, ADX/DFM filings, FAB Research, A&M UAE Banking Pulse (Q3 2025), AGBI, Khaleej Times, The National, Zawya. NPL ratios based on latest available data (FY/9M/H1 2025). NPL Amount = Gross Loans x NPL Ratio.
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

  const sortByDate = (items) => {
    return [...items].sort((a, b) => {
      const da = new Date(a.dateSort || a.date)
      const db = new Date(b.dateSort || b.date)
      return db - da
    })
  }

  const fetchNews = async () => {
    setLoading(true);setError(null)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,tools:[{type:'web_search_20250305',name:'web_search'}],messages:[{role:'user',content:'Search for the latest UAE banking and finance news (March 2026). Return ONLY a JSON array of exactly 10 items sorted by date descending (newest first). Each: "title" (string), "source" (string), "date" (display string like "Mar 19, 2026"), "dateSort" (ISO string like "2026-03-19"), "summary" (1 sentence), "category" (Banking|Markets|Regulation|Digital|Islamic Finance|Economy). JSON only, no markdown/backticks/preamble.'}]})})
      const data = await res.json()
      const text = data.content?.filter(c=>c.type==='text').map(c=>c.text).join('').replace(/```json|```/g,'').trim()
      if(text) { setNews(sortByDate(JSON.parse(text))) } else throw new Error('empty')
    } catch(err) {
      setError('Live news unavailable. Showing cached headlines.')
      setNews(sortByDate([
        {title:'Wio Bank to launch Islamic banking platform after 57% profit jump',source:'The National',date:'Mar 17, 2026',dateSort:'2026-03-17',summary:'Customer deposits climbed 66% to AED 57B, on track for AED 100B assets.',category:'Digital'},
        {title:'Bank of Sharjah profit surges 89% to AED 729M in FY 2025',source:'Sharjah24',date:'Mar 17, 2026',dateSort:'2026-03-17',summary:'Transformation continues with diversified income and improved asset quality.',category:'Banking'},
        {title:'Ajman Bank approves 50% dividend after record AED 548M profit before tax',source:'Zawya',date:'Mar 5, 2026',dateSort:'2026-03-05',summary:'Total assets grew 44% to AED 32.9B; debut $500M Sukuk 5.4x oversubscribed.',category:'Islamic Finance'},
        {title:'UAE banks set for strong 2026 as profits and lending surge fuel outlook',source:'Khaleej Times',date:'Feb 8, 2026',dateSort:'2026-02-08',summary:'Total banking sector assets climbed 18.1% YoY by Sep 2025 on robust lending.',category:'Economy'},
        {title:'Mashreq achieves AED 7.0B net profit after tax in 2025',source:'Gulf News',date:'Feb 2, 2026',dateSort:'2026-02-02',summary:'Total assets rose 25% to AED 335B with record 32% loan growth and 20% ROE.',category:'Banking'},
        {title:'ADCB reports AED 11.4B net profit, 18 consecutive quarters of PBT growth',source:'Business Today ME',date:'Jan 30, 2026',dateSort:'2026-01-30',summary:'Total assets AED 774B with cost-to-income ratio improving to 28.2%.',category:'Banking'},
        {title:'First Abu Dhabi Bank posts 24% surge in 2025 net profit to AED 21.1B',source:'The National',date:'Jan 28, 2026',dateSort:'2026-01-28',summary:'Highest cash dividend in FAB history at 80 fils per share recommended.',category:'Banking'},
        {title:'RAKBANK FY 2025 net profit rises 26% to AED 2.6 billion',source:'Zawya',date:'Jan 28, 2026',dateSort:'2026-01-28',summary:'Non-interest income rose 29% to AED 1.5B with impairment charges falling 42%.',category:'Banking'},
        {title:'NBF net profit after tax surges 42% to record AED 1.2 billion',source:'NBF',date:'Jan 28, 2026',dateSort:'2026-01-28',summary:'Operating profit hit AED 1.9B with cost-to-income improving to 29.5%.',category:'Banking'},
        {title:'Emirates NBD delivers record AED 29.8B profit before tax for FY 2025',source:'Emirates NBD',date:'Jan 27, 2026',dateSort:'2026-01-27',summary:'Total assets exceeded AED 1 trillion with lending growth of AED 129B.',category:'Banking'},
        {title:'ADIB posts record AED 7.1B net profit with industry-leading 29% ROE',source:'TradeArabia',date:'Jan 26, 2026',dateSort:'2026-01-26',summary:'Non-performing asset ratio fell to record low of 2.8% for the bank.',category:'Islamic Finance'},
        {title:'CBI achieves record AED 311M pre-tax profit with 40% growth',source:'MarketScreener',date:'Jan 26, 2026',dateSort:'2026-01-26',summary:'Strongest annual performance ever reflecting successful balance sheet optimization.',category:'Banking'},
        {title:'Sharjah Islamic Bank achieves AED 1.32B net profit with 26% growth',source:'Al Bawaba',date:'Jan 23, 2026',dateSort:'2026-01-23',summary:'Proposes 20% higher cash dividends and capital increase for shareholders.',category:'Islamic Finance'},
      ]))
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
  Object.values(grouped).forEach(list => list.sort((a, b) => b.totalAssets - a.totalAssets))

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
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {list.map((bank,idx)=>{
              const hasSegment = bank.retailLoans > 0 || bank.corpLoans > 0;
              const totalLoans = (bank.retailLoans||0) + (bank.corpLoans||0);
              const retailPct = totalLoans > 0 ? ((bank.retailLoans||0)/totalLoans*100).toFixed(0) : 0;
              const corpPct = totalLoans > 0 ? ((bank.corpLoans||0)/totalLoans*100).toFixed(0) : 0;
              return (
              <div key={bank.id} style={{background:'rgba(255,255,255,0.015)',border:'1px solid rgba(255,255,255,0.025)',borderRadius:10,padding:'10px 11px'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:hasSegment?8:0}}>
                  <div style={{width:18,height:18,borderRadius:4,background:'rgba(240,200,80,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:9.5,color:'#F0C850',flexShrink:0}}>{idx+1}</div>
                  <Badge bank={bank} size={26}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11.5,fontWeight:600,color:'#E0E6ED'}}>{bank.name}</div>
                    <div style={{fontSize:9.5,color:'#4A5568'}}>{bank.hq} &middot; Est. {bank.est} &middot; {bank.exchange}{bank.totalAssets > 0 ? ` \u00B7 AED ${bank.totalAssets}B assets` : ''}</div>
                  </div>
                  {bank.profit2025>0?<div style={{textAlign:'right',flexShrink:0}}><div style={{fontSize:10.5,fontWeight:700,color:'#F0C850'}}>{fmtProfit(bank.profit2025)}</div><div style={{fontSize:9,color:bank.yoyGrowth>=0?'#4ADE80':'#F87171',fontWeight:600}}>{bank.yoyGrowth>=0?'\u25B2':'\u25BC'}{Math.abs(bank.yoyGrowth)}%</div></div>:bank.note?<div style={{fontSize:9.5,fontWeight:700,color:'#F87171',flexShrink:0}}>{bank.note}</div>:null}
                </div>
                {hasSegment&&<div>
                  <div style={{display:'flex',height:6,borderRadius:3,overflow:'hidden',marginBottom:5}}>
                    <div style={{width:`${retailPct}%`,background:'#3B82F6',transition:'width 0.5s'}}/>
                    <div style={{width:`${corpPct}%`,background:'#F59E0B',transition:'width 0.5s'}}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',gap:10}}>
                      <span style={{fontSize:9.5,color:'#3B82F6',fontWeight:600}}>{'\u25CF'} Retail AED {bank.retailLoans}B ({retailPct}%)</span>
                      <span style={{fontSize:9.5,color:'#F59E0B',fontWeight:600}}>{'\u25CF'} Corporate AED {bank.corpLoans}B ({corpPct}%)</span>
                    </div>
                    <span style={{fontSize:9,color:'#4A5568'}}>Total: AED {totalLoans}B</span>
                  </div>
                </div>}
              </div>
            )})}
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
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <span style={{fontSize:9,color:'#6B7A8D',fontWeight:500}}>{"by "}
              <span style={{color:'#A78BFA',fontWeight:700}}>Vishal Vibin</span>
            </span>
            <span style={{padding:'2px 8px',borderRadius:4,background:'rgba(139,92,246,0.15)',color:'#A78BFA',fontSize:8,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>Beta v1.0</span>
          </div>
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
          <div style={{marginTop:8,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#4ADE80'}}/>
            <span style={{fontSize:9.5,color:'#4A5568'}}>Data as of: FY 2025 annual results (Jan\u2013Mar 2026 filings)</span>
          </div>
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

      <div style={{textAlign:'center',padding:'20px 12px',borderTop:'1px solid rgba(255,255,255,0.025)'}}>
        <div style={{fontSize:9.5,color:'#2D3A4E',marginBottom:6}}>
          {"CBUAE Register (June 2025) \u00B7 FY 2025 bank filings \u00B7 Data indicative \u2014 verify with your bank"}
        </div>
        <div style={{fontSize:9,color:'#3A4558'}}>
          {"Developed by "}
          <span style={{color:'#A78BFA',fontWeight:600}}>Vishal Vibin</span>
          {" \u00B7 \u00A9 2026 \u00B7 "}
          <span style={{color:'#4A5568'}}>Beta v1.0</span>
        </div>
      </div>

      <AddBankDrawer visible={drawerOpen} activeBankIds={activeBankIds} onToggle={toggleBank} onClose={()=>setDrawerOpen(false)}/>
    </div>
  )
}
