import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Plus,
  Send,
  ChevronLeft,
  X,
  MessageSquare,
  Sparkles,
  Pencil,
  Home,
  Trash2,
  Bot,
  Stethoscope,
  Pill,
  Siren,
  Search,
  Settings,
  MapPin,
  Activity,
  Paperclip,
  Image,
  FileText,
} from "lucide-react";

type Attachment = { name: string; type: string; url: string };
type Message = { role: "user" | "assistant"; content: string; attachments?: Attachment[] };
type Conversation = { id: string; title: string; messages: Message[]; date: Date };

const MOCK_RESPONSES: Record<string, string> = {
  default: `I'm **Shifa AI**, your health assistant. I can help with:

- 🩺 **Symptom Analysis** — Describe your symptoms and I'll suggest possible conditions
- 🚨 **Emergency Guidance** — Get immediate first-aid steps and hospital recommendations
- 💊 **Drug Interactions** — Check if your medications are safe to take together

How can I help you today?`,
  symptom: `Based on the symptoms you've described, here are some possibilities:

| Condition | Likelihood | Severity |
|-----------|-----------|----------|
| Common Cold | High | Low |
| Seasonal Allergies | Medium | Low |
| Viral Infection | Low | Medium |

> ⚠️ **Note:** This is not a medical diagnosis. Please consult a healthcare professional for accurate assessment.

### Recommended Next Steps
1. Monitor your symptoms for 24-48 hours
2. Stay hydrated and get adequate rest
3. If symptoms worsen, visit your nearest clinic`,
  drug: `### Drug Interaction Analysis 💊

**Paracetamol + Ibuprofen**: ✅ Generally safe when taken at different times.

**Recommended Schedule:**
- Paracetamol: Every 6 hours
- Ibuprofen: Every 8 hours (with food)

> 🔔 **Warning:** Do not exceed the recommended daily dosage of either medication. Consult your pharmacist if you're on other medications.`,
  emergency: `### 🚨 Emergency Response Protocol

Based on your description, here's what to do:

1. **Stay calm** and ensure the person is in a safe position
2. **Call emergency services** — Dial **1020**, **115**, or any other ambulance service for immediate care
3. **Monitor breathing** and pulse

**Nearest Hospitals:**
- City General Hospital — 2.3 km (8 min drive)
- Medical Center East — 4.1 km (12 min drive)

> ⏱️ While waiting for help, keep the patient warm and comfortable.`,
  risk: `### 📊 Predictive Health Risk Forecast

Based on your health profile analysis over the past 6 months:

#### Overall Risk Score: **32/100** (Moderate)

| Health Category | Risk Level | Score | Trend |
|----------------|-----------|-------|-------|
| Cardiac | 🟢 Low | 25% | Stable |
| Diabetes | 🟡 Moderate | 40% | ↑ Rising |
| Respiratory | 🟢 Low | 15% | Stable |
| Hypertension | 🟡 Moderate | 55% | ↓ Improving |
| Mental Health | 🟢 Low | 30% | ↑ Improving |
| Liver | 🟢 Low | 20% | Stable |

#### Current Vitals Summary
- ❤️ **Heart Rate:** 72 bpm — Normal
- 🩸 **Blood Pressure:** 120/80 mmHg — Normal
- 🍬 **Blood Sugar:** 96 mg/dL — ⚠️ Attention (trending up)
- 🧠 **Mental Wellness:** 78/100 — Normal

#### ⚠️ Alerts
1. **Pre-Diabetic Risk Detected** — Blood sugar levels trending upward over the last 3 months. Consider dietary adjustments and increase physical activity.
2. **Hypertension Under Control** — Blood pressure has been stable. Continue current medication and lifestyle.
3. **Annual Checkup Due** — It's been 10 months since your last comprehensive health screening.

#### 📈 Weekly Activity
| Day | Steps | Status |
|-----|-------|--------|
| Mon | 8,200 | ✅ Good |
| Tue | 6,500 | ⚠️ Below target |
| Wed | 9,100 | ✅ Great |
| Thu | 7,300 | ✅ Good |
| Fri | 5,800 | ⚠️ Below target |
| Sat | 10,200 | 🌟 Excellent |
| Sun | 4,500 | ❌ Low |

### Recommended Actions
1. 🥗 Adjust diet to manage blood sugar — reduce refined carbs
2. 🏃 Aim for 8,000+ steps daily
3. 📅 Schedule your annual health screening
4. 💊 Continue current BP medication as prescribed

> 🔔 **Note:** This forecast is based on simulated health data. Always consult your healthcare provider for personalized medical advice.`,
  hospital: `### 🏥 Nearby Hospitals & Clinics

Based on your current location, here are the nearest facilities:

| Hospital | Distance | ETA | Rating |
|----------|----------|-----|--------|
| City General Hospital | 2.3 km | 8 min | ⭐ 4.5 |
| Medical Center East | 4.1 km | 12 min | ⭐ 4.2 |
| Al-Shifa Medical Complex | 5.8 km | 18 min | ⭐ 4.7 |
| Community Health Clinic | 1.2 km | 4 min | ⭐ 4.0 |

#### 🔍 Specialty Filters
- **Emergency:** City General Hospital (24/7 ER)
- **Cardiology:** Al-Shifa Medical Complex
- **Pediatrics:** Medical Center East

> 📍 Directions are based on estimated travel by car. Actual times may vary.`,
  schedule: `### 📅 Appointment Scheduling

Here are available slots for your next consultation:

| Date | Time | Doctor | Specialty |
|------|------|--------|-----------|
| Tomorrow | 10:00 AM | Dr. Ahmed Khan | General Medicine |
| Tomorrow | 2:30 PM | Dr. Sara Ali | Cardiology |
| Wed, Mar 11 | 9:00 AM | Dr. Fatima Noor | Endocrinology |
| Thu, Mar 12 | 11:00 AM | Dr. Hassan Raza | General Medicine |

#### Quick Actions
1. 📋 **Book Appointment** — Select a slot above
2. 🔄 **Reschedule** — Change existing appointment
3. ❌ **Cancel** — Cancel upcoming visit

> 💡 **Tip:** Regular checkups every 6 months help detect health issues early.`,
  telehealth: `### 📹 Telehealth Consultation

You can start a virtual consultation right now:

#### Available Online Doctors
| Doctor | Specialty | Wait Time | Fee |
|--------|-----------|-----------|-----|
| Dr. Amina Shah | General Practice | 5 min | $25 |
| Dr. Omar Farooq | Dermatology | 12 min | $35 |
| Dr. Hina Malik | Mental Health | 8 min | $40 |

#### How It Works
1. 📱 Select a doctor from the list
2. 💳 Confirm payment
3. 📹 Join video call from your browser
4. 📄 Receive prescription & notes via email

> 🔒 All consultations are **HIPAA compliant** and fully encrypted.`,
  charting: `### 📋 Health Records Summary

#### Recent Medical History
| Date | Type | Details | Doctor |
|------|------|---------|--------|
| Feb 15 | Lab Test | Blood panel — Normal | Dr. Khan |
| Jan 22 | Visit | Annual checkup — Clear | Dr. Ali |
| Dec 10 | Prescription | Metformin 500mg | Dr. Noor |
| Nov 05 | Imaging | Chest X-ray — Normal | Dr. Raza |

#### Active Medications
- 💊 **Metformin** 500mg — 2x daily (Diabetes management)
- 💊 **Lisinopril** 10mg — 1x daily (Blood pressure)
- 💊 **Vitamin D** 1000 IU — 1x daily (Supplement)

#### Allergies
- ⚠️ Penicillin — Severe
- ⚠️ Sulfa drugs — Moderate

> 📁 Your complete medical records are securely stored and accessible anytime.`,
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("headache") || lower.includes("fever") || lower.includes("pain") || lower.includes("symptom") || lower.includes("cold") || lower.includes("cough"))
    return MOCK_RESPONSES.symptom;
  if (lower.includes("drug") || lower.includes("medicine") || lower.includes("interaction") || lower.includes("pill") || lower.includes("tablet"))
    return MOCK_RESPONSES.drug;
  if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("accident") || lower.includes("bleeding"))
    return MOCK_RESPONSES.emergency;
  if (lower.includes("risk") || lower.includes("forecast") || lower.includes("predict") || lower.includes("health risk") || lower.includes("vitals") || lower.includes("wellness"))
    return MOCK_RESPONSES.risk;
  if (lower.includes("hospital") || lower.includes("nearby") || lower.includes("clinic") || lower.includes("location") || lower.includes("find"))
    return MOCK_RESPONSES.hospital;
  if (lower.includes("schedule") || lower.includes("appointment") || lower.includes("book") || lower.includes("checkup"))
    return MOCK_RESPONSES.schedule;
  if (lower.includes("telehealth") || lower.includes("video") || lower.includes("virtual") || lower.includes("online doctor") || lower.includes("consult"))
    return MOCK_RESPONSES.telehealth;
  if (lower.includes("record") || lower.includes("chart") || lower.includes("history") || lower.includes("medical record") || lower.includes("prescription"))
    return MOCK_RESPONSES.charting;
  return MOCK_RESPONSES.default;
}

