import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  RAJMERIC CORE-X  |  WORLD'S MOST ADVANCED AI-NATIVE STACK
//  Version: 2.0.0   |  2026–2035 READY
// ═══════════════════════════════════════════════════════════════

const COLORS = {
  obsidian: "#0A0A0F",
  void: "#050508",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDark: "#9A7A28",
  crimson: "#C0392B",
  electric: "#00D4FF",
  emerald: "#00C896",
  surface: "#0F0F1A",
  surfaceHigh: "#161625",
  border: "#1E1E35",
  borderGlow: "#2A2A50",
  textPrimary: "#F0EDE8",
  textSecondary: "#8A8A9A",
  textDim: "#4A4A6A",
};

const STACK_DATA = {
  layers: [
    {
      id: "frontend",
      label: "FRONTEND",
      subtitle: "Customer Intelligence Layer",
      color: "#00D4FF",
      icon: "◈",
      techs: [
        { name: "Next.js 15", role: "Core Framework", tier: "S" },
        { name: "React 19", role: "UI Runtime", tier: "S" },
        { name: "TypeScript 5.4", role: "Type Safety", tier: "S" },
        { name: "Tailwind CSS 4", role: "Design System", tier: "A" },
        { name: "Framer Motion", role: "Animations", tier: "A" },
        { name: "PWA Ready", role: "Offline First", tier: "A" },
        { name: "Vercel Edge", role: "Global CDN", tier: "S" },
        { name: "React Native", role: "Mobile App", tier: "A" },
      ],
      highlight: "Vercel Edge Network — 0ms cold start globally",
    },
    {
      id: "backend",
      label: "BACKEND",
      subtitle: "Business Intelligence Brain",
      color: "#C9A84C",
      icon: "⬡",
      techs: [
        { name: "Node.js 22 LTS", role: "Runtime Engine", tier: "S" },
        { name: "GraphQL + REST", role: "API Layer", tier: "S" },
        { name: "Fastify", role: "HTTP Server", tier: "S" },
        { name: "Redis 7", role: "Cache + Sessions", tier: "A" },
        { name: "Bull MQ", role: "Job Queues", tier: "A" },
        { name: "Medusa.js", role: "Headless Commerce", tier: "S" },
        { name: "AWS Lambda", role: "Serverless", tier: "A" },
        { name: "WebSockets", role: "Real-time", tier: "A" },
      ],
      highlight: "Headless commerce — full ownership, zero lock-in",
    },
    {
      id: "database",
      label: "DATABASE",
      subtitle: "Permanent Customer Intelligence Vault",
      color: "#00C896",
      icon: "◉",
      techs: [
        { name: "PostgreSQL 16", role: "Primary Database", tier: "S" },
        { name: "AWS RDS Aurora", role: "Managed Cluster", tier: "S" },
        { name: "MongoDB Atlas", role: "Behavior Data", tier: "A" },
        { name: "Redis Cluster", role: "Hot Data", tier: "A" },
        { name: "Snowflake", role: "Data Warehouse", tier: "S" },
        { name: "Pinecone", role: "Vector Database", tier: "S" },
        { name: "AWS S3 Glacier", role: "Archive Forever", tier: "A" },
        { name: "TimescaleDB", role: "Time-series", tier: "A" },
      ],
      highlight: "Snowflake + Pinecone = RAJMERIC INTELLIGENCE BRAIN",
    },
    {
      id: "ai",
      label: "AI ENGINE",
      subtitle: "Autonomous Revenue Intelligence",
      color: "#FF6B35",
      icon: "✦",
      techs: [
        { name: "GPT-4o / o3", role: "Language Intelligence", tier: "S" },
        { name: "Claude 3.5 Sonnet", role: "Analysis Engine", tier: "S" },
        { name: "AWS Bedrock", role: "AI Infrastructure", tier: "S" },
        { name: "Pinecone Vectors", role: "Semantic Search", tier: "S" },
        { name: "LangChain", role: "AI Orchestration", tier: "A" },
        { name: "ML Prediction", role: "Buy Forecasting", tier: "S" },
        { name: "RAG Pipeline", role: "Knowledge Base", tier: "A" },
        { name: "AI Chatbot 24/7", role: "Support Engine", tier: "S" },
      ],
      highlight: "AI predicts next purchase 14 days before it happens",
    },
    {
      id: "security",
      label: "SECURITY",
      subtitle: "Military-Grade Fortress",
      color: "#FF3366",
      icon: "⬟",
      techs: [
        { name: "Cloudflare Zero Trust", role: "Network Shield", tier: "S" },
        { name: "AWS WAF", role: "App Firewall", tier: "S" },
        { name: "Auth0", role: "Identity Platform", tier: "S" },
        { name: "AES-256 Encryption", role: "Data at Rest", tier: "S" },
        { name: "TLS 1.3", role: "Data in Transit", tier: "S" },
        { name: "OWASP Standards", role: "Code Security", tier: "A" },
        { name: "SOC 2 Compliant", role: "Audit Ready", tier: "A" },
        { name: "GDPR + DPDP", role: "Privacy Laws", tier: "A" },
      ],
      highlight: "Zero-Trust architecture — every request verified",
    },
    {
      id: "payments",
      label: "PAYMENTS",
      subtitle: "Global Revenue Engine",
      color: "#9B59B6",
      icon: "◆",
      techs: [
        { name: "Razorpay", role: "India Primary", tier: "S" },
        { name: "Stripe Global", role: "International", tier: "S" },
        { name: "UPI Direct", role: "Instant India", tier: "S" },
        { name: "BNPL Options", role: "Buy Now Pay Later", tier: "A" },
        { name: "Crypto Ready", role: "Web3 Future", tier: "B" },
        { name: "Multi-currency", role: "50+ Currencies", tier: "A" },
        { name: "Smart Retry", role: "Recovery Engine", tier: "A" },
        { name: "Fraud Detection", role: "AI Protected", tier: "S" },
      ],
      highlight: "₹0 to global revenue — all payment rails included",
    },
    {
      id: "devops",
      label: "DEVOPS",
      subtitle: "Zero-Downtime Automation",
      color: "#1ABC9C",
      icon: "⬡",
      techs: [
        { name: "Docker + K8s", role: "Containerization", tier: "S" },
        { name: "GitHub Actions", role: "CI/CD Pipeline", tier: "S" },
        { name: "Terraform IaC", role: "Infrastructure Code", tier: "S" },
        { name: "AWS ECS/EKS", role: "Orchestration", tier: "S" },
        { name: "DataDog", role: "Observability", tier: "A" },
        { name: "Grafana", role: "Dashboards", tier: "A" },
        { name: "PagerDuty", role: "Incident Alerts", tier: "A" },
        { name: "SLA: 99.99%", role: "Uptime Guarantee", tier: "S" },
      ],
      highlight: "Deploy in 90 seconds. Rollback in 10 seconds.",
    },
  ],
  metrics: [
    { label: "Page Load", value: "<0.8s", unit: "globally", icon: "⚡" },
    { label: "Uptime SLA", value: "99.99%", unit: "guaranteed", icon: "◎" },
    { label: "Data Retention", value: "Forever", unit: "encrypted", icon: "∞" },
    { label: "AI Predictions", value: "Real-time", unit: "continuous", icon: "✦" },
    { label: "Security Rating", value: "A+", unit: "SSL Labs", icon: "⬟" },
    { label: "Scalability", value: "∞ Users", unit: "auto-scale", icon: "◈" },
  ],
  integrations: [
    { name: "Segment CDP", category: "Data", icon: "◉", color: "#52BD95" },
    { name: "HubSpot CRM", category: "CRM", icon: "◆", color: "#FF7A59" },
    { name: "Mixpanel", category: "Analytics", icon: "◈", color: "#7856FF" },
    { name: "GA4", category: "Analytics", icon: "◎", color: "#FBBC04" },
    { name: "Firebase FCM", category: "Notifications", icon: "✦", color: "#FFCA28" },
    { name: "AWS SES", category: "Email", icon: "⬟", color: "#232F3E" },
    { name: "Resend", category: "Email", icon: "◆", color: "#000000" },
    { name: "Algolia Search", category: "Search", icon: "◉", color: "#5468FF" },
    { name: "Twilio", category: "SMS", icon: "◈", color: "#F22F46" },
    { name: "WhatsApp API", category: "Messaging", icon: "✦", color: "#25D366" },
    { name: "OpenAI GPT", category: "AI", icon: "⬡", color: "#10A37F" },
    { name: "Snowflake DW", category: "Data", icon: "◎", color: "#29B5E8" },
  ],
  aiCapabilities: [
    {
      title: "PURCHASE PREDICTION ENGINE",
      description: "ML model trained on 50+ behavioral signals predicts next purchase 14 days before it occurs. Auto-triggers personalized offers at optimal moment.",
      accuracy: "89%",
      impact: "+34% Revenue",
      color: "#FF6B35",
    },
    {
      title: "CHURN PREVENTION AI",
      description: "Real-time customer health scoring detects churn risk 30 days early. Automatically activates win-back sequences before customer leaves.",
      accuracy: "91%",
      impact: "-42% Churn",
      color: "#00D4FF",
    },
    {
      title: "DYNAMIC PRICING BRAIN",
      description: "AI analyzes competitor prices, demand signals, and inventory in real-time. Adjusts pricing to maximize margin without losing conversion.",
      accuracy: "Real-time",
      impact: "+18% Margin",
      color: "#00C896",
    },
    {
      title: "HYPER-PERSONALIZATION",
      description: "Vector similarity search across 500+ customer attributes delivers 1:1 product recommendations. Each customer sees a unique storefront.",
      accuracy: "1:1",
      impact: "+67% CTR",
      color: "#C9A84C",
    },
    {
      title: "AI SUPPORT AGENT",
      description: "GPT-4o powered agent handles 80% of support queries instantly. Escalates complex cases with full context. Available 24/7 in 40+ languages.",
      accuracy: "80% Auto",
      impact: "-75% Tickets",
      color: "#9B59B6",
    },
    {
      title: "REVENUE FORECASTING",
      description: "Time-series ML models forecast weekly/monthly/quarterly revenue with 94% accuracy. Informs inventory, marketing spend, and staffing.",
      accuracy: "94%",
      impact: "Perfect Planning",
      color: "#FF3366",
    },
  ],
  roadmap: [
    { year: "Q3 2026", title: "FOUNDATION", items: ["Core platform launch", "AI prediction engine v1", "Mobile app beta", "CDP integration"], status: "build" },
    { year: "Q4 2026", title: "INTELLIGENCE", items: ["ML models trained", "Personalization live", "AI chatbot deployed", "Revenue dashboard"], status: "build" },
    { year: "Q1 2027", title: "SCALE", items: ["International expansion", "Multi-language AI", "B2B portal", "API marketplace"], status: "plan" },
    { year: "Q2 2027", title: "DOMINANCE", items: ["Predictive health AI", "Supplement advisor AI", "Loyalty blockchain", "Autonomous marketing"], status: "plan" },
    { year: "2028+", title: "FUTURE", items: ["AI Doctor integration", "Genomics personalization", "AR product experience", "Web3 loyalty"], status: "future" },
  ],
};

