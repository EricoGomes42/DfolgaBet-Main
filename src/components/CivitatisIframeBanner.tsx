import React, { useState, useEffect } from 'react';

const ads = [
  {
    url: 'https://www.civitatis.com/pt/buenos-aires/espetaculo-tango-porteno/?aid=10340',
    img: 'https://www.civitatis.com/f/argentina/buenos-aires/galeria/bailarines-tango-porteno-buenos-aires.jpg',
    claim: 'Espetáculo no teatro Tango Porteño',
    price: 'R$193,55'
  },
  {
    url: 'https://www.civitatis.com/pt/barcelona?aid=10340',
    img: 'https://www.civitatis.com/f/espana/barcelona/galeria/fachada-sagrada-familia-bcn.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Barcelona?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/roma?aid=10340',
    img: 'https://www.civitatis.com/f/italia/roma/galeria/arena-gladiadores.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Roma?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/londres?aid=10340',
    img: 'https://www.civitatis.com/f/reino-unido/londres/galeria/tren-estudios-warner.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Londres?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/florenca?aid=10340',
    img: 'https://www.civitatis.com/f/italia/florencia/galeria/pisa.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Florença?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/milao?aid=10340',
    img: 'https://www.civitatis.com/f/italia/milan/galeria/paisajes-historicos-bellagio-italia-r32.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Milão?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/porto?aid=10340',
    img: 'https://www.civitatis.com/f/portugal/oporto/galeria/rabelo-barco-tradicional-oporto.jpg',
    claim: 'O que vai fazer no <span class="u-nowrap">Porto?</span>',
    price: ''
  },
  {
    url: 'https://www.civitatis.com/pt/lisboa?aid=10340',
    img: 'https://www.civitatis.com/f/portugal/lisboa/galeria/sintra-tour.jpg',
    claim: 'O que vai fazer em <span class="u-nowrap">Lisboa?</span>',
    price: ''
  }
];

