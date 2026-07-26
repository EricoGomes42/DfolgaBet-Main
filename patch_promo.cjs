const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/components/PromoSection.tsx', 'utf8');

content = content.replace(
  'aspect-[1.95/1] rounded-2xl overflow-hidden bg-black',
  'aspect-[1.9/1] rounded-2xl overflow-hidden bg-[#0A051A]'
);

content = content.replace(
  '<img \n                    src={BANNERS[currentSlide].image} \n                    alt={BANNERS[currentSlide].alt}\n                    className="w-full h-full object-contain"',
  `<img 
                    src={BANNERS[currentSlide].image} 
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125"
                  />
                  <img 
                    src={BANNERS[currentSlide].image} 
                    alt={BANNERS[currentSlide].alt}
                    className="relative w-full h-full object-contain z-10"`
);

fs.writeFileSync('src/pages/dfolgabet/components/PromoSection.tsx', content);