import iconSymptom from "@/assets/icon-symptom.png";
import iconDrug from "@/assets/icon-drug.png";
import iconEmergency from "@/assets/icon-emergency.png";
import iconRisk from "@/assets/icon-risk.png";
import iconHospital from "@/assets/icon-hospital.png";
import iconSchedule from "@/assets/icon-schedule.png";
import iconTelehealth from "@/assets/icon-telehealth.png";
import iconRecords from "@/assets/icon-records.png";

const featureIcons = [iconSymptom, iconDrug, iconEmergency, iconRisk, iconHospital, iconSchedule, iconTelehealth, iconRecords];

const suggestedPrompts = [
  { label: "Symptom Check", desc: "Analyze your symptoms & get AI-powered condition guidance", text: "I have a headache and mild fever", live: "Last check: 2 days ago", dot: "hsl(142, 60%, 45%)", featured: true },
  { label: "Drug Interaction", desc: "Check medication safety & get dosage recommendations", text: "Check interaction between Paracetamol and Ibuprofen", live: "3 active medications", dot: "hsl(260, 60%, 55%)", featured: true },
  { label: "Emergency Help", desc: "Immediate care, first-aid steps & nearest hospital routing", text: "Someone near me is having chest pain", live: "4 hospitals nearby", dot: "hsl(0, 70%, 55%)", featured: true },
  { label: "Risk Forecast", desc: "AI-powered predictive analytics across cardiac, diabetes & 4 more categories", text: "Show my health risk forecast", live: "Score: 32 — Moderate", dot: "hsl(35, 90%, 50%)", featured: true },
] as const;

