(function(){
  const PHONE = "34641813075"; // +34 641 813 075 (sem +)
  const TEXT = encodeURIComponent("Hola, quiero TV gratis en mi Android.");
  const waHttps = `https://wa.me/${PHONE}?text=${TEXT}`;
  const intentChrome = `intent://wa.me/${PHONE}?text=${TEXT}#Intent;scheme=https;package=com.android.chrome;end`;
  const intentWhatsApp = `intent://send/?phone=${PHONE}&text=${TEXT}#Intent;scheme=whatsapp;package=com.whatsapp;end`;

  function isAndroid(){ return /Android/i.test(navigator.userAgent); }
  function isInApp(){
    const ua = navigator.userAgent || navigator.vendor || "";
    return /(FBAN|FBAV|FB_IAB|Instagram|Line|Twitter|Discord|Telegram|Snapchat|Pinterest|TikTok|KAKAOTALK|WeChat|MiuiBrowser|AmazonWebAppPlatform|AmazonWebView|OPR\/|HeyTapBrowser|VivoBrowser|HUAWEI|UCBrowser|YaBrowser)/i.test(ua);
  }

  function openWhatsApp(){
    if(isAndroid()){
      if(isInApp()){
        window.location.href = intentChrome;
        setTimeout(()=>{ window.location.href = intentWhatsApp; }, 600);
        setTimeout(()=>{ window.location.href = waHttps; }, 1200);
      }else{
        window.location.href = waHttps;
      }
    }else{
      window.open(waHttps, "_blank", "noopener,noreferrer");
    }
  }

  function showIABWarningIfNeeded(){
    if(isInApp()){
      var el = document.getElementById("iabWarning");
      if(el){ el.style.display = "block"; }
    }
  }

  window.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("btnWpp");
    if(btn){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        openWhatsApp();
      });
    }
    showIABWarningIfNeeded();
  });
})();