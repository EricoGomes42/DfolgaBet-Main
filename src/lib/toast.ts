export function showToast(message: string) {
  const toastId = 'dfolgabet-toast';
  
  const existing = document.getElementById(toastId);
  if (existing) {
    existing.remove();
  }

  const el = document.createElement('div');
  el.id = toastId;
  el.style.transition = 'all 0.3s ease';
  el.style.opacity = '0';
  el.style.transform = 'translate(-50%, 20px)'; // start slightly below
  el.className = 'fixed bottom-10 left-1/2 flex items-center gap-2 bg-gradient-to-r from-[#1A0D35] to-[#0A051A] text-white px-5 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[10000] text-[13px] font-black border border-[#e67e22] whitespace-nowrap';
  
  // Icon + Message
  el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e67e22" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span>${message}</span>
  `;
  
  document.body.appendChild(el);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translate(-50%, 0)';
    });
  });

  // Trigger exit animation then clean up
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translate(-50%, 20px)';
    setTimeout(() => {
      // Check if it's still in the DOM before removing
      if (document.body.contains(el)) {
        el.remove();
      }
    }, 300);
  }, 3500);
}