const quickReplies = [
  { icon: Stethoscope, label: "Symptom check", text: "I want to check my symptoms" },
  { icon: Siren, label: "Emergency alert", text: "I need emergency help right now" },
  { icon: Pill, label: "Drug interactions", text: "Check my drug interactions" },
  { icon: MapPin, label: "Nearby hospital", text: "Find nearby hospitals" },
  { icon: Activity, label: "Risk forecast", text: "Show my health risk forecast" },
];


const SidebarContent = ({
  conversations,
  activeConvId,
  onSelect,
  onDelete,
  onRename,
  onNew,
  onHome,
  sidebarCollapsed,
  searchQuery,
  setSearchQuery,
}: {
  conversations: Conversation[];
  activeConvId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onNew: () => void;
  onHome: () => void;
  sidebarCollapsed: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = searchQuery.trim()
    ? conversations.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.messages.some((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : conversations;

  const todayConvs = filtered.filter(
    (c) => new Date().toDateString() === c.date.toDateString()
  );
  const olderConvs = filtered.filter(
    (c) => new Date().toDateString() !== c.date.toDateString()
  );

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="hsl(var(--primary))" opacity="0.2" />
            <path d="M16 8v16M8 16h16" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        {!sidebarCollapsed && (
          <span className="font-heading font-bold text-lg text-foreground">Shifa</span>
        )}
      </div>

      {/* Nav Items */}
      <div className="px-3 space-y-0.5">
        <button
          onClick={onHome}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all hover:bg-muted text-muted-foreground hover:text-foreground ${sidebarCollapsed ? "justify-center" : ""}`}
        >
          <Home className="w-[18px] h-[18px] shrink-0" />
          {!sidebarCollapsed && <span>Home</span>}
        </button>
        <button
          onClick={onNew}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all hover:bg-muted text-muted-foreground hover:text-foreground ${sidebarCollapsed ? "justify-center" : ""}`}
        >
          <Plus className="w-[18px] h-[18px] shrink-0" />
          {!sidebarCollapsed && <span>New Chat</span>}
        </button>
        <button
          onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(""); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all hover:bg-muted ${searchOpen ? "bg-muted/60 text-foreground" : "text-muted-foreground hover:text-foreground"} ${sidebarCollapsed ? "justify-center" : ""}`}
        >
          <Search className="w-[18px] h-[18px] shrink-0" />
          {!sidebarCollapsed && <span>Search Chat</span>}
        </button>
      </div>

      {/* Search Input */}
      <AnimatePresence>
        {searchOpen && !sidebarCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3 overflow-hidden"
          >
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full text-xs font-body bg-muted rounded-lg pl-8 pr-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="mx-4 my-3 border-t border-border" />

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4">
        {filtered.length === 0 && !sidebarCollapsed && (
          <p className="text-xs text-muted-foreground text-center py-6 font-body">
            {searchQuery.trim() ? "No matching chats" : "Start a conversation"}
          </p>
        )}

        {todayConvs.length > 0 && !sidebarCollapsed && (
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1.5">Today</p>
            {todayConvs.map((conv) => (
              <ConvItem key={conv.id} conv={conv} active={conv.id === activeConvId} onSelect={onSelect} onDelete={onDelete} onRename={onRename} />
            ))}
          </div>
        )}
        {olderConvs.length > 0 && !sidebarCollapsed && (
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1.5">Previous</p>
            {olderConvs.map((conv) => (
              <ConvItem key={conv.id} conv={conv} active={conv.id === activeConvId} onSelect={onSelect} onDelete={onDelete} onRename={onRename} />
            ))}
          </div>
        )}

        {sidebarCollapsed && filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full flex justify-center py-2.5 rounded-xl transition-colors ${conv.id === activeConvId ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
            title={conv.title}
          >
            <MessageSquare className="w-[18px] h-[18px]" />
          </button>
        ))}
      </div>

      {/* Bottom - Settings */}
      <div className="p-3 mt-auto space-y-0.5">
        {!sidebarCollapsed ? (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <Settings className="w-[18px] h-[18px]" />
            <span>Settings</span>
          </button>
        ) : (
          <button className="w-full flex justify-center py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all" title="Settings">
            <Settings className="w-[18px] h-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
};

const ConvItem = ({
  conv,
  active,
  onSelect,
  onDelete,
  onRename,
}: {
  conv: Conversation;
  active: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conv.title);

  const commitRename = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== conv.title) onRename(conv.id, trimmed);
    setEditing(false);
  };

  return (
    <div
      className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-primary/8 text-foreground"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      }`}
      onClick={() => !editing && onSelect(conv.id)}
    >
      <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />
      {editing ? (
        <input
          autoFocus
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setEditing(false); }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-[13px] font-body bg-transparent outline-none border-b border-primary/40 py-0"
        />
      ) : (
        <span className="text-[13px] truncate flex-1 font-body">{conv.title}</span>
      )}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={(e) => { e.stopPropagation(); setEditTitle(conv.title); setEditing(true); }}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
          title="Rename"
        >
          <Pencil className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
          className="text-muted-foreground hover:text-destructive transition-colors p-0.5"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const Chat = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const messages = activeConv?.messages ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const createConversation = (firstMessage?: string): string => {
    const id = Date.now().toString();
    const title = firstMessage
      ? firstMessage.slice(0, 35) + (firstMessage.length > 35 ? "..." : "")
      : "New Chat";
    const conv: Conversation = { id, title, messages: [], date: new Date() };
    setConversations((prev) => [conv, ...prev]);
    setActiveConvId(id);
    return id;
  };

  const sendMessage = async (text: string, extraAttachments?: Attachment[]) => {
    if (!text.trim() && !extraAttachments?.length && !attachments.length) return;
    let convId = activeConvId;
    if (!convId) {
      convId = createConversation(text);
    }

    const msgAttachments = extraAttachments || attachments;
    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      attachments: msgAttachments.length > 0 ? msgAttachments : undefined,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              title: c.messages.length === 0 ? text.trim().slice(0, 35) + (text.trim().length > 35 ? "..." : "") : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );
    setInput("");
    setAttachments([]);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 600));

    const response = getMockResponse(text);
    const assistantMsg: Message = { role: "assistant", content: response };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, messages: [...c.messages, assistantMsg] } : c
      )
    );
    setIsTyping(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setAttachments((prev) => [...prev, { name: file.name, type: file.type, url }]);
    });
    e.target.value = "";
    setShowAttachMenu(false);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) setActiveConvId(null);
  };

  const renameConversation = (id: string, title: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, title } : c));
  };

  const newChat = () => {
    setActiveConvId(null);
    setInput("");
    setMobileSidebarOpen(false);
  };

  const sidebarProps = {
    conversations,
    activeConvId,
    onSelect: (id: string) => { setActiveConvId(id); setMobileSidebarOpen(false); },
    onDelete: deleteConversation,
    onRename: renameConversation,
    onNew: newChat,
    onHome: () => navigate("/"),
    searchQuery,
    setSearchQuery,
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 280 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex flex-col border-r border-border bg-card h-full overflow-hidden shrink-0"
      >
        <SidebarContent {...sidebarProps} sidebarCollapsed={sidebarCollapsed} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border z-50 flex flex-col md:hidden"
            >
              <SidebarContent {...sidebarProps} sidebarCollapsed={false} />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-5 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 768) setMobileSidebarOpen(true);
                else setSidebarCollapsed(!sidebarCollapsed);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
            {activeConv ? (
              <h1 className="text-sm font-heading font-semibold text-foreground truncate max-w-[200px] sm:max-w-md">
                {activeConv.title}
              </h1>
            ) : (
              <h1 className="text-sm font-heading font-semibold text-foreground">Shifa AI</h1>
            )}
          </div>
          <button
            onClick={newChat}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </header>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !isTyping ? (
            /* Empty / Welcome State */
            <div className="relative flex flex-col items-center justify-center min-h-full px-6 py-10 max-w-3xl mx-auto">
              {/* Soft ambient blobs for depth */}
              <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary) / 0.15)" }} />
              <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "hsl(260, 60%, 60% / 0.15)" }} />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full relative z-10"
              >
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-2 tracking-tight">
                  Welcome! <span className="inline-block animate-bounce">👋</span>
                </h2>
                <p className="text-base text-muted-foreground font-body mb-8 tracking-normal">
                  Your AI-powered health companion. Here's what I can do:
                </p>

                {/* Bento Feature Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-auto">
                  {/* Row 1: Symptom + Drug (1col each) + Emergency (2col featured) */}
                  {suggestedPrompts.map((prompt, i) => {
                    const isFeatured = "featured" in prompt && prompt.featured;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => sendMessage(prompt.text)}
                        className="group relative flex overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] col-span-2 flex-row items-center gap-4 p-5 text-left"
                        style={{
                          background: `linear-gradient(135deg, ${prompt.dot}08, hsl(var(--card) / 0.5))`,
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: `1px solid ${prompt.dot}25`,
                          boxShadow: `0 8px 32px -8px ${prompt.dot}15, inset 0 1px 0 hsl(0 0% 100% / 0.5)`,
                        }}
                      >
                        {/* Inner glow on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 30% 50%, ${prompt.dot}15 0%, transparent 70%)`,
                          }}
                        />

                        <img
                          src={featureIcons[i]}
                          alt={prompt.label}
                          className={`object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10 ${
                            isFeatured ? "w-16 h-16 shrink-0" : "w-12 h-12"
                          }`}
                        />
                        <div className={`relative z-10 ${isFeatured ? "flex-1 min-w-0" : ""}`}>
                          <p className={`font-heading font-bold text-foreground tracking-tight ${
                            isFeatured ? "text-base mb-1" : "text-sm mb-0.5"
                          }`}>
                            {prompt.label}
                          </p>
                          <p className={`text-muted-foreground font-body leading-snug ${
                            isFeatured ? "text-xs mb-2.5" : "text-[10px] mb-2"
                          }`}>
                            {prompt.desc}
                          </p>
                          {/* Live data badge */}
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: `${prompt.dot}10` }}>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: prompt.dot }} />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: prompt.dot }} />
                            </span>
                            <span className="text-[9px] font-body font-medium" style={{ color: prompt.dot }}>{prompt.live}</span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-br-lg px-5 py-3"
                        : "bg-card border border-border rounded-2xl rounded-bl-lg px-5 py-3"
                    }`}
                  >
                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {msg.attachments.map((att, j) =>
                          att.type.startsWith("image/") ? (
                            <img key={j} src={att.url} alt={att.name} className="w-32 h-24 object-cover rounded-lg" />
                          ) : (
                            <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-body">
                              <FileText className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[120px]">{att.name}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground font-body [&_table]:text-xs [&_th]:px-2.5 [&_th]:py-1.5 [&_td]:px-2.5 [&_td]:py-1.5 [&_th]:bg-muted/60 [&_th]:font-medium [&_blockquote]:border-l-primary/30 [&_blockquote]:bg-primary/[0.03] [&_blockquote]:rounded-r-xl [&_blockquote]:py-2 [&_blockquote]:px-4 [&_blockquote]:not-italic [&_h3]:text-base [&_h3]:font-heading [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:font-semibold [&_li]:text-sm [&_p]:text-sm [&_p]:leading-relaxed">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content && <p className="text-sm font-body leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-foreground font-heading">U</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-lg px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-body">Shifa is typing</span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-primary/50"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick reply chips after last assistant message */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 pl-11"
                >
                  {quickReplies.map((qr, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(qr.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted hover:border-primary/30 text-xs font-body text-muted-foreground hover:text-foreground transition-all"
                    >
                      <qr.icon className="w-3 h-3" />
                      {qr.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5">
          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.csv"
            multiple
            onChange={(e) => handleFileSelect(e, "file")}
          />
          <input
            ref={imageInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e, "image")}
          />

          {/* Attachment previews */}
          {attachments.length > 0 && (
            <div className="max-w-3xl mx-auto mb-2 flex flex-wrap gap-2">
              {attachments.map((att, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-xs font-body group">
                  {att.type.startsWith("image/") ? (
                    <img src={att.url} alt={att.name} className="w-6 h-6 object-cover rounded" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <span className="truncate max-w-[100px] text-foreground">{att.name}</span>
                  <button onClick={() => removeAttachment(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto relative"
          >
            <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-2 focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] transition-all">
              {/* Attach button */}
              <div className="relative shrink-0 mb-2">
                <button
                  type="button"
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Paperclip className="w-[18px] h-[18px]" />
                </button>
                <AnimatePresence>
                  {showAttachMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-lg py-1 min-w-[160px] z-10"
                    >
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-body text-foreground hover:bg-muted transition-colors"
                      >
                        <Image className="w-4 h-4 text-primary" />
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-body text-foreground hover:bg-muted transition-colors"
                      >
                        <FileText className="w-4 h-4 text-primary" />
                        Upload Document
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your symptoms or ask a question..."
                rows={1}
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none py-2 max-h-32 leading-relaxed"
              />

              {/* Emergency shortcut */}
              <button
                type="button"
                onClick={() => sendMessage("🚨 I need emergency help immediately!")}
                className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors shrink-0 mb-0.5"
                title="Emergency Alert"
              >
                <Siren className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={(!input.trim() && attachments.length === 0) || isTyping}
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 mb-0.5"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2 font-body opacity-60">
              Shifa AI is a demo · Always consult a healthcare professional
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
