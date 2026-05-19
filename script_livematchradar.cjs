const fs = require('fs');
let file = fs.readFileSync('src/pages/dfolgabet/components/LiveMatchRadar.tsx', 'utf8');

// Add popup state and Info
file = file.replace(/import \{ TrendingUp \} from 'lucide-react';/, "import { TrendingUp, Info } from 'lucide-react';");

file = file.replace(/export default function LiveMatchRadar\(\) \{/, "export default function LiveMatchRadar() {\n  const [popupMessage, setPopupMessage] = useState('');\n  const showPopup = (msg: string) => {\n    setPopupMessage(msg);\n    setTimeout(() => setPopupMessage(''), 3000);\n  };\n");

// Add toast generic element before <div className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-2xl shrink-0 w-full mb-6">
file = file.replace(/return \(\n\s*<div className="bg-\[#120826\] border border-\[#311B92\] rounded-xl overflow-hidden shadow-2xl shrink-0 w-full mb-6">/g, "return (\n    <div className=\"bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-2xl shrink-0 w-full mb-6\">\n      {popupMessage && (\n         <div className=\"fixed bottom-4 right-4 bg-[#1A0D35] border border-[#50C0CC] text-white px-6 py-4 rounded-lg shadow-[0_10px_30px_rgba(80,192,204,0.3)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300\">\n           <div className=\"flex items-center gap-3\">\n             <Info className=\"text-[#50C0CC]\" size={20} />\n             <p className=\"font-bold text-sm tracking-wide\">{popupMessage}</p>\n           </div>\n         </div>\n      )}");

// Add interaction to PREVISAO buttons
file = file.replace(/<button className="w-full bg-\[#311B92\]\/30 hover:bg-\[#311B92\]\/60 border border-\[#311B92\] text-white flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors group">/g, "<button onClick={() => showPopup('Apostar nessa seleção está desativado no momento.')} className=\"w-full bg-[#311B92]/30 hover:bg-[#311B92]/60 border border-[#311B92] text-white flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors group\">");

// Replace submeter previsao
file = file.replace(/<button className="w-full bg-\[#F37021\] text-white font-black uppercase text-xs py-3.5 rounded-lg hover:bg-opacity-90 shadow-\[0_4px_15px_rgba\(243,112,33,0\.3\)\] transition-all">/g, "<button onClick={() => showPopup('Submissão de previsões desativada no momento.')} className=\"w-full bg-[#F37021] text-white font-black uppercase text-xs py-3.5 rounded-lg hover:bg-opacity-90 shadow-[0_4px_15px_rgba(243,112,33,0.3)] transition-all\">");

// Look for MATCH RADAR header interaction too maybe? 
// Not specifically requested but it's safe. 

fs.writeFileSync('src/pages/dfolgabet/components/LiveMatchRadar.tsx', file);
