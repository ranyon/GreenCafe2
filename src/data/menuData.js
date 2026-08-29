import { 
  Leaf, Coffee, ScrollText, Utensils, 
  CupSoda, PlusCircle, Droplets, UtensilsCrossed,
  Flame, Box, Circle
} from 'lucide-react';

import img_0 from '../assets/green_special_wrap.webp';
import img_1 from '../assets/andorra_la_vella_detox.webp';
import img_2 from '../assets/orange_carrot_juice.webp';
import img_3 from '../assets/waffle.webp';
import img_4 from '../assets/tuna_salad.webp';
import img_5 from '../assets/castletown_detox.webp';
import img_6 from '../assets/chicken_club.webp';
import img_7 from '../assets/akrotiri_detox.webp';
import img_8 from '../assets/cairo_detox.webp';
import img_9 from '../assets/chicken_wrap.webp';
import img_10 from '../assets/pillow_willow.webp';
import img_11 from '../assets/beetroot_pineapple_ginger_juice.webp';
import img_12 from '../assets/tuna_wrap.webp';
import img_13 from '../assets/salad_bowl.webp';
import img_14 from '../assets/protein_bowl.webp';
import img_15 from '../assets/chicken_salad_2.webp';
import img_16 from '../assets/burrito_bowl.webp';
import img_17 from '../assets/greek_salad.webp';
import img_18 from '../assets/green_special_breakfast.webp';
import img_19 from '../assets/burrito_bowl.webp';
import img_20 from '../assets/pineapple_juice.webp';
import img_21 from '../assets/english_breakfast.webp';
import img_22 from '../assets/pasta_salad.webp';
import img_23 from '../assets/chicken_salad.webp';
import img_24 from '../assets/tuna_sandwich.webp';
import img_25 from '../assets/mini_pancakes_berries.webp';
import img_26 from '../assets/egg_bun_sandwich.webp';
import img_27 from '../assets/mango_ginger_juice.webp';
import img_28 from '../assets/mini_pancakes.webp';
import img_29 from '../assets/chicken_salad_potatoes.webp';
import img_30 from '../assets/pineapple_mint_ginger_juice.webp';
import img_31 from '../assets/egg_salad.webp';
import img_32 from '../assets/chittagong_detox.webp';
import img_33 from '../assets/club_sandwich.webp';
import img_34 from '../assets/chefs_special_breakfast.webp';
import img_35 from '../assets/goodstart_combo.webp';
import img_36 from '../assets/faro_detox.webp';
import img_37 from '../assets/fagatogo_smoothie.webp';
import img_38 from '../assets/weight_loss_master.webp';
import img_39 from '../assets/muscle_up.webp';
import img_40 from '../assets/iron_booster.webp';
import img_41 from '../assets/healthy_heart.webp';
import img_42 from '../assets/eye_master.webp';
import img_43 from '../assets/detox_mixer.webp';
import img_44 from '../assets/innsbruck_smoothie.webp';
import img_45 from '../assets/jakarta_smoothie.webp';
import img_46 from '../assets/kathmandu_smoothie.webp';
import img_47 from '../assets/killarney_smoothie.webp';
import img_48 from '../assets/kolari_smoothie.webp';
import img_49 from '../assets/watermelon_juice.webp';
import img_50 from '../assets/orange_juice.webp';
import img_51 from '../assets/pineapple_ginger_juice_2.webp';
import img_52 from '../assets/mango_juice.webp';
import img_53 from '../assets/detox_juice.webp';


import img_sm1 from '../assets/sm1_akrotiri.jpeg';
import img_sm2 from '../assets/sm2_andorra.jpeg';
import img_sm3 from '../assets/sm3_cairo.jpeg';
import img_sm4 from '../assets/sm4_castletown.jpeg';
import img_sm5 from '../assets/sm5_chittagong.jpeg';
import img_sm6 from '../assets/sm6_faro.jpeg';
import img_sm7 from '../assets/sm7_fagatogo.jpeg';
import img_sm8 from '../assets/sm8_weight_loss.jpeg';
import img_sm9 from '../assets/sm9_muscle_up.jpeg';
import img_sm10 from '../assets/sm10_iron_booster.jpeg';
import img_sm11 from '../assets/sm11_healthy_heart.jpeg';
import img_sm12 from '../assets/sm12_eye_master.jpeg';
import img_sm13 from '../assets/sm13_detox_mixer.jpeg';
import img_sm14 from '../assets/sm14_himera.jpeg';
import img_sm15 from '../assets/sm14_himera.jpeg'; // Reusing sm14 for Innsbruck
import img_sm16 from '../assets/sm16_jakarta.jpeg';
import img_sm17 from '../assets/sm17_kathmandu.jpeg';
import img_sm18 from '../assets/sm18_killarney.jpeg';
import img_sm19 from '../assets/sm19_kolari.jpeg';

import img_j1 from '../assets/j1_pineapple.jpeg';
import img_j2 from '../assets/j2_pineapple_ginger.jpeg';
import img_j3 from '../assets/j3_pineapple_mint_ginger.jpeg';
import img_j4 from '../assets/j4_orange_carrot.jpeg';
import img_j5 from '../assets/j5_beetroot_pineapple_ginger.jpeg';
import img_j6 from '../assets/j6_mango_ginger.jpeg';
import img_j7 from '../assets/j7_detox.jpeg';
import img_j8 from '../assets/j8_watermelon.jpeg';
import img_j9 from '../assets/j9_orange.jpeg';


import img_tuna_wrap_new from '../assets/tuna_wrap_new.png';
import img_green_special_wrap_new from '../assets/green_special_wrap_new.png';
import img_chicken_bun_sandwich_new from '../assets/chicken_bun_sandwich_new.png';
import img_chicken_sub_new from '../assets/chicken_sub_new.png';
import img_egg_club_new from '../assets/egg_club_new.png';
import img_tuna_club_new from '../assets/tuna_club_new.png';
import img_crepe_new from '../assets/crepe_new.png';
import img_caesar_salad_new from '../assets/caesar_salad_new.png';

