import React, { useState, useEffect } from 'react';

export default function DevInspector() {
  const [isActive, setIsActive] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isSnippingMode, setIsSnippingMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [snipBox, setSnipBox] = useState(null);

  useEffect(() => {
    if (!isActive) {
      setSelectedItems([]);
      setIsSnippingMode(false);
      setSnipBox(null);
      return;
    }

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    const handleMouseOver = (e) => {
      if (isSnippingMode) return;
      if (e.target.closest('#dev-inspector-ui')) return;
      if (e.target.dataset.devSelected === 'true') return;
      
      e.target.style.outline = '2px solid #ef4444';
      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      e.target.style.cursor = 'crosshair';
    };

    const handleMouseOut = (e) => {
      if (isSnippingMode) return;
      if (e.target.closest('#dev-inspector-ui')) return;
      if (e.target.dataset.devSelected === 'true') return;

      e.target.style.outline = '';
      e.target.style.backgroundColor = '';
      e.target.style.cursor = '';
    };

    const getElementReference = (el) => {
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
      return `[Tag: ${tag}] ${text ? `(Text: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}")` : ''} ${classString ? `(Classes: ${classString})` : ''}`;
    };

    const handleClick = (e) => {
      if (isSnippingMode) return; // Snip mode is handled by mouseup
      if (e.target.closest('#dev-inspector-ui')) return;

      e.preventDefault();
      e.stopPropagation();

      const el = e.target;
      const reference = getElementReference(el);
      
      if (isMultiSelect) {
        if (el.dataset.devSelected === 'true') {
          el.dataset.devSelected = 'false';
          el.style.outline = '2px solid #ef4444';
          el.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          setSelectedItems(prev => prev.filter(item => item.ref !== reference));
        } else {
          el.dataset.devSelected = 'true';
          el.style.outline = '3px solid #3b82f6';
          el.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
          setSelectedItems(prev => [...prev, { ref: reference, el }]);
        }
      } else {
        navigator.clipboard.writeText(reference).then(() => {
          setToastMessage(`Copied: ${reference}`);
          setTimeout(() => setToastMessage(null), 4000);
        }).catch(err => console.error("Failed to copy", err));

        el.style.outline = '';
        el.style.backgroundColor = '';
        el.style.cursor = '';
        setIsActive(false);
      }
    };

    const handleMouseDown = (e) => {
      if (!isSnippingMode || e.target.closest('#dev-inspector-ui')) return;
      e.preventDefault();
      isDrawing = true;
      startX = e.clientX;
      startY = e.clientY;
      setSnipBox({ startX, startY, currentX: startX, currentY: startY });
    };

    const handleMouseMove = (e) => {
      if (isSnippingMode && isDrawing) {
        setSnipBox(prev => ({ ...prev, currentX: e.clientX, currentY: e.clientY }));
      }
    };

    const handleMouseUp = (e) => {
      if (!isSnippingMode || !isDrawing) return;
      isDrawing = false;
      
      const currentX = e.clientX;
      const currentY = e.clientY;
      setSnipBox(null);
      
      // Calculate bounding box
      const left = Math.min(startX, currentX);
      const right = Math.max(startX, currentX);
      const top = Math.min(startY, currentY);
      const bottom = Math.max(startY, currentY);
      
      // Require a minimum drag distance to prevent accidental clicks
      if (right - left < 10 || bottom - top < 10) return;

      const elements = document.querySelectorAll('div, p, h1, h2, h3, h4, span, img, button, a, section');
      const newSelections = [];

      elements.forEach(el => {
        if (el.closest('#dev-inspector-ui')) return;
        
        const rect = el.getBoundingClientRect();
        
        // Skip huge wrapper elements (larger than 50% of viewport)
        if (rect.width > window.innerWidth * 0.8 || rect.height > window.innerHeight * 0.8) return;
        // Skip elements with zero dimensions
        if (rect.width === 0 || rect.height === 0) return;
        
        // Check intersection
        if (
          rect.left < right &&
          rect.right > left &&
          rect.top < bottom &&
          rect.bottom > top
        ) {
          // If we are strictly intersecting, it could still be a parent. 
          // We'll just select it if it's not already selected.
          if (el.dataset.devSelected !== 'true') {
            const reference = getElementReference(el);
            el.dataset.devSelected = 'true';
            el.style.outline = '3px solid #3b82f6';
            el.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            newSelections.push({ ref: reference, el });
          }
        }
      });
      
      if (newSelections.length > 0) {
        setSelectedItems(prev => [...prev, ...newSelections]);
        setToastMessage(`Snipped ${newSelections.length} new elements`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, { capture: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      document.querySelectorAll('*').forEach(el => {
         if(el.dataset.devSelected || el.style.outline) {
             el.style.outline = '';
             el.style.backgroundColor = '';
             el.style.cursor = '';
             delete el.dataset.devSelected;
         }
      });
    };
  }, [isActive, isMultiSelect, isSnippingMode]);

  const handleCopyAll = () => {
    const textToCopy = selectedItems.map(item => item.ref).join('\n\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setToastMessage(`Copied ${selectedItems.length} elements!`);
      setTimeout(() => setToastMessage(null), 4000);
      setIsActive(false);
    });
  };
  
  const handleClearSelection = () => {
    selectedItems.forEach(item => {
      if (item.el) {
        item.el.style.outline = '';
        item.el.style.backgroundColor = '';
        delete item.el.dataset.devSelected;
      }
    });
    setSelectedItems([]);
  };

  return (
    <div id="dev-inspector-ui">
      {/* Snipping Box Overlay */}
      {isSnippingMode && snipBox && (
        <div 
          className="fixed border-[3px] border-emerald-500 bg-emerald-500/20 z-[9998] pointer-events-none"
          style={{
            left: Math.min(snipBox.startX, snipBox.currentX),
            top: Math.min(snipBox.startY, snipBox.currentY),
            width: Math.abs(snipBox.currentX - snipBox.startX),
            height: Math.abs(snipBox.currentY - snipBox.startY)
          }}
        />
      )}

      {isSnippingMode && isActive && (
        <div className="fixed inset-0 z-[9997] cursor-crosshair" />
      )}

      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2">
        {isActive && (
          <div className="bg-white border border-gray-900/30 p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[200px]">
            
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-3">
              <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isMultiSelect}
                  onChange={(e) => setIsMultiSelect(e.target.checked)}
                  className="accent-black w-4 h-4"
                  disabled={isSnippingMode}
                />
                Click Multi-Select
              </label>
              
              <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isSnippingMode}
                  onChange={(e) => {
                    setIsSnippingMode(e.target.checked);
                    if (e.target.checked) setIsMultiSelect(true); // Snipping implies multi-select
                  }}
                  className="accent-emerald-500 w-4 h-4"
                />
                Snipping Tool (Drag)
              </label>
            </div>
            
            {isMultiSelect && (
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">
                    {selectedItems.length} selected
                  </span>
                  {selectedItems.length > 0 && (
                    <button onClick={handleClearSelection} className="text-[10px] text-red-500 font-bold hover:underline">
                      Clear
                    </button>
                  )}
                </div>
                <button
                  onClick={handleCopyAll}
                  disabled={selectedItems.length === 0}
                  className="px-3 py-2 bg-black text-white rounded-lg text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-800"
                >
                  Copy All & Close
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-xl transition-all self-start flex items-center gap-2 ${
            isActive 
              ? 'bg-red-500 text-white animate-pulse shadow-red-500/50' 
              : 'bg-gray-900 text-white shadow-gray-900/50 hover:bg-black hover:scale-105'
          }`}
        >
          {isActive ? '🔍 Close Inspector' : '🛠️ Dev Mode'}
        </button>
      </div>

      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 bg-black text-white font-semibold text-sm rounded-full shadow-2xl animate-fade-in-down">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