const generateHtml = (url: string, img: string, claim: string, price: string, logoBase64: string) => `<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="ad.size" content="width=728,height=90"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet"><title>civitatis</title><style>body{font-family:montserrat, arial, helvetica, sans-serif}html,body,.civitatis-gcmbanner{width:728px;height:90px;overflow:hidden;position:relative}*{margin:0;padding:0;border:0;font-size:100%;font:inherit;box-sizing:border-box}img{max-width:none !important}.logo.logo.logo{display:block !important;text-align:center}a{display:block;width:728px;height:90px;position:relative;overflow:hidden}.civbg{background-color:#f70759;position:absolute;animation-fill-mode:forwards}.main-img{position:absolute;left:50% !important;transform:translateX(-50%) !important;animation-fill-mode:forwards}.main-img-horizontal{position:absolute;top:50%;transform:translateY(-50%);animation-fill-mode:forwards}.txt{z-index:2}.u-nowrap{white-space:nowrap}.circle{z-index:1;position:absolute;border-radius:100%;background-color:#f70759;animation-fill-mode:forwards}.circle._white{background-color:#fff}#image-placeholder{width:728px;height:90px;position:absolute;top:0;bottom:0}#image-placeholder>a{position:relative;z-index:-1}#image-placeholder>a img{position:relative;z-index:1}.m-banner__img__hover{position:absolute;top:100%;right:0;bottom:0;left:0;overflow:hidden;background:-webkit-gradient(linear, left top, right bottom, color-stop(0, #f70a59), color-stop(100%, #d70391));background:-webkit-linear-gradient(140deg, #d70391, #f70a59);background:-o-linear-gradient(140deg, #d70391 0, #f70a59 100%);background:-ms-linear-gradient(140deg, #d70391 0, #f70a59 100%);background:linear-gradient(310deg, #d70391, #f70a59);display:flex;justify-content:space-around}.m-banner__img__hover ._view,.m-banner__img__hover ._download{cursor:pointer;display:flex;align-items:center;justify-content:center;width:40%;height:auto}.__container:hover .m-banner__img__hover{top:0;transition:top .3s ease}.loader{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);display:block}.loader .__inner{border:16px solid #f5f5f5;border-radius:50%;border-top:16px solid #eeeeee;width:90px;height:90px;-webkit-animation:spin 1.5s linear infinite;animation:spin 1.5s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.main-container{opacity:0}.loaded .civbg,.loaded .circle,.loaded .main-img,.loaded .main-img-horizontal,.loaded .txt,.loaded .claim,.loaded .price,.loaded .logo,.loaded .arch,.loaded .archBig,.loaded .maskRight,.loaded .maskTop,.loaded .maskTopSmall,.loaded .maskBottom,.loaded .maskBottomSmall{animation-fill-mode:forwards}.loaded .loader{display:none}.loaded .main-container{opacity:1}.claim{font-weight:bold}.price._USD._120x600,.price._BRL._120x600,.price._MXN._120x600,.price._ARS._120x600,.price._PEN._120x600{font-size:14px !important}.price._USD._160x600,.price._BRL._160x600,.price._MXN._160x600,.price._ARS._160x600,.price._PEN._160x600{font-size:16px !important}.price._USD._300x600,.price._BRL._300x600,.price._MXN._300x600,.price._ARS._300x600,.price._PEN._300x600{font-size:24px !important}.price._COP._120x600,.price._CLP._120x600{font-size:12px !important}.price._COP._160x600,.price._CLP._160x600{font-size:14px !important}.price._COP._300x600,.price._CLP._300x600{font-size:22px !important}@keyframes civbg{0%{left:728px}100%{left:226px}}.civbg{display:none;top:0;right:0;bottom:0;left:-20px;transition:top 1s}.loaded .civbg{display:inherit;animation-name:civbg;animation-timing-function:cubic-bezier(0.75, 0, 0.65, 1.01);animation-delay:0.16;animation-duration:.88s;animation-iteration-count:1}@keyframes img{0%{width:105%;left:-20px}100%{width:236px;left:0}}.main-img-horizontal{position:absolute;width:105%;left:-20px}.loaded .main-img-horizontal{animation-name:img;animation-timing-function:cubic-bezier(0.82, 0.08, 0.48, 0.99);animation-delay:0.24s;animation-duration:0.96s;animation-iteration-count:1}@keyframes txt-transform{0%{transform:none}100%{transform:translateY(-20px)}}@keyframes txt-opacity{0%{opacity:0}100%{opacity:1}}.txt{bottom:0;top:0;color:#fff;width:100%}.txt,.claim,.price,.logo{position:absolute}.claim,.price,.logo{opacity:0}.loaded .claim,.loaded .price,.loaded .logo{opacity:0;transform:none;animation:txt-transform .56s ease-in-out .70s 1 forwards, txt-opacity .56s ease-in-out .90s 1 forwards}.claim{left:262px;top:36px;font-size:18px;line-height:120%}.price{left:262px;bottom:-12px;animation-delay:.96s, 1.16s;font-weight:600;font-size:24px}.loaded .price{animation-delay:.90s, 1.1s}.logo{text-align:right !important;right:15px;bottom:-10px}.logo img{width:82px}.loaded .logo{animation-delay:1.2s, 1.4s}</style><script>var clickTag = "${url}"; window.onload = function(e) { document.body.className = "civitatis-gcmbanner loaded"; };</script></head><body class="civitatis-gcmbanner"><a href="javascript:window.open(window.clickTag)"><div id="loader" class="loader"><div class="__inner"></div></div><div class="main-container"><img class="main-img-horizontal" src="${img}" alt="civitatis"><div class="civbg"></div><div class="txt"><div class="claim">${claim}</div>${price ? '<div class="price _BRL _728x90">' + price + '</div>' : '<div class="price _BRL _728x90"></div>'}<div class="logo"><img src="${logoBase64}" alt="civitatis"></div></div></div></a></body></html>`;

