import React from "react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Sun, Moon, PlayCircle, User, BarChart2, Video, Mic } from "react-feather";
import { useNavigate } from "react-router-dom";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;


const testimonials = [
  {
    name: "Alex Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Interview Copilot gave me the confidence and feedback I needed to land my dream job!",
  },
  {
    name: "Priya Singh",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The real-time feedback and role-specific questions are a game changer.",
  },
  {
    name: "Jordan Lee",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    quote: "The dashboard made it easy to track my progress and focus on improvement.",
  },
];

const features = [
  {
    icon: <User className="text-orange-400" size={32} />, // orange accent
    title: "Role-Specific Questions",
    desc: "Practice with questions tailored to your target role and industry.",
  },
  {
    icon: <Video className="text-pink-400" size={32} />, // light pink accent
    title: "Voice & Video Simulation",
    desc: "Simulate real interviews with voice and video for authentic practice.",
  },
  {
    icon: <BarChart2 className="text-blue-400" size={32} />, // minimal blue
    title: "Real-Time Feedback",
    desc: "Get instant, actionable feedback to improve every answer.",
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  // Gemini chat state
  const [chat, setChat] = useState<{role: 'user'|'gemini', content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setError("");
    setChat((prev) => [...prev, { role: 'user', content: input }]);
    setLoading(true);
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
      });
      const data = await res.json();
      const geminiMsg = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      setChat((prev) => [...prev, { role: 'gemini', content: geminiMsg }]);
    } catch (err) {
      setError("Failed to get response from Gemini. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-premiumDark via-[#181F2A] to-[#1a2236] transition-colors duration-700 overflow-hidden">
      {/* 3D Glowing Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500 opacity-30 rounded-full blur-3xl animate-blob1 z-0" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-3xl animate-blob2 z-0" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-3xl animate-blob3 z-0" />
      {/* Dark/Light Switch */}
      <div className="fixed top-6 right-8 z-50">
        <button
          aria-label="Toggle dark mode"
          className="premium-glass p-2 shadow-3d hover:scale-110 transition-transform"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? <Sun className="text-orange-400" /> : <Moon className="text-blue-400" />}
        </button>
      </div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 gap-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 drop-shadow-2xl animate-fade-in">
          Ace Your Next Interview with AI
        </h1>
        <p className="max-w-xl text-lg md:text-2xl text-white/80 dark:text-white/70 font-medium animate-fade-in delay-100">
          Interview Copilot empowers you to practice, improve, and succeed with role-specific questions, real-time feedback, and immersive simulations.
        </p>
        <Button variant="premiumOrange" size="lg" className="animate-pop-in mt-4 shadow-3d" onClick={() => navigate('/generate')}>
          Try for Free
        </Button>
      </section>
      {/* Testimonials */}
      <section className="relative max-w-4xl mx-auto py-12 grid md:grid-cols-3 gap-8 animate-fade-in-up z-10">
        {testimonials.map((t, i) => (
          <div key={i} className="premium-glass p-6 flex flex-col items-center text-center shadow-3d hover:scale-105 transition-transform border border-orange-400/10">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-4 border-orange-400 shadow-lg" />
            <p className="text-white/90 dark:text-white/80 italic mb-2">“{t.quote}”</p>
            <span className="font-semibold text-orange-400">{t.name}</span>
          </div>
        ))}
      </section>
      {/* Features */}
      <section className="relative max-w-5xl mx-auto py-16 grid md:grid-cols-3 gap-10 animate-fade-in-up z-10">
        {features.map((f, i) => (
          <div key={i} className="premium-glass p-8 flex flex-col items-center text-center shadow-3d hover:scale-105 transition-transform border border-orange-400/10">
            <div className="mb-4 drop-shadow-2xl animate-glow">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-orange-400">{f.title}</h3>
            <p className="text-white/80 dark:text-white/70">{f.desc}</p>
          </div>
        ))}
      </section>
      {/* Dashboard Preview */}
      <section className="relative max-w-3xl mx-auto py-16 animate-fade-in-up z-10">
        <div className="premium-glass p-8 flex flex-col md:flex-row items-center gap-8 shadow-3d border border-orange-400/10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">Track Your Progress</h2>
            <p className="text-white/80 dark:text-white/70 mb-4">
              Visualize your improvement with detailed analytics, feedback trends, and actionable insights.
            </p>
            <Button variant="premiumAqua" className="mt-2" onClick={() => navigate('/generate')}>View Dashboard</Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {/* Placeholder for dashboard preview */}
            <div className="w-64 h-40 bg-gradient-to-br from-orange-400 via-pink-300 to-blue-400 rounded-xl shadow-3d flex items-center justify-center text-3xl font-bold text-white/80 animate-pulse border-2 border-orange-400/20">
              Analytics
            </div>
          </div>
        </div>
      </section>
      {/* Chatbot Demo Block */}
      <section className="relative max-w-md mx-auto py-16 animate-fade-in-up z-10">
        <div className="premium-glass p-8 flex flex-col items-center text-center shadow-3d border border-orange-400/10 rounded-xl w-full" style={{minWidth: 350}}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">Ask Interview Copilot <span role="img" aria-label="robot">🤖</span></h2>
          {/* Chat history */}
          <div className="w-full mb-4 max-h-64 overflow-y-auto bg-black/10 rounded-lg p-3 text-left space-y-3" style={{minHeight: 80}}>
            {chat.length === 0 && <div className="text-gray-400 text-center">Start the conversation!</div>}
            {chat.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <span className={msg.role === 'user' ? 'bg-purple-500/20 text-purple-200 px-3 py-2 rounded-lg inline-block' : 'bg-orange-400/20 text-orange-200 px-3 py-2 rounded-lg inline-block'}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-orange-400">Gemini is typing...</div>}
            {error && <div className="text-red-400">{error}</div>}
            <div ref={chatEndRef} />
          </div>
          <form className="w-full flex flex-col gap-4" onSubmit={handleChatSubmit}>
            <textarea
              placeholder="Type your question..."
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-400/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-3d resize-y min-h-[100px] max-h-60 text-base"
              rows={5}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white text-lg mt-2 transition-all bg-gradient-to-r from-purple-500 to-pink-400 hover:from-pink-400 hover:to-purple-500 shadow-3d disabled:opacity-60"
              disabled={loading || !input.trim()}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </section>
      {/* Animations and 3D blob keyframes */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-up { animation: fadeInUp 1.2s cubic-bezier(.39,.575,.565,1) both; }
        .animate-pop-in { animation: popIn .7s cubic-bezier(.39,.575,.565,1) both; }
        .animate-glow { animation: glow 2s infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(.8);} 100% { opacity: 1; transform: scale(1);} }
        @keyframes glow { from { filter: drop-shadow(0 0 8px #ff9800); } to { filter: drop-shadow(0 0 24px #ff9800); } }
        .animate-blob1 { animation: blobMove1 12s ease-in-out infinite alternate; }
        .animate-blob2 { animation: blobMove2 14s ease-in-out infinite alternate; }
        .animate-blob3 { animation: blobMove3 16s ease-in-out infinite alternate; }
        @keyframes blobMove1 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.1) translateY(40px); } }
        @keyframes blobMove2 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.2) translateY(-30px); } }
        @keyframes blobMove3 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.15) translateY(30px); } }
      `}</style>
    </div>
  );
}
