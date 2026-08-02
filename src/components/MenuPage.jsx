import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MenuSection from './MenuSection';
import ItemModal from './ItemModal';

export default function MenuPage() {
  const { handleAddToCart, setActivePreviewItem } = useOutletContext();
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  return (
    <main className="pt-24 pb-12">
      <MenuSection
        onAddToCart={handleAddToCart}
        onHoverItem={setActivePreviewItem}
        onItemClick={setSelectedModalItem}
      />
      {/* Quick View Item Detail Modal */}
      <ItemModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
