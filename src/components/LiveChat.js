"use client";
import React, { useState } from 'react';
import styles from './LiveChat.module.css';
import { useLanguage } from '@/context/LanguageContext';

const quickReplies = [
  { en: "What sizes do you have?", ar: "ما المقاسات المتوفرة؟" },
  { en: "Do you deliver to my city?", ar: "هل توصلون لمدينتي؟" },
  { en: "What's the return policy?", ar: "ما سياسة الإرجاع؟" },
  { en: "I need help with my order", ar: "أحتاج مساعدة بطلبي" },
];

const botReplies = {
  "What sizes do you have?": "We carry EU sizes 39-45 across all our sandals and formal shoes. Check our Size Guide for detailed measurements! 📏",
  "ما المقاسات المتوفرة؟": "نوفر مقاسات EU من ٣٩ إلى ٤٥ لجميع صنادلنا وأحذيتنا الرسمية. راجع دليل المقاسات للقياسات التفصيلية! 📏",
  "Do you deliver to my city?": "We deliver across all of Saudi Arabia! 🇸🇦 Next-day in Riyadh & Jeddah, 2-3 days for other cities. Free shipping on orders over SAR 200.",
  "هل توصلون لمدينتي؟": "نوصل لجميع مدن المملكة! 🇸🇦 اليوم التالي في الرياض وجدة، ٢-٣ أيام لباقي المدن. شحن مجاني للطلبات فوق ٢٠٠ ر.س.",
  "What's the return policy?": "30-day free returns, no questions asked! Items must be unworn with original tags. We'll arrange free pickup. 🔄",
  "ما سياسة الإرجاع؟": "إرجاع مجاني خلال ٣٠ يوم بدون أسئلة! يجب أن تكون المنتجات غير ملبوسة مع البطاقات الأصلية. سنرتب الاستلام مجاناً. 🔄",
  "I need help with my order": "Sure! Please WhatsApp us at +966 50 123 4567 with your order number and we'll help you right away. 💬",
  "أحتاج مساعدة بطلبي": "بالتأكيد! تواصل معنا عبر واتساب على +٩٦٦ ٥٠ ١٢٣ ٤٥٦٧ مع رقم طلبك وسنساعدك فوراً. 💬",
};

export default function LiveChat() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: lang === 'ar' ? 'مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟' : "Hello! 👋 How can I help you today?" },
  ]);
  const [inputVal, setInputVal] = useState('');

  const sendMessage = (text) => {
    const userMsg = { from: 'user', text };
    const botReply = botReplies[text] || (lang === 'ar'
      ? 'شكراً لتواصلك! سيرد عليك فريقنا قريباً. يمكنك أيضاً مراسلتنا عبر واتساب للرد الفوري. 💬'
      : "Thanks for reaching out! Our team will get back to you shortly. You can also WhatsApp us for instant replies. 💬"
    );
    setMessages(prev => [...prev, userMsg, { from: 'bot', text: botReply }]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal.trim());
  };

  return (
    <>
      {/* Chat button */}
      <button
        className={`${styles.chatBtn} ${isOpen ? styles.chatBtnHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open live chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <span className={styles.chatBtnLabel}>{lang === 'ar' ? 'دردشة' : 'Chat'}</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.chatAvatar}>AZ</div>
              <div>
                <div className={styles.chatHeaderName}>Al-Zaytoun</div>
                <div className={styles.chatHeaderStatus}>
                  <span className={styles.onlineDot} />
                  {lang === 'ar' ? 'متصل الآن' : 'Online now'}
                </div>
              </div>
            </div>
            <button className={styles.chatClose} onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msg} ${msg.from === 'user' ? styles.msgUser : styles.msgBot}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className={styles.quickReplies}>
            {quickReplies.map((q, i) => (
              <button key={i} className={styles.quickBtn} onClick={() => sendMessage(lang === 'ar' ? q.ar : q.en)}>
                {lang === 'ar' ? q.ar : q.en}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className={styles.chatInput} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className={styles.chatInputField}
            />
            <button type="submit" className={styles.chatSendBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
