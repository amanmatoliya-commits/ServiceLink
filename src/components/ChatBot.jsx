// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MessageCircle,
//   X,
//   SendHorizontal,
//   Bot,
//   User,
// } from "lucide-react";

// export default function ChatBot() {

//     const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);

//   const [input, setInput] = useState("");

//   const [typing, setTyping] = useState(false);

//   const bottomRef = useRef(null);

//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       type: "text",
//       text: "👋 Hi! Welcome to ServiceLink.\n\nI'm your Booking Assistant.\n\nI can help you book services, become a professional or answer common questions.",
//     },
//   ]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, typing]);

//   function addUserMessage(text) {
//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "user",
//         type: "text",
//         text,
//       },
//     ]);
//   }

//   function addBotMessage(text) {
//     setTyping(true);

//     setTimeout(() => {
//       setTyping(false);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           type: "text",
//           text,
//         },
//       ]);
//     }, 700);
//   }

//   function sendMessage(customText = input) {
//     if (!customText.trim()) return;

//     addUserMessage(customText);

//     setInput("");

//     // PART-2 will decide replies
//     addBotMessage(
//       "I'm thinking... 🤖"
//     );
//   }

//   return (
//     <>
//       {/* Floating Button */}

//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all"
//       >
//         {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
//       </button>

//       {/* Chat Window */}

//       {isOpen && (
//         <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border overflow-hidden">

//           {/* Header */}

//           <div className="bg-blue-600 text-white px-4 py-3">

//             <div className="flex items-center gap-3">

//               <div className="bg-white/20 rounded-full p-2">
//                 <Bot size={18} />
//               </div>

//               <div>

//                 <h2 className="font-semibold">
//                   ServiceLink Assistant
//                 </h2>

//                 <p className="text-xs opacity-80">
//                   Online
//                 </p>

//               </div>

//             </div>

//           </div>

//           {/* Messages */}

//           <div className="h-80 overflow-y-auto bg-gray-50 p-4 space-y-3">

//             {messages.map((msg, index) => (

//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === "user"
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >

//                 <div
//                   className={`flex gap-2 items-end ${
//                     msg.sender === "user"
//                       ? "flex-row-reverse"
//                       : ""
//                   }`}
//                 >

//                   {msg.sender === "bot" ? (
//                     <Bot
//                       size={18}
//                       className="text-blue-600"
//                     />
//                   ) : (
//                     <User
//                       size={18}
//                       className="text-gray-600"
//                     />
//                   )}

//                   <div
//                     className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line max-w-[230px]
//                     ${
//                       msg.sender === "bot"
//                         ? "bg-white border"
//                         : "bg-blue-600 text-white"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>

//                 </div>

//               </div>

//             ))}

//             {typing && (

//               <div className="flex gap-2 items-center">

//                 <Bot
//                   size={18}
//                   className="text-blue-600"
//                 />

//                 <div className="bg-white border rounded-xl px-3 py-2 text-sm">
//                   Typing...
//                 </div>

//               </div>

//             )}

//             <div ref={bottomRef}></div>

//           </div>

//           {/* Input */}

//           <div className="border-t flex">

//             <input
//               className="flex-1 px-4 py-3 outline-none text-sm"
//               placeholder="Ask me anything..."
//               value={input}
//               onChange={(e) =>
//                 setInput(e.target.value)
//               }
//               onKeyDown={(e) =>
//                 e.key === "Enter" &&
//                 sendMessage()
//               }
//             />

//             <button
//               onClick={() => sendMessage()}
//               className="px-4 bg-blue-600 text-white"
//             >
//               <SendHorizontal size={18} />
//             </button>

//           </div>

//         </div>
//       )}
//     </>
//   );
// }


























import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import {
  MessageCircle,
  X,
  SendHorizontal,
  Bot,
  User,
} from "lucide-react";

// ---------------------------------------------------------------------
// Static content — keep this in sync with the categories used on
// ProfessionalRegister.jsx and the /services page.
// ---------------------------------------------------------------------
const SERVICE_CATEGORIES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Technician",
  "Cleaning",
  "Appliance Repair",
];

// Top-level menu shown on open and whenever the bot doesn't know what
// else to suggest.
const MAIN_MENU = [
  { label: "🧹 Book a Service", action: "book_service" },
  { label: "🛠 Become a Professional", action: "become_professional" },
  { label: "📦 Track My Booking", action: "track_booking" },
  { label: "💰 Pricing", action: "pricing" },
  { label: "💬 Talk to Support", action: "support" },
];

// Keyword -> action map for free-typed messages. Checked top to bottom,
// first match wins. This is intentionally simple (no NLP) — good enough
// to catch the common phrasings people actually type.
const INTENT_RULES = [
  { action: "become_professional", keywords: ["professional", "worker", "join as", "provide service", "electrician job", "plumber job", "work with servicelink", "earn"] },
  { action: "book_service", keywords: ["book", "hire", "need a", "electrician", "plumber", "carpenter", "painter", "ac repair", "cleaning", "appliance"] },
  { action: "track_booking", keywords: ["track", "booking status", "my booking", "where is my", "order status"] },
  { action: "pricing", keywords: ["price", "pricing", "cost", "charge", "how much", "fee"] },
  { action: "support", keywords: ["support", "help", "contact", "complaint", "issue", "problem"] },
  { action: "login", keywords: ["login", "log in", "sign in"] },
];

function detectIntent(text) {
  const lower = text.toLowerCase();
  for (const rule of INTENT_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.action;
    }
  }
  return null;
}