export default function CivitatisIframeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 10000); // Change banner every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const currentAd = ads[currentIndex];

  const [logoBase64, setLogoBase64] = useState(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAuCAMAAABam6YzAAAC+lBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8VN6D4AAAA/XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXmBhYmNkZWZnaGlqa2xtb3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+D5UrVwAACYhJREFUaIGtmntcV0UWwA8IP3nKSxQSN5YUtUzdMM31lZamBLGYaG1bCmWp9AIs1xf4TBMh2x6SJfYDXVFTfJvhrro+EBRZBTTaEhCUp/h+AN7PZ+9jzszce38/uD/j/DXnzJkz8/3duTNn5v4A2hCnD05fu5w9si03IiN3Vjeeet9JURw7miTpaLIz2Jr06CQ3Mzkw0/j99Q0nozvYFEYjvocEWaYZ8p6hOO9zkbUVZbmSFP7Ux5YeHzlwTm5WnGqPpkVK2PW2hNHKWiWG0PSMAeeR94j3KlndTrTmYbb02PsGaXbIRCyRxCB8bOPgOXmiDoOYDXhvQ+fy7pL6A9HqB9rSZVAtabYXp1I2hr3Y2dbxU5mGMYQC+zadvUuo9yRJbyeQnmUY9e7wh0BQZBYdWpFzm85+v1LvGElvJ5CQeho2/CEQFImiMXLbdnY5jc4tYyW9nUD8ijDs9f62ExBhs2W+Ae9kdC50lNT2eke+wbAnHG0dP5M3cWjeBpwDzhPvv8pqe4H0uEIs42wcvErevS1z9DDk/OR/JefbZNNpLxAYJv9AtybbEkYvIYlZ30T7GnTu/ObarHk4k9sNBPxmpm/6yKZttV0FQWptekcpyI6H7tjB/9kZScuXJEQGd7RU2+ZG0sFBrSNI9eM6V8eAoa/GvD4mSM5l7BwUMcmPgIJkt9aX16iE5NWpS6cP9NBVBbyVU9eshLhxJgn7nrPHLMmGzX0DMzfLxexVXuqGY37YKFfsiX1iQ5Zc2jVbBXJ/V1qG+fttS1yxRVD88ZomaZW+WrSsF8DwY6eOiXK8JFkFUpWZLna8PRTGblc6yJ6JAf68vvIBiX3JPN6FH41r3CWBl1up/vKPdRgNk4BusBPUIJhSCe89j6VjKhAi5/wVf/dFVznrjQSYgOUT9jwIkcWwAIvkGXX6R5PKIzeCvU39TwtaKQuTKg6iGgUfY3GriqM/Rr3iNg49ciyB5PnI1n6Fmo6Sht0hpT12FkAS4EMsZipTJ1831mgczCu3dHWifMiDTIKABlK81pcHmYse30I4Fg9YAsmVt6LwekEjd3ZWtQYSB+9hMUMK4FWgG+gNXBZft4QhSiJADgOBNVheyHGYzqJ1BJsj1kFG3RF0ch+fqSGQNYJOPidjCbPCIdztpQIZjeUCdwYyEY2HHQ2ABKjfRI0YARl6V9fsej9lKEHl1gLPUE0tgMO8QmQj2qaDAZDNrXEYAlmhb5ahHYokdyuqH2D5HdCATEdlC+V4HFegUv+2QAp84Y1WOSyDzFWDHEDlf8vj/p78fZ442lH6ibU7qn9gjyEz82RFzphUIL4VRGkMRpA4rE8FqyAtv54tLi6q2mqCE6yrlh3Rzz8bmqB6c9UgN0qKiotLL0+B9zkQ32JSLgqU+3B+2mwmi+9OGqcOZ4x97E1xVwAdCHuumNS7nSKGOwOtgzQMBRcXF1dnGM/GfGE0iTDlpjWQ/W4dxGZuduzHEkG6XSTlTPwpOxCOAfTlafwTm/kjKueBBZBBOO3yOynVL2C1nBhZAaG51hd0yCfZqWBwpRWQnegRz4F0wQNS9XOgFjrvham82cfNEgjsQTVKqc5AfUIrIJj9el/A+sreXFehVkD2YurGg9j9hErT9uin+ORuHVbsA0uiAXkN1Q2yGnyZqOc6GQDpQ/eQWFUfn1kBwcSDB1GtWveOJA+iUY6idboRELdSojbIpwOaPCwCAyAvYXV5F1Uf9N7KCMjT6iTk/pm4RxUvvPm4pco7rIHAPNTniopzLlGuBhsBeQerNSeNF1tsAIFPBY3UJcrpbw1Rq/5gCKQv/iB5YlI+Eis3ghEQOqBUdR8RaDcEYrdFSyKckh4CNrsUYAgE1qMhEuBbLI83BEIvyVb+HhBwSdOR/CLOCFz86h4zBkIzXDNLnPKcDIHEYvUmdR9hNk0tUcbhlKbyIwBNXi3ftehA7PDk0uCNV0XCR9AqSF2IUj0Jq0vUZ8zQZhtBwD7yu1/UJJGwC4tftg4SBdqwcZik1TxqDOQperCLUPVBT2y7gQfZZa/tMYNr9Ejo4jO3GUgaLMTiFYvXLXqQIDwZNeOMoN8trIDcHapU++NFm5DHH7Mfo0cteS8Pwg8A+3Qg6eqxOQbPp6eCQra4qxZFp6VDNCCv0bqvBY2M0IEclFX6lQHvnrdyPyAVd7pXCzkOPEgJ3uVQkEzQygAkqQaPczSOmZ7hu24TSvuoQT6hjcdoOP5Fb2QpSLGratw47KmsUSbuib25jPhykGgIpM8NLzkoSL7mvgnYdXM9wGIWKD9cRvGK+U1Ufu6mAqkd15lcIbGbFUXeplHpaVFI6ewDkEnVVD83n+4e4F/GWpXOCfH27vrc6ho+1Hfe3U3+9JxXO9HTo6u/HSTQ+vldfcFrgBe7NPHBY0CV+Naw7FNoKspYlrKLPK5CaWehR13h3gOSEMO7Ko7futKwLzNry7/dIZWptSVlDeK6t5RvePNiaeV99W8iVN+f68COKM0VJdeOurNlW2gRsmFwc1nOqrfChvfr0XNgJL1Qkb56zBSsSG4AP60FYTkZb7dK3utr9pzHP2DmIk+Yog4nvmW+P1vri8pK7kFKcsED/sapR2CwUmi6XnXlHrPLa+4ma0GLfWEJp9JPJCmcsWUIA+ETutOdoGedwMvLosfkNkFWcZ/7JDnpAUO4m5fDMNBiM/l98jxqsU4QKgLhL5yaiAMe1syMfPbveYbZCzz4w6ckEyWXxUIbkgLBDbye5wG+7JOeNZAjylLd/T8WY57tJa79XBAKAruZcSq/hnDvgATygsCLDKJfvMVXwcxdEqVo8lsRhOV31kCa8ODsmmGhdqd8HI1nBgbCZu15Hx4kuIJWSCCwTA8Ccx4IGlnL9nYZxI1bkWWQEHZZbBGkJYYNYUqFprIxnixyWdSURL298HwlJINKwuikK5QX69V6EBh7VuClKbEDOLDU/DPRIyCPVed7ioa3OZBBOo7KF/kheMzm45clY/4EHZdcI8ZPmfcCcUKIIjT2U4PAaNxfi5TrhcnsyvoN9DFNO0Rf3+pMOTU2zcM8RQIBt0S6K5bKcSbgcZ+uWlTKl/ppxuA0Ot58pORiaf72JeGqCfPHmM+zNm9cM7sXM3mOeGawKMP036Kcw5PMmzelrwgl/6RxGTUrfe/BnB1psVx/dk++Ov/LdWnJH4TRU5D/Kwu+Sk/7JJZ00iVq6aYfc/b/cyWJ4x6xeMOWrHUrxoBLxKyvdhw/X1FdU1NekL0Qh/p/f1B0QnApZvQAAAAASUVORK5CYII=`);

  // We use key=currentIndex to force the iframe to reload and replay CSS animations
  return (
    <div className="mb-10 text-center">
      <div className="border border-[#50c0cc] rounded-2xl bg-[#00171a] overflow-hidden flex justify-center py-4 lg:py-6 relative z-10 w-full min-h-[90px]">
        <div className="w-full flex justify-center overflow-hidden [&>iframe]:w-full [&>iframe]:h-[90px] md:[&>iframe]:h-auto md:[&>iframe]:aspect-[728/90] max-w-[728px]">
          <iframe 
            key={currentIndex}
            srcDoc={generateHtml(currentAd.url, currentAd.img, currentAd.claim, currentAd.price, logoBase64)} 
            style={{ width: "728px", height: "90px", border: "none" }}
            title="Civitatis Banner"
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
