import React, { useState, useEffect } from 'react';

export default function DevInspector() {
  const [isActive, setIsActive] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (!isActive) {
      setSelectedItems([]);
      return;
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('#dev-inspector-ui')) return;
      // Don't override selected style
      if (e.target.dataset.devSelected === 'true') return;
      
      e.target.style.outline = '2px solid #ef4444'; // red-500
      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      e.target.style.cursor = 'crosshair';
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('#dev-inspector-ui')) return;
      if (e.target.dataset.devSelected === 'true') return;

      e.target.style.outline = '';
      e.target.style.backgroundColor = '';
      e.target.style.cursor = '';
    };

    const handleClick = (e) => {
      if (e.target.closest('#dev-inspector-ui')) return;

      e.preventDefault();
      e.stopPropagation();

      const el = e.target;
      const tag = el.tagName.toLowerCase();
      
      const classes = typeof el.className === 'string' 
        ? el.className 
        : (el.className && el.className.baseVal ? el.className.baseVal : '');
        
      let text = '';
      if (el.childNodes.length > 0) {
        for (let i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === 3) {
            text += el.childNodes[i].textContent.trim() + ' ';
          }
        }
      }
      text = text.trim();

      const classString = classes.replace(/bg-\[rgba\(239,\s*68,\s*68,\s*0\.1\)\]|bg-\[rgba\(59,\s*130,\s*246,\s*0\.1\)\]/g, '').trim();

      const reference = `[Tag: ${tag}] ${text ? `(Text: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}")` : ''} ${classString ? `(Classes: ${classString})` : ''}`;
      
      if (isMultiSelect) {
        if (el.dataset.devSelected === 'true') {
          // Deselect
          el.dataset.devSelected = 'false';
          el.style.outline = '2px solid #ef4444'; // back to hover state
          el.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          setSelectedItems(prev => prev.filter(item => item.ref !== reference));
        } else {
          // Select
          el.dataset.devSelected = 'true';
          el.style.outline = '3px solid #3b82f6'; // blue-500
          el.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
          setSelectedItems(prev => [...prev, { ref: reference, el }]);
        }
      } else {
        // Single select mode
        navigator.clipboard.writeText(reference).then(() => {
          setToastMessage(`Copied: ${reference}`);
          setTimeout(() => setToastMessage(null), 4000);
        }).catch(err => {
          console.error("Failed to copy", err);
        });

        el.style.outline = '';
        el.style.backgroundColor = '';
        el.style.cursor = '';
        setIsActive(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick, { capture: true });
      
      // Cleanup styles
      document.querySelectorAll('*').forEach(el => {
         if(el.dataset.devSelected || el.style.outline) {
             el.style.outline = '';
             el.style.backgroundColor = '';
             el.style.cursor = '';
             delete el.dataset.devSelected;
         }
      });
    };
  }, [isActive, isMultiSelect]);

  const handleCopyAll = () => {
    const textToCopy = selectedItems.map(item => item.ref).join('\n\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setToastMessage(`Copied ${selectedItems.length} elements!`);
      setTimeout(() => setToastMessage(null), 4000);
      setIsActive(false);
    });
  };

  return (
    <div id="dev-inspector-ui">
      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2">
        {isActive && (
          <div className="bg-[#071913] border border-[#86EFAC]/30 p-3 rounded-xl shadow-2xl flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isMultiSelect}
                onChange={(e) => setIsMultiSelect(e.target.checked)}
                className="accent-[#86EFAC]"
              />
              Enable Multi-Select
            </label>
            
            {isMultiSelect && (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400">
                  {selectedItems.length} elements selected
                </span>
                <button
                  onClick={handleCopyAll}
                  disabled={selectedItems.length === 0}
                  className="px-3 py-1.5 bg-[#86EFAC] text-[#071913] rounded-lg text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Copy All & Close
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-full font-bold text-xs shadow-xl transition-all self-start ${
            isActive 
              ? 'bg-red-500 text-white animate-pulse shadow-red-500/50' 
              : 'bg-[#164E3D] text-[#86EFAC] border border-[#86EFAC]/30 hover:bg-[#86EFAC] hover:text-[#071913]'
          }`}
        >
          {isActive ? '🔍 Inspector Active' : '🛠️ Dev Mode'}
        </button>
      </div>

      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 bg-gray-900 text-[#86EFAC] text-sm rounded-lg shadow-2xl border border-white/10 font-mono">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
