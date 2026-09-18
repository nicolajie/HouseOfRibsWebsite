/* =====================================================================
   The House of Ribs — single source of truth
   ---------------------------------------------------------------------
   Everything the site renders comes from this file. To change a price,
   a phone number or a set of trading hours, edit it here once and every
   page updates.

   PER-LOCATION PRICING
   All three restaurants currently share one menu. Where a branch differs,
   add an entry to that location's `menu.overrides` map, keyed by item id:

       overrides: {
         'ribs-pork':    { prices: [['600g','R199'], ['1.2kg','R319']] },
         'starter-snails': { unavailable: true }
       }

   Anything not overridden falls back to the shared menu below.
   ===================================================================== */

window.HOR = (function () {
  'use strict';

  /* ------------------------------------------------------------------
     LOCATIONS
     ------------------------------------------------------------------ */
  const locations = [
    {
      id: 'boksburg',
      name: 'Boksburg',
      shortName: 'Boksburg',
      tagline: 'The Towers Shopping Centre',
      address: {
        line1: 'Shop 136, The Towers Shopping Centre',
        line2: 'North Rand Road, Boksburg',
        city: 'Johannesburg',
        postcode: '1459'
      },
      phone: '011 826 3550',
      phoneHref: '+27118263550',
      whatsapp: '063 933 2881',
      whatsappHref: '27639332881',
      email: 'boksburg@houseofribs.co.za',
      mapsQuery: 'The House of Ribs, The Towers Shopping Centre, North Rand Road, Boksburg',
      hours: [
        { days: 'Monday – Friday', time: '10:00 – 21:00' },
        { days: 'Saturday', time: '08:30 – 21:00' },
        { days: 'Sunday', time: '08:30 – 18:00' },
        { days: 'Public holidays', time: '08:30 – 18:00' }
      ],
      image: 'assets/img/venues/boksburg-exterior',
      features: ['Full bar', 'Gaming area', 'Kiddies play area', 'Carvery', 'Outdoor seating'],
      social: {
        facebook: 'https://www.facebook.com/thehouseofribsboksburg1',
        instagram: 'https://www.instagram.com/houseofribsboksburg/'
      },
      buffets: ['breakfast', 'weekend'],
      legacySite: 'https://www.house-of-ribs.com/',
      menu: { overrides: {} }
    },
    {
      id: 'edenvale',
      name: 'Edenvale',
      shortName: 'Edenvale',
      tagline: 'Meadowdale Mall',
      address: {
        line1: 'Shop 20, Meadowdale Mall',
        line2: 'Cnr Edenvale & Van Riebeeck Road, Meadowdale',
        city: 'Germiston',
        postcode: '1614'
      },
      phone: '062 142 2563',
      phoneHref: '+27621422563',
      whatsapp: '062 142 2563',
      whatsappHref: '27621422563',
      email: 'edenvale@houseofribs.co.za',
      mapsQuery: 'The House of Ribs, Meadowdale Mall, Edenvale',
      hours: [
        { days: 'Monday – Saturday', time: '08:30 – 20:00' },
        { days: 'Sunday', time: '08:30 – 18:00' },
        { days: 'Public holidays', time: '08:30 – 18:00' }
      ],
      image: 'assets/img/venues/edenvale-exterior',
      features: ['Full bar', 'Carvery', 'Breakfast daily from 08:30', 'Outdoor seating'],
      social: {
        facebook: 'https://www.facebook.com/houseofribsedenvale',
        instagram: 'https://www.instagram.com/houseofribsedenvale/'
      },
      buffets: ['breakfast', 'weekend'],
      legacySite: 'https://www.houseofribsedenvale.com/',
      menu: { overrides: {} }
    },
    {
      id: 'kempton-park',
      name: 'Kempton Park',
      shortName: 'Kempton Park',
      tagline: 'Festival Mall',
      address: {
        line1: 'Shop 150, Festival Mall',
        line2: 'Cnr CR Swart & Kelvin Road, Kempton Park',
        city: 'Gauteng',
        postcode: '1619'
      },
      phone: '011 970 1024',
      phoneHref: '+27119701024',
      whatsapp: '060 715 7105',
      whatsappHref: '27607157105',
      email: 'jimmy@houseofribs.co.za',
      mapsQuery: 'The House of Ribs, Festival Mall, Kempton Park',
      hours: [
        { days: 'Monday – Saturday', time: '08:30 – 20:00' },
        { days: 'Sunday', time: '08:30 – 18:00' },
        { days: 'Public holidays', time: '08:30 – 18:00' }
      ],
      image: 'assets/img/venues/kemptonpark-exterior',
      features: ['Full bar', 'Outside patio', 'Inside seating', 'Buffet lunch & dinner', 'Sharing platters'],
      social: {
        facebook: 'https://www.facebook.com/thehouseofribskemptonpark',
        instagram: 'https://www.instagram.com/houseofribskemptonpark/'
      },
      buffets: ['breakfast', 'lunch', 'dinner', 'weekend'],
      legacySite: 'https://www.houseofribskemptonpark.com/',
      menu: { overrides: {} }
    }
  ];

  /* ------------------------------------------------------------------
     BUFFETS — availability is per location via `location.buffets`
     ------------------------------------------------------------------ */
  const buffets = {
    breakfast: {
      id: 'breakfast',
      name: 'Breakfast Buffet',
      when: 'Every day from 08:30',
      image: 'assets/img/specials/breakfast-buffet',
      prices: [{ label: 'Per person', value: 'R104' }],
      includes: [
        'Bacon', 'Sausages', 'Chicken livers', 'French toast', 'Mushrooms',
        'Fried eggs & omelettes', 'Toast & preserves', 'Cereals & yoghurt',
        'Fruit salad', 'Flapjacks & syrup'
      ]
    },
    lunch: {
      id: 'lunch',
      name: 'Lunch Buffet',
      when: 'Weekdays 12:00 – 17:00',
      image: 'assets/img/specials/lunch-buffet',
      prices: [
        { label: 'Adults', value: 'R159' },
        { label: 'Pensioners', value: 'R129' },
        { label: 'Kids', value: 'R109' }
      ],
      includes: null
    },
    dinner: {
      id: 'dinner',
      name: 'Dinner Buffet',
      when: 'Weekdays from 17:00 until closing',
      image: 'assets/img/specials/dinner-buffet',
      prices: [
        { label: 'Adults', value: 'R159' },
        { label: 'Pensioners', value: 'R129' },
        { label: 'Kids', value: 'R99' }
      ],
      includes: null
    },
    weekend: {
      id: 'weekend',
      name: 'Everyday Buffet',
      when: 'Weekends from 12:00 until closing',
      image: 'assets/img/specials/everyday-buffet',
      prices: [
        { label: 'Adults', value: 'R189' },
        { label: 'Kids', value: 'R109' }
      ],
      includes: null
    }
  };

  // Shared carvery spread for every lunch / dinner / weekend service
  const carverySpread = [
    'Beef roast', 'Pork roast', 'Pork ribs', 'Chicken pieces',
    'Roast potatoes', 'Rice', 'Fresh seasonal vegetables', 'Assorted salads',
    'Ice cream & chocolate sauce'
  ];

  const buffetTerms = [
    'Two-hour seating per booking, so every table gets its turn at the carvery.',
    'No takeaways and no sharing — the buffet is per person.',
    'Take all you can eat, but please eat all you take.',
    'One serving only if no drinks are ordered.',
    'Larger bookings require a R500 deposit, deducted from your final bill.',
    'A 10% gratuity is added to tables of 8 and above.'
  ];

  /* ------------------------------------------------------------------
     FOOD MENU (shared across all three restaurants)
     ------------------------------------------------------------------ */
  const menu = [
    {
      id: 'starters',
      name: 'Starters',
      items: [
        { id: 'st-potato-shells', name: 'Potato Shells', price: 'R64', desc: 'Crispy jackets filled with your choice of mushroom or creamy garlic sauce, topped with cheddar cheese.' },
        { id: 'st-mushrooms', name: 'Panko Crumbed Mushrooms', price: 'R74', desc: 'White button mushrooms crumbed and served with tartare sauce.' },
        { id: 'st-chicken-livers', name: 'Chicken Livers', price: 'R74', desc: 'Sautéed with onions and green peppers. Served hot or mild.' },
        { id: 'st-buffalo-wings', name: 'Buffalo Wings', price: 'R74', desc: '4 full chicken wings — hot, mild or sticky.' },
        { id: 'st-calamari', name: 'Calamari', price: 'R80', desc: '120g calamari, deep fried or grilled with lemon butter, served with rice.' },
        { id: 'st-mussels', name: 'Mussels', price: 'R80', desc: 'Half shell mussels in a creamy white wine sauce.' },
        { id: 'st-garlic-bread', name: 'Cheezy Garlic Bread', price: 'R54', desc: 'Mini French loaf smothered in garlic and topped with melted cheddar.' },
        { id: 'st-halloumi', name: 'Halloumi Cheese', price: 'R80', desc: 'Grilled or fried, served with a sweet chilli sauce.' },
        { id: 'st-chicken-strips', name: 'Crispy Chicken Strips', price: 'R64', desc: 'Panko crumbed chicken strips served with creamy mayo.' },
        { id: 'st-snails', name: 'Snails', price: 'R84', desc: 'Served in a traditional creamy garlic sauce with melted cheddar cheese.' }
      ]
    },
    {
      id: 'salads',
      name: 'Salads',
      items: [
        { id: 'sa-chicken-bacon', name: 'Chicken & Bacon Salad', price: 'R109', desc: 'An all-time favourite. Grilled chicken strips, bacon, tomato, lettuce, cucumber, onion, green pepper and croutons.' },
        { id: 'sa-greek', name: 'Greek Village Salad', price: 'R99', desc: 'Tomato, cucumber, onion, olives and feta cheese.' },
        { id: 'sa-chicken', name: 'Chicken Salad', price: 'R99', desc: 'Grilled chicken strips with tomato, lettuce, cucumber, onion, green pepper and croutons.' },
        { id: 'sa-bacon', name: 'Bacon Salad', price: 'R99', desc: 'Crispy bacon with tomato, lettuce, cucumber, onion and green pepper.' },
        { id: 'sa-bacon-feta-avo', name: 'Bacon, Feta & Avo Salad', price: 'R109', desc: 'Crispy bacon, feta, avo, tomato, lettuce, cucumber, onion and green pepper.' },
        { id: 'sa-halloumi', name: 'Halloumi Salad', price: 'R99', desc: 'Tomato, lettuce, cucumber, onion and green pepper topped with halloumi and peppadews.' }
      ]
    },
    {
      id: 'ribs',
      name: 'Our Famous Ribs',
      note: 'Served with your choice of chips, rice, baked potato, green salad or veggies.',
      layout: 'grid',
      items: [
        { id: 'rb-pork', name: 'Pork Ribs', prices: [['600g', 'R189'], ['1.2kg', 'R299']] },
        { id: 'rb-beef', name: 'Beef Ribs', prices: [['600g', 'R239']] },
        { id: 'rb-lamb', name: 'Lamb Ribs', prices: [['600g', 'R239']] }
      ]
    },
    {
      id: 'flamed',
      name: 'Flamed Favourites',
      note: 'Wet aged and matured to perfection. Served with onion rings and your choice of chips, rice, baked potato, green salad or veggies.',
      items: [
        { id: 'fl-fillet', name: 'Fillet', price: 'R229', desc: '250g beef fillet.' },
        { id: 'fl-blue-cheese-fillet', name: 'Blue Cheese Fillet', price: 'R299', desc: 'Juicy 250g fillet wrapped in smokey bacon, with blue cheese sauce, snails and mozzarella.' },
        { id: 'fl-rump', name: 'Rump', prices: [['350g', 'R199'], ['500g', 'R259']] },
        { id: 'fl-sirloin', name: 'Sirloin', prices: [['350g', 'R199'], ['500g', 'R259']] },
        { id: 'fl-tbone', name: 'T-Bone', prices: [['350g', 'R199'], ['500g', 'R259']] },
        { id: 'fl-pork-chops', name: 'Pork Chops', price: 'R229', desc: '3 x 150g flame grilled pork loin chops.' },
        { id: 'fl-lamb-chops', name: 'Lamb Chops', price: 'R289', desc: '3 x 150g flame grilled lamb loin chops.' },
        { id: 'fl-steak-egg', name: 'Steak, Egg & Chips', price: 'R219', desc: '350g rump topped with a fried egg and prego sauce.' },
        { id: 'fl-eisbein', name: 'Eisbein', price: 'R179', desc: '±1kg eisbein fried to perfection, served with sauerkraut and honey mustard sauce.' }
      ]
    },
    {
      id: 'chicken',
      name: 'Chicken',
      note: 'Served with your choice of chips, rice, baked potato, green salad or veggies.',
      items: [
        { id: 'ch-schnitzel', name: 'Chicken Schnitzel', price: 'R149', desc: '2 panko crumbed chicken fillets fried golden brown, with your choice of cheese or mushroom sauce.' },
        { id: 'ch-cordon-bleu', name: 'Cordon Bleu', price: 'R169', desc: 'Panko crumbed chicken fillets filled with bacon and tangy cheddar, with your choice of cheese or mushroom sauce.' },
        { id: 'ch-fillets', name: 'Chicken Fillets', price: 'R129', desc: '2 juicy chicken fillets, lightly spiced and grilled to perfection.' },
        { id: 'ch-full-grilled', name: 'Grilled Full Chicken & Chips', price: 'R179', desc: 'Served with a choice of peri-peri, lemon & herb or BBQ.' },
        { id: 'ch-meal-2-share', name: 'Chicken Meal 2 Share', price: 'R249', desc: 'Full grilled chicken, 2 sides and 2 garlic rolls.' },
        { id: 'ch-wings-8', name: 'Buffalo Wings — 8 Full Wings', price: 'R149', desc: 'Full chicken wings — hot, mild or sticky.' },
        { id: 'ch-wings-12', name: 'Buffalo Wings — 12 Full Wings', price: 'R199', desc: 'Full chicken wings — hot, mild or sticky.' }
      ]
    },
    {
      id: 'burgers',
      name: 'Smashed Burgers',
      note: 'All burgers are prepared with two smashed patties and served with chips.',
      items: [
        { id: 'bg-classic', name: 'Classic Burger', price: 'R89', desc: '2 smashed pure beef patties with all the trimmings.' },
        { id: 'bg-cheese', name: 'Cheese Burger', price: 'R99', desc: '2 smashed pure beef patties and melted cheddar cheese.' },
        { id: 'bg-bacon-cheese', name: 'Bacon & Cheese Burger', price: 'R109', desc: '2 smashed pure beef patties, crispy bacon and cheddar cheese.' },
        { id: 'bg-bacon-guac', name: 'Bacon & Guacamole Burger', price: 'R109', desc: '2 smashed pure beef patties, crispy bacon and creamy guacamole.' },
        { id: 'bg-bacon-feta', name: 'Bacon & Feta Burger', price: 'R109', desc: '2 smashed pure beef patties, crispy bacon and feta cheese.' },
        { id: 'bg-shroom', name: 'Crispy Shroom Burger', price: 'R119', desc: '2 smashed pure beef patties topped with cheddar cheese, mushroom sauce and crispy onion rings.' },
        { id: 'bg-dagwood', name: 'Dagwood Burger', price: 'R139', desc: '2 smashed pure beef patties, crispy bacon, fried egg and cheddar cheese.' },
        { id: 'bg-smoking-hot', name: 'Smoking Hot Burger', price: 'R99', desc: '2 smashed pure beef patties stacked with jalapeños.' },
        { id: 'bg-halloumi', name: 'Halloumi Burger', price: 'R119', desc: '2 smashed pure beef patties stacked with grilled halloumi cheese.' },
        { id: 'bg-chicken', name: 'Chicken Burger', price: 'R89', desc: 'Juicy chicken fillet with lettuce and mayo.' },
        { id: 'bg-chilli-chicken', name: 'Crispy Chilli Chicken Burger', price: 'R109', desc: 'Crispy fried chicken fillet smothered with mozzarella and jalapeño sauce.' },
        { id: 'bg-veg', name: 'Veg Burger', price: 'R99', desc: 'Vegetarian patty with the usual trimmings.' }
      ],
      addons: {
        title: 'Toppings',
        items: [
          { name: 'Extra patty', price: 'R49' },
          { name: 'Bacon', price: 'R35' },
          { name: 'Feta', price: 'R35' },
          { name: 'Halloumi cheese', price: 'R35' },
          { name: 'Mushrooms', price: 'R30' },
          { name: 'Mozzarella cheddar', price: 'R29' },
          { name: 'Guacamole', price: 'R29' },
          { name: 'Jalapeños', price: 'R25' },
          { name: 'Chilli', price: 'R20' }
        ]
      }
    },
    {
      id: 'seafood',
      name: 'Seafood',
      note: 'Served with your choice of chips, rice, baked potato, green salad or veggies.',
      items: [
        { id: 'sf-medium-prawns', name: 'Medium Prawns', prices: [['12 prawns', 'R179'], ['Half kg', 'R269']] },
        { id: 'sf-queen-prawns', name: 'Queen Prawns', prices: [['8 prawns', 'R269'], ['12 prawns', 'R349']] },
        { id: 'sf-hake', name: 'Hake', price: 'R129', desc: 'Grilled or deep fried hake fillet served with a lemon butter sauce.' },
        { id: 'sf-calamari', name: 'Calamari', price: 'R179', desc: '240g calamari, grilled or fried with lemon butter sauce.' },
        { id: 'sf-platter-one', name: 'Platter for One', price: 'R259', desc: '6 medium prawns, calamari, squid heads and 3 mussels.' },
        { id: 'sf-platter-two', name: 'Platter for Two', price: 'R439', desc: '12 medium prawns, hake, calamari, squid heads and 6 mussels.' },
        { id: 'sf-hake-calamari', name: 'Hake & Calamari', price: 'R199' },
        { id: 'sf-prawns-mussels', name: '6 Medium Prawns & 6 Mussels', price: 'R189' },
        { id: 'sf-hake-prawns', name: 'Hake & 6 Medium Prawns', price: 'R199' },
        { id: 'sf-prawns-calamari', name: '6 Medium Prawns & Calamari', price: 'R199' }
      ]
    },
    {
      id: 'combos',
      name: 'House Combos',
      note: 'Served with your choice of 2 sides — chips, rice, baked potato, green salad or veggies.',
      footnote: 'Replace pork ribs with beef ribs — add R60.',
      items: [
        { id: 'co-surf-turf', name: 'Surf & Turf', price: 'R219', desc: '350g rump and 6 medium prawns.' },
        { id: 'co-wings-ribs', name: 'Wings & Ribs', price: 'R249', desc: '4 full chicken wings and 600g pork ribs.' },
        { id: 'co-chicken-prawn', name: 'Chicken & Prawn', price: 'R189', desc: 'Half chicken and 6 medium prawns.' },
        { id: 'co-rib-prawns', name: 'Rib & Prawns', price: 'R249', desc: '600g pork ribs and 6 medium prawns.' },
        { id: 'co-chicken-steak', name: 'Chicken & Steak', price: 'R219', desc: 'Half chicken and 350g rump.' },
        { id: 'co-ribs-steak', name: 'Ribs & Steak', price: 'R279', desc: '600g pork ribs and 350g rump.' },
        { id: 'co-chicken-ribs', name: 'Chicken & Ribs', price: 'R279', desc: 'Half chicken and 600g pork ribs.' },
        { id: 'co-hen-hog', name: 'Hen & Hog', price: 'R279', desc: '120g chicken strips, 4 full chicken wings and 600g pork ribs.' },
        { id: 'co-sharing-platter', name: 'Sharing Platter', price: 'R419', desc: '600g pork ribs, 1 full chicken, 1 portion hake and 2 sides.' }
      ]
    },
    {
      id: 'sides',
      name: 'Sides & Sauces',
      layout: 'chips',
      groups: [
        { title: 'Sides — R35 each', items: ['Chips', 'Baked potato', 'Onion rings', 'Green salad', 'Veggies', 'Rice'] },
        { title: 'Sauces — R30 each', items: ['Pepper', 'Mushroom', 'Cheese', 'Creamy garlic', 'Prego chilli', 'Blue cheese'] }
      ]
    },
    {
      id: 'kiddies',
      name: 'Kiddies Corner',
      items: [
        { id: 'kd-buffet', name: 'Kiddies Buffet', price: 'R129', desc: 'Kids under 10.' },
        { id: 'kd-burger', name: 'Burger & Chips', price: 'R69', desc: '80g pure beef patty with the usual trimmings.' },
        { id: 'kd-fish-fingers', name: 'Fish Fingers & Chips', price: 'R69', desc: '4 fish fingers with a junior helping of chips.' },
        { id: 'kd-ribs', name: 'Ribs & Chips', price: 'R79', desc: 'Junior portion of our famous mouth-watering ribs (300g).' },
        { id: 'kd-wings', name: 'Chicken Wings & Chips', price: 'R69', desc: '3 full succulent chicken wings with a junior helping of chips.' },
        { id: 'kd-strips', name: 'Chicken Strips & Chips', price: 'R69', desc: 'Grilled or fried chicken strips with a junior helping of chips.' },
        { id: 'kd-juice', name: 'Kids Juice', price: 'R25', desc: 'Orange, breakfast punch or apple.' },
        { id: 'kd-shake', name: 'Kids Milkshake — Regular', price: 'R35', desc: 'Chocolate, strawberry, bubblegum, vanilla, lime or banana.' },
        { id: 'kd-shake-gourmet', name: 'Kids Milkshake — Gourmet', price: 'R45', desc: 'Speckled egg shake or unicorn shake.' },
        { id: 'kd-ice-cream', name: 'Kids Ice Cream', price: 'R29', desc: 'Served with chocolate sauce.' }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        { id: 'de-waffle-classic', name: 'Waffle — Classic with Syrup', price: 'R49', desc: 'Served with ice cream or fresh cream.' },
        { id: 'de-waffle-peppermint', name: 'Waffle — Peppermint Crisp', price: 'R69', desc: 'Served with ice cream or fresh cream.' },
        { id: 'de-waffle-pb', name: 'Waffle — Peanut Butter & Banana', price: 'R79', desc: 'Served with ice cream or fresh cream.' },
        { id: 'de-waffle-oreo', name: 'Waffle — Oreo & Nutella', price: 'R89', desc: 'Served with ice cream or fresh cream.' },
        { id: 'de-cookies-cream', name: 'Cookies & Cream', price: 'R79', desc: 'Chocolate sponge layered with white chocolate mousse.' },
        { id: 'de-double-decker', name: 'Double Decker', price: 'R79', desc: 'Layers of white and dark chocolate mousse finished with a glaze.' },
        { id: 'de-brownie', name: 'Chocolate Brownie', price: 'R79', desc: 'Traditional brownie served with cream or ice cream.' },
        { id: 'de-malva', name: 'Malva Pudding', price: 'R79', desc: 'Traditional Cape malva pudding with a toffee sauce, served with custard.' },
        { id: 'de-volcano', name: 'Chocolate Volcano', price: 'R79', desc: 'Rich chocolate dessert with a molten centre, baked to perfection.' },
        { id: 'de-cheesecake', name: 'Strawberry Cheese Cake', price: 'R79', desc: 'Strawberry cake on a biscuit base topped with strawberry sauce.' },
        { id: 'de-dom-pedro', name: 'Dom Pedro', price: 'R64' },
        { id: 'de-irish-coffee', name: 'Irish Coffee', price: 'R64' }
      ]
    }
  ];

  /* ------------------------------------------------------------------
     DRINKS — printed menu pages, shown as images
     ------------------------------------------------------------------ */
  const drinks = [
    { id: 'non-alcoholic', name: 'Non-Alcoholic', blurb: 'Soft drinks, fruit juices, warm drinks and milkshakes.', image: 'assets/img/drinks/non-alcoholic' },
    { id: 'wines', name: 'Wines', blurb: 'By the glass, sparkling, white, rosé and red.', image: 'assets/img/drinks/wines' },
    { id: 'spirits-beers', name: 'Spirits & Beers', blurb: 'Brandy, whisky, gin, vodka, ciders, beers and draughts on tap.', image: 'assets/img/drinks/spirits-beers' },
    { id: 'cocktails-shooters', name: 'Cocktails & Shooters', blurb: 'House cocktails and the full shooter list.', image: 'assets/img/drinks/cocktails-shooters' }
  ];

  /* ------------------------------------------------------------------
     GALLERY
     ------------------------------------------------------------------ */
  const gallery = [
    { src: 'assets/img/food/ribs-hero', alt: 'A rack of basted pork ribs on a wooden board with chips', span: 'wide' },
    { src: 'assets/img/food/flame-grill', alt: 'Meat searing over open flames on the grill' },
    { src: 'assets/img/food/carvery-carving', alt: 'Chef carving roast pork and beef at the carvery' },
    { src: 'assets/img/food/buffet-sides', alt: 'Buffet trays of rice, pasta, vegetables and stews' },
    { src: 'assets/img/food/plated-ribs', alt: 'Plated pork rib with roast vegetables' },
    { src: 'assets/img/venues/dining-room', alt: 'The dining room and bar seen from the entrance', span: 'wide' },
    { src: 'assets/img/food/cocktails', alt: 'A table of friends raising cocktails together' },
    { src: 'assets/img/venues/bar-counter', alt: 'The bar counter with taps and a stocked back bar' },
    { src: 'assets/img/food/roast-pork', alt: 'A whole roast pork joint under the carvery lamps' },
    { src: 'assets/img/venues/gaming-area', alt: 'Pool table and arcade machines in the gaming area' },
    { src: 'assets/img/food/beer-bar', alt: 'Barman handing over two pints of draught beer' },
    { src: 'assets/img/venues/carvery-line', alt: 'The carvery line under warming lamps' },
    { src: 'assets/img/food/breakfast', alt: 'A full breakfast with bacon, eggs, sausage and chips' },
    { src: 'assets/img/venues/grand-central-bar', alt: 'The Grand Central Station bar counter' },
    { src: 'assets/img/food/carvery-roasts', alt: 'Trays of roast meats with peppers and onions', span: 'wide' }
  ];

  /* ------------------------------------------------------------------
     SITE-WIDE
     ------------------------------------------------------------------ */
  const site = {
    name: 'The House of Ribs',
    tagline: 'Family Restaurant',
    description:
      'Ribs, flame-grilled steaks, seafood and an all-you-can-eat carvery buffet. ' +
      'Three family restaurants across the East Rand — Boksburg, Edenvale and Kempton Park.',
    nav: [
      { href: 'index.html', label: 'Home' },
      { href: 'menu.html', label: 'Menu' },
      { href: 'buffet.html', label: 'Buffet' },
      { href: 'locations.html', label: 'Locations' },
      { href: 'gallery.html', label: 'Gallery' },
      { href: 'contact.html', label: 'Contact' }
    ],
    cta: { href: 'reserve.html', label: 'Book a table' },
    gratuityNote: 'A 10% gratuity is added to tables of 8 and above.',
    imagesNote: 'All images are for editorial purposes only and may differ. T&Cs apply. Right of admission reserved.'
  };

  /* ------------------------------------------------------------------
     IMAGE DIMENSIONS
     Intrinsic size of every asset, so <img> tags can carry real
     width/height. That reserves layout space (no content shift) and
     gives lazy-loading a real box to measure — without it, images with
     no intrinsic size collapse to zero height and never enter view.
     Regenerate after adding images; keys are paths without extension.
     ------------------------------------------------------------------ */
  const imageSizes = {
    'assets/img/drinks/cocktails-shooters': [1400, 1964],
    'assets/img/drinks/non-alcoholic': [1400, 1964],
    'assets/img/drinks/spirits-beers': [1400, 1964],
    'assets/img/drinks/wines': [1400, 1964],
    'assets/img/food/beer-bar': [1600, 1067],
    'assets/img/food/breakfast': [1200, 1600],
    'assets/img/food/buffet-sides': [1600, 757],
    'assets/img/food/carvery-carving': [1600, 757],
    'assets/img/food/carvery-classic': [1024, 680],
    'assets/img/food/carvery-roasts': [1487, 697],
    'assets/img/food/cocktails': [1600, 1067],
    'assets/img/food/flame-grill': [1600, 1066],
    'assets/img/food/plated-ribs': [1600, 1067],
    'assets/img/food/ribs-hero': [2000, 1333],
    'assets/img/food/roast-pork': [757, 1009],
    'assets/img/food/wine-corks': [1400, 933],
    'assets/img/specials/breakfast-buffet': [1000, 1250],
    'assets/img/specials/celebrations': [1000, 1000],
    'assets/img/specials/dinner-buffet': [1000, 1250],
    'assets/img/specials/everyday-buffet': [1000, 1250],
    'assets/img/specials/lunch-buffet': [1000, 1250],
    'assets/img/specials/platter-for-two': [1000, 1000],
    'assets/img/venues/bar-counter': [940, 788],
    'assets/img/venues/bar-host': [940, 788],
    'assets/img/venues/boksburg-exterior': [1366, 768],
    'assets/img/venues/carvery-line': [960, 720],
    'assets/img/venues/dining-room': [1500, 1065],
    'assets/img/venues/edenvale-exterior': [1128, 635],
    'assets/img/venues/gaming-area': [1500, 1000],
    'assets/img/venues/grand-central-bar': [960, 720],
    'assets/img/venues/kemptonpark-exterior': [1600, 900],
    'assets/img/venues/storefront-wide': [1350, 650]
  };

  return { site, locations, buffets, carverySpread, buffetTerms, menu, drinks, gallery, imageSizes };
})();