// ─── COMPONENTS ────────────────────────────────────────────────

function GlowOrb({ x, y, color, size = 300 }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        filter: "blur(40px)",
      }}
    />
  );
}

function TierBadge({ tier }) {
  const colors = {
    S: { bg: "#C9A84C22", border: "#C9A84C", text: "#E8C96A" },
    A: { bg: "#00D4FF15", border: "#00D4FF66", text: "#00D4FF" },
    B: { bg: "#8A8A9A15", border: "#8A8A9A44", text: "#8A8A9A" },
  };
  const c = colors[tier] || colors.B;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      borderRadius: 4,
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontSize: 10,
      fontWeight: 800,
      fontFamily: "monospace",
      flexShrink: 0,
    }}>{tier}</span>
  );
}

function StackLayer({ layer, index }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        background: expanded ? "#0F0F1F" : "#0C0C18",
        border: `1px solid ${expanded ? layer.color + "44" : "#1E1E35"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        boxShadow: expanded ? `0 0 40px ${layer.color}18` : "none",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        background: expanded ? `linear-gradient(135deg, ${layer.color}0A, transparent)` : "transparent",
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${layer.color}18`,
          border: `1px solid ${layer.color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color: layer.color,
          flexShrink: 0,
        }}>{layer.icon}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: layer.color,
              fontFamily: "monospace",
            }}>LAYER {String(index + 1).padStart(2, "0")}</span>
            <div style={{ width: 1, height: 12, background: "#2A2A50" }} />
            <span style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#F0EDE8",
              letterSpacing: "0.1em",
            }}>{layer.label}</span>
          </div>
          <div style={{ fontSize: 12, color: "#6A6A8A" }}>{layer.subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            fontSize: 10,
            color: "#4A4A6A",
            textAlign: "right",
            lineHeight: 1.4,
            display: window.innerWidth > 600 ? "block" : "none",
          }}>
            <div style={{ color: "#6A6A8A" }}>{layer.techs.length} Technologies</div>
            <div style={{ color: layer.color + "88" }}>{layer.techs.filter(t => t.tier === "S").length} S-Tier</div>
          </div>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${layer.color}15`,
            border: `1px solid ${layer.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: layer.color,
            fontSize: 14,
            transition: "transform 0.3s",
            transform: expanded ? "rotate(180deg)" : "none",
          }}>▾</div>
        </div>
      </div>

      {/* Highlight bar */}
      <div style={{
        padding: "8px 24px",
        background: `${layer.color}08`,
        borderTop: `1px solid ${layer.color}22`,
        borderBottom: expanded ? `1px solid ${layer.color}22` : "none",
        fontSize: 11,
        color: layer.color + "99",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
      }}>▶ {layer.highlight}</div>

      {/* Expanded tech grid */}
      {expanded && (
        <div style={{ padding: 24 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
          }}>
            {layer.techs.map((tech, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  background: hovered === i ? `${layer.color}10` : "#0A0A15",
                  border: `1px solid ${hovered === i ? layer.color + "44" : "#1E1E35"}`,
                  borderRadius: 10,
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <TierBadge tier={tech.tier} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#E0DDD8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {tech.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#5A5A7A" }}>{tech.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ metric }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: "#0C0C18",
      border: "1px solid #1E1E35",
      borderRadius: 14,
      padding: "22px 20px",
      textAlign: "center",
      transition: "all 0.3s",
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(20px)",
    }}>
      <div style={{ fontSize: 24, marginBottom: 8, color: COLORS.gold }}>{metric.icon}</div>
      <div style={{
        fontSize: 22,
        fontWeight: 800,
        color: COLORS.textPrimary,
        fontFamily: "monospace",
        letterSpacing: "0.02em",
        marginBottom: 4,
      }}>{metric.value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textSecondary, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {metric.label}
      </div>
      <div style={{ fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>{metric.unit}</div>
    </div>
  );
}

function AICard({ cap, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0F0F1F" : "#0C0C18",
        border: `1px solid ${hovered ? cap.color + "55" : "#1E1E35"}`,
        borderRadius: 16,
        padding: 24,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 80}ms`,
        boxShadow: hovered ? `0 8px 40px ${cap.color}15` : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cap.color}18, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: "0.18em",
          color: cap.color,
          fontFamily: "monospace",
          lineHeight: 1.6,
          maxWidth: "60%",
        }}>{cap.title}</div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontSize: 18,
            fontWeight: 800,
            color: cap.color,
            fontFamily: "monospace",
            lineHeight: 1,
          }}>{cap.impact}</div>
          <div style={{ fontSize: 9, color: "#4A4A6A", marginTop: 2 }}>ACCURACY: {cap.accuracy}</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#7A7A9A", lineHeight: 1.7, margin: 0 }}>
        {cap.description}
      </p>
    </div>
  );
}

