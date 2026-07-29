import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Home, DollarSign, FileCheck, Clock, Building2, Users, TrendingUp,
  Search, Bell, MapPin, LayoutDashboard, ClipboardList, Settings,
  UserCircle2, BarChart3, ChevronDown, Send, CheckCheck, Truck, ShoppingCart
} from 'lucide-react';

/* ================= THEME ================= */
const NAVY = '#12203A';
const NAVY_SOFT = '#1B2E4F';
const PAPER = '#F6F3EC';
const SLATE = '#5C6B7A';
const BRASS = '#B08D57';
const BRASS_2 = '#D9B97C';
const SAGE = '#6E8F71';
const CLAY = '#C1666B';
const LINE = 'rgba(18,32,58,0.12)';
const LINE_STRONG = 'rgba(18,32,58,0.24)';

const serif = "'Fraunces', Georgia, serif";
const mono = "'IBM Plex Mono', monospace";
const sans = "'Inter', sans-serif";

/* ================= BRAND ================= */
const BRAND_NAME = 'Casagrand';
const BRAND_TAGLINE = 'building aspirations';
/* Logo embedded as base64 so no extra image file is needed in the project */
const LOGO_DATA_URI = "data:image/png;base64,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";

/* ================= SAMPLE DATASET GENERATOR ================= */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const TYPES = ['Single Family','Condo','Townhouse','Multi-Family','Land','Commercial'];
const LOCATIONS = ['Tamil Nadu','Kerala','Andra Pradesh','Karnataka','Mumbai','Maharastra'];
const AGENTS = ['Sales Agents','AI Agent','Senior Sales Agent','Commercial Property Agent','Customer Relationship Agent','AI Marketing Agent'];
const SOURCES = ['Referral','Website','Walk-in','Social Media','Open House','Other'];
const BASE_PRICE = { 'Single Family':540000,'Condo':295000,'Townhouse':365000,'Multi-Family':820000,'Land':110000,'Commercial':1180000 };

/* Unique color per agent so each has a distinct "DP" (avatar) instead of one flat navy color */
const AGENT_AVATAR_COLORS = {
  'Sales Agents': '#B08D57',
  'AI Agent': '#6E8F71',
  'Senior Sales Agent': '#5B7FA6',
  'Commercial Property Agent': '#A65B7A',
  'Customer Relationship Agent': '#C1666B',
  'AI Marketing Agent': '#7A6BB0',
};
function agentColor(name) {
  return AGENT_AVATAR_COLORS[name] || BRASS;
}

/* ================= GROQ AI HELPER =================
   Reads the key from an environment variable — NEVER hardcode a real key here.
   In a Vite project: create a .env file in the project root with:
     VITE_GROQ_API_KEY=your_key_here
   then restart `npm run dev` (Vite only reads .env when the server starts).

   This asks the AI to CLASSIFY the question — it never invents numbers.
   The AI just decides: "should I show a chart (which one) or answer in words?"
   The actual numbers always come from the real agent stats already
   calculated in this app, so what's on screen stays 100% accurate.
*/
async function askGroqForAgentAnswer(question, agent) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_GROQ_API_KEY — add it to a .env file in your project root and restart the dev server.');
  }

  const context = `
Agent name: ${agent.name}
Total deals: ${agent.total}
Sold deals: ${agent.sold}
Total revenue (sold only): ${agent.revenue}
Average days on market: ${agent.avgDays}
Property types handled: ${agent.typeBreakdown.map(t => `${t.name} (${t.count})`).join(', ')}
Status breakdown: ${agent.statusBreakdown.map(s => `${s.name}: ${s.value}`).join(', ')}
  `.trim();

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a routing assistant for a real-estate agent dashboard chat. Given the user's question and the agent's stats, decide how to answer.
Reply with STRICT JSON only, no markdown, matching exactly one of these shapes:
1. If the question is best answered with a chart: {"kind":"chart","dataset":"revenue"|"types"|"deals"|"status","reason":"short reason"}
   - "revenue" = monthly revenue bar chart
   - "types" = property types handled bar chart
   - "deals" = monthly deal count bar chart
   - "status" = sold/pending/withdrawn pie chart
2. If the question is a general question best answered in words (e.g. days on market, comparisons, advice, greetings): {"kind":"text","answer":"1-3 sentence answer using ONLY the numbers given in context, no invented figures"}
Never invent numbers not present in the context.`
        },
        { role: 'user', content: `Agent stats:\n${context}\n\nQuestion: ${question}` },
      ],
      max_tokens: 200,
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error (${res.status}): ${errText}`);
  }
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content?.trim() || '{}';
  try {
    return JSON.parse(raw);
  } catch {
    return { kind: 'text', answer: raw };
  }
}

function buildDataset() {
  const rows = [];
  for (let i = 0; i < 84; i++) {
    const type = TYPES[i % TYPES.length];
    const location = LOCATIONS[(i * 3 + 1) % LOCATIONS.length];
    const agent = AGENTS[(i * 5 + 2) % AGENTS.length];
    const source = SOURCES[(i * 2 + 1) % SOURCES.length];
    const month = MONTHS[i % 12];
    const variance = ((i * 137) % 40 - 20) / 100;
    const price = Math.round(BASE_PRICE[type] * (1 + variance) / 500) * 500;
    const daysOnMarket = 8 + ((i * 11) % 55);
    const statusRoll = i % 9;
    const status = statusRoll === 0 ? 'Withdrawn' : statusRoll <= 2 ? 'Pending' : 'Sold';
    rows.push({
      id: `MR-${1000 + i}`,
      month, monthIndex: i % 12, type, location, agent, source, price, daysOnMarket, status,
      buyer: `${['J.','R.','K.','S.','M.','A.','N.','P.'][i % 8]} ${['Alvarez','Thompson','Fitzgerald','Patel','Nguyen','Reyes','Osei','Kapoor'][i % 8]}`,
    });
  }
  return rows;
}
const RAW = buildDataset();

/* ================= VENDOR DUMMY DATA (100 records) ================= */
const VENDOR_CATEGORIES = ['Furniture','Landscaping','Cleaning','Photography','Legal Services','Renovation','Staging','Inspection','Insurance','Marketing'];
const VENDOR_COMPANIES = ['Aster & Co','Brightline Supplies','Cedarwood Works','Delta Facilities','Everline Studio','Foundry Legal','Greenscape Pros','Harbor Inspections','Ironclad Insurance','Junction Media'];
const VENDOR_STATUS = ['Active','Pending Review','Inactive'];

