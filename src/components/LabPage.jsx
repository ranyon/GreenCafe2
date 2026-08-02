import React from 'react';
import { useOutletContext } from 'react-router-dom';
import RecipeBuilder from './RecipeBuilder';

export default function LabPage() {
  const { handleAddToCart, setIsCartOpen } = useOutletContext();

  return (
    <main className="pt-24 pb-12">
      <RecipeBuilder
        onAddCustomToCart={(customItem) => {
          handleAddToCart(customItem);
          setIsCartOpen(true);
        }}
      />
    </main>
  );
}