function IntegrationPill({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        background: hov ? `${item.color}18` : "#0C0C18",
        border: `1px solid ${hov ? item.color + "55" : "#1E1E35"}`,
        borderRadius: 100,
        transition: "all 0.2s",
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: hov ? item.color : "#4A4A6A", fontSize: 13 }}>{item.icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: hov ? "#E0DDD8" : "#8A8A9A" }}>{item.name}</span>
      <span style={{
        fontSize: 9,
        padding: "2px 6px",
        background: `${item.color}22`,
        borderRadius: 100,
        color: item.color + "99",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
      }}>{item.category}</span>
    </div>
  );
}

function RoadmapItem({ item }) {
  const statusColors = { build: "#00C896", plan: "#C9A84C", future: "#7A7ACA" };
  const statusLabels = { build: "BUILDING", plan: "PLANNED", future: "FUTURE" };
  return (
    <div style={{
      background: "#0C0C18",
      border: `1px solid ${statusColors[item.status]}33`,
      borderRadius: 14,
      padding: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${statusColors[item.status]}, transparent)`,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: "#5A5A7A", fontFamily: "monospace", marginBottom: 3 }}>{item.year}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#E0DDD8", letterSpacing: "0.08em" }}>{item.title}</div>
        </div>
        <span style={{
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: "0.15em",
          padding: "3px 8px",
          background: `${statusColors[item.status]}18`,
          border: `1px solid ${statusColors[item.status]}44`,
          borderRadius: 100,
          color: statusColors[item.status],
          fontFamily: "monospace",
        }}>{statusLabels[item.status]}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {item.items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6A6A8A" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: statusColors[item.status] + "88", flexShrink: 0 }} />
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "#C9A84C18" : "transparent",
        border: `1px solid ${active ? "#C9A84C44" : "transparent"}`,
        borderRadius: 8,
        padding: "7px 14px",
        color: active ? "#E8C96A" : "#6A6A8A",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function SecurityBadge({ label, icon }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      background: "#0A0A15",
      border: "1px solid #1E1E35",
      borderRadius: 10,
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "#FF336615",
        border: "1px solid #FF336633",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FF3366",
        fontSize: 14,
      }}>{icon}</div>
      <span style={{ fontSize: 11, color: "#8A8A9A", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────

export default function RajmericCoreX() {
  const [activeSection, setActiveSection] = useState("overview");
  const [pulse, setPulse] = useState(false);
  const [dataFlow, setDataFlow] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setPulse(p => !p), 2000);
    const t2 = setInterval(() => setDataFlow(d => (d + 1) % 100), 50);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const sections = ["overview", "stack", "ai-brain", "security", "roadmap", "integrations"];
  const sectionLabels = { overview: "OVERVIEW", stack: "TECH STACK", "ai-brain": "AI BRAIN", security: "SECURITY", roadmap: "ROADMAP", integrations: "INTEGRATIONS" };

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.void,
      color: COLORS.textPrimary,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Background ambience */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <GlowOrb x={10} y={10} color="#C9A84C" size={600} />
        <GlowOrb x={90} y={30} color="#00D4FF" size={500} />
        <GlowOrb x={50} y={80} color="#FF6B35" size={400} />
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.border} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.15,
        }} />
      </div>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#050508E8",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1E1E35",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #9A7A28, #E8C96A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                color: "#050508",
                letterSpacing: "-0.05em",
              }}>R</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.15em", color: "#E8C96A" }}>RAJMERIC</div>
                <div style={{ fontSize: 8, letterSpacing: "0.25em", color: "#5A5A7A", marginTop: -1 }}>CORE-X PLATFORM</div>
              </div>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: pulse ? "#00C896" : "#00C89666",
                boxShadow: pulse ? "0 0 12px #00C896" : "none",
                transition: "all 0.5s",
                marginLeft: 4,
              }} />
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", gap: 4, overflowX: "auto" }}>
              {sections.map(s => (
                <NavItem
                  key={s}
                  label={sectionLabels[s]}
                  active={activeSection === s}
                  onClick={() => setActiveSection(s)}
                />
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 20px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            background: "#C9A84C15",
            border: "1px solid #C9A84C33",
            borderRadius: 100,
            marginBottom: 28,
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "#C9A84C99",
            fontFamily: "monospace",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896", display: "inline-block", boxShadow: "0 0 8px #00C896" }} />
            SYSTEM ONLINE — 2026 READY — RAJMERIC CORE-X v2.0
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 20px",
            letterSpacing: "-0.03em",
          }}>
            <span style={{ color: "#F0EDE8" }}>World's Most</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #9A7A28, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Advanced AI Stack</span>
            <br />
            <span style={{ color: "#F0EDE8" }}>for Rajmeric</span>
          </h1>

          <p style={{
            fontSize: 16,
            color: "#7A7A9A",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 36px",
          }}>
            A fortress-grade, AI-native digital infrastructure. Every customer secured.
            Every rupee optimized. Every decision intelligence-driven. Built to operate
            in 2026 and dominate through 2035.
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {[
              { v: "7 Layers", l: "Full Stack" },
              { v: "56+ Tools", l: "Technologies" },
              { v: "6 AI Models", l: "Intelligence" },
              { v: "99.99%", l: "Uptime SLA" },
              { v: "Military", l: "Security Grade" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "8px 18px",
                background: "#0C0C18",
                border: "1px solid #1E1E35",
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#E0DDD8", fontFamily: "monospace" }}>{s.v}</span>
                <span style={{ fontSize: 11, color: "#5A5A7A" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS BAND ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 20px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}>
            {STACK_DATA.metrics.map((m, i) => <MetricCard key={i} metric={m} />)}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main style={{ position: "relative", zIndex: 1, padding: "0 20px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <SectionHeader
                tag="ARCHITECTURE OVERVIEW"
                title="The Complete Intelligence Machine"
                subtitle="7 interconnected layers working as one unified system to build Rajmeric's permanent competitive advantage."
              />

              {/* Architecture diagram */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #1E1E35",
                borderRadius: 20,
                padding: 32,
                marginBottom: 32,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "linear-gradient(90deg, transparent, #C9A84C55, transparent)",
                }} />
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#5A5A7A", fontFamily: "monospace", marginBottom: 8 }}>
                    RAJMERIC CORE-X ARCHITECTURE
                  </div>
                  <div style={{ fontSize: 13, color: "#8A8A9A" }}>Data flows down. Intelligence flows up. Revenue is automatic.</div>
                </div>

                {/* Flow diagram */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "center" }}>
                  {[
                    { label: "CUSTOMER", sub: "Global Users", color: "#00D4FF", width: "60%" },
                    { label: "FRONTEND", sub: "Next.js 15 + Vercel Edge", color: "#00D4FF", width: "70%" },
                    { label: "API GATEWAY", sub: "GraphQL + REST + WebSocket", color: "#C9A84C", width: "80%" },
                    { label: "AI ENGINE", sub: "OpenAI + Claude + AWS Bedrock + Pinecone", color: "#FF6B35", width: "85%" },
                    { label: "BUSINESS LOGIC", sub: "Node.js + Medusa.js + Redis", color: "#C9A84C", width: "90%" },
                    { label: "DATA LAYER", sub: "PostgreSQL + MongoDB + Snowflake", color: "#00C896", width: "95%" },
                    { label: "SECURITY FORTRESS", sub: "Cloudflare + AWS WAF + Auth0 + Encryption", color: "#FF3366", width: "100%" },
                  ].map((row, i) => (
                    <div key={i} style={{ width: row.width, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: "100%",
                        padding: "12px 20px",
                        background: `${row.color}10`,
                        border: `1px solid ${row.color}33`,
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: row.color, letterSpacing: "0.12em", fontFamily: "monospace" }}>
                          {row.label}
                        </span>
                        <span style={{ fontSize: 10, color: "#5A5A7A" }}>{row.sub}</span>
                      </div>
                      {i < 6 && (
                        <div style={{
                          width: 1,
                          height: 20,
                          background: `linear-gradient(${row.color}88, ${row.color}22)`,
                          position: "relative",
                        }}>
                          <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: 10,
                            color: row.color + "55",
                          }}>▼</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick layer cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {STACK_DATA.layers.map((layer) => (
                  <div key={layer.id} style={{
                    background: "#0C0C18",
                    border: `1px solid ${layer.color}33`,
                    borderRadius: 14,
                    padding: 20,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `${layer.color}18`,
                        border: `1px solid ${layer.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: layer.color,
                      }}>{layer.icon}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#E0DDD8", letterSpacing: "0.08em" }}>{layer.label}</div>
                        <div style={{ fontSize: 10, color: "#5A5A7A" }}>{layer.techs.length} technologies</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "#6A6A8A", lineHeight: 1.5 }}>
                      {layer.techs.filter(t => t.tier === "S").map(t => t.name).join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STACK */}
          {activeSection === "stack" && (
            <div>
              <SectionHeader
                tag="TECHNOLOGY STACK"
                title="56+ World-Class Technologies"
                subtitle="Click any layer to expand full technology details with tier ratings. S = Top Tier, A = Enterprise Grade."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {STACK_DATA.layers.map((layer, i) => (
                  <StackLayer key={layer.id} layer={layer} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* AI BRAIN */}
          {activeSection === "ai-brain" && (
            <div>
              <SectionHeader
                tag="RAJMERIC AI BRAIN"
                title="Autonomous Revenue Intelligence"
                subtitle="6 AI systems working in parallel — predicting behavior, personalizing experiences, automating sales, and maximizing lifetime value."
              />

              {/* AI Architecture */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #FF6B3533",
                borderRadius: 20,
                padding: 28,
                marginBottom: 32,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#FF6B3566", fontFamily: "monospace", marginBottom: 16 }}>
                  AI INTELLIGENCE STACK
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {[
                    { name: "OpenAI GPT-4o", role: "Reasoning + Language", color: "#10A37F" },
                    { name: "Claude 3.5 Sonnet", role: "Analysis + Structure", color: "#C9A84C" },
                    { name: "AWS Bedrock", role: "AI Infrastructure", color: "#FF9900" },
                    { name: "Pinecone Vector DB", role: "Semantic Memory", color: "#5468FF" },
                    { name: "LangChain", role: "AI Orchestration", color: "#00C896" },
                    { name: "Custom ML Models", role: "Prediction Engine", color: "#FF6B35" },
                  ].map((ai, i) => (
                    <div key={i} style={{
                      padding: "14px 16px",
                      background: `${ai.color}10`,
                      border: `1px solid ${ai.color}33`,
                      borderRadius: 12,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: ai.color, marginBottom: 4 }}>{ai.name}</div>
                      <div style={{ fontSize: 10, color: "#5A5A7A" }}>{ai.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {STACK_DATA.aiCapabilities.map((cap, i) => (
                  <AICard key={i} cap={cap} index={i} />
                ))}
              </div>

              {/* Data flow */}
              <div style={{
                marginTop: 32,
                background: "#0C0C18",
                border: "1px solid #1E1E35",
                borderRadius: 20,
                padding: 28,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5A5A7A", fontFamily: "monospace", marginBottom: 20 }}>
                  AI DATA PIPELINE
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                  {[
                    { label: "Customer Action", color: "#00D4FF" },
                    { label: "Segment CDP", color: "#52BD95" },
                    { label: "Event Stream", color: "#C9A84C" },
                    { label: "ML Processing", color: "#FF6B35" },
                    { label: "Pinecone Vector", color: "#5468FF" },
                    { label: "GPT-4o Analysis", color: "#10A37F" },
                    { label: "Prediction Score", color: "#FF3366" },
                    { label: "Auto-Action", color: "#00C896" },
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        padding: "8px 14px",
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}44`,
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 600,
                        color: step.color,
                        whiteSpace: "nowrap",
                      }}>{step.label}</div>
                      {i < 7 && <span style={{ color: "#3A3A5A", fontSize: 14 }}>→</span>}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "#5A5A7A", marginTop: 16, lineHeight: 1.6 }}>
                  Every customer interaction flows through Segment → Snowflake → Pinecone in real-time.
                  ML models generate predictions continuously. Actions are triggered automatically — no human intervention required.
                </p>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <div>
              <SectionHeader
                tag="SECURITY FORTRESS"
                title="Military-Grade Data Protection"
                subtitle="Zero-trust architecture with 8 independent security layers. Every request verified. Every byte encrypted. Every threat neutralized."
              />

              {/* Security layers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
                {[
                  { icon: "⬟", title: "Cloudflare Zero Trust", desc: "All traffic inspected before entering. DDoS protection at Tbps scale. Enterprise proxy for every request.", badge: "LAYER 1", color: "#FF6633" },
                  { icon: "⬡", title: "AWS WAF + Shield", desc: "Web Application Firewall with custom rules. Advanced DDoS protection. 99.999% threat block rate.", badge: "LAYER 2", color: "#FF9900" },
                  { icon: "◎", title: "Auth0 Identity", desc: "Military-grade authentication. MFA mandatory. Social login + SSO. RBAC permission system. 99.9% uptime.", badge: "LAYER 3", color: "#EB5424" },
                  { icon: "◈", title: "AES-256 Encryption", desc: "All data encrypted at rest with AES-256. All data in transit via TLS 1.3. Keys rotated automatically.", badge: "LAYER 4", color: "#00C896" },
                  { icon: "◆", title: "OWASP Compliance", desc: "Code audited against OWASP Top 10. Penetration testing quarterly. Security scanning in CI/CD pipeline.", badge: "LAYER 5", color: "#7B68EE" },
                  { icon: "✦", title: "AI Fraud Detection", desc: "ML model detects fraudulent payments in real-time. Behavioral anomaly detection. Auto-block suspicious activity.", badge: "LAYER 6", color: "#FF3366" },
                  { icon: "◉", title: "GDPR + DPDP Ready", desc: "India's Digital Personal Data Protection Act compliant. GDPR compliant for EU customers. Full audit trail.", badge: "LAYER 7", color: "#5468FF" },
                  { icon: "⬡", title: "SOC 2 Architecture", desc: "Infrastructure designed for SOC 2 Type II audit. Security controls documented. Annual third-party review.", badge: "LAYER 8", color: "#C9A84C" },
                ].map((sec, i) => (
                  <div key={i} style={{
                    background: "#0C0C18",
                    border: `1px solid ${sec.color}33`,
                    borderRadius: 16,
                    padding: 22,
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      fontSize: 8,
                      padding: "4px 10px",
                      background: `${sec.color}18`,
                      borderBottomLeftRadius: 8,
                      color: sec.color + "88",
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                    }}>{sec.badge}</div>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${sec.color}15`,
                      border: `1px solid ${sec.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: sec.color,
                      marginBottom: 14,
                    }}>{sec.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#E0DDD8", marginBottom: 8, letterSpacing: "0.05em" }}>{sec.title}</div>
                    <div style={{ fontSize: 11, color: "#6A6A8A", lineHeight: 1.6 }}>{sec.desc}</div>
                  </div>
                ))}
              </div>

              {/* Customer data protection */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #FF336633",
                borderRadius: 20,
                padding: 28,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#FF336666", fontFamily: "monospace", marginBottom: 20 }}>
                  CUSTOMER DATA PROTECTION GUARANTEE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { icon: "🔐", text: "All customer PII encrypted at rest with AES-256" },
                    { icon: "🌐", text: "All API calls over TLS 1.3 — no plain text ever" },
                    { icon: "🔑", text: "Encryption keys stored in AWS KMS — never in code" },
                    { icon: "👤", text: "Zero customer data shared with third parties" },
                    { icon: "📋", text: "Full audit trail for every data access event" },
                    { icon: "🗂️", text: "Right to deletion — GDPR compliant workflows" },
                    { icon: "💾", text: "Daily encrypted backups stored in 3 regions" },
                    { icon: "⚡", text: "Data breach response plan under 1 hour" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "#090912",
                      borderRadius: 10,
                      border: "1px solid #1E1E35",
                    }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: 11, color: "#7A7A9A", lineHeight: 1.4 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROADMAP */}
          {activeSection === "roadmap" && (
            <div>
              <SectionHeader
                tag="EXECUTION ROADMAP"
                title="Build → Scale → Dominate"
                subtitle="From zero to AI-powered global enterprise. Clear milestones, aggressive timelines, measurable outcomes."
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
                {STACK_DATA.roadmap.map((item, i) => <RoadmapItem key={i} item={item} />)}
              </div>

              {/* KPIs */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #C9A84C33",
                borderRadius: 20,
                padding: 28,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#C9A84C66", fontFamily: "monospace", marginBottom: 20 }}>
                  YEAR 1 SUCCESS METRICS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                  {[
                    { metric: "10,000+", label: "Registered Customers", icon: "◈" },
                    { metric: "₹1Cr+", label: "Revenue Target", icon: "◆" },
                    { metric: "89%", label: "AI Prediction Accuracy", icon: "✦" },
                    { metric: "<2s", label: "Page Load Time", icon: "⚡" },
                    { metric: "99.99%", label: "Platform Uptime", icon: "◎" },
                    { metric: "80%", label: "Support Automated", icon: "⬟" },
                  ].map((kpi, i) => (
                    <div key={i} style={{
                      padding: "18px 16px",
                      background: "#090912",
                      border: "1px solid #1E1E35",
                      borderRadius: 12,
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 18, color: "#C9A84C", marginBottom: 8 }}>{kpi.icon}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: "#E8C96A", fontFamily: "monospace" }}>{kpi.metric}</div>
                      <div style={{ fontSize: 10, color: "#5A5A7A", marginTop: 4, lineHeight: 1.4 }}>{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATIONS */}
          {activeSection === "integrations" && (
            <div>
              <SectionHeader
                tag="ECOSYSTEM INTEGRATIONS"
                title="Best-in-Class Tools, Fully Connected"
                subtitle="12 premium services integrated from day one. All customer data unified in Segment CDP. No data silos. Complete intelligence."
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {STACK_DATA.integrations.map((item, i) => (
                  <IntegrationPill key={i} item={item} />
                ))}
              </div>

              {/* CDP diagram */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #52BD9533",
                borderRadius: 20,
                padding: 28,
                marginBottom: 24,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#52BD9566", fontFamily: "monospace", marginBottom: 20 }}>
                  SEGMENT CDP — CUSTOMER DATA PLATFORM
                </div>
                <div style={{ textAlign: "center", marginBottom: 20, color: "#6A6A8A", fontSize: 12 }}>
                  Every tool feeds into Segment. Segment builds the complete customer 360° profile.
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                  {["Website events", "App events", "Orders", "Payments", "Support", "Email opens", "Push clicks", "Search queries"].map((s, i) => (
                    <div key={i} style={{
                      padding: "6px 12px",
                      background: "#090912",
                      border: "1px solid #1E1E35",
                      borderRadius: 8,
                      fontSize: 11,
                      color: "#6A6A8A",
                    }}>{s}</div>
                  ))}
                </div>
                <div style={{ textAlign: "center", color: "#52BD9588", fontSize: 20, marginBottom: 16 }}>▼</div>
                <div style={{
                  padding: "16px 24px",
                  background: "#52BD9518",
                  border: "1px solid #52BD9544",
                  borderRadius: 12,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#52BD95",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}>SEGMENT CDP — UNIFIED CUSTOMER PROFILE</div>
                <div style={{ textAlign: "center", color: "#52BD9588", fontSize: 20, marginBottom: 16 }}>▼</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
                  {["Snowflake DW", "Mixpanel Analytics", "HubSpot CRM", "AI Models", "Email Engine", "Personalization"].map((dest, i) => (
                    <div key={i} style={{
                      padding: "8px 12px",
                      background: "#090912",
                      border: "1px solid #1E1E35",
                      borderRadius: 8,
                      textAlign: "center",
                      fontSize: 11,
                      color: "#8A8A9A",
                    }}>{dest}</div>
                  ))}
                </div>
              </div>

              {/* Cost estimates */}
              <div style={{
                background: "#0C0C18",
                border: "1px solid #1E1E35",
                borderRadius: 20,
                padding: 28,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5A5A7A", fontFamily: "monospace", marginBottom: 20 }}>
                  ESTIMATED INFRASTRUCTURE COST (PHASE 1)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { service: "AWS (RDS + EC2 + S3)", cost: "~₹15,000/mo", tier: "Core" },
                    { service: "Vercel Pro", cost: "~₹1,700/mo", tier: "Frontend" },
                    { service: "OpenAI API", cost: "~₹8,000/mo", tier: "AI" },
                    { service: "Auth0", cost: "~₹2,500/mo", tier: "Security" },
                    { service: "Cloudflare Pro", cost: "~₹1,600/mo", tier: "Security" },
                    { service: "Segment", cost: "~₹0 (free tier)", tier: "Data" },
                    { service: "Razorpay", cost: "2% per txn", tier: "Payments" },
                    { service: "Total Phase 1", cost: "~₹30,000/mo", tier: "TOTAL" },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      background: row.tier === "TOTAL" ? "#C9A84C10" : "#090912",
                      border: `1px solid ${row.tier === "TOTAL" ? "#C9A84C44" : "#1E1E35"}`,
                      borderRadius: 10,
                    }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: row.tier === "TOTAL" ? 700 : 500, color: row.tier === "TOTAL" ? "#E8C96A" : "#8A8A9A" }}>
                          {row.service}
                        </div>
                        <div style={{ fontSize: 9, color: "#4A4A6A" }}>{row.tier}</div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: row.tier === "TOTAL" ? "#C9A84C" : "#6A6A9A", fontFamily: "monospace" }}>
                        {row.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid #1E1E35",
        padding: "28px 20px",
        background: "#050508",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.15em", color: "#E8C96A", marginBottom: 4 }}>
              RAJMERIC LIFESCIENCES
            </div>
            <div style={{ fontSize: 10, color: "#3A3A5A", letterSpacing: "0.15em" }}>
              CORE-X PLATFORM · 2026 EDITION · BUILT FOR DOMINANCE
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 10, color: "#3A3A5A", fontFamily: "monospace" }}>
            <span>NEXT.JS 15</span>
            <span>AWS</span>
            <span>OPENAI</span>
            <span>CLOUDFLARE</span>
            <span>SNOWFLAKE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid #1E1E35" }}>
      <div style={{
        fontSize: 9,
        letterSpacing: "0.25em",
        color: "#C9A84C66",
        fontFamily: "monospace",
        marginBottom: 12,
        fontWeight: 700,
      }}>◈ {tag}</div>
      <h2 style={{
        fontSize: "clamp(22px, 4vw, 36px)",
        fontWeight: 800,
        color: "#F0EDE8",
        letterSpacing: "-0.02em",
        margin: "0 0 12px",
      }}>{title}</h2>
      <p style={{ fontSize: 14, color: "#6A6A8A", lineHeight: 1.6, maxWidth: 600, margin: 0 }}>{subtitle}</p>
    </div>
  );
}