export default function ChatBot() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      type: "text",
      text: "👋 Hi! Welcome to ServiceLink.\n\nI'm your Booking Assistant.\n\nI can help you book services, become a professional or answer common questions.",
      quickReplies: MAIN_MENU,
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function addUserMessage(text) {
    setMessages((prev) => [...prev, { sender: "user", type: "text", text }]);
  }

  // quickReplies is optional — attaches chips under this bot message
  function addBotMessage(text, quickReplies = null) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", type: "text", text, quickReplies },
      ]);
    }, 500);
  }

  // -------------------------------------------------------------------
  // Action handlers — each corresponds to a quick-reply chip or a
  // detected keyword intent. Keep replies short; the chip is the CTA.
  // -------------------------------------------------------------------
  function handleAction(action) {
    switch (action) {
      case "book_service": {
        addBotMessage(
          "Great — what kind of service do you need? Tap a category to browse pros, or head straight to the full list.",
          [
            ...SERVICE_CATEGORIES.slice(0, 4).map((c) => ({
              label: c,
              action: `goto_services:${c}`,
            })),
            { label: "See All Services →", action: "goto_services" },
          ]
        );
        break;
      }

      case "become_professional": {
        addBotMessage(
          "We'd love to have you on ServiceLink! Applications are reviewed by our admin team before your account goes live.",
          [
            { label: "Start Application →", action: "goto_register_professional" },
            { label: "⬅ Back to Menu", action: "menu" },
          ]
        );
        break;
      }

      case "track_booking": {
        if (isAuthenticated) {
          addBotMessage(
            "You can see all your bookings and their live status on your dashboard.",
            [
              { label: "Open Dashboard →", action: "goto_dashboard" },
              { label: "⬅ Back to Menu", action: "menu" },
            ]
          );
        } else {
          addBotMessage(
            "You'll need to log in first — once you're in, your bookings and their status show up right on your dashboard.",
            [
              { label: "Log In →", action: "goto_login" },
              { label: "⬅ Back to Menu", action: "menu" },
            ]
          );
        }
        break;
      }

      case "pricing": {
        addBotMessage(
          "Pricing depends on the service, scope, and the professional you book — most give you a quote before confirming. There's no fixed price list, but you'll always see the cost before you pay.",
          [
            { label: "Browse Services →", action: "goto_services" },
            { label: "⬅ Back to Menu", action: "menu" },
          ]
        );
        break;
      }

      case "support": {
        addBotMessage(
          "You can reach our support team anytime at support@servicelink.app. For urgent issues with an active booking, use the 'Cancel/Report' option on that booking from your dashboard.",
          [{ label: "⬅ Back to Menu", action: "menu" }]
        );
        break;
      }

      case "login": {
        addBotMessage("Sure, taking you to the login page.");
        navigate("/login");
        break;
      }

      case "goto_login": {
        navigate("/login");
        break;
      }

      case "goto_dashboard": {
        navigate("/dashboard");
        break;
      }

      case "goto_register_professional": {
        navigate("/register/professional");
        break;
      }

      case "goto_services": {
        navigate("/services");
        break;
      }

      case "menu": {
        addBotMessage("Sure — what would you like to do?", MAIN_MENU);
        break;
      }

      default: {
        // Handles "goto_services:CategoryName" chips
        if (action.startsWith("goto_services:")) {
          const category = action.split(":")[1];
          addBotMessage(`Taking you to ${category} services near you.`);
          navigate(`/services?category=${encodeURIComponent(category)}`);
        }
        break;
      }
    }
  }

  // -------------------------------------------------------------------
  // Fallback for anything typed that doesn't match a known keyword.
  // Tries a backend endpoint first; if it's not wired up yet (or the
  // request fails), degrades to the main menu instead of breaking.
  // -------------------------------------------------------------------
  async function tryAiFallback(text) {
    try {
      const response = await fetch(`${API_URL}/api/chatbot/query/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error("Chatbot service unavailable.");

      const data = await response.json();
      addBotMessage(data.reply || "I'm not sure about that one.", MAIN_MENU);
    } catch {
      addBotMessage(
        "I didn't quite catch that. Here's what I can help with:",
        MAIN_MENU
      );
    }
  }

  function sendMessage(customText = input) {
    const text = customText.trim();
    if (!text) return;

    addUserMessage(text);
    setInput("");

    const action = detectIntent(text);
    if (action) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        handleAction(action);
      }, 500);
    } else {
      setTyping(true);
      tryAiFallback(text).finally(() => setTyping(false));
    }
  }

  function handleQuickReplyClick(action) {
    addUserMessage(MAIN_MENU.find((m) => m.action === action)?.label || "…");
    handleAction(action);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot size={18} />
              </div>
              <div>
                <h2 className="font-semibold">ServiceLink Assistant</h2>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto bg-gray-50 p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 items-end ${
                      msg.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Bot size={18} className="text-blue-600 shrink-0" />
                    ) : (
                      <User size={18} className="text-gray-600 shrink-0" />
                    )}

                    <div
                      className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line max-w-[230px]
                      ${
                        msg.sender === "bot"
                          ? "bg-white border"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>

                {/* Quick-reply chips attached to this bot message */}
                {msg.sender === "bot" && msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-7">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.action}
                        onClick={() => handleQuickReplyClick(qr.action)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex gap-2 items-center">
                <Bot size={18} className="text-blue-600" />
                <div className="bg-white border rounded-xl px-3 py-2 text-sm">
                  Typing...
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="border-t flex">
            <input
              className="flex-1 px-4 py-3 outline-none text-sm"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={() => sendMessage()}
              className="px-4 bg-blue-600 text-white"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}