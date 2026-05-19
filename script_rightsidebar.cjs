const fs = require('fs');
let file = fs.readFileSync('src/pages/dfolgabet/components/RightSidebar.tsx', 'utf8');

// Add Info to lucide-react import
file = file.replace(/import \{ Search, ChevronDown, ChevronUp, Star, MessageSquare \} from 'lucide-react';/, "import { Search, ChevronDown, ChevronUp, Star, MessageSquare, Info } from 'lucide-react';");

// Add popup state
file = file.replace(/export function RightSidebar\(\) \{/, "export function RightSidebar() {\n  const [popupMessage, setPopupMessage] = useState('');\n  const showPopup = (msg: string) => {\n    setPopupMessage(msg);\n    setTimeout(() => setPopupMessage(''), 3000);\n  };\n");

// Add generic toast popup at the start of return
file = file.replace(/return \(\n\s*<div className="hidden lg:flex w-80 flex-col gap-6 dfolgabet-right-sidebar">/, "return (\n    <div className=\"hidden lg:flex w-80 flex-col gap-6 dfolgabet-right-sidebar\">\n      {popupMessage && (\n         <div className=\"fixed bottom-4 right-4 bg-[#1A0D35] border border-[#50C0CC] text-white px-6 py-4 rounded-lg shadow-[0_10px_30px_rgba(80,192,204,0.3)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300\">\n           <div className=\"flex items-center gap-3\">\n             <Info className=\"text-[#50C0CC]\" size={20} />\n             <p className=\"font-bold text-sm tracking-wide\">{popupMessage}</p>\n           </div>\n         </div>\n      )}");

// Now replace generic hoverable filters to trigger popups
file = file.replace(/<div className="flex items-center justify-between p-2 rounded hover:bg-\[#1A0D35\] cursor-pointer text-gray-400 hover:text-white">/g, "<div onClick={() => showPopup('Este filtro está desativado no momento.')} className=\"flex items-center justify-between p-2 rounded hover:bg-[#1A0D35] cursor-pointer text-gray-400 hover:text-white\">");

// Replace Submeter previsao button
file = file.replace(/<button className="w-full bg-\[#1A0D35\] border border-\[#311B92\] text-gray-400 py-2 rounded text-xs font-bold hover:text-white hover:border-\[#50C0CC\] transition-colors">/g, "<button onClick={() => showPopup('A submissão de previsões está desativada no momento.')} className=\"w-full bg-[#1A0D35] border border-[#311B92] text-gray-400 py-2 rounded text-xs font-bold hover:text-white hover:border-[#50C0CC] transition-colors\">");

// Same for the other active items that don't have hover:text-white
file = file.replace(/<div className="flex items-center justify-between p-2 rounded hover:bg-\[#1A0D35\] cursor-pointer text-\[#50C0CC\]">/g, "<div onClick={() => showPopup('A filtragem já está selecionada.')} className=\"flex items-center justify-between p-2 rounded hover:bg-[#1A0D35] cursor-pointer text-[#50C0CC]\">");

// Replace the chevron items in the score picker 
file = file.replace(/<div className="flex flex-col items-center text-gray-500 hover:text-white cursor-pointer">/g, "<div onClick={() => showPopup('Ajuste de placar desativado.')} className=\"flex flex-col items-center text-gray-500 hover:text-white cursor-pointer\">");

fs.writeFileSync('src/pages/dfolgabet/components/RightSidebar.tsx', file);
