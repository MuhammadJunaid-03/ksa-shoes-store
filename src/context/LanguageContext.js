"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    newArrivals: "New Arrivals",
    arabicSandals: "Arabic Sandals",
    formalShoes: "Formal Shoes",
    accessories: "Accessories",
    langToggle: "العربية",
    
    // Hero
    heroLabel: "Handcrafted Since 1987",
    heroTitle1: "Elegance in Every",
    heroTitle2: "Footstep",
    heroDesc: "Discover our new collection of premium handcrafted Arabic sandals. Designed for the modern gentleman, rooted in timeless tradition.",
    shopCollection: "Shop Collection",
    ourHeritage: "Our Heritage",
    scroll: "Scroll",
    
    // Sections
    featuredTitle: "Featured Collections",
    featuredDesc: "Each piece is meticulously handcrafted by master artisans, carrying forward centuries of Arabian craftsmanship.",
    shopByCategory: "Shop by Category",
    browseCollections: "Browse our curated collections",
    showing: "Showing",
    products: "products",
    featured: "Featured",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    quickAdd: "Quick Add +",
    soldOut: "Sold Out",
    
    // Categories
    catSandals: "Arabic Sandals",
    catShoes: "Formal Shoes",
    catAccessories: "Accessories",
    catSandalsCount: "100+ Styles",
    catShoesCount: "Coming Soon",
    catAccessoriesCount: "Explore",
    explore: "Explore",
    
    // Trust
    trust1Title: "Authenticity Guaranteed",
    trust1Desc: "Every product is certified genuine",
    trust2Title: "Fast KSA Delivery",
    trust2Desc: "Same-day in Riyadh & Jeddah",
    trust3Title: "Gift Packaging",
    trust3Desc: "Luxury packaging on every order",
    trust4Title: "Expert Support",
    trust4Desc: "Arabic & English, 24/7",
    
    // Marquee
    marquee1: "✦ Premium Handcrafted Leather",
    marquee2: "✦ Free Shipping Across KSA",
    marquee3: "✦ Authentic Arabian Heritage",
    marquee4: "✦ 30-Day Returns",
    marquee5: "✦ Exclusive Designs",
    marquee6: "✦ Since 1987",
    
    // Footer
    footerDesc: "The premier destination for luxury Arabic footwear in the Kingdom of Saudi Arabia. Craftsmanship you can trust.",
    shop: "Shop",
    support: "Support",
    contactUs: "Contact Us",
    shippingReturns: "Shipping & Returns",
    faq: "FAQ",
    sizeGuide: "Size Guide",
    sale: "Sale",
    newsletter: "Join our Newsletter",
    newsletterDesc: "Subscribe to receive updates, access to exclusive deals, and more.",
    emailPlaceholder: "Enter your email address",
    subscribe: "Subscribe",
    copyright: "Al-Zaytoun E-Commerce. All rights reserved.",
    
    // Filters
    filters: "Filters",
    categories: "Categories",
    brands: "Brands",
    sizeEU: "Size (EU)",
    priceRange: "Price Range",
    casual: "Casual",
    
    // Cart
    yourCart: "Your Cart",
    emptyCart: "Your cart is currently empty.",
    subtotal: "Subtotal",
    taxNote: "Taxes and shipping calculated at checkout.",
    checkout: "Proceed to Checkout",
    remove: "Remove",
    qty: "Qty",
    addedToCart: "added to cart",
    
    // Search
    searchPlaceholder: "Search for sandals, shoes, accessories...",
    searchResults: "Search Results",
    noResults: "No products found. Try a different search.",
    recentSearches: "Popular Searches",
    
    // Auth
    login: "Login",
    signup: "Create Account",
    email: "Email Address",
    password: "Password",
    fullName: "Full Name",
    phone: "Phone Number",
    loginBtn: "Sign In",
    signupBtn: "Create Account",
    noAccount: "Don't have an account?",
    hasAccount: "Already have a member?",
    forgotPassword: "Forgot Password?",
    orContinueWith: "or continue with",
    google: "Google",
    apple: "Apple",
    welcomeBack: "Welcome Back",
    joinUs: "Join Al-Zaytoun",
    loginSuccess: "Successfully logged in!",
    signupSuccess: "Account created successfully!",

    // Pages
    sandalsTitle: "Arabic Sandals",
    sandalsDesc: "Our exclusive collection of handcrafted Arabic sandals, made with premium leather and traditional techniques.",
    comingSoonDesc: "We are crafting something beautiful. This section is coming soon.",
    returnHome: "Return to Home",
    productDetails: "Product Details",
    backToHome: "← Back to Home",

    // Footer compliance
    crNumber: "CR: 1010XXXXXX",
    vatNumber: "VAT: 3XXXXXXXXXXXXXXX",
    maroof: "Registered on Maroof",

    // Reviews section
    reviewsTitle: "What Our Customers Say",
    reviewsTrust: "Trusted by 2,000+ Saudi gentlemen",
    verifiedBuyer: "Verified Buyer",
    reviewsAggregate: "4.8 ★ Average — Based on 247 reviews",
    reviewer1Name: "Mohammed Al-Rashid",
    reviewer2Name: "Fahad Al-Otaibi",
    reviewer3Name: "Khalid Al-Harbi",
    review1Text: "The craftsmanship is exceptional. Best sandals I've owned in years. The leather quality speaks for itself.",
    review2Text: "Fast delivery to Riyadh, arrived next day. Perfect fit and exactly as described. Will order again.",
    review3Text: "Bought three pairs for my family. Everyone loves them. The packaging was premium too — great gift option.",
  },
  ar: {
    // Navbar
    newArrivals: "وصل حديثاً",
    arabicSandals: "صنادل عربية",
    formalShoes: "أحذية رسمية",
    accessories: "إكسسوارات",
    langToggle: "English",
    
    // Hero
    heroLabel: "صناعة يدوية منذ ١٩٨٧",
    heroTitle1: "أناقة في كل",
    heroTitle2: "خطوة",
    heroDesc: "اكتشف مجموعتنا الجديدة من الصنادل العربية المصنوعة يدوياً. مصممة للرجل العصري، متجذرة في التقاليد الخالدة.",
    shopCollection: "تسوق المجموعة",
    ourHeritage: "تراثنا",
    scroll: "اسحب",
    
    // Sections
    featuredTitle: "المجموعات المميزة",
    featuredDesc: "كل قطعة مصنوعة بعناية فائقة على يد حرفيين بارعين، تحمل إرث قرون من الحرفة العربية.",
    shopByCategory: "تسوق حسب الفئة",
    browseCollections: "تصفح مجموعاتنا المنسقة",
    showing: "عرض",
    products: "منتجات",
    featured: "مميز",
    priceLowHigh: "السعر: من الأقل للأعلى",
    priceHighLow: "السعر: من الأعلى للأقل",
    quickAdd: "إضافة سريعة +",
    soldOut: "نفذت الكمية",
    
    // Categories
    catSandals: "صنادل عربية",
    catShoes: "أحذية رسمية",
    catAccessories: "إكسسوارات",
    catSandalsCount: "+١٠٠ تصميم",
    catShoesCount: "قريباً",
    catAccessoriesCount: "استكشف",
    explore: "استكشف",
    
    // Trust
    trust1Title: "أصالة مضمونة",
    trust1Desc: "كل منتج معتمد وأصلي",
    trust2Title: "توصيل سريع",
    trust2Desc: "توصيل في نفس اليوم بالرياض وجدة",
    trust3Title: "تغليف هدايا",
    trust3Desc: "تغليف فاخر مع كل طلب",
    trust4Title: "دعم متخصص",
    trust4Desc: "عربي وإنجليزي، ٢٤/٧",
    
    // Marquee
    marquee1: "✦ جلد مصنوع يدوياً فاخر",
    marquee2: "✦ شحن مجاني في جميع أنحاء المملكة",
    marquee3: "✦ تراث عربي أصيل",
    marquee4: "✦ إرجاع خلال ٣٠ يوماً",
    marquee5: "✦ تصاميم حصرية",
    marquee6: "✦ منذ ١٩٨٧",
    
    // Footer
    footerDesc: "الوجهة الأولى للأحذية العربية الفاخرة في المملكة العربية السعودية. حرفية يمكنك الوثوق بها.",
    shop: "تسوق",
    support: "الدعم",
    contactUs: "اتصل بنا",
    shippingReturns: "الشحن والإرجاع",
    faq: "الأسئلة الشائعة",
    sizeGuide: "دليل المقاسات",
    sale: "تخفيضات",
    newsletter: "اشترك في النشرة البريدية",
    newsletterDesc: "اشترك لتلقي التحديثات والوصول إلى العروض الحصرية والمزيد.",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",
    copyright: "الزيتون للتجارة الإلكترونية. جميع الحقوق محفوظة.",
    
    // Filters
    filters: "الفلاتر",
    categories: "الفئات",
    brands: "العلامات التجارية",
    sizeEU: "المقاس (EU)",
    priceRange: "نطاق السعر",
    casual: "كاجوال",
    
    // Cart
    yourCart: "سلة التسوق",
    emptyCart: "سلة التسوق فارغة حالياً.",
    subtotal: "المجموع الفرعي",
    taxNote: "الضرائب والشحن محسوبة عند الدفع.",
    checkout: "المتابعة إلى الدفع",
    remove: "حذف",
    qty: "الكمية",
    addedToCart: "تمت الإضافة إلى السلة",
    
    // Search
    searchPlaceholder: "ابحث عن صنادل، أحذية، إكسسوارات...",
    searchResults: "نتائج البحث",
    noResults: "لم يتم العثور على منتجات. جرب بحثاً مختلفاً.",
    recentSearches: "بحث شائع",
    
    // Auth
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    loginBtn: "تسجيل الدخول",
    signupBtn: "إنشاء حساب",
    noAccount: "ليس لديك حساب؟",
    hasAccount: "لديك حساب بالفعل؟",
    forgotPassword: "نسيت كلمة المرور؟",
    orContinueWith: "أو المتابعة بواسطة",
    google: "جوجل",
    apple: "أبل",
    welcomeBack: "أهلاً بعودتك",
    joinUs: "انضم إلى الزيتون",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    signupSuccess: "تم إنشاء الحساب بنجاح!",

    // Pages
    sandalsTitle: "صنادل عربية",
    sandalsDesc: "مجموعتنا الحصرية من الصنادل العربية المصنوعة يدوياً من أجود أنواع الجلود وبتقنيات تقليدية.",
    comingSoonDesc: "نحن نصنع شيئاً جميلاً. هذا القسم قادم قريباً.",
    returnHome: "العودة للرئيسية",
    productDetails: "تفاصيل المنتج",
    backToHome: "→ العودة للرئيسية",

    // Footer compliance
    crNumber: "سجل تجاري: ١٠١٠XXXXXX",
    vatNumber: "الرقم الضريبي: ٣XXXXXXXXXXXXXXX",
    maroof: "مسجل في معروف",

    // Reviews section
    reviewsTitle: "ماذا يقول عملاؤنا",
    reviewsTrust: "موثوق من قبل أكثر من ٢٠٠٠ رجل سعودي",
    verifiedBuyer: "مشتري موثق",
    reviewsAggregate: "٤.٨ ★ متوسط — بناءً على ٢٤٧ تقييم",
    reviewer1Name: "محمد الراشد",
    reviewer2Name: "فهد العتيبي",
    reviewer3Name: "خالد الحربي",
    review1Text: "الحرفية استثنائية. أفضل صنادل امتلكتها منذ سنوات. جودة الجلد تتحدث عن نفسها.",
    review2Text: "توصيل سريع للرياض، وصل في اليوم التالي. مقاس مثالي وكما هو موصوف تماماً. سأطلب مرة أخرى.",
    review3Text: "اشتريت ثلاثة أزواج لعائلتي. الجميع أحبها. التغليف كان فاخراً أيضاً — خيار هدية رائع.",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };
  
  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
