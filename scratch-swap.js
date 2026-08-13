const fs = require('fs');
let code = fs.readFileSync('src/components/HeroSection.jsx', 'utf8');

const textBlockStart = code.indexOf('<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center mt-4">');
const swiperBlockStart = code.indexOf('{/* Bottom Swiper: Food Carousel */}');
const swiperBlockEnd = code.indexOf('</section>');

const textBlock = code.substring(textBlockStart, swiperBlockStart);
const swiperBlock = code.substring(swiperBlockStart, swiperBlockEnd);

const beforeTextBlock = code.substring(0, textBlockStart);

const newCode = beforeTextBlock + swiperBlock + textBlock + '</section>\n  );\n}\n';
fs.writeFileSync('src/components/HeroSection.jsx', newCode);