function buildVendorDataset() {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    const category = VENDOR_CATEGORIES[i % VENDOR_CATEGORIES.length];
    const company = VENDOR_COMPANIES[(i * 3 + 2) % VENDOR_COMPANIES.length];
    const month = MONTHS[(i * 7) % 12];
    const invoiceBase = 500 + (category.length * 220);
    const variance = ((i * 91) % 60 - 30) / 100;
    const invoiceAmount = Math.round(invoiceBase * (1 + variance) / 10) * 10;
    const statusRoll = i % 10;
    const status = statusRoll === 0 ? 'Inactive' : statusRoll <= 2 ? 'Pending Review' : 'Active';
    const rating = 3 + ((i * 13) % 3);
    rows.push({
      id: `VN-${2000 + i}`,
      company: `${company} ${i % VENDOR_COMPANIES.length === 0 ? '' : ''}`.trim() + (i >= VENDOR_COMPANIES.length ? ` ${Math.floor(i / VENDOR_COMPANIES.length) + 1}` : ''),
      category, month, invoiceAmount, status, rating,
      contact: `${['Priya','Rahul','Ken','Aisha','Marco','Lena','Sam','Divya'][i % 8]} ${['Rao','Fernandes','Ito','Bello','Rossi','Kovac','Lee','Menon'][i % 8]}`,
    });
  }
  return rows;
}
const VENDOR_RAW = buildVendorDataset();

/* ================= SALES DUMMY DATA (100 records) ================= */
const SALES_STAGES = ['Lead','Contacted','Site Visit','Offer Made','Negotiation','Closed Won','Closed Lost'];
const SALES_REPS = ['Maria Chen','David Okafor','Priya Nair','Tom Reilly','Sana Malik','Leo Fischer'];
const SALES_CHANNELS = ['Cold Call','Referral','Web Inquiry','Open House','Walk-in','Partner Broker'];

function buildSalesDataset() {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    const stage = SALES_STAGES[i % SALES_STAGES.length];
    const rep = SALES_REPS[(i * 5 + 2) % SALES_REPS.length];
    const channel = SALES_CHANNELS[(i * 2 + 1) % SALES_CHANNELS.length];
    const month = MONTHS[i % 12];
    const propertyType = TYPES[(i * 3) % TYPES.length];
    const dealValueBase = BASE_PRICE[propertyType];
    const variance = ((i * 173) % 50 - 25) / 100;
    const dealValue = Math.round(dealValueBase * (1 + variance) / 500) * 500;
    const won = stage === 'Closed Won';
    const lost = stage === 'Closed Lost';
    const probability = won ? 100 : lost ? 0 : 20 + ((i * 17) % 70);
    rows.push({
      id: `SL-${3000 + i}`,      
      stage, rep, channel, month, propertyType, dealValue, probability,
      client: `${['J.','R.','K.','S.','M.','A.','N.','P.'][i % 8]} ${['Alvarez','Thompson','Fitzgerald','Patel','Nguyen','Reyes','Osei','Kapoor'][(i + 3) % 8]}`,
    });
  }
  return rows;
}
const SALES_RAW = buildSalesDataset();

const fmtMoney = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;
const initials = (name) => name.split(' ').map(w => w[0]).join('');

/* ================= SMALL UI PRIMITIVES ================= */
function Corner() {
  const s = { position: 'absolute', width: 12, height: 12, borderColor: BRASS_2, borderStyle: 'solid', borderWidth: 0 };
  return (
    <>
      <span style={{ ...s, top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...s, top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 }} />
      <span style={{ ...s, bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...s, bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </>
  );
}

/* Avatar component — colored circle with initials, unique color per agent */
function Avatar({ name, size = 26, fontSize = 10 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: agentColor(name), color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize, flexShrink: 0,
      fontWeight: 600,
    }}>
      {initials(name)}
    </div>
  );
}

function Panel({ title, icon: Icon, children, footer, style }) {
  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.6)', border: `1px solid ${LINE_STRONG}`, padding: 20, ...style }}>
      <Corner />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: SLATE }}>
        {Icon ? <Icon size={13} color={BRASS} /> : <span style={{ width: 6, height: 6, background: BRASS, display: 'inline-block' }} />}
        {title}
      </div>
      {children}
      {footer && <div style={{ marginTop: 12, fontFamily: mono, fontSize: 10.5, color: SLATE }}>{footer}</div>}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: NAVY, color: PAPER, padding: '8px 12px', fontFamily: mono, fontSize: 12, border: `1px solid ${BRASS}` }}>
      <div style={{ color: BRASS_2, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i}>{p.name}: {typeof p.value === 'number' && p.value > 1000 ? fmtMoney(p.value) : p.value}</div>
      ))}
    </div>
  );
}

function Select({ value, onChange, options, labelAll }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: 'none', fontFamily: mono, fontSize: 12.5, padding: '9px 30px 9px 12px',
          background: '#fff', border: `1px solid ${LINE_STRONG}`, color: NAVY, cursor: 'pointer'
        }}
      >
        <option value="All">{labelAll}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={13} style={{ position: 'absolute', right: 10, top: 10, pointerEvents: 'none', color: SLATE }} />
    </div>
  );
}

function StatusTag({ status }) {
  const c = status === 'Sold' ? SAGE : status === 'Pending' ? CLAY : SLATE;
  return (
    <span style={{ fontFamily: mono, fontSize: 9.5, padding: '2px 7px', textTransform: 'uppercase', letterSpacing: '0.04em', border: `1px solid ${c}`, color: c }}>
      {status}
    </span>
  );
}

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'vendor', label: 'Vendor', icon: Truck },
  { key: 'sales', label: 'Sales', icon: ShoppingCart },
  { key: 'properties', label: 'Properties', icon: Building2 },
  { key: 'agents', label: 'Agents', icon: Users },
  { key: 'reports', label: 'Reports', icon: ClipboardList },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const SECTION_EYEBROW = {
  dashboard: `${BRAND_NAME} — Portfolio Ledger`,
  properties: `${BRAND_NAME} — Property Register`,
  agents: `${BRAND_NAME} — Agent Roster`,
  vendor: `${BRAND_NAME} — Vendor Management`,
  sales: `${BRAND_NAME} — Sales Pipeline`,
  reports: `${BRAND_NAME} — Financial Reports`,
  analytics: `${BRAND_NAME} — Market Analytics`,
  settings: `${BRAND_NAME} — Workspace Settings`,
};
const SECTION_TITLE = {
  dashboard: 'Real Estate Dashboard',
  properties: 'Properties',
  agents: 'Agents',
  vendor: 'Vendor',
  sales: 'Sales',
  reports: 'Reports',
  analytics: 'Analytics',
  settings: 'Settings',
};