export const MENU_CATEGORIES = [
  { id: 'salads', label: 'Salads', icon: Leaf },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  { id: 'wraps', label: 'Wraps', icon: ScrollText },
  { id: 'sandwiches', label: 'Sandwiches', icon: Utensils },
  { id: 'drinks', label: 'Drinks & Juices', icon: CupSoda },
  { id: 'extras', label: 'Extras', icon: PlusCircle },
  { id: 'smoothies', label: 'Smoothies', icon: Droplets },
  { id: 'meals', label: 'Snacks & Lunch', icon: UtensilsCrossed },
];

export const MENU_ITEMS = [
  // --- SALADS ---
  {
    id: 'sal1',
    category: 'salads',
    name: 'Chicken Salad',
    tagline: 'In-House Salad',
    price: 70.00,
    calories: 320,
    protein: '25g',
    carbs: '15g',
    rating: 4.8,
    image: img_23,
    tags: ['Customer Favorite', 'High Protein'],
    ingredients: ['Chicken', 'Mixed Greens', 'Cherry Tomatoes']
  },
  {
    id: 'sal2',
    category: 'salads',
    name: 'Tuna Salad',
    tagline: 'In-House Salad',
    price: 75.00,
    calories: 340,
    protein: '28g',
    carbs: '12g',
    rating: 4.7,
    image: img_4,
    tags: ['Omega-3'],
    ingredients: ['Tuna', 'Mixed Greens', 'Red Onion']
  },
  {
    id: 'sal3',
    category: 'salads',
    name: 'Egg Salad',
    tagline: 'In-House Salad',
    price: 70.00,
    calories: 290,
    protein: '18g',
    carbs: '10g',
    rating: 4.5,
    image: img_31,
    tags: ['Vegetarian'],
    ingredients: ['Boiled Egg', 'Mixed Greens', 'Cucumber']
  },
  {
    id: 'sal4',
    category: 'salads',
    name: 'Potato Salad',
    tagline: 'In-House Salad',
    price: 70.00,
    calories: 410,
    protein: '8g',
    carbs: '50g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1525992923985-06b53dbd982b?auto=format&fit=crop&w=800&q=80',
    tags: ['Comfort Food'],
    ingredients: ['Potatoes', 'Herbs', 'House Dressing']
  },
  {
    id: 'sal5',
    category: 'salads',
    name: 'Pasta Salad',
    tagline: 'In-House Salad',
    price: 70.00,
    calories: 380,
    protein: '12g',
    carbs: '48g',
    rating: 4.6,
    image: img_22,
    tags: ['Hearty'],
    ingredients: ['Pasta', 'Veggies', 'Vinaigrette']
  },
  {
    id: 'sal6',
    category: 'salads',
    name: 'Mushroom Salad',
    tagline: 'In-House Salad',
    price: 80.00,
    calories: 250,
    protein: '10g',
    carbs: '14g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Earthy'],
    ingredients: ['Sautéed Mushrooms', 'Mixed Greens', 'Herbs']
  },
  {
    id: 'sal7',
    category: 'salads',
    name: 'Caesar Salad',
    tagline: 'In-House Salad',
    price: 85.00,
    calories: 450,
    protein: '15g',
    carbs: '18g',
    rating: 4.9,
    image: img_caesar_salad_new,
    tags: ['Classic'],
    ingredients: ['Romaine', 'Croutons', 'Parmesan', 'Caesar Dressing']
  },
  {
    id: 'sal8',
    category: 'salads',
    name: 'Greek Salad',
    tagline: 'In-House Salad',
    price: 80.00,
    calories: 320,
    protein: '10g',
    carbs: '15g',
    rating: 4.8,
    image: img_17,
    tags: ['Vegetarian', 'Mediterranean'],
    ingredients: ['Feta', 'Olives', 'Tomatoes', 'Cucumber', 'Red Onion']
  },
  {
    id: 'sal9',
    category: 'salads',
    name: 'Broccoli Salad',
    tagline: 'In-House Salad',
    price: 110.00,
    calories: 280,
    protein: '12g',
    carbs: '18g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Nutrient Dense'],
    ingredients: ['Broccoli Florets', 'Almonds', 'Cranberries']
  },
  {
    id: 'sal10',
    category: 'salads',
    name: 'Local Fruit Salad',
    tagline: 'Choose up to 3 fruits',
    price: 50.00,
    calories: 150,
    protein: '2g',
    carbs: '35g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    tags: ['Fresh', 'Vegan'],
    ingredients: ['Watermelon', 'Pineapple', 'Pawpaw', 'Banana', 'Orange', 'Mango']
  },
  {
    id: 'sal11',
    category: 'salads',
    name: 'Exotic Fruit Salad',
    tagline: 'Choose up to 3 fruits',
    price: 80.00,
    calories: 160,
    protein: '2g',
    carbs: '38g',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'Vegan'],
    ingredients: ['Apple', 'Grapes', 'Mandarin', 'Kiwi', 'Plums']
  },

  // --- BREAKFAST ---
  {
    id: 'bf1',
    category: 'breakfast',
    name: 'Goodstart Combo',
    tagline: 'Toast, Omelette, Sausages, Baked Beans + Juice',
    price: 55.00,
    calories: 650,
    protein: '25g',
    carbs: '55g',
    rating: 4.7,
    image: img_35,
    tags: ['Classic Breakfast'],
    ingredients: ['Toast', 'Omelette', 'Sausages', 'Baked Beans', 'Juice']
  },
  {
    id: 'bf2',
    category: 'breakfast',
    name: 'Great Start Combo',
    tagline: 'Toast, Omelette, Sausages, Sautéed Veggies, Baked Beans + Juice',
    price: 70.00,
    calories: 720,
    protein: '28g',
    carbs: '65g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    tags: ['Customer Favorite'],
    ingredients: ['Toast', 'Omelette', 'Sausages', 'Sautéed Veggies', 'Baked Beans', 'Juice']
  },
  {
    id: 'bf3',
    category: 'breakfast',
    name: 'Wholeday Combo',
    tagline: 'Toast, Omelette, Sausages, Bacon, Sautéed Veggies, Baked Beans + Juice',
    price: 95.00,
    calories: 890,
    protein: '38g',
    carbs: '65g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Hearty Meal'],
    ingredients: ['Toast', 'Omelette', 'Sausages', 'Bacon', 'Sautéed Veggies', 'Baked Beans', 'Juice']
  },
  {
    id: 'bf4',
    category: 'breakfast',
    name: 'Green Special Breakfast',
    tagline: 'Chicken Bun, Scrambled Eggs, Diced Sausages & Baked Beans',
    price: 115.00,
    calories: 950,
    protein: '45g',
    carbs: '75g',
    rating: 4.9,
    image: img_18,
    tags: ['Signature'],
    ingredients: ['Chicken Bun', 'Scrambled Eggs', 'Diced Sausages', 'Baked Beans']
  },
  {
    id: 'bf5',
    category: 'breakfast',
    name: 'Chef\'s Special Breakfast',
    tagline: 'Wheat tortilla spinach omelette, Sauté Veggies, Mushroom, Avocado & Chicken Chunks',
    price: 120.00,
    calories: 820,
    protein: '42g',
    carbs: '60g',
    rating: 5.0,
    image: img_34,
    tags: ['Chef Special', 'Gourmet'],
    ingredients: ['Wheat Tortilla', 'Spinach Omelette', 'Sauté Veggies', 'Mushroom', 'Avocado', 'Chicken Chunks']
  },
  {
    id: 'bf6',
    category: 'breakfast',
    name: 'English Breakfast',
    tagline: 'A hearty classic with Waffle, Toast, Eggs, Sausage, Bacon, Mushrooms, and Grilled Tomatoes',
    price: 150.00,
    calories: 1150,
    protein: '55g',
    carbs: '100g',
    rating: 5.0,
    image: img_21,
    tags: ['Big Portion', 'Classic'],
    ingredients: ['Waffle', 'Toast', 'Eggs', 'Sausage', 'Bacon', 'Mushrooms', 'Grilled Tomatoes']
  },
  {
    id: 'bf7',
    category: 'breakfast',
    name: 'American Breakfast',
    tagline: 'A sweet and savory mix of Sunny Side Eggs, Bacon, Hash Browns, Sausage, Toast & Pancakes',
    price: 150.00,
    calories: 1250,
    protein: '48g',
    carbs: '140g',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
    tags: ['Big Portion', 'Sweet & Savory'],
    ingredients: ['Sunny Side Eggs', 'Bacon', 'Hash Browns', 'Sausage', 'Toast', 'Pancakes']
  },

  // --- WRAPS ---
  {
    id: 'w1',
    category: 'wraps',
    name: 'Chicken Wrap',
    tagline: 'Veggies, Spicy Diced Chicken & Eggs',
    price: 70.00,
    calories: 520,
    protein: '32g',
    carbs: '45g',
    rating: 4.8,
    image: img_9,
    tags: ['High Protein', 'Spicy Option'],
    ingredients: ['Veggies', 'Spicy Diced Chicken', 'Eggs']
  },
  {
    id: 'w2',
    category: 'wraps',
    name: 'Tuna Wrap',
    tagline: 'Veggies, Eggs & Tuna',
    price: 70.00,
    calories: 480,
    protein: '28g',
    carbs: '42g',
    rating: 4.7,
    image: img_tuna_wrap_new,
    tags: ['Omega-3'],
    ingredients: ['Veggies', 'Eggs', 'Tuna']
  },
  {
    id: 'w3',
    category: 'wraps',
    name: 'Bacon Ham & Egg Wrap',
    tagline: 'Veggies, Bacon, Ham & Eggs',
    price: 80.00,
    calories: 610,
    protein: '30g',
    carbs: '42g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['Savory', 'Customer Favorite'],
    ingredients: ['Veggies', 'Bacon', 'Ham', 'Eggs']
  },
  {
    id: 'w4',
    category: 'wraps',
    name: 'Green Special Wrap',
    tagline: 'Green Bell Pepper, Spring Onion, Scrambled Eggs, Sausages & Avocado',
    price: 80.00,
    calories: 590,
    protein: '25g',
    carbs: '40g',
    rating: 5.0,
    image: img_green_special_wrap_new,
    tags: ['Signature'],
    ingredients: ['Green Bell Pepper', 'Spring Onion', 'Scrambled Eggs', 'Sausages', 'Avocado']
  },
  {
    id: 'w5',
    category: 'wraps',
    name: 'Mushroom Wrap',
    tagline: 'Veggies, Mushrooms & Olives',
    price: 80.00,
    calories: 420,
    protein: '12g',
    carbs: '45g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian'],
    ingredients: ['Veggies', 'Mushrooms', 'Olives']
  },
  {
    id: 'w6',
    category: 'wraps',
    name: 'Doctors Favorite',
    tagline: 'Lettuce, Cauliflower, Onion, Tomatoes, Carrots & Mozzarella',
    price: 75.00,
    calories: 390,
    protein: '15g',
    carbs: '35g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['Healthy', 'Vegetarian'],
    ingredients: ['Lettuce', 'Cauliflower', 'Onion', 'Tomatoes', 'Carrots', 'Mozzarella']
  },
  {
    id: 'w7',
    category: 'wraps',
    name: 'Pillow Willow',
    tagline: 'Spinach, Spring Onions, Green Pepper, Sweet Potato, Chicken & Eggs',
    price: 80.00,
    calories: 550,
    protein: '35g',
    carbs: '50g',
    rating: 5.0,
    image: img_10,
    tags: ['Chef Special', 'High Protein'],
    ingredients: ['Spinach', 'Spring Onions', 'Green Pepper', 'Sweet Potato', 'Chicken', 'Eggs']
  },

  // --- SANDWICHES ---
  {
    id: 'sand1',
    category: 'sandwiches',
    name: 'Chicken Bun Sandwich',
    tagline: 'Fresh baked bun with savory chicken',
    price: 40.00,
    calories: 380,
    protein: '22g',
    carbs: '45g',
    rating: 4.6,
    image: img_chicken_bun_sandwich_new,
    tags: ['Bun Sandwich'],
    ingredients: ['Chicken', 'Bun', 'Lettuce', 'Mayo']
  },
  {
    id: 'sand2',
    category: 'sandwiches',
    name: 'Tuna Bun Sandwich',
    tagline: 'Fresh baked bun with tuna salad',
    price: 45.00,
    calories: 360,
    protein: '20g',
    carbs: '42g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    tags: ['Bun Sandwich'],
    ingredients: ['Tuna', 'Bun', 'Lettuce']
  },
  {
    id: 'sand3',
    category: 'sandwiches',
    name: 'Egg Bun Sandwich',
    tagline: 'Fresh baked bun with egg',
    price: 40.00,
    calories: 320,
    protein: '14g',
    carbs: '40g',
    rating: 4.5,
    image: img_26,
    tags: ['Bun Sandwich', 'Vegetarian'],
    ingredients: ['Egg', 'Bun']
  },
  {
    id: 'sand4',
    category: 'sandwiches',
    name: 'Bacon Ham & Egg Bun Sandwich',
    tagline: 'Hearty breakfast bun',
    price: 50.00,
    calories: 520,
    protein: '25g',
    carbs: '42g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    tags: ['Bun Sandwich', 'Savory'],
    ingredients: ['Bacon', 'Ham', 'Egg', 'Bun']
  },
  {
    id: 'sand5',
    category: 'sandwiches',
    name: 'Turkey Bun Sandwich',
    tagline: 'Sliced turkey on a soft bun',
    price: 50.00,
    calories: 390,
    protein: '26g',
    carbs: '42g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    tags: ['Bun Sandwich'],
    ingredients: ['Turkey', 'Bun', 'Lettuce']
  },
  {
    id: 'sand6',
    category: 'sandwiches',
    name: 'Mushroom Bun Sandwich',
    tagline: 'Sautéed mushrooms on a fresh bun',
    price: 50.00,
    calories: 310,
    protein: '10g',
    carbs: '44g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    tags: ['Bun Sandwich', 'Vegetarian'],
    ingredients: ['Mushrooms', 'Bun']
  },
  {
    id: 'sand7',
    category: 'sandwiches',
    name: 'Chicken Club',
    tagline: 'Classic multi-layer chicken club',
    price: 50.00,
    calories: 550,
    protein: '30g',
    carbs: '55g',
    rating: 4.8,
    image: img_6,
    tags: ['Club Sandwich'],
    ingredients: ['Chicken', 'Toast', 'Lettuce', 'Tomato', 'Mayo']
  },
  {
    id: 'sand8',
    category: 'sandwiches',
    name: 'Tuna Club',
    tagline: 'Multi-layer tuna club sandwich',
    price: 55.00,
    calories: 520,
    protein: '26g',
    carbs: '54g',
    rating: 4.7,
    image: img_tuna_club_new,
    tags: ['Club Sandwich'],
    ingredients: ['Tuna', 'Toast', 'Lettuce', 'Tomato']
  },
  {
    id: 'sand9',
    category: 'sandwiches',
    name: 'Egg Club',
    tagline: 'Multi-layer egg club sandwich',
    price: 50.00,
    calories: 480,
    protein: '18g',
    carbs: '52g',
    rating: 4.6,
    image: img_egg_club_new,
    tags: ['Club Sandwich', 'Vegetarian'],
    ingredients: ['Egg', 'Toast', 'Lettuce', 'Tomato']
  },
  {
    id: 'sand10',
    category: 'sandwiches',
    name: 'Bacon Ham & Egg Club',
    tagline: 'The ultimate hearty club sandwich',
    price: 65.00,
    calories: 680,
    protein: '32g',
    carbs: '56g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Club Sandwich', 'Customer Favorite'],
    ingredients: ['Bacon', 'Ham', 'Egg', 'Toast', 'Lettuce', 'Tomato']
  },
  {
    id: 'sand11',
    category: 'sandwiches',
    name: 'Turkey Club',
    tagline: 'Classic turkey club sandwich',
    price: 65.00,
    calories: 540,
    protein: '28g',
    carbs: '55g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Club Sandwich'],
    ingredients: ['Turkey', 'Toast', 'Lettuce', 'Tomato', 'Bacon']
  },
  {
    id: 'sand12',
    category: 'sandwiches',
    name: 'Mushroom Club',
    tagline: 'Multi-layer vegetarian mushroom club',
    price: 65.00,
    calories: 460,
    protein: '14g',
    carbs: '58g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Club Sandwich', 'Vegetarian'],
    ingredients: ['Mushrooms', 'Toast', 'Lettuce', 'Tomato']
  },
  {
    id: 'sand13',
    category: 'sandwiches',
    name: 'Chicken Sub',
    tagline: 'Hearty chicken on a sub roll',
    price: 75.00,
    calories: 620,
    protein: '38g',
    carbs: '65g',
    rating: 4.8,
    image: img_chicken_sub_new,
    tags: ['Sub Sandwich'],
    ingredients: ['Chicken', 'Sub Roll', 'Veggies']
  },
  {
    id: 'sand14',
    category: 'sandwiches',
    name: 'Tuna Sub',
    tagline: 'Hearty tuna on a sub roll',
    price: 80.00,
    calories: 590,
    protein: '32g',
    carbs: '62g',
    rating: 4.7,
    image: img_24,
    tags: ['Sub Sandwich'],
    ingredients: ['Tuna', 'Sub Roll', 'Veggies']
  },
  {
    id: 'sand15',
    category: 'sandwiches',
    name: 'Egg Sub',
    tagline: 'Hearty egg on a sub roll',
    price: 75.00,
    calories: 540,
    protein: '22g',
    carbs: '60g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&w=800&q=80',
    tags: ['Sub Sandwich', 'Vegetarian'],
    ingredients: ['Egg', 'Sub Roll', 'Veggies']
  },
  {
    id: 'sand16',
    category: 'sandwiches',
    name: 'Bacon Ham & Egg Sub',
    tagline: 'The ultimate loaded sub',
    price: 90.00,
    calories: 820,
    protein: '42g',
    carbs: '68g',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&w=800&q=80',
    tags: ['Sub Sandwich', 'Hunger Crusher'],
    ingredients: ['Bacon', 'Ham', 'Egg', 'Sub Roll', 'Veggies']
  },
  {
    id: 'sand17',
    category: 'sandwiches',
    name: 'Turkey Sub',
    tagline: 'Classic turkey sub',
    price: 90.00,
    calories: 650,
    protein: '36g',
    carbs: '66g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&w=800&q=80',
    tags: ['Sub Sandwich'],
    ingredients: ['Turkey', 'Sub Roll', 'Veggies']
  },
  {
    id: 'sand18',
    category: 'sandwiches',
    name: 'Mushroom Sub',
    tagline: 'Hearty vegetarian mushroom sub',
    price: 90.00,
    calories: 520,
    protein: '18g',
    carbs: '70g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&w=800&q=80',
    tags: ['Sub Sandwich', 'Vegetarian'],
    ingredients: ['Mushrooms', 'Sub Roll', 'Veggies']
  },

  // --- DRINKS ---
  {
    id: 'd1',
    category: 'drinks',
    name: 'Hot Chocolate',
    tagline: 'Beverages',
    price: 35.00,
    calories: 220,
    protein: '4g',
    carbs: '30g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    tags: ['Hot Drink', 'Sweet'],
    ingredients: ['Cocoa', 'Milk', 'Sugar']
  },
  {
    id: 'd2',
    category: 'drinks',
    name: 'Americano Coffee',
    tagline: 'Beverages',
    price: 35.00,
    calories: 15,
    protein: '0g',
    carbs: '3g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80',
    tags: ['Coffee', 'Energy'],
    ingredients: ['Espresso', 'Hot Water']
  },
  {
    id: 'd3',
    category: 'drinks',
    name: 'Coffee Latte',
    tagline: 'Beverages',
    price: 45.00,
    calories: 150,
    protein: '6g',
    carbs: '15g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    tags: ['Coffee', 'Creamy'],
    ingredients: ['Espresso', 'Steamed Milk']
  },
  {
    id: 'd4',
    category: 'drinks',
    name: 'Hibiscus Tea',
    tagline: 'Beverages',
    price: 35.00,
    calories: 0,
    protein: '0g',
    carbs: '0g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596766736294-825597793d5f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Refreshing'],
    ingredients: ['Hibiscus', 'Hot Water']
  },
  {
    id: 'd5',
    category: 'drinks',
    name: 'Lemon Grass Tea',
    tagline: 'Beverages',
    price: 35.00,
    calories: 0,
    protein: '0g',
    carbs: '0g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1596766736294-825597793d5f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Calming'],
    ingredients: ['Lemon Grass', 'Hot Water']
  },
  {
    id: 'd6',
    category: 'drinks',
    name: 'Lipton',
    tagline: 'Beverages',
    price: 35.00,
    calories: 0,
    protein: '0g',
    carbs: '0g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596766736294-825597793d5f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Classic'],
    ingredients: ['Black Tea', 'Hot Water']
  },
  {
    id: 'd7',
    category: 'drinks',
    name: 'Green Tea',
    tagline: 'Beverages',
    price: 35.00,
    calories: 0,
    protein: '0g',
    carbs: '0g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596766736294-825597793d5f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Antioxidant'],
    ingredients: ['Green Tea Leaves', 'Hot Water']
  },
  {
    id: 'd8',
    category: 'drinks',
    name: 'Ginger, Lemon & Mint Tea',
    tagline: 'Beverages',
    price: 35.00,
    calories: 10,
    protein: '0g',
    carbs: '2g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596766736294-825597793d5f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Immunity'],
    ingredients: ['Ginger', 'Lemon', 'Mint', 'Hot Water']
  },
  {
    id: 'j1',
    category: 'drinks',
    name: 'Pineapple Juice',
    tagline: 'Freshly squeezed',
    price: 35.00,
    calories: 130,
    protein: '1g',
    carbs: '32g',
    rating: 4.8,
    image: img_j1,
    tags: ['Juice', 'Sweet'],
    ingredients: ['Pineapple']
  },
  {
    id: 'j2',
    category: 'drinks',
    name: 'Pineapple Ginger Juice',
    tagline: 'Freshly squeezed with a kick',
    price: 35.00,
    calories: 135,
    protein: '1g',
    carbs: '34g',
    rating: 4.9,
    image: img_j2,
    tags: ['Juice', 'Zesty'],
    ingredients: ['Pineapple', 'Ginger']
  },
  {
    id: 'j3',
    category: 'drinks',
    name: 'Pineapple, Mint & Ginger',
    tagline: 'Refreshing blend',
    price: 35.00,
    calories: 135,
    protein: '1g',
    carbs: '34g',
    rating: 4.9,
    image: img_j3,
    tags: ['Juice', 'Refreshing'],
    ingredients: ['Pineapple', 'Mint', 'Ginger']
  },
  {
    id: 'j4',
    category: 'drinks',
    name: 'Orange & Carrot Juice',
    tagline: 'Vitamin C Boost',
    price: 35.00,
    calories: 110,
    protein: '2g',
    carbs: '26g',
    rating: 4.8,
    image: img_j4,
    tags: ['Juice', 'Vitamin C'],
    ingredients: ['Orange', 'Carrot']
  },
  {
    id: 'j5',
    category: 'drinks',
    name: 'Beetroot, Pineapple & Ginger',
    tagline: 'Earthy and sweet',
    price: 35.00,
    calories: 120,
    protein: '2g',
    carbs: '28g',
    rating: 4.8,
    image: img_j5,
    tags: ['Juice', 'Detox'],
    ingredients: ['Beetroot', 'Pineapple', 'Ginger']
  },
  {
    id: 'j6',
    category: 'drinks',
    name: 'Mango/Mango Ginger',
    tagline: 'Tropical refreshment',
    price: 40.00,
    calories: 150,
    protein: '1g',
    carbs: '38g',
    rating: 4.9,
    image: img_j6,
    tags: ['Juice', 'Tropical'],
    ingredients: ['Mango', 'Ginger']
  },
  {
    id: 'j7',
    category: 'drinks',
    name: 'Detox Juice',
    tagline: 'Cleanse your body',
    price: 40.00,
    calories: 90,
    protein: '2g',
    carbs: '20g',
    rating: 4.8,
    image: img_j7,
    tags: ['Juice', 'Detox', 'Green'],
    ingredients: ['Green Apple', 'Celery', 'Cucumber', 'Lemon']
  },
  {
    id: 'j8',
    category: 'drinks',
    name: 'Watermelon Juice',
    tagline: 'Hydrating and sweet',
    price: 35.00,
    calories: 80,
    protein: '1g',
    carbs: '20g',
    rating: 4.7,
    image: img_j8,
    tags: ['Juice', 'Hydration'],
    ingredients: ['Watermelon']
  },
  {
    id: 'j9',
    category: 'drinks',
    name: 'Orange Juice',
    tagline: 'Freshly squeezed',
    price: 35.00,
    calories: 110,
    protein: '2g',
    carbs: '26g',
    rating: 4.8,
    image: img_j9,
    tags: ['Juice', 'Vitamin C'],
    ingredients: ['Orange']
  },

  // --- EXTRAS ---
  {
    id: 'ex1',
    category: 'extras',
    name: 'Croutons',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 60,
    protein: '1g',
    carbs: '10g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Crunchy'],
    ingredients: ['Toasted Bread']
  },
  {
    id: 'ex2',
    category: 'extras',
    name: 'Toast',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 80,
    protein: '3g',
    carbs: '15g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Side'],
    ingredients: ['Bread']
  },
  {
    id: 'ex3',
    category: 'extras',
    name: 'Sweet Corn',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 40,
    protein: '1g',
    carbs: '9g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Sweet'],
    ingredients: ['Corn']
  },
  {
    id: 'ex4',
    category: 'extras',
    name: 'Extra Egg',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 70,
    protein: '6g',
    carbs: '1g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Protein'],
    ingredients: ['Egg']
  },
  {
    id: 'ex5',
    category: 'extras',
    name: 'Extra Bacon',
    tagline: 'Extras/Toppings',
    price: 20.00,
    calories: 120,
    protein: '9g',
    carbs: '0g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Savory'],
    ingredients: ['Bacon']
  },
  {
    id: 'ex6',
    category: 'extras',
    name: 'Extra Avocado',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 110,
    protein: '1g',
    carbs: '6g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Healthy Fats'],
    ingredients: ['Avocado']
  },
  {
    id: 'ex7',
    category: 'extras',
    name: 'Extra Pasta',
    tagline: 'Extras/Toppings',
    price: 15.00,
    calories: 110,
    protein: '4g',
    carbs: '22g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Carbs'],
    ingredients: ['Pasta']
  },
  {
    id: 'ex8',
    category: 'extras',
    name: 'Extra Potato',
    tagline: 'Extras/Toppings',
    price: 20.00,
    calories: 90,
    protein: '2g',
    carbs: '20g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Carbs'],
    ingredients: ['Potato']
  },
  {
    id: 'ex9',
    category: 'extras',
    name: 'Extra Olives',
    tagline: 'Extras/Toppings',
    price: 10.00,
    calories: 30,
    protein: '0g',
    carbs: '2g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Salty'],
    ingredients: ['Olives']
  },
  {
    id: 'ex10',
    category: 'extras',
    name: 'Diced Chicken',
    tagline: 'Extras/Toppings',
    price: 30.00,
    calories: 120,
    protein: '20g',
    carbs: '0g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Protein'],
    ingredients: ['Chicken']
  },
  {
    id: 'ex11',
    category: 'extras',
    name: 'Extra Tuna',
    tagline: 'Extras/Toppings',
    price: 30.00,
    calories: 100,
    protein: '22g',
    carbs: '0g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Protein', 'Omega-3'],
    ingredients: ['Tuna']
  },
  {
    id: 'ex12',
    category: 'extras',
    name: 'Extra Dressing (Any)',
    tagline: 'Mayonnaise, Salad Cream, Vinaigrette, etc.',
    price: 10.00,
    calories: 80,
    protein: '0g',
    carbs: '2g',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Flavor'],
    ingredients: ['Dressing']
  },

  // --- SMOOTHIES ---
  {
    id: 'sm1',
    category: 'smoothies',
    name: 'Akrotiri Detox Smoothie',
    tagline: 'Apple, Spinach, Banana & Greek Yoghurt',
    price: 40.00,
    calories: 220,
    protein: '10g',
    carbs: '30g',
    rating: 4.8,
    image: img_sm1,
    tags: ['Detox', 'Green'],
    ingredients: ['Apple', 'Spinach', 'Banana', 'Greek Yoghurt']
  },
  {
    id: 'sm2',
    category: 'smoothies',
    name: 'Andorra La Vella Detox',
    tagline: 'Cucumber, Kiwi, Coconut Milk & Greek Yogurt',
    price: 45.00,
    calories: 250,
    protein: '8g',
    carbs: '25g',
    rating: 4.9,
    image: img_sm2,
    tags: ['Detox', 'Tropical'],
    ingredients: ['Cucumber', 'Kiwi', 'Coconut Milk', 'Greek Yogurt']
  },
  {
    id: 'sm3',
    category: 'smoothies',
    name: 'Cairo Detox',
    tagline: 'Apple, Beet, Carrot & Lemon',
    price: 40.00,
    calories: 180,
    protein: '4g',
    carbs: '35g',
    rating: 4.7,
    image: img_sm3,
    tags: ['Detox', 'Earthy'],
    ingredients: ['Apple', 'Beetroot', 'Carrot', 'Lemon']
  },
  {
    id: 'sm4',
    category: 'smoothies',
    name: 'Castletown Detox',
    tagline: 'Mango, Banana, Kale, Spinach & Flaxseed',
    price: 40.00,
    calories: 240,
    protein: '7g',
    carbs: '40g',
    rating: 4.9,
    image: img_sm4,
    tags: ['Detox', 'Fiber Rich'],
    ingredients: ['Mango', 'Banana', 'Kale', 'Spinach', 'Flaxseed']
  },
  {
    id: 'sm5',
    category: 'smoothies',
    name: 'Chittagong Detox',
    tagline: 'Pineapple, Cucumber, Apple, Celery & Ginger',
    price: 50.00,
    calories: 190,
    protein: '3g',
    carbs: '42g',
    rating: 4.8,
    image: img_sm5,
    tags: ['Detox', 'Zesty'],
    ingredients: ['Pineapple', 'Cucumber', 'Apple', 'Celery', 'Ginger']
  },
  {
    id: 'sm6',
    category: 'smoothies',
    name: 'Faro Detox',
    tagline: 'Mango, Banana, Avocado & Greek Yoghurt',
    price: 45.00,
    calories: 320,
    protein: '12g',
    carbs: '35g',
    rating: 5.0,
    image: img_sm6,
    tags: ['Detox', 'Creamy'],
    ingredients: ['Mango', 'Banana', 'Avocado', 'Greek Yoghurt']
  },
  {
    id: 'sm7',
    category: 'smoothies',
    name: 'Fagatogo Smoothie',
    tagline: 'Spinach, Kale, Lemon, Pineapple, Cucumber & Chia Seeds',
    price: 40.00,
    calories: 210,
    protein: '6g',
    carbs: '38g',
    rating: 4.9,
    image: img_sm7,
    tags: ['Detox', 'Superfood'],
    ingredients: ['Spinach', 'Kale', 'Lemon', 'Pineapple', 'Cucumber', 'Chia Seeds']
  },
  {
    id: 'sm8',
    category: 'smoothies',
    name: 'Weight Loss Master',
    tagline: 'Pineapple, Apple, Banana, Mint & Chia Seeds Smoothie',
    price: 40.00,
    calories: 230,
    protein: '5g',
    carbs: '45g',
    rating: 4.8,
    image: img_sm8,
    tags: ['Natures Favourite', 'Refreshing'],
    ingredients: ['Pineapple', 'Apple', 'Banana', 'Mint', 'Chia Seeds']
  },
  {
    id: 'sm9',
    category: 'smoothies',
    name: 'Muscle Up',
    tagline: 'Beetroot, Banana, Date, Tiger Nut Milk Smoothie',
    price: 45.00,
    calories: 380,
    protein: '12g',
    carbs: '55g',
    rating: 4.9,
    image: img_sm9,
    tags: ['Natures Favourite', 'Pre-Workout'],
    ingredients: ['Beetroot', 'Banana', 'Date', 'Tiger Nut Milk']
  },
  {
    id: 'sm10',
    category: 'smoothies',
    name: 'Iron Booster',
    tagline: 'Apple, Banana, Lemon, Spinach & Greek Yoghurt',
    price: 40.00,
    calories: 260,
    protein: '11g',
    carbs: '42g',
    rating: 4.7,
    image: img_sm10,
    tags: ['Natures Favourite', 'High Iron'],
    ingredients: ['Apple', 'Banana', 'Lemon', 'Spinach', 'Greek Yoghurt']
  },
  {
    id: 'sm11',
    category: 'smoothies',
    name: 'Healthy Heart',
    tagline: 'Mango, Banana, Avocado & Coconut Milk',
    price: 45.00,
    calories: 340,
    protein: '6g',
    carbs: '40g',
    rating: 4.9,
    image: img_sm11,
    tags: ['Natures Favourite', 'Heart Healthy'],
    ingredients: ['Mango', 'Banana', 'Avocado', 'Coconut Milk']
  },
  {
    id: 'sm12',
    category: 'smoothies',
    name: 'Eye Master',
    tagline: 'Mango, Banana, Orange, Carrot & Chia Seeds',
    price: 40.00,
    calories: 250,
    protein: '5g',
    carbs: '48g',
    rating: 4.8,
    image: img_sm12,
    tags: ['Natures Favourite', 'Vitamin A'],
    ingredients: ['Mango', 'Banana', 'Orange', 'Carrot', 'Chia Seeds']
  },
  {
    id: 'sm13',
    category: 'smoothies',
    name: 'Detox Mixer',
    tagline: 'Cucumber, Apple, Kiwi, Banana & Greek Yoghurt',
    price: 45.00,
    calories: 270,
    protein: '10g',
    carbs: '45g',
    rating: 4.9,
    image: img_sm13,
    tags: ['Natures Favourite', 'Detox'],
    ingredients: ['Cucumber', 'Apple', 'Kiwi', 'Banana', 'Greek Yoghurt']
  },
  {
    id: 'sm14',
    category: 'smoothies',
    name: 'Himera',
    tagline: 'Strawberries, Raspberries, Banana & Greek Yoghurt',
    price: 45.00,
    calories: 290,
    protein: '12g',
    carbs: '45g',
    rating: 4.9,
    image: img_sm14,
    tags: ['Whole Foods', 'Berry Blast'],
    ingredients: ['Strawberries', 'Raspberries', 'Banana', 'Greek Yoghurt']
  },
  {
    id: 'sm15',
    category: 'smoothies',
    name: 'Innsbruck',
    tagline: 'Raspberries, Mango, Banana & Greek Yoghurt',
    price: 45.00,
    calories: 300,
    protein: '12g',
    carbs: '48g',
    rating: 4.8,
    image: img_sm15,
    tags: ['Whole Foods', 'Tropical Berry'],
    ingredients: ['Raspberries', 'Mango', 'Banana', 'Greek Yoghurt']
  },
  {
    id: 'sm16',
    category: 'smoothies',
    name: 'Jakarta',
    tagline: 'Mango, Pineapple, Passion Fruit & Greek Yoghurt',
    price: 45.00,
    calories: 310,
    protein: '11g',
    carbs: '52g',
    rating: 5.0,
    image: img_sm16,
    tags: ['Whole Foods', 'Exotic'],
    ingredients: ['Mango', 'Pineapple', 'Passion Fruit', 'Greek Yoghurt']
  },
  {
    id: 'sm17',
    category: 'smoothies',
    name: 'Kathmandu',
    tagline: 'Oats, Dates, Coconut Milk, Banana & Granola',
    price: 40.00,
    calories: 420,
    protein: '10g',
    carbs: '75g',
    rating: 4.9,
    image: img_sm17,
    tags: ['Whole Foods', 'Energy Booster'],
    ingredients: ['Oats', 'Dates', 'Coconut Milk', 'Banana', 'Granola']
  },
  {
    id: 'sm18',
    category: 'smoothies',
    name: 'Killarney',
    tagline: 'Mango, Ginger, Lemon, Spinach & Chia Seeds',
    price: 40.00,
    calories: 240,
    protein: '6g',
    carbs: '42g',
    rating: 4.8,
    image: img_sm18,
    tags: ['Whole Foods', 'Green Power'],
    ingredients: ['Mango', 'Ginger', 'Lemon', 'Spinach', 'Chia Seeds']
  },
  {
    id: 'sm19',
    category: 'smoothies',
    name: 'Kolari',
    tagline: 'Banana, Dates, Tigernut Milk & Greek Yoghurt',
    price: 40.00,
    calories: 380,
    protein: '14g',
    carbs: '60g',
    rating: 4.9,
    image: img_sm19,
    tags: ['Whole Foods', 'Sweet & Creamy'],
    ingredients: ['Banana', 'Dates', 'Tigernut Milk', 'Greek Yoghurt']
  },


  // --- LUNCH & SNACKS ---
  {
    id: 'meal1',
    category: 'meals',
    name: 'Parfait',
    tagline: 'Greek Yogurt with Layers of Fruit and Granola',
    price: 65.00,
    calories: 450,
    protein: '18g',
    carbs: '65g',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    tags: ['Snack', 'Healthy Dessert'],
    ingredients: ['Greek Yogurt', 'Berries', 'Granola', 'Honey']
  },
  {
    id: 'meal2',
    category: 'meals',
    name: 'Meat Samosa',
    tagline: 'Crispy pastry filled with spiced meat',
    price: 20.00,
    calories: 250,
    protein: '8g',
    carbs: '22g',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tags: ['Snack', 'Savory'],
    ingredients: ['Pastry', 'Minced Meat', 'Spices']
  },
  {
    id: 'meal3',
    category: 'meals',
    name: 'Veggie Spring Rolls',
    tagline: 'Crispy rolls with fresh vegetables',
    price: 20.00,
    calories: 210,
    protein: '4g',
    carbs: '28g',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    tags: ['Snack', 'Vegetarian'],
    ingredients: ['Spring Roll Wrapper', 'Cabbage', 'Carrots', 'Spices']
  },
  {
    id: 'meal4',
    category: 'meals',
    name: 'Donut',
    tagline: 'Sweet glazed donut',
    price: 10.00,
    calories: 280,
    protein: '3g',
    carbs: '35g',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    tags: ['Snack', 'Sweet'],
    ingredients: ['Dough', 'Glaze']
  },
  {
    id: 'meal5',
    category: 'meals',
    name: 'Waffle',
    tagline: 'Freshly baked golden waffle',
    price: 50.00,
    calories: 420,
    protein: '8g',
    carbs: '55g',
    rating: 4.8,
    image: img_3,
    tags: ['Snack', 'Breakfast Vibe'],
    ingredients: ['Batter', 'Syrup', 'Butter']
  },
  {
    id: 'meal6',
    category: 'meals',
    name: 'Mini Pancakes',
    tagline: 'Fluffy bite-sized pancakes',
    price: 50.00,
    calories: 450,
    protein: '10g',
    carbs: '60g',
    rating: 4.9,
    image: img_25,
    tags: ['Snack', 'Sweet'],
    ingredients: ['Pancake Batter', 'Syrup']
  },
  {
    id: 'meal7',
    category: 'meals',
    name: 'Crepe',
    tagline: 'Thin and delicate French crepe',
    price: 50.00,
    calories: 380,
    protein: '12g',
    carbs: '48g',
    rating: 4.8,
    image: img_crepe_new,
    tags: ['Snack', 'Gourmet'],
    ingredients: ['Crepe Batter', 'Fillings']
  },
  {
    id: 'meal8',
    category: 'meals',
    name: 'Protein Bowl',
    tagline: 'Steamed Broccoli & Cauliflower, Sautéed Veggies, Pan Seared Chicken Breast, Beef Strips, Boiled Eggs, Avocado & Hot Sauce',
    price: 150.00,
    calories: 750,
    protein: '65g',
    carbs: '25g',
    rating: 5.0,
    image: img_14,
    tags: ['Lunch Pack', 'High Protein'],
    ingredients: ['Broccoli', 'Cauliflower', 'Veggies', 'Chicken Breast', 'Beef Strips', 'Boiled Eggs', 'Avocado', 'Hot Sauce']
  },
  {
    id: 'meal9',
    category: 'meals',
    name: 'Burrito Bowl',
    tagline: 'Jollof, Greek Salad, Salsa, Avocado, Kidney Beans, Sweet Corn, Choice of Protein & Hot Sauce',
    price: 150.00,
    calories: 850,
    protein: '45g',
    carbs: '95g',
    rating: 5.0,
    image: img_16,
    tags: ['Lunch Pack', 'Hearty'],
    ingredients: ['Jollof', 'Greek Salad', 'Salsa', 'Avocado', 'Kidney Beans', 'Sweet Corn', 'Protein', 'Hot Sauce']
  }
];

export const INGREDIENTS_LIST = [
  { id: 'ing-spinach', name: 'Baby Spinach', icon: Leaf, category: 'Base', cals: 15, protein: 2 },
  { id: 'ing-kale', name: 'Organic Kale', icon: Leaf, category: 'Base', cals: 20, protein: 2 },
  { id: 'ing-chicken', name: 'Chargrilled Chicken', icon: Flame, category: 'Protein', cals: 180, protein: 28 },
  { id: 'ing-avocado', name: 'Smashed Avocado', icon: Circle, category: 'Healthy Fats', cals: 110, protein: 2 },
  { id: 'ing-cucumber', name: 'English Cucumber', icon: Droplets, category: 'Veggies', cals: 10, protein: 1 },
  { id: 'ing-tofu', name: 'Smoked Tofu', icon: Box, category: 'Protein', cals: 120, protein: 15 },
  { id: 'ing-tomatoes', name: 'Cherry Tomatoes', icon: Circle, category: 'Veggies', cals: 15, protein: 1 },
  { id: 'ing-pesto', name: 'Basil Pesto', icon: Droplets, category: 'Dressing', cals: 80, protein: 2 },
];