/* ================= DASHBOARD TAB ================= */
function DashboardTab({ month, setMonth, type, setType, location, setLocation }) {
  const filtered = useMemo(() => RAW.filter(r =>
    (month === 'All' || r.month === month) &&
    (type === 'All' || r.type === type) &&
    (location === 'All' || r.location === location)
  ), [month, type, location]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const revenue = filtered.reduce((s, r) => s + r.price, 0);
    const sold = filtered.filter(r => r.status === 'Sold').length;
    const pending = filtered.filter(r => r.status === 'Pending').length;
    const avgDays = total ? Math.round(filtered.reduce((s, r) => s + r.daysOnMarket, 0) / total) : 0;
    const avgPrice = total ? Math.round(revenue / total) : 0;
    return { total, revenue, sold, pending, avgDays, avgPrice };
  }, [filtered]);

  const typeData = useMemo(() => {
    const base = RAW.filter(r => (month === 'All' || r.month === month) && (location === 'All' || r.location === location));
    return TYPES.map(t => ({ name: t, units: base.filter(r => r.type === t).length }));
  }, [month, location]);

  const monthlyData = useMemo(() => {
    const base = RAW.filter(r => (type === 'All' || r.type === type) && (location === 'All' || r.location === location));
    return MONTHS.map((m) => ({
      name: m,
      revenue: base.filter(r => r.month === m).reduce((s, r) => s + r.price, 0),
    }));
  }, [type, location]);

  const statusData = useMemo(() => {
    const c = { Sold: 0, Pending: 0, Withdrawn: 0 };
    filtered.forEach(r => c[r.status]++);
    return [
      { name: 'Sold', value: c.Sold, color: SAGE },
      { name: 'Pending', value: c.Pending, color: CLAY },
      { name: 'Withdrawn', value: c.Withdrawn, color: SLATE },
    ];
  }, [filtered]);

  const locationData = useMemo(() => {
    return LOCATIONS.map(loc => ({
      name: loc,
      units: RAW.filter(r =>
        r.location === loc &&
        (month === 'All' || r.month === month) &&
        (type === 'All' || r.type === type)
      ).length
    })).sort((a, b) => b.units - a.units);
  }, [month, type]);

  const agentData = useMemo(() => {
    const map = {};
    filtered.forEach(r => { map[r.agent] = (map[r.agent] || 0) + r.price; });
    return Object.entries(map).map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [filtered]);
  const maxAgentRevenue = Math.max(1, ...agentData.map(a => a.revenue));

  const sourceData = useMemo(() => {
    const total = filtered.length || 1;
    const map = {};
    filtered.forEach(r => { map[r.source] = (map[r.source] || 0) + 1; });
    const palette = [NAVY, BRASS, SAGE, CLAY, SLATE, BRASS_2];
    return Object.entries(map)
      .map(([name, count], i) => ({ name, pct: Math.round(count / total * 100), color: palette[i % palette.length] }))
      .sort((a, b) => b.pct - a.pct);
  }, [filtered]);

  const recentSales = useMemo(() => [...filtered].slice(-8).reverse(), [filtered]);

  const kpis = [
    { label: 'Total Properties', value: stats.total, icon: Home, note: `${type === 'All' ? 'all types' : type}` },
    { label: 'Revenue', value: fmtMoney(stats.revenue), icon: DollarSign, note: 'sum of filtered deals' },
    { label: 'Sold', value: stats.sold, icon: FileCheck, note: stats.total ? `${Math.round(stats.sold / stats.total * 100)}% close rate` : '—' },
    { label: 'Pending', value: stats.pending, icon: Clock, note: 'awaiting close' },
    { label: 'Avg. Days on Market', value: stats.avgDays, icon: TrendingUp, note: 'per listing' },
    { label: 'Avg. Sale Price', value: fmtMoney(stats.avgPrice || 0), icon: Building2, note: 'per deal' },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
        <Select value={month} onChange={setMonth} options={MONTHS} labelAll="All Months" />
        <Select value={type} onChange={setType} options={TYPES} labelAll="All Types" />
        <Select value={location} onChange={setLocation} options={LOCATIONS} labelAll="All Locations" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 22 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ position: 'relative', background: NAVY, color: PAPER, padding: '16px 16px' }}>
            <Corner />
            <k.icon size={15} color={BRASS_2} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9FB0C5', marginTop: 8 }}>{k.label}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, color: BRASS_2, marginTop: 3 }}>{k.note}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20, marginBottom: 20 }}>
        <Panel title={`Property Type Sales ${month !== 'All' ? '— ' + month : ''}`} icon={BarChart3}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={typeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
              <Bar dataKey="units" name="Units" radius={[2, 2, 0, 0]}>
                {typeData.map((d, i) => <Cell key={i} fill={d.name === type ? BRASS : NAVY} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={`Monthly Revenue ${type !== 'All' ? '— ' + type : ''} ${location !== 'All' ? '— ' + location : ''}`} icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRASS} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={BRASS} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={BRASS} strokeWidth={2.5} fill="url(#rev)" dot={{ r: 3, fill: NAVY }} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <Panel title="Property Status" icon={FileCheck}>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: sans }} />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={`Sales by Location ${type !== 'All' ? '— ' + type : ''} ${month !== 'All' ? '— ' + month : ''}`} icon={MapPin}>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid stroke={LINE} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: SLATE }} axisLine={false} tickLine={false} width={78} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
              <Bar dataKey="units" name="Units" radius={[0, 2, 2, 0]}>
                {locationData.map((d, i) => <Cell key={i} fill={d.name === location ? BRASS : SAGE} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr 1.4fr', gap: 20 }}>
        <Panel title="Top Agents" icon={Users} footer="ranked by filtered revenue">
          {agentData.length === 0 ? (
            <div style={{ fontFamily: mono, fontSize: 12, color: SLATE }}>No data for this filter.</div>
          ) : agentData.map((a, i) => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < agentData.length - 1 ? `1px solid ${LINE}` : 'none' }}>
              <Avatar name={a.name} size={26} fontSize={10} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: serif, fontSize: 12.5, marginBottom: 4 }}>{a.name}</div>
                <div style={{ height: 5, background: 'rgba(18,32,58,0.08)' }}>
                  <div style={{ height: '100%', width: `${(a.revenue / maxAgentRevenue) * 100}%`, background: agentColor(a.name) }} />
                </div>
              </div>
              <div style={{ fontFamily: mono, fontSize: 11, color: SLATE, flexShrink: 0 }}>{fmtMoney(a.revenue)}</div>
            </div>
          ))}
        </Panel>

        <Panel title="Customer Source" icon={UserCircle2} footer="share of filtered deals">
          {sourceData.map((s, i) => (
            <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < sourceData.length - 1 ? `1px solid ${LINE}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, background: s.color, display: 'inline-block', borderRadius: '50%' }} />
                <span style={{ fontSize: 12.5 }}>{s.name}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: 11.5, color: SLATE }}>{s.pct}%</span>
            </div>
          ))}
        </Panel>

        <Panel title="Recent Sales" icon={ClipboardList} footer={`showing ${recentSales.length} of ${filtered.length} filtered records`}>
          <div style={{ maxHeight: 230, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  {['ID', 'Buyer', 'Price', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontFamily: mono, fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: SLATE, borderBottom: `1px solid ${LINE_STRONG}`, padding: '0 8px 8px 0', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSales.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '14px 0', fontFamily: mono, fontSize: 12, color: SLATE }}>No records match this filter.</td></tr>
                ) : recentSales.map(r => (
                  <tr key={r.id}>
                    <td style={{ padding: '8px 8px 8px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11, color: SLATE }}>{r.id}</td>
                    <td style={{ padding: '8px 8px 8px 0', borderBottom: `1px solid ${LINE}`, fontFamily: serif, fontWeight: 500 }}>{r.buyer}</td>
                    <td style={{ padding: '8px 8px 8px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{fmtMoney(r.price)}</td>
                    <td style={{ padding: '8px 8px 8px 0', borderBottom: `1px solid ${LINE}` }}><StatusTag status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div style={{ fontFamily: mono, fontSize: 10.5, color: SLATE, textAlign: 'center', marginTop: 20 }}>
        Every chart, KPI, and table above recalculates live from {RAW.length} underlying deal records as you change the filters.
      </div>
    </>
  );
}

/* ================= PROPERTIES TAB ================= */
function PropertiesTab({ search }) {
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const q = (search || '').trim().toLowerCase();
  const rows = RAW.filter(r =>
    (type === 'All' || r.type === type) &&
    (status === 'All' || r.status === status) &&
    (!q || r.id.toLowerCase().includes(q) || r.buyer.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))
  );

  return (
    <Panel title={`Property Register — ${rows.length} records`} icon={Building2}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <Select value={type} onChange={setType} options={TYPES} labelAll="All Types" />
        <Select value={status} onChange={setStatus} options={['Sold', 'Pending', 'Withdrawn']} labelAll="All Statuses" />
      </div>
      <div style={{ maxHeight: 460, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr>
              {['ID', 'Type', 'Location', 'Month', 'Days on Mkt', 'Price', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontFamily: mono, fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: SLATE, borderBottom: `1px solid ${LINE_STRONG}`, padding: '0 10px 10px 0', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 40).map(r => (
              <tr key={r.id}>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11, color: SLATE }}>{r.id}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: serif }}>{r.type}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>{r.location}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11 }}>{r.month}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11 }}>{r.daysOnMarket}d</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{fmtMoney(r.price)}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}><StatusTag status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* ================= AGENTS TAB — WhatsApp/Instagram-style Q&A chat ================= */
function datasetToChartAnswer(datasetKey, agent) {
  switch (datasetKey) {
    case 'revenue':
      return { kind: 'bar', title: `Monthly Revenue — ${agent.name}`, data: agent.revenueMonthly, dataKey: 'revenue', color: BRASS, valueFmt: fmtMoney };
    case 'types':
      return { kind: 'bar', title: `Property Types Handled — ${agent.name}`, data: agent.typeBreakdown, dataKey: 'count', color: BRASS };
    case 'status':
      return { kind: 'pie', title: `Deal Status — ${agent.name}`, data: agent.statusBreakdown };
    case 'deals':
    default:
      return { kind: 'bar', title: `Monthly Deals — ${agent.name}`, data: agent.monthly, dataKey: 'deals', color: SAGE };
  }
}

function ChatChartBubble({ answer }) {
  if (answer.kind === 'text') {
    return (
      <div style={{ maxWidth: 380, background: '#fff', border: `1px solid ${LINE_STRONG}`, borderRadius: '2px 12px 12px 12px', padding: '10px 14px', fontFamily: sans, fontSize: 13 }}>
        {answer.text}
      </div>
    );
  }
  if (answer.kind === 'pie') {
    return (
      <div style={{ maxWidth: 420, width: '100%', background: '#fff', border: `1px solid ${LINE_STRONG}`, borderRadius: '2px 12px 12px 12px', padding: 16 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: SLATE, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{answer.title}</div>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie data={answer.data} dataKey="value" nameKey="name" innerRadius={42} outerRadius={65} paddingAngle={2}>
              {answer.data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Legend verticalAlign="bottom" height={20} iconType="circle" wrapperStyle={{ fontSize: 10.5, fontFamily: sans }} />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: mono, fontSize: 9.5, color: SLATE }}>
          just now <CheckCheck size={12} color={SAGE} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 420, width: '100%', background: '#fff', border: `1px solid ${LINE_STRONG}`, borderRadius: '2px 12px 12px 12px', padding: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: SLATE, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{answer.title}</div>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={answer.data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <CartesianGrid stroke={LINE} vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} interval={answer.data.length > 8 ? 1 : 0} angle={answer.data.length > 8 ? 0 : -15} textAnchor={answer.data.length > 8 ? 'middle' : 'end'} height={answer.data.length > 8 ? 30 : 45} />
          <YAxis tick={{ fontSize: 9.5, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} tickFormatter={answer.valueFmt ? (v => `$${v / 1000}k`) : undefined} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
          <Bar dataKey={answer.dataKey} name={answer.dataKey} fill={answer.color} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 6, fontFamily: mono, fontSize: 9.5, color: SLATE }}>
        just now <CheckCheck size={12} color={SAGE} />
      </div>
    </div>
  );
}

function AgentsTab({ search }) {
  const roster = useMemo(() => AGENTS.map(name => {
    const deals = RAW.filter(r => r.agent === name);
    const sold = deals.filter(r => r.status === 'Sold');
    const monthly = MONTHS.map(m => ({ name: m, deals: deals.filter(r => r.month === m).length }));
    const revenueMonthly = MONTHS.map(m => ({ name: m, revenue: deals.filter(r => r.month === m).reduce((s, r) => s + r.price, 0) }));
    const typeBreakdown = TYPES.map(t => ({ name: t, count: deals.filter(r => r.type === t).length })).filter(d => d.count > 0);
    const statusCounts = { Sold: 0, Pending: 0, Withdrawn: 0 };
    deals.forEach(r => statusCounts[r.status]++);
    const statusBreakdown = [
      { name: 'Sold', value: statusCounts.Sold, color: SAGE },
      { name: 'Pending', value: statusCounts.Pending, color: CLAY },
      { name: 'Withdrawn', value: statusCounts.Withdrawn, color: SLATE },
    ];
    return {
      name,
      total: deals.length,
      sold: sold.length,
      revenue: sold.reduce((s, r) => s + r.price, 0),
      avgDays: deals.length ? Math.round(deals.reduce((s, r) => s + r.daysOnMarket, 0) / deals.length) : 0,
      monthly, revenueMonthly, typeBreakdown, statusBreakdown,
    };
  }).sort((a, b) => b.revenue - a.revenue), []);

  const visibleRoster = useMemo(() => {
    if (!search || !search.trim()) return roster;
    const q = search.trim().toLowerCase();
    return roster.filter(a => a.name.toLowerCase().includes(q));
  }, [roster, search]);

  const [selectedName, setSelectedName] = useState(roster[0].name);
  const selected = roster.find(a => a.name === selectedName) || roster[0];

  const [conversations, setConversations] = useState({});
  const thread = conversations[selectedName] || [];

  const [draft, setDraft] = useState('');
  const [aiThinking, setAiThinking] = useState(false);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || aiThinking) return;
    setDraft('');
    setConversations(prev => ({
      ...prev,
      [selectedName]: [...(prev[selectedName] || []), { role: 'user', kind: 'text', text }],
    }));
    setAiThinking(true);
    try {
      const routed = await askGroqForAgentAnswer(text, selected);
      let answer;
      if (routed.kind === 'chart') {
        answer = datasetToChartAnswer(routed.dataset, selected);
      } else {
        answer = { kind: 'text', title: null, text: routed.answer || 'Sorry, I could not find an answer.' };
      }
      setConversations(prev => ({
        ...prev,
        [selectedName]: [...(prev[selectedName] || []), { role: 'agent', ...answer }],
      }));
    } catch (err) {
      setConversations(prev => ({
        ...prev,
        [selectedName]: [...(prev[selectedName] || []), { role: 'agent', kind: 'text', title: null, text: `⚠️ ${err.message}` }],
      }));
    } finally {
      setAiThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  if (visibleRoster.length === 0) {
    return (
      <div style={{ position: 'relative', padding: 40, textAlign: 'center', background: '#fff', border: `1px solid ${LINE_STRONG}` }}>
        <Corner />
        <div style={{ fontFamily: mono, fontSize: 12.5, color: SLATE }}>No agents match "{search}".</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'flex', height: 560, background: '#fff', border: `1px solid ${LINE_STRONG}` }}>
      <Corner />

      {/* ===== Contact list (left) ===== */}
      <div style={{ width: 260, flexShrink: 0, borderRight: `1px solid ${LINE_STRONG}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LINE_STRONG}`, fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: SLATE }}>
          Agents · {visibleRoster.length}
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {visibleRoster.map(a => {
            const active = a.name === selectedName;
            return (
              <div
                key={a.name}
                onClick={() => setSelectedName(a.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', cursor: 'pointer',
                  background: active ? 'rgba(110,143,113,0.12)' : 'transparent',
                  borderLeft: active ? `2px solid ${SAGE}` : '2px solid transparent',
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar name={a.name} size={38} fontSize={12} />
                  <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: active ? SAGE : '#B7C2D2', border: '2px solid #fff' }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 13, color: active ? SAGE : NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.name}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: active ? SAGE : SLATE, marginTop: 2 }}>
                    {active ? '● Active' : `${a.total} deals`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Chat window (right) ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* chat header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: `1px solid ${LINE_STRONG}` }}>
          <div style={{ position: 'relative' }}>
            <Avatar name={selected.name} size={34} fontSize={11} />
            <span style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: SAGE, border: '2px solid #fff' }} />
          </div>
          <div>
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 14.5 }}>{selected.name}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: SAGE }}>● Active now</div>
          </div>
        </div>

        {/* chat body */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: 20,
          background: `linear-gradient(${LINE} 1px, transparent 1px) 0 0/28px 28px, linear-gradient(90deg, ${LINE} 1px, transparent 1px) 0 0/28px 28px, ${PAPER}`,
        }}>
          {/* greeting bubble, always shown */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <Avatar name={selected.name} size={26} fontSize={9.5} />
            <div style={{ maxWidth: 380, background: '#fff', border: `1px solid ${LINE_STRONG}`, borderRadius: '2px 12px 12px 12px', padding: '10px 14px', fontFamily: sans, fontSize: 13 }}>
              Hi! Ask me about my deals, revenue, property types, or status — I'll send you a chart. 📊
            </div>
          </div>

          {/* conversation thread */}
          {thread.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 14, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'agent' && <Avatar name={selected.name} size={26} fontSize={9.5} />}
              {m.role === 'user' ? (
                <div style={{ maxWidth: 320, background: NAVY, color: PAPER, borderRadius: '12px 2px 12px 12px', padding: '10px 14px', fontFamily: sans, fontSize: 13 }}>
                  {m.text}
                </div>
              ) : (
                <ChatChartBubble answer={m} />
              )}
            </div>
          ))}

          {aiThinking && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <Avatar name={selected.name} size={26} fontSize={9.5} />
              <div style={{ background: '#fff', border: `1px solid ${LINE_STRONG}`, borderRadius: '2px 12px 12px 12px', padding: '10px 14px', fontFamily: mono, fontSize: 12, color: SLATE }}>
                typing…
              </div>
            </div>
          )}
        </div>

        {/* input bar — functional */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderTop: `1px solid ${LINE_STRONG}` }}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={aiThinking}
            placeholder={aiThinking ? 'Waiting for response…' : `Ask ${selected.name} something… e.g. "how's my revenue trending?"`}
            style={{ flex: 1, fontFamily: mono, fontSize: 12, color: NAVY, border: `1px solid ${LINE_STRONG}`, padding: '9px 12px', background: aiThinking ? '#eee' : PAPER, outline: 'none' }}
          />
          <button
            onClick={handleSend}
            disabled={aiThinking}
            style={{ background: aiThinking ? '#B7C2D2' : SAGE, border: 'none', width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: aiThinking ? 'default' : 'pointer' }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REPORTS TAB ================= */
function ReportsTab() {
  const totalRevenue = RAW.filter(r => r.status === 'Sold').reduce((s, r) => s + r.price, 0);
  const conversion = Math.round((RAW.filter(r => r.status === 'Sold').length / RAW.length) * 100);
  const byType = TYPES.map(t => {
    const deals = RAW.filter(r => r.type === t && r.status === 'Sold');
    return { type: t, count: deals.length, revenue: deals.reduce((s, r) => s + r.price, 0) };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Revenue (YTD)', value: fmtMoney(totalRevenue), icon: DollarSign },
          { label: 'Conversion Rate', value: `${conversion}%`, icon: FileCheck },
          { label: 'Best Category', value: byType[0]?.type || '—', icon: Building2 },
        ].map((k, i) => (
          <div key={i} style={{ position: 'relative', background: NAVY, color: PAPER, padding: '16px 16px' }}>
            <Corner />
            <k.icon size={15} color={BRASS_2} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 22 }}>{k.value}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9FB0C5', marginTop: 8 }}>{k.label}</div>
          </div>
        ))}
      </div>
      <Panel title="Revenue Breakdown by Property Type" icon={ClipboardList}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr>
              {['Type', 'Units Sold', 'Revenue', 'Share'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontFamily: mono, fontSize: 9.5, textTransform: 'uppercase', color: SLATE, borderBottom: `1px solid ${LINE_STRONG}`, padding: '0 10px 10px 0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {byType.map(row => (
              <tr key={row.type}>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: serif }}>{row.type}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>{row.count}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{fmtMoney(row.revenue)}</td>
                <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>
                  {totalRevenue ? Math.round((row.revenue / totalRevenue) * 100) : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

/* ================= ANALYTICS TAB ================= */
function AnalyticsTab() {
  const trend = MONTHS.map(m => ({
    name: m,
    deals: RAW.filter(r => r.month === m).length,
    sold: RAW.filter(r => r.month === m && r.status === 'Sold').length,
  }));
  const avgDaysByType = TYPES.map(t => {
    const deals = RAW.filter(r => r.type === t);
    return { name: t, avgDays: deals.length ? Math.round(deals.reduce((s, r) => s + r.daysOnMarket, 0) / deals.length) : 0 };
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <Panel title="Deals vs Sold — 12 Month Trend" icon={TrendingUp}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke={LINE} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: sans }} />
            <Line type="monotone" dataKey="deals" name="Total Deals" stroke={SLATE} strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="sold" name="Sold" stroke={SAGE} strokeWidth={2.5} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Avg. Days on Market by Type" icon={BarChart3}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={avgDaysByType} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={LINE} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
            <Bar dataKey="avgDays" name="Avg Days" fill={BRASS} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}

/* ================= VENDOR TAB ================= */
function VendorTab({ search }) {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const q = (search || '').trim().toLowerCase();

  const rows = useMemo(() => VENDOR_RAW.filter(v =>
    (category === 'All' || v.category === category) &&
    (status === 'All' || v.status === status) &&
    (!q || v.company.toLowerCase().includes(q) || v.contact.toLowerCase().includes(q) || v.category.toLowerCase().includes(q))
  ), [category, status, q]);

  const stats = useMemo(() => {
    const total = rows.length;
    const active = rows.filter(v => v.status === 'Active').length;
    const totalInvoice = rows.reduce((s, v) => s + v.invoiceAmount, 0);
    const avgRating = total ? (rows.reduce((s, v) => s + v.rating, 0) / total).toFixed(1) : '0.0';
    return { total, active, totalInvoice, avgRating };
  }, [rows]);

  const categoryData = useMemo(() => VENDOR_CATEGORIES.map(c => ({
    name: c, count: VENDOR_RAW.filter(v => v.category === c && (status === 'All' || v.status === status)).length
  })), [status]);

  const spendByCategory = useMemo(() => VENDOR_CATEGORIES.map(c => ({
    name: c, spend: VENDOR_RAW.filter(v => v.category === c).reduce((s, v) => s + v.invoiceAmount, 0)
  })).sort((a, b) => b.spend - a.spend), []);

  const kpis = [
    { label: 'Total Vendors', value: stats.total, icon: Truck },
    { label: 'Active Vendors', value: stats.active, icon: FileCheck },
    { label: 'Total Invoiced', value: fmtMoney(stats.totalInvoice), icon: DollarSign },
    { label: 'Avg. Rating', value: `${stats.avgRating} / 5`, icon: Users },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ position: 'relative', background: NAVY, color: PAPER, padding: '16px 16px' }}>
            <Corner />
            <k.icon size={15} color={BRASS_2} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9FB0C5', marginTop: 8 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <Panel title="Vendors by Category" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
              <Bar dataKey="count" name="Vendors" fill={NAVY} radius={[2, 2, 0, 0]}>
                {categoryData.map((d, i) => <Cell key={i} fill={d.name === category ? BRASS : NAVY} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Spend by Category" icon={DollarSign}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={spendByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid stroke={LINE} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10.5, fill: SLATE }} axisLine={false} tickLine={false} width={95} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
              <Bar dataKey="spend" name="Spend" fill={SAGE} radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title={`Vendor Directory — ${rows.length} records`} icon={Truck}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <Select value={category} onChange={setCategory} options={VENDOR_CATEGORIES} labelAll="All Categories" />
          <Select value={status} onChange={setStatus} options={VENDOR_STATUS} labelAll="All Statuses" />
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr>
                {['ID', 'Company', 'Category', 'Contact', 'Invoice', 'Rating', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontFamily: mono, fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: SLATE, borderBottom: `1px solid ${LINE_STRONG}`, padding: '0 10px 10px 0', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 40).map(v => (
                <tr key={v.id}>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11, color: SLATE }}>{v.id}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: serif }}>{v.company}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>{v.category}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11 }}>{v.contact}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{fmtMoney(v.invoiceAmount)}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, color: BRASS }}>{'★'.repeat(v.rating)}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>
                    <span style={{
                      fontFamily: mono, fontSize: 9.5, padding: '2px 7px', textTransform: 'uppercase', letterSpacing: '0.04em',
                      border: `1px solid ${v.status === 'Active' ? SAGE : v.status === 'Pending Review' ? CLAY : SLATE}`,
                      color: v.status === 'Active' ? SAGE : v.status === 'Pending Review' ? CLAY : SLATE
                    }}>{v.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* ================= SALES TAB ================= */
function SalesTab({ search }) {
  const [rep, setRep] = useState('All');
  const [stage, setStage] = useState('All');
  const q = (search || '').trim().toLowerCase();

  const rows = useMemo(() => SALES_RAW.filter(s =>
    (rep === 'All' || s.rep === rep) &&
    (stage === 'All' || s.stage === stage) &&
    (!q || s.client.toLowerCase().includes(q) || s.rep.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
  ), [rep, stage, q]);

  const stats = useMemo(() => {
    const total = rows.length;
    const won = rows.filter(s => s.stage === 'Closed Won');
    const wonValue = won.reduce((s, r) => s + r.dealValue, 0);
    const pipelineValue = rows.filter(s => s.stage !== 'Closed Won' && s.stage !== 'Closed Lost').reduce((s, r) => s + r.dealValue, 0);
    const winRate = total ? Math.round(won.length / total * 100) : 0;
    return { total, wonCount: won.length, wonValue, pipelineValue, winRate };
  }, [rows]);

  const stageData = useMemo(() => SALES_STAGES.map(st => ({
    name: st, count: SALES_RAW.filter(s => s.stage === st && (rep === 'All' || s.rep === rep)).length
  })), [rep]);

  const channelData = useMemo(() => {
    const total = SALES_RAW.length;
    const palette = [NAVY, BRASS, SAGE, CLAY, SLATE, BRASS_2];
    return SALES_CHANNELS.map((c, i) => ({
      name: c,
      pct: Math.round(SALES_RAW.filter(s => s.channel === c).length / total * 100),
      color: palette[i % palette.length],
    }));
  }, []);

  const kpis = [
    { label: 'Total Opportunities', value: stats.total, icon: ShoppingCart },
    { label: 'Closed Won', value: stats.wonCount, icon: FileCheck },
    { label: 'Won Value', value: fmtMoney(stats.wonValue), icon: DollarSign },
    { label: 'Win Rate', value: `${stats.winRate}%`, icon: TrendingUp },
    { label: 'Open Pipeline Value', value: fmtMoney(stats.pipelineValue), icon: Clock },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 22 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ position: 'relative', background: NAVY, color: PAPER, padding: '16px 16px' }}>
            <Corner />
            <k.icon size={15} color={BRASS_2} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 20, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9FB0C5', marginTop: 8 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 20 }}>
        <Panel title={`Pipeline by Stage ${rep !== 'All' ? '— ' + rep : ''}`} icon={BarChart3}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={stageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: SLATE }} axisLine={{ stroke: LINE_STRONG }} tickLine={false} interval={0} angle={-25} textAnchor="end" height={55} />
              <YAxis tick={{ fontSize: 10, fill: SLATE, fontFamily: mono }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(18,32,58,0.05)' }} />
              <Bar dataKey="count" name="Deals" radius={[2, 2, 0, 0]}>
                {stageData.map((d, i) => <Cell key={i} fill={d.name === 'Closed Won' ? SAGE : d.name === 'Closed Lost' ? CLAY : NAVY} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Lead Source Channel" icon={UserCircle2} footer="share of all 100 sales records">
          {channelData.map((c, i) => (
            <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < channelData.length - 1 ? `1px solid ${LINE}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, background: c.color, display: 'inline-block', borderRadius: '50%' }} />
                <span style={{ fontSize: 12.5 }}>{c.name}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: 11.5, color: SLATE }}>{c.pct}%</span>
            </div>
          ))}
        </Panel>
      </div>

      <Panel title={`Sales Pipeline — ${rows.length} records`} icon={ShoppingCart}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <Select value={rep} onChange={setRep} options={SALES_REPS} labelAll="All Reps" />
          <Select value={stage} onChange={setStage} options={SALES_STAGES} labelAll="All Stages" />
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr>
                {['ID', 'Client', 'Rep', 'Property Type', 'Deal Value', 'Probability', 'Stage'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontFamily: mono, fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: SLATE, borderBottom: `1px solid ${LINE_STRONG}`, padding: '0 10px 10px 0', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 40).map(s => (
                <tr key={s.id}>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11, color: SLATE }}>{s.id}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: serif }}>{s.client}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono, fontSize: 11 }}>{s.rep}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>{s.propertyType}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{fmtMoney(s.dealValue)}</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}`, fontFamily: mono }}>{s.probability}%</td>
                  <td style={{ padding: '9px 10px 9px 0', borderBottom: `1px solid ${LINE}` }}>
                    <span style={{
                      fontFamily: mono, fontSize: 9.5, padding: '2px 7px', textTransform: 'uppercase', letterSpacing: '0.04em',
                      border: `1px solid ${s.stage === 'Closed Won' ? SAGE : s.stage === 'Closed Lost' ? CLAY : SLATE}`,
                      color: s.stage === 'Closed Won' ? SAGE : s.stage === 'Closed Lost' ? CLAY : SLATE
                    }}>{s.stage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* ================= SETTINGS TAB ================= */
function SettingsTab() {
  const [form, setForm] = useState({
    company: BRAND_NAME,
    email: 'ledger@casagrand.example',
    currency: 'USD ($)',
    notify: true,
  });
  const [saved, setSaved] = useState(false);
  const inputStyle = { width: '100%', fontFamily: mono, fontSize: 12.5, padding: '9px 12px', border: `1px solid ${LINE_STRONG}`, background: '#fff', color: NAVY, boxSizing: 'border-box' };
  const labelStyle = { display: 'flex', flexDirection: 'column', gap: 6, fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: NAVY_SOFT };

  return (
    <Panel title="Workspace Settings" icon={Settings} style={{ maxWidth: 460 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={labelStyle}>
          Company Name
          <input style={inputStyle} value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
        </label>
        <label style={labelStyle}>
          Notification Email
          <input style={inputStyle} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </label>
        <label style={labelStyle}>
          Currency Format
          <select style={{ ...inputStyle, appearance: 'none' }} value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
            <option>USD ($)</option>
            <option>INR (₹)</option>
            <option>EUR (€)</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: sans, fontSize: 12.5 }}>
          <input type="checkbox" checked={form.notify} onChange={e => setForm(f => ({ ...f, notify: e.target.checked }))} />
          Enable email notifications
        </label>
        <button
          onClick={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          style={{ marginTop: 4, background: NAVY, color: BRASS_2, border: 'none', padding: '11px 20px', fontFamily: mono, fontSize: 12.5, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', width: 'fit-content' }}
        >
          {saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </Panel>
  );
}

/* ================= LOGIN PAGE ================= */
/* Demo credentials — change these to whatever you want */
const DEMO_USERNAME = 'Casagrand';
const DEMO_PASSWORD = 'Casa@2026';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password.');
    }
  };

  const inputStyle = {
    width: '100%', fontFamily: mono, fontSize: 13, padding: '11px 14px',
    border: `1px solid ${LINE_STRONG}`, background: '#fff', color: NAVY, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: sans, color: NAVY,
      background: `linear-gradient(${LINE} 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, ${LINE} 1px, transparent 1px) 0 0/40px 40px, ${PAPER}`
    }}>
      <div style={{ position: 'relative', width: 360, background: 'rgba(255,255,255,0.7)', border: `1px solid ${LINE_STRONG}`, padding: '36px 32px' }}>
        <Corner />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <img src={LOGO_DATA_URI} alt={`${BRAND_NAME} logo`} style={{ height: 34, width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ textAlign: 'center', fontFamily: mono, fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: SLATE, marginBottom: 28 }}>
          {BRAND_TAGLINE}
        </div>

        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: BRASS, marginBottom: 4, textAlign: 'center' }}>
          Portfolio Ledger
        </div>
        <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, textAlign: 'center', margin: '0 0 26px 0' }}>
          Sign In
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 10, textTransform: 'uppercase', color: SLATE, marginBottom: 6 }}>Username</div>
            <input
              style={inputStyle}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Casagrand"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 10, textTransform: 'uppercase', color: SLATE, marginBottom: 6 }}>Password</div>
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...inputStyle, paddingRight: 50 }}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute', right: 10, top: 9, fontFamily: mono, fontSize: 10, color: SLATE,
                  background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontFamily: mono, fontSize: 11, color: CLAY, marginBottom: 12, marginTop: 8 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%', marginTop: 20, background: NAVY, color: PAPER, border: 'none',
              padding: '12px 20px', fontFamily: mono, fontSize: 12.5, letterSpacing: '0.06em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ fontFamily: mono, fontSize: 10, color: SLATE, textAlign: 'center', marginTop: 20 }}>
          Demo credentials — Casagrand / Casa@2026
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN APP SHELL ================= */
export default function RealEstateDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [month, setMonth] = useState('All');
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');
  const [search, setSearch] = useState('');

  const searchPlaceholder = activeTab === 'agents' ? 'Search agents…'
    : activeTab === 'properties' ? 'Search properties…'
    : activeTab === 'vendor' ? 'Search vendors…'
    : activeTab === 'sales' ? 'Search sales pipeline…'
    : 'Search properties, agents…';

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{
      minHeight: '100vh', fontFamily: sans, color: NAVY, display: 'flex',
      background: `linear-gradient(${LINE} 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, ${LINE} 1px, transparent 1px) 0 0/40px 40px, ${PAPER}`
    }}>
      {/* ===== SIDEBAR ===== */}
      <aside style={{ width: 220, background: NAVY, color: PAPER, padding: '24px 16px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, paddingLeft: 2 }}>
          <img
            src={LOGO_DATA_URI}
            alt={`${BRAND_NAME} logo`}
            style={{ height: 30, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8095AC', marginBottom: 28, paddingLeft: 2 }}>
          {BRAND_TAGLINE}
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(item => {
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', fontSize: 13.5,
                  background: active ? 'rgba(217,185,124,0.14)' : 'transparent',
                  borderLeft: active ? `2px solid ${BRASS}` : '2px solid transparent',
                  color: active ? BRASS_2 : '#B7C2D2', cursor: 'pointer', border: 'none', borderRight: 'none',
                  borderTop: 'none', borderBottom: 'none', fontFamily: sans, textAlign: 'left', width: '100%',
                }}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(246,243,236,0.12)' }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: '#8095AC', marginBottom: 12 }}>
            Portfolio Ledger<br />Q1–Q4 2026
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              fontFamily: mono, fontSize: 10.5, letterSpacing: '0.05em', textTransform: 'uppercase',
              color: BRASS_2, background: 'none', border: `1px solid rgba(217,185,124,0.3)`, padding: '6px 10px',
              cursor: 'pointer', width: '100%',
            }}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', borderBottom: `1px solid ${LINE_STRONG}`, background: 'rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${LINE_STRONG}`, padding: '8px 12px', width: 280 }}>
            <Search size={14} color={SLATE} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: mono, fontSize: 12, color: NAVY, width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Bell size={17} color={SLATE} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: NAVY, color: BRASS_2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11 }}>GS</div>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600 }}>Gokul S.</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: BRASS, marginBottom: 6 }}>{SECTION_EYEBROW[activeTab]}</div>
            <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 30, margin: 0, letterSpacing: '-0.01em' }}>{SECTION_TITLE[activeTab]}</h1>
          </div>

          {activeTab === 'dashboard' && (
            <DashboardTab month={month} setMonth={setMonth} type={type} setType={setType} location={location} setLocation={setLocation} />
          )}
          {activeTab === 'properties' && <PropertiesTab search={search} />}
          {activeTab === 'agents' && <AgentsTab search={search} />}
          {activeTab === 'vendor' && <VendorTab search={search} />}
          {activeTab === 'sales' && <SalesTab search={search} />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}