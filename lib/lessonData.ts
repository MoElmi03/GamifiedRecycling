export interface Slide {
  emoji: string;
  title: string;
  body: string;
  tip?: string;
}

export interface LessonPart {
  id: string;
  partTitle: string;
  chapterTitle: string;
  slides: Slide[];
}

const LESSONS: Record<string, LessonPart> = {

  // ─── GLASS & METAL ───────────────────────────────────────────────────────

  'glass-recycling-01': {
    id: 'glass-recycling-01', partTitle: 'Bottles & Jars', chapterTitle: 'Glass Recycling',
    slides: [
      { emoji: '🫙', title: 'What Are Glass Bottles & Jars?', body: 'Glass bottles and jars are among the most recyclable materials on earth. Unlike plastic, glass can be recycled endlessly without losing quality or purity.' },
      { emoji: '♻️', title: 'Why Recycle Glass?', body: 'Recycling one glass bottle saves enough energy to power a computer for 25 minutes. It also reduces CO₂ emissions and keeps glass out of landfill for thousands of years.' },
      { emoji: '✅', title: 'What to Include', body: 'Clear, green, and brown glass bottles are all accepted. Jam jars, sauce jars, wine bottles, beer bottles, and condiment bottles all go in the recycling bin.' },
      { emoji: '❌', title: 'What NOT to Include', body: 'Broken glass, Pyrex/oven dishes, drinking glasses, windows, and mirrors are NOT recyclable in your household bin. They have different melting points.' },
      { emoji: '💡', title: 'Top Tip', body: 'Labels can stay on glass — they burn off during the recycling process. Just remove the lid and give it a quick rinse before placing it in the bin.', tip: 'Rinse = yes. Dishwasher clean = unnecessary.' },
    ],
  },

  'glass-recycling-02': {
    id: 'glass-recycling-02', partTitle: 'Removing Lids', chapterTitle: 'Glass Recycling',
    slides: [
      { emoji: '🪛', title: 'Why Remove Lids?', body: 'Metal lids and plastic caps are made of different materials to the glass. Leaving them on can jam machinery at the recycling plant.' },
      { emoji: '🔩', title: 'Metal Lids', body: 'Metal lids from glass jars can go in your metal recycling bin separately. Give them a quick rinse first to remove any food residue.' },
      { emoji: '🔵', title: 'Plastic Caps', body: 'Clean plastic caps can go in your plastic recycling bin. If they are too small (under 3cm) or soiled, put them in general waste instead.' },
      { emoji: '🔥', title: 'Tight Lids?', body: 'Run the lid under hot water for 30 seconds — the metal expands slightly, making it much easier to twist off. A rubber grip pad also helps.' },
      { emoji: '✅', title: 'Quick Checklist', body: 'Before recycling glass: 1) Remove lid. 2) Recycle lid separately. 3) Rinse container. 4) Place in glass recycling bin.', tip: 'Takes under 10 seconds per bottle!' },
    ],
  },

  'glass-recycling-03': {
    id: 'glass-recycling-03', partTitle: 'Rinsing Glass', chapterTitle: 'Glass Recycling',
    slides: [
      { emoji: '💧', title: 'Why Rinse?', body: 'Food residue left in glass containers attracts bacteria and contaminates other recyclables in the bin. A simple rinse solves this.' },
      { emoji: '🚿', title: 'How to Rinse', body: 'A 3-second cold water swirl is all you need. You do NOT need soap, hot water, or a scrub brush. Recycling facilities wash materials anyway.' },
      { emoji: '✅', title: 'What\'s Acceptable', body: 'Containers don\'t need to be spotless. Small stains are fine. The goal is to remove large chunks of food or significant liquid residue.' },
      { emoji: '⚡', title: 'Rinse While Fresh', body: 'Rinse bottles immediately after emptying them. Once food or liquid dries, it\'s much harder to remove and takes far more water to clean.' },
      { emoji: '🌍', title: 'Water Saving Tip', body: 'Use your washing-up water to rinse recyclables. This saves fresh water and makes your recycling habits even more eco-friendly.', tip: 'Don\'t run a tap just to rinse recyclables.' },
    ],
  },

  'metal-recycling-01': {
    id: 'metal-recycling-01', partTitle: 'Cans & Tins', chapterTitle: 'Metal Recycling',
    slides: [
      { emoji: '🥫', title: 'Cans & Tins: The Basics', body: 'Food tins, drink cans, and aerosol cans are all made from steel or aluminium — two of the most valuable recyclable materials.' },
      { emoji: '⚡', title: 'Energy Savings', body: 'Recycling aluminium uses 95% less energy than making it from scratch. Recycling one aluminium can saves enough energy to run a TV for 3 hours.' },
      { emoji: '✅', title: 'What Goes In', body: 'Steel food tins (beans, soup, tomatoes), aluminium drink cans, pet food tins, and empty paint tins are all accepted in metal recycling.' },
      { emoji: '❌', title: 'What Stays Out', body: 'Tins with sharp lids attached, heavily rusted tins, and tins containing toxic chemicals (oil, solvents) should NOT go in the recycling bin.' },
      { emoji: '💡', title: 'Crush vs Don\'t Crush', body: 'Crushing aluminium cans saves space in your bin and is fine. However, do NOT crush steel cans as they can jam sorting machinery.', tip: 'Aluminium = crush it. Steel = leave it.' },
    ],
  },

  'metal-recycling-02': {
    id: 'metal-recycling-02', partTitle: 'Aluminium vs. Steel', chapterTitle: 'Metal Recycling',
    slides: [
      { emoji: '🔍', title: 'Know Your Metals', body: 'Most household metal recycling is either aluminium or steel. These are sorted separately at recycling facilities using powerful magnets.' },
      { emoji: '🧲', title: 'The Magnet Test', body: 'Stuck a fridge magnet to it? It\'s steel. Magnet doesn\'t stick? It\'s aluminium. Steel is magnetic, aluminium is not. Simple!' },
      { emoji: '🥤', title: 'Aluminium Items', body: 'Drink cans, foil trays, kitchen foil, and aerosol cans for deodorant are commonly made from aluminium. They are lightweight and silver.' },
      { emoji: '🥫', title: 'Steel Items', body: 'Food tins (beans, tomatoes, soup), pet food cans, and large paint tins are usually steel. They are heavier and slightly magnetic.' },
      { emoji: '💰', title: 'Why It Matters', body: 'Both metals are highly valuable to recyclers. Aluminium is worth more per tonne, but steel is recycled in much higher volumes globally.', tip: 'Both go in the same household recycling bin — the facility sorts them.' },
    ],
  },

  'metal-recycling-03': {
    id: 'metal-recycling-03', partTitle: 'Aerosols', chapterTitle: 'Metal Recycling',
    slides: [
      { emoji: '🧴', title: 'Can Aerosols Be Recycled?', body: 'Yes! Empty aerosol cans — deodorant, hairspray, shaving foam — are made from steel or aluminium and CAN be recycled when completely empty.' },
      { emoji: '⚠️', title: 'Must Be Empty', body: 'Aerosols must be completely empty before recycling. Never pierce, crush, or put a pressurised aerosol in the bin — this is a fire and explosion hazard.' },
      { emoji: '✅', title: 'How to Check If Empty', body: 'Shake the can — if you hear or feel liquid, it\'s not empty. When empty, press the nozzle and you should only hear a hiss of gas, not a spray.' },
      { emoji: '🚫', title: 'Lids and Caps', body: 'Remove plastic lids and caps from aerosol cans before recycling. The plastic lid goes in plastic recycling; the metal can goes in metal recycling.' },
      { emoji: '💡', title: 'Disposal if Not Empty', body: 'If an aerosol is not empty and no longer works, take it to your local Household Waste Recycling Centre (HWRC) — never put it in a fire or landfill.', tip: 'HWRC centres accept partially-used aerosols safely.' },
    ],
  },

  'foil-small-metals-01': {
    id: 'foil-small-metals-01', partTitle: 'Foil Scrunch Test', chapterTitle: 'Foil & Small Metals',
    slides: [
      { emoji: '🫕', title: 'Kitchen Foil: Recyclable?', body: 'Kitchen foil CAN be recycled, but only when it\'s clean. Foil covered in food residue contaminates the recycling stream and must go in general waste.' },
      { emoji: '✊', title: 'The Scrunch Test', body: 'Scrunch the foil into a ball. If it holds its shape, it\'s thick enough to recycle. If it springs back or tears easily, it may be too thin and should go in general waste.' },
      { emoji: '🧹', title: 'Clean Foil Only', body: 'Foil roasting trays, baking sheets, and food wrap are recyclable IF clean. Give them a wash or wipe before recycling. Even lightly greasy foil is usually fine.' },
      { emoji: '❌', title: 'When NOT to Recycle Foil', body: 'Heavily burnt foil, foil mixed with food waste, crisp packets (these are metalized plastic, not foil), and foil pouches are NOT recyclable.' },
      { emoji: '💡', title: 'Bundle Foil Together', body: 'Small pieces of foil can fall through sorting machinery. Bundle clean foil pieces together into a ball at least the size of a golf ball before recycling.', tip: 'Bigger ball = easier to sort at the facility.' },
    ],
  },

  'foil-small-metals-02': {
    id: 'foil-small-metals-02', partTitle: 'Metal Lids', chapterTitle: 'Foil & Small Metals',
    slides: [
      { emoji: '🔩', title: 'Metal Lids Around the Home', body: 'Metal lids from glass jars, bottle tops, and tin can lids are all made from steel or aluminium and are recyclable — with a few rules.' },
      { emoji: '✅', title: 'Jar & Bottle Lids', body: 'Metal lids from jam jars, sauce jars, and wine bottles should be removed from the glass container and recycled separately in the metal bin.' },
      { emoji: '⚠️', title: 'Tiny Lids Problem', body: 'Very small metal lids (under 3cm) can fall through gaps in sorting machinery. Collect several small lids together in a steel can before recycling.' },
      { emoji: '🥫', title: 'Tin Can Lids', body: 'If the lid is still attached to the can, push it inside the can before recycling to prevent injury to collectors and workers.' },
      { emoji: '🚫', title: 'What to Avoid', body: 'Lids from products like paint, chemicals, or motor oil should NOT go in household recycling. These need specialist disposal at a recycling centre.', tip: 'Always rinse lids before recycling.' },
    ],
  },

  'foil-small-metals-03': {
    id: 'foil-small-metals-03', partTitle: 'Bottle Caps', chapterTitle: 'Foil & Small Metals',
    slides: [
      { emoji: '🍾', title: 'Bottle Caps: Metal or Plastic?', body: 'Bottle caps come in two types: metal crown caps (beer/fizzy drinks) and plastic screw caps. Each is handled differently in recycling.' },
      { emoji: '🔵', title: 'Metal Crown Caps', body: 'Metal crown caps (the type you need a bottle opener for) are steel and recyclable. Collect them in a steel tin and crimp the opening closed before recycling.' },
      { emoji: '⚡', title: 'Plastic Screw Caps', body: 'Plastic screw caps are usually recyclable in plastic bins, but they must be removed from the bottle first. Caps left on can cause problems during the recycling process.' },
      { emoji: '📏', title: 'Size Rules', body: 'Caps smaller than 3cm may not be processed correctly. Collect multiple small caps inside a larger container to ensure they are properly recycled.' },
      { emoji: '💡', title: 'Pro Tip', body: 'Keep a small jar near your recycling bin to collect bottle caps, small lids, and other tiny metals. When it\'s full, seal it and recycle the whole jar together.', tip: 'Full jar of small metals = one recycling win.' },
    ],
  },

  // ─── PLASTIC ITEMS ────────────────────────────────────────────────────────

  'understanding-plastic-types-01': {
    id: 'understanding-plastic-types-01', partTitle: 'PET & HDPE Plastics', chapterTitle: 'Understanding Plastic Types',
    slides: [
      { emoji: '🧴', title: 'The Plastic Code System', body: 'Plastics are numbered 1–7 inside a recycling symbol. These numbers tell you what type of plastic it is and whether it can be recycled.' },
      { emoji: '1️⃣', title: 'PET (Number 1)', body: 'PET (Polyethylene Terephthalate) is used for drinks bottles, food trays, and salad containers. It is the most widely recycled plastic and accepted almost everywhere.' },
      { emoji: '2️⃣', title: 'HDPE (Number 2)', body: 'HDPE (High-Density Polyethylene) is used for milk bottles, shampoo bottles, and cleaning product containers. It is also widely recyclable and highly valuable.' },
      { emoji: '✅', title: 'Why These Two Matter', body: 'PET and HDPE together make up over 70% of plastic recycling. They have strong resale markets and are used to make new bottles, fleece jackets, and more.' },
      { emoji: '💡', title: 'Finding the Number', body: 'Look for the recycling triangle symbol on the bottom of the container. The number inside tells you which plastic type it is.', tip: '1 and 2 = almost always recyclable.' },
    ],
  },

  'understanding-plastic-types-02': {
    id: 'understanding-plastic-types-02', partTitle: 'Non-Recyclable Plastics', chapterTitle: 'Understanding Plastic Types',
    slides: [
      { emoji: '🚫', title: 'Plastics That Can\'t Be Recycled', body: 'Not all plastics can go in your household recycling bin. Types 3, 6, and 7 are especially problematic and often cannot be recycled kerbside.' },
      { emoji: '3️⃣', title: 'PVC (Number 3)', body: 'PVC is used in pipes, window frames, and some food packaging. It releases toxic chemicals when melted, making it very difficult to recycle.' },
      { emoji: '6️⃣', title: 'Polystyrene (Number 6)', body: 'Foam polystyrene (used in takeaway cups and packaging) is almost never accepted in kerbside recycling. It is 95% air and has very little recyclable material.' },
      { emoji: '7️⃣', title: 'Other Plastics (Number 7)', body: 'Number 7 is a catch-all for mixed and complex plastics. These are generally not recyclable unless specifically labelled as such.' },
      { emoji: '💡', title: 'What To Do Instead', body: 'Look for specialist collection points for hard-to-recycle plastics. Some supermarkets collect polystyrene. When possible, choose products with less packaging.', tip: 'Reduce first, then recycle.' },
    ],
  },

  'understanding-plastic-types-03': {
    id: 'understanding-plastic-types-03', partTitle: 'Soft Plastics & Film', chapterTitle: 'Understanding Plastic Types',
    slides: [
      { emoji: '🛍️', title: 'What Are Soft Plastics?', body: 'Soft plastics are flexible, stretchy plastics like carrier bags, bread bags, cling film, bubble wrap, and plastic film covers on trays.' },
      { emoji: '⚠️', title: 'Why They\'re Problematic', body: 'Soft plastics cannot go in your household recycling bin. They wrap around machinery at sorting facilities, causing breakdowns costing thousands of pounds.' },
      { emoji: '🏪', title: 'Supermarket Drop-Offs', body: 'Many supermarkets now have soft plastic collection points. You can bring clean, dry soft plastics (carrier bags, bread bags, crisp packets) for recycling there.' },
      { emoji: '✅', title: 'The Scrunch Test for Plastic', body: 'Scrunch the plastic in your hand. If it scrunches into a ball and stays scrunched, it\'s a soft plastic that needs to go to a drop-off point, not your bin.' },
      { emoji: '💡', title: 'Reuse First', body: 'Carrier bags, bread bags, and zip-lock bags can often be reused multiple times before recycling. Reuse is always better than recycle.', tip: 'Keep a bag-for-bags near your door.' },
    ],
  },

  'preparing-plastics-for-recycling-01': {
    id: 'preparing-plastics-for-recycling-01', partTitle: 'Rinsing & Cleaning', chapterTitle: 'Preparing Plastics for Recycling',
    slides: [
      { emoji: '💧', title: 'Why Clean Plastics?', body: 'Food and drink residue contaminate the recycling batch. Even a few contaminated items can cause an entire lorry load to be sent to landfill.' },
      { emoji: '🚿', title: 'How Clean is Clean Enough?', body: 'You don\'t need to scrub plastics spotless. A quick rinse to remove visible food, liquid, or sauce is sufficient. Recycling plants wash materials as part of the process.' },
      { emoji: '🧃', title: 'Cartons & Pouches', body: 'Squeeze out as much liquid as possible from cartons, then give a quick rinse. Drink pouches with straws should have the straw removed if possible.' },
      { emoji: '🍦', title: 'Yoghurt & Food Pots', body: 'Yoghurt pots, margarine tubs, and hummus containers should be rinsed clean. A residue layer is fine; chunks of food are not.' },
      { emoji: '💡', title: 'Rinse in Batches', body: 'Set aside recyclables during the day and do a quick batch rinse at the end of the day alongside your washing up. This saves water and time.', tip: 'Cold water is fine — no need for hot.' },
    ],
  },

  'preparing-plastics-for-recycling-02': {
    id: 'preparing-plastics-for-recycling-02', partTitle: 'Removing Lids & Labels', chapterTitle: 'Preparing Plastics for Recycling',
    slides: [
      { emoji: '🪛', title: 'Lids: On or Off?', body: 'Rules vary by council, but as a general guide: leave plastic lids ON bottles (they\'re caught at the facility) but remove metal lids from plastic containers.' },
      { emoji: '🔵', title: 'Small Plastic Lids', body: 'Very small plastic lids (like on sauce bottles) can fall through machinery if separated. Most councils now say leave small plastic lids ON the bottle.' },
      { emoji: '🏷️', title: 'Do Labels Need Removing?', body: 'In most cases, NO. Paper and plastic labels are removed during the recycling process. You don\'t need to peel them off before recycling.' },
      { emoji: '🧩', title: 'Pump Dispensers', body: 'Pump mechanisms on bottles (like hand soap or shampoo) are often made of mixed materials. Remove them and put in general waste; recycle the bottle body separately.' },
      { emoji: '💡', title: 'Check Your Local Council', body: 'Rules vary between councils. Check your local council website for the most up-to-date guidance on lids, labels, and specific containers accepted.', tip: 'UK households: recyclemore.co.uk for local rules.' },
    ],
  },

  'preparing-plastics-for-recycling-03': {
    id: 'preparing-plastics-for-recycling-03', partTitle: 'Crushing Bottles', chapterTitle: 'Preparing Plastics for Recycling',
    slides: [
      { emoji: '👊', title: 'Should You Crush Bottles?', body: 'Crushing plastic bottles saves significant space in your recycling bin and allows more to be collected per lorry journey, reducing carbon emissions.' },
      { emoji: '✅', title: 'How to Crush Correctly', body: 'Twist the cap back on after crushing. This keeps the bottle compact and prevents it from re-inflating in the bin. The cap stays with the bottle.' },
      { emoji: '⚠️', title: 'Don\'t Over-Crush', body: 'Crushing flat is fine, but avoid shredding or tearing the bottle. Some sorting systems use the shape of bottles to identify and sort plastic types.' },
      { emoji: '🧴', title: 'Bottles vs Tubs', body: 'Crush bottles (drinks, shampoo, washing-up liquid) but don\'t bother with rigid tubs like margarine containers — they\'re already compact.' },
      { emoji: '💡', title: 'Space Saving Impact', body: 'Crushing 10 bottles creates enough extra space for another 5+ bottles in your bin. Over a year, this could double the volume of plastic you recycle.', tip: 'Crush, recap, recycle.' },
    ],
  },

  'plastic-contamination-01': {
    id: 'plastic-contamination-01', partTitle: 'Food Soiled Plastics', chapterTitle: 'Plastic Contamination',
    slides: [
      { emoji: '🍔', title: 'The Contamination Problem', body: 'Food-soiled plastics are the single biggest cause of recycling contamination. Even a small amount of food waste can ruin an entire batch of recyclables.' },
      { emoji: '🍕', title: 'Common Offenders', body: 'Greasy pizza boxes (cardboard), yoghurt pots with residue, takeaway containers with sauce, and plastic bags used for food waste are common contaminants.' },
      { emoji: '🧪', title: 'What Happens at the Plant', body: 'At recycling facilities, contaminated plastics cause the whole batch to be downgraded or rejected entirely. It costs the facility — and taxpayers — money to deal with.' },
      { emoji: '✅', title: 'The Test', body: 'If you\'d be embarrassed to show someone the inside of the container, it\'s too dirty to recycle. A quick rinse fixes most problems in under 10 seconds.' },
      { emoji: '💡', title: 'When in Doubt', body: 'If you\'re unsure whether a container is clean enough, put it in general waste. An uncontaminated general waste bin is better than a contaminated recycling bin.', tip: 'Contamination ruins more than just one item.' },
    ],
  },

  'plastic-contamination-02': {
    id: 'plastic-contamination-02', partTitle: 'Black Plastic Issues', chapterTitle: 'Plastic Contamination',
    slides: [
      { emoji: '🖤', title: 'The Black Plastic Problem', body: 'Black plastic is used in many ready meal trays and food packaging. It is made by adding carbon black pigment, which causes major recycling problems.' },
      { emoji: '🔍', title: 'Why It Can\'t Be Sorted', body: 'Recycling facilities use infrared scanners to sort plastics by type. Black plastic absorbs the infrared light instead of reflecting it, making it invisible to the scanner.' },
      { emoji: '🚫', title: 'Where It Goes Instead', body: 'Because it can\'t be scanned, black plastic is usually sorted as general waste even if it enters the recycling bin. It ends up in landfill or incineration.' },
      { emoji: '🛒', title: 'Avoid When Shopping', body: 'Look for food products in clear, white, or coloured trays instead of black ones. Some supermarkets have switched away from black plastic due to pressure from consumers.' },
      { emoji: '💡', title: 'Progress Being Made', body: 'Some UK supermarkets have developed "detectable black plastic" that CAN be identified by scanners. Look for the recycling label on the packaging before assuming.', tip: 'Check the label — some new black plastic is now recyclable.' },
    ],
  },

  'plastic-contamination-03': {
    id: 'plastic-contamination-03', partTitle: 'Mixed Material Packaging', chapterTitle: 'Plastic Contamination',
    slides: [
      { emoji: '📦', title: 'What Is Mixed Material Packaging?', body: 'Mixed material packaging combines different materials — like plastic film on a cardboard tray, or a foil lid on a plastic pot. These are very hard to recycle.' },
      { emoji: '🧃', title: 'Juice Cartons & Pouches', body: 'Cartons are made of cardboard, plastic, and aluminium layers. While some councils accept them, many cannot process them due to the mixed materials.' },
      { emoji: '🍫', title: 'Crisp Packets & Wrappers', body: 'Crisp packets are metalized plastic film — they look like foil but are actually plastic with a metallic coating. They are NOT recyclable in household bins.' },
      { emoji: '🥗', title: 'Salad Bags', body: 'Salad bags with plastic windows are mixed material. Many have "not currently recyclable" labels. Check your local council — some now accept them.' },
      { emoji: '💡', title: 'Look For The Label', body: 'UK packaging must now carry recycling instructions. Look for "Recycle", "Check Locally", or "Don\'t Recycle" labels on packaging before deciding where it goes.', tip: '"Check Locally" means check your council website.' },
    ],
  },

  // ─── PAPER & CARDBOARD ───────────────────────────────────────────────────

  'paper-recycling-basics-01': {
    id: 'paper-recycling-basics-01', partTitle: 'Clean vs. Dirty Paper', chapterTitle: 'Paper Recycling Basics',
    slides: [
      { emoji: '📄', title: 'Paper Recycling Basics', body: 'Paper is one of the most commonly recycled materials. In the UK, around 80% of paper and cardboard is recycled — but only if it\'s clean and dry.' },
      { emoji: '✅', title: 'Clean Paper: What\'s Accepted', body: 'Office paper, newspaper, magazines, envelopes, greeting cards, writing paper, and printer paper are all accepted. They must be clean and dry.' },
      { emoji: '💧', title: 'The Wet Paper Problem', body: 'Wet paper breaks down in the recycling process and becomes pulp before it can be sorted. Always keep your recycling bin dry to prevent this.' },
      { emoji: '🍕', title: 'Dirty Paper: What\'s Not Accepted', body: 'Paper contaminated with food (greasy pizza boxes, paper plates with food), wet paper, and tissue paper (too short-fibred) cannot be recycled.' },
      { emoji: '💡', title: 'Soiled Paper Tip', body: 'Greasy or food-stained paper is actually perfect for composting. It breaks down quickly in a compost bin and improves soil quality.', tip: 'Compost dirty paper, recycle clean paper.' },
    ],
  },

  'paper-recycling-basics-02': {
    id: 'paper-recycling-basics-02', partTitle: 'Magazines & Newspapers', chapterTitle: 'Paper Recycling Basics',
    slides: [
      { emoji: '🗞️', title: 'Magazines & Newspapers', body: 'Newspapers and magazines are excellent recycling materials. The fibres are long and strong, making them ideal for producing new paper products.' },
      { emoji: '✅', title: 'Both Are Recyclable', body: 'Both newspaper and glossy magazines are accepted in recycling. The glossy coating on magazine pages doesn\'t prevent recycling — modern plants process both.' },
      { emoji: '📰', title: 'Free Supplements & Inserts', body: 'The free supplements, TV guides, and leaflets that come with newspapers are all fine to recycle along with the main paper.' },
      { emoji: '🔗', title: 'Remove Plastic Wrapping', body: 'Some magazines arrive in plastic wrapping. Remove and recycle this separately at a soft plastics drop-off point, then recycle the magazine normally.' },
      { emoji: '💡', title: 'Reuse Before Recycling', body: 'Newspapers make excellent protective wrapping for fragile items, fire starters, or compost material. Reuse them before putting them in the recycling bin.', tip: 'Old newspaper = great for wrapping gifts too.' },
    ],
  },

  'paper-recycling-basics-03': {
    id: 'paper-recycling-basics-03', partTitle: 'Envelopes & Windows', chapterTitle: 'Paper Recycling Basics',
    slides: [
      { emoji: '✉️', title: 'Can Envelopes Be Recycled?', body: 'Most envelopes can be recycled. This includes standard white and brown envelopes, padded envelopes (if paper-padded), and security envelopes.' },
      { emoji: '🪟', title: 'Window Envelopes', body: 'Envelopes with plastic windows CAN be recycled in most areas. The small amount of plastic is usually separated during the recycling process automatically.' },
      { emoji: '🫧', title: 'Bubble-Lined Envelopes', body: 'Envelopes lined with bubble wrap (plastic) cannot go in paper recycling. Remove the bubble wrap and recycle it at a soft plastics drop-off; recycle the paper envelope separately.' },
      { emoji: '🔒', title: 'What About Sensitive Info?', body: 'Shred documents with personal information before recycling. Shredded paper can be recycled — put it in a sealed paper bag or envelope first to prevent it blowing around.' },
      { emoji: '💡', title: 'Reuse Envelopes', body: 'Many envelopes can be reused by covering the old address with a label sticker. This saves paper and reduces waste before eventually recycling.', tip: 'Reuse envelopes at least once before recycling.' },
    ],
  },

  'cardboard-rules-01': {
    id: 'cardboard-rules-01', partTitle: 'Greasy Pizza Boxes', chapterTitle: 'Cardboard Rules',
    slides: [
      { emoji: '🍕', title: 'The Pizza Box Question', body: 'Pizza boxes are one of the most searched recycling questions. The answer: it depends on how greasy they are.' },
      { emoji: '✂️', title: 'The Tear Test', body: 'If the bottom of the box is heavily soiled with grease and cheese, tear off the clean top and recycle that. The greasy bottom goes in compost or general waste.' },
      { emoji: '✅', title: 'Lightly Greasy Is Fine', body: 'If the box has only a small grease stain, it is still recyclable. A bit of grease won\'t ruin a whole batch. Only heavily soiled cardboard needs to be binned.' },
      { emoji: '🌱', title: 'Compost The Rest', body: 'Greasy cardboard and paper are actually ideal for composting. The carbon in the cardboard balances the nitrogen-rich kitchen waste perfectly.' },
      { emoji: '💡', title: 'The 50/50 Rule', body: 'If less than 50% of the box is greasy, you can often recycle the whole thing. If more than 50% is contaminated, it\'s better to compost or bin it.', tip: 'When in doubt — split it, sort it.' },
    ],
  },

  'cardboard-rules-02': {
    id: 'cardboard-rules-02', partTitle: 'Flattening Boxes', chapterTitle: 'Cardboard Rules',
    slides: [
      { emoji: '📦', title: 'Why Flatten Cardboard?', body: 'Flattening cardboard boxes before recycling is one of the easiest ways to improve recycling efficiency. It doubles or triples the amount that fits in a bin or lorry.' },
      { emoji: '✂️', title: 'How to Flatten Properly', body: 'Open the box at the top and bottom seams. Then fold flat. For large boxes, use a craft knife to cut them into smaller flat pieces that fit neatly in your bin.' },
      { emoji: '🌧️', title: 'Keep Cardboard Dry', body: 'Wet cardboard breaks down into mush and cannot be recycled. Keep your recycling bin closed on rainy days, and flatten boxes before putting them outside.' },
      { emoji: '📮', title: 'Remove Packing Materials', body: 'Before recycling delivery boxes, remove all packing materials: bubble wrap, polystyrene chips, and air pillows. These go to separate recycling points.' },
      { emoji: '💡', title: 'Stack It Well', body: 'Stack flat cardboard sheets neatly in your bin rather than shoving in unflattened boxes. Neat stacking means more gets collected each time.', tip: 'Flat, dry, and clean = perfect cardboard recycling.' },
    ],
  },

  'cardboard-rules-03': {
    id: 'cardboard-rules-03', partTitle: 'Removing Tape', chapterTitle: 'Cardboard Rules',
    slides: [
      { emoji: '📏', title: 'Does Tape Need Removing?', body: 'Ideally yes, but small amounts of sticky tape won\'t prevent cardboard being recycled. Large amounts of tape, however, can cause problems at sorting facilities.' },
      { emoji: '🧪', title: 'What Tape Is Made Of', body: 'Most parcel tape is made of plastic film with an adhesive backing. It doesn\'t dissolve in the recycling process and can end up contaminating paper pulp.' },
      { emoji: '✅', title: 'A Little Is OK', body: 'A few strips of tape won\'t ruin a cardboard box. Remove what you can easily, but don\'t spend 10 minutes trying to get every piece off.' },
      { emoji: '🌱', title: 'Paper Tape Is Better', body: 'Paper tape (used by some eco-friendly delivery companies) is fully recyclable and compostable with the box. No need to remove it at all.' },
      { emoji: '💡', title: 'Choosing Better Tape', body: 'When sending packages yourself, choose paper tape or minimal plastic tape. This makes the box easier to recycle at the other end.', tip: 'Paper tape = best choice for recyclable packaging.' },
    ],
  },

  'composite-paper-packaging-01': {
    id: 'composite-paper-packaging-01', partTitle: 'Juice Cartons', chapterTitle: 'Composite Paper Packaging',
    slides: [
      { emoji: '🧃', title: 'What Are Juice Cartons Made Of?', body: 'Juice cartons (Tetra Pak, Pure Pak) are made of cardboard, polyethylene plastic, and a thin layer of aluminium foil. This triple-layer makes them complex to recycle.' },
      { emoji: '✅', title: 'Can They Be Recycled?', body: 'Yes! Carton recycling is growing. Many UK councils now accept cartons, and almost all major supermarkets have carton collection points.' },
      { emoji: '🚿', title: 'Preparing Cartons', body: 'Rinse the carton with water, shake dry, then flatten by folding down the top. You can leave the straw attached if it\'s a carton with a straw.' },
      { emoji: '🏭', title: 'How They\'re Recycled', body: 'Cartons are pulped in water — the cardboard fibres rise to the top and are collected. The remaining plastic and aluminium are separated and also recycled.' },
      { emoji: '💡', title: 'Find Collection Points', body: 'Visit cartonrecycling.co.uk to find your nearest carton collection point. Even if your council doesn\'t collect kerbside, a drop-off point is often nearby.', tip: 'Flatten + rinse = recycle-ready carton.' },
    ],
  },

  'composite-paper-packaging-02': {
    id: 'composite-paper-packaging-02', partTitle: 'Laminated Paper', chapterTitle: 'Composite Paper Packaging',
    slides: [
      { emoji: '🗂️', title: 'What Is Laminated Paper?', body: 'Laminated paper has a thin layer of plastic film bonded to the surface. It\'s used in posters, some food packaging, book covers, and certain greeting cards.' },
      { emoji: '🚫', title: 'Generally Not Recyclable', body: 'Most laminated paper CANNOT be recycled kerbside. The plastic coating prevents the paper fibres from separating properly in the recycling pulping process.' },
      { emoji: '🔍', title: 'How To Identify Laminate', body: 'Feel the surface — if it\'s smooth and slightly shiny, and you can\'t tear it cleanly like plain paper, it\'s likely laminated. The edges may peel slightly.' },
      { emoji: '♻️', title: 'Some Can Be Recycled', body: 'New technologies are emerging. Some facilities can now process lightly laminated paper. Look for a recycling label on the item to confirm.' },
      { emoji: '💡', title: 'Avoid Laminated When Possible', body: 'Choose products with non-laminated packaging when possible. Opt for matte finish gift bags, uncoated greetings cards, and recyclable food packaging.', tip: 'Matte paper = usually recyclable. Glossy/plastic coating = usually not.' },
    ],
  },

  'composite-paper-packaging-03': {
    id: 'composite-paper-packaging-03', partTitle: 'Coffee Cups', chapterTitle: 'Composite Paper Packaging',
    slides: [
      { emoji: '☕', title: 'The Coffee Cup Problem', body: 'Disposable coffee cups look like paper but have a thin polyethylene plastic lining to prevent leaks. This lining means they cannot be recycled in standard paper recycling.' },
      { emoji: '🏭', title: 'Specialist Recycling Required', body: 'Only a handful of specialist facilities in the UK can separate the plastic lining from the paper. Most councils do not have access to these facilities.' },
      { emoji: '🗑️', title: 'Lids Are Recyclable', body: 'The plastic lid on a takeaway coffee cup IS recyclable! Remove it and put it in your plastic recycling (check it\'s clean). The cup body goes in general waste.' },
      { emoji: '☕', title: 'Collection Points Exist', body: 'Many coffee chains (Pret, Costa, Starbucks) have in-store cup recycling schemes. These cups are sent to specialist facilities. Use these where possible.' },
      { emoji: '💡', title: 'Best Solution: Reusable Cup', body: 'A reusable coffee cup eliminates the problem entirely. Many cafes offer a discount (10-25p) for bringing your own cup. Over a year, this saves money and waste.', tip: 'One reusable cup saves ~500 disposable cups per year.' },
    ],
  },

  // ─── FOOD & ORGANIC WASTE ─────────────────────────────────────────────────

  'what-belongs-in-food-waste-01': {
    id: 'what-belongs-in-food-waste-01', partTitle: 'Fruit & Veg Scraps', chapterTitle: 'What Belongs in Food Waste',
    slides: [
      { emoji: '🥦', title: 'Fruit & Vegetable Scraps', body: 'Fruit and vegetable scraps make up a large portion of household food waste. All of it can go in your food waste bin — including the parts you might not expect.' },
      { emoji: '✅', title: 'What\'s Included', body: 'Vegetable peelings, fruit skins, cores, and seeds, spoiled or mouldy fruit and vegetables, salad leaves, and plant-based leftovers all go in food waste.' },
      { emoji: '🌽', title: 'What About Corn Cobs & Stones?', body: 'Yes! Corn cobs, avocado stones, peach pits, and even pineapple tops can go in your food waste bin. They break down during composting.' },
      { emoji: '🧅', title: 'Raw or Cooked?', body: 'Both raw and cooked fruit and vegetables go in food waste. There\'s no need to separate raw peelings from cooked vegetable leftovers.' },
      { emoji: '💡', title: 'Reduce Before Recycling', body: 'Before scraping vegetables into waste, consider making stock. Onion skins, carrot tops, and celery ends can all be simmered to make nutritious vegetable stock.', tip: 'Scraps = free stock. Use them first.' },
    ],
  },

  'what-belongs-in-food-waste-02': {
    id: 'what-belongs-in-food-waste-02', partTitle: 'Cooked Food', chapterTitle: 'What Belongs in Food Waste',
    slides: [
      { emoji: '🍲', title: 'Cooked Food & Leftovers', body: 'All cooked food can go in your food waste bin. This includes meat, fish, dairy, pasta, rice, and any cooked meal leftovers.' },
      { emoji: '🥩', title: 'Meat & Fish', body: 'Cooked and raw meat, fish, and bones can all go in your food waste bin. Unlike home composting, the council food waste system CAN process meat and dairy.' },
      { emoji: '🫙', title: 'Sauces & Condiments', body: 'Old or expired sauces, yoghurt, cream, butter, and other dairy products can go in food waste. Pour liquids into an absorbent material (kitchen paper) first.' },
      { emoji: '🍞', title: 'Baked Goods & Bread', body: 'Stale or mouldy bread, cakes, biscuits, and pastries all go in the food waste bin. Don\'t put these in your green compost bin as they attract pests.' },
      { emoji: '💡', title: 'Freezing vs Wasting', body: 'Most cooked leftovers can be frozen and reheated. Freezing leftovers reduces food waste and saves money — before binning food, consider freezing it first.', tip: 'Freeze first, waste less.' },
    ],
  },

  'what-belongs-in-food-waste-03': {
    id: 'what-belongs-in-food-waste-03', partTitle: 'Tea Bags & Coffee Grounds', chapterTitle: 'What Belongs in Food Waste',
    slides: [
      { emoji: '☕', title: 'Tea & Coffee Waste', body: 'Tea bags and coffee grounds are perfect for food waste bins and home composting. They are rich in nitrogen and break down quickly.' },
      { emoji: '⚠️', title: 'Check Your Tea Bags', body: 'Some tea bags contain a small amount of polypropylene plastic to seal them. These bags should go in food waste (council processing), NOT home composting.' },
      { emoji: '🌱', title: 'Plastic-Free Tea Bags', body: 'Many brands now offer plastic-free tea bags (Clipper, Pukka, Tea Pigs). These can go in both food waste and home composting. Check the packaging.' },
      { emoji: '☕', title: 'Coffee Grounds', body: 'Spent coffee grounds are entirely compostable and biodegradable. They are excellent for garden composting as they improve soil drainage and feed plants.' },
      { emoji: '💡', title: 'Coffee Grounds in the Garden', body: 'Sprinkle coffee grounds around plants — they deter slugs and snails, improve soil, and provide nitrogen. A dual-purpose use before composting!', tip: 'Coffee grounds = natural slug deterrent.' },
    ],
  },

  'why-food-waste-matters-01': {
    id: 'why-food-waste-matters-01', partTitle: 'Methane & Landfill', chapterTitle: 'Why Food Waste Matters',
    slides: [
      { emoji: '🌡️', title: 'Food Waste & Climate Change', body: 'When food rots in landfill without oxygen, it produces methane — a greenhouse gas 80 times more potent than CO₂ over a 20-year period.' },
      { emoji: '📊', title: 'The Scale of the Problem', body: 'In the UK, households throw away 9.5 million tonnes of food per year. This represents a third of all food purchased — and most of it ends up in landfill.' },
      { emoji: '🔥', title: 'Methane in Landfill', body: 'Landfill sites are the third largest source of methane in the UK. This methane contributes significantly to the acceleration of global warming.' },
      { emoji: '♻️', title: 'Why Food Waste Bins Help', body: 'Food collected in food waste bins is processed by anaerobic digestion (AD) — a controlled process that captures methane and converts it into renewable energy.' },
      { emoji: '💡', title: 'Your Impact', body: 'Using your food waste bin correctly instead of putting food in general waste can reduce your household\'s carbon footprint by hundreds of kilograms of CO₂ equivalent per year.', tip: 'Food waste bin = methane captured = renewable energy.' },
    ],
  },

  'why-food-waste-matters-02': {
    id: 'why-food-waste-matters-02', partTitle: 'Composting Process', chapterTitle: 'Why Food Waste Matters',
    slides: [
      { emoji: '🌱', title: 'How Composting Works', body: 'Composting is nature\'s way of recycling. Microorganisms break down organic material into a rich, dark substance called compost that improves soil quality.' },
      { emoji: '🔵', title: 'Anaerobic Digestion (AD)', body: 'Council food waste is often processed by AD: organic material is broken down by bacteria in sealed tanks without oxygen. This produces biogas (energy) and digestate (fertiliser).' },
      { emoji: '⚗️', title: 'In-Vessel Composting (IVC)', body: 'Some councils use IVC: food waste is shredded and placed in enclosed tunnels where temperature and airflow are controlled. This produces compost in 2–4 weeks.' },
      { emoji: '🌻', title: 'Home Composting', body: 'A home compost bin handles fruit and veg scraps, garden waste, tea bags, and cardboard. It produces free, rich compost for your garden in 3–6 months.' },
      { emoji: '💡', title: 'What You Get Back', body: 'Compost produced from food waste is used by farmers to improve soil. It replaces chemical fertilisers, completing the circular economy of food production.', tip: 'Food waste → compost → grows more food.' },
    ],
  },

  'why-food-waste-matters-03': {
    id: 'why-food-waste-matters-03', partTitle: 'Environmental Benefits', chapterTitle: 'Why Food Waste Matters',
    slides: [
      { emoji: '🌍', title: 'The Bigger Picture', body: 'Food production uses a third of the world\'s land surface, 70% of fresh water, and is responsible for 25% of global greenhouse gas emissions.' },
      { emoji: '💧', title: 'Water Footprint', body: 'Wasting food also wastes the water used to grow it. A single burger represents 2,400 litres of water. Reducing food waste conserves enormous amounts of water.' },
      { emoji: '🐝', title: 'Biodiversity Impact', body: 'Land used to grow wasted food could instead support biodiversity. Reducing food waste means less land is needed for agriculture, preserving wildlife habitats.' },
      { emoji: '💰', title: 'Economic Benefits', body: 'UK households waste £800 worth of food per year on average. Reducing food waste saves money while also reducing environmental impact — a win-win.' },
      { emoji: '💡', title: 'What You Can Do', body: 'Plan meals, use shopping lists, store food correctly, and use your food waste bin. These four habits can halve your household food waste within weeks.', tip: 'Plan → shop smart → store right → waste less.' },
    ],
  },

  'avoiding-food-waste-contamination-01': {
    id: 'avoiding-food-waste-contamination-01', partTitle: 'Keeping Food Out of Recycling', chapterTitle: 'Avoiding Food Waste Contamination',
    slides: [
      { emoji: '♻️', title: 'Why Separation Matters', body: 'Food waste in your recycling bin contaminates paper, cardboard, and other materials. Even a small amount of food residue can make an entire bin load unrecyclable.' },
      { emoji: '🧴', title: 'Rinse Before Recycling', body: 'The simplest way to prevent food contamination in recycling is to rinse containers before putting them in the bin. A quick cold rinse takes seconds.' },
      { emoji: '📦', title: 'Empty Completely', body: 'Always empty all food from containers before recycling. Tip out liquids, scrape out solid food, then rinse. Even a thin coating of sauce counts as contamination.' },
      { emoji: '🗑️', title: 'When to Use General Waste', body: 'If a container is very difficult to clean (like a jar with dried-on sauce), don\'t force it. Put it in general waste rather than contaminating your recycling.' },
      { emoji: '💡', title: 'Training the Habit', body: 'Set up your recycling bins near the sink so rinsing becomes automatic. A quick rinse before putting a container in the bin soon becomes second nature.', tip: 'Sink + bin nearby = easy rinse habit.' },
    ],
  },

  'avoiding-food-waste-contamination-02': {
    id: 'avoiding-food-waste-contamination-02', partTitle: 'Bagging Food Waste', chapterTitle: 'Avoiding Food Waste Contamination',
    slides: [
      { emoji: '🛍️', title: 'Caddy Liners: To Use or Not?', body: 'Many councils provide or sell caddy liners for food waste bins. These make the bin easier to clean and prevent odours. Check what type your council recommends.' },
      { emoji: '🌿', title: 'Compostable vs Biodegradable', body: 'Use compostable caddy liners (marked EN13432) — NOT regular plastic bags or "biodegradable" bags. Only certified compostable liners break down in the processing system.' },
      { emoji: '📰', title: 'Paper Alternatives', body: 'Line your indoor caddy with newspaper or paper bags. These are fully compostable and often work just as well as purpose-made liners — and they\'re free.' },
      { emoji: '❌', title: 'Never Use Plastic Bags', body: 'Never put food waste in standard plastic carrier bags or bin bags. Plastic does not break down and contaminates the entire composting or AD process.' },
      { emoji: '💡', title: 'Keeping the Caddy Clean', body: 'Rinse your indoor caddy weekly. A sprinkle of bicarbonate of soda in the bottom absorbs odours between cleans. This makes food waste management much more pleasant.', tip: 'Bicarb soda = cheap, effective odour control.' },
    ],
  },

  'avoiding-food-waste-contamination-03': {
    id: 'avoiding-food-waste-contamination-03', partTitle: 'Common Mistakes', chapterTitle: 'Avoiding Food Waste Contamination',
    slides: [
      { emoji: '⚠️', title: 'The Most Common Mistakes', body: 'Understanding the most common food waste mistakes helps you avoid them and ensures your food waste is actually composted rather than rejected.' },
      { emoji: '🧻', title: 'Mistake 1: Paper Towels', body: 'Plain paper kitchen towels CAN go in food waste. However, paper towels soaked in cleaning chemicals or bleach should go in general waste.' },
      { emoji: '🌸', title: 'Mistake 2: Cut Flowers', body: 'Fresh cut flowers and house plants (without soil) CAN go in food waste. They are organic matter and compost well. Avoid plastic ties and foam from bouquets.' },
      { emoji: '🐚', title: 'Mistake 3: Shells & Bones', body: 'Eggshells, shellfish shells, and cooked bones CAN go in food waste. They take longer to break down but the processing system handles them fine.' },
      { emoji: '💡', title: 'Mistake 4: Not Knowing Local Rules', body: 'Rules vary between councils. Some accept nappies in food waste; some don\'t accept meat. Always check your local council\'s accepted items list once a year.', tip: 'Your council website has the definitive list for your area.' },
    ],
  },

  // ─── COMMON CONTAMINANTS ─────────────────────────────────────────────────

  'coffee-cups-takeaway-packaging-01': {
    id: 'coffee-cups-takeaway-packaging-01', partTitle: 'Why Coffee Cups Aren\'t Recyclable', chapterTitle: 'Coffee Cups & Takeaway Packaging',
    slides: [
      { emoji: '☕', title: 'The Coffee Cup Problem', body: 'Billions of disposable coffee cups are used in the UK every year. Despite looking like paper, almost none can be recycled in standard facilities.' },
      { emoji: '🧪', title: 'The Hidden Plastic', body: 'Disposable cups have a polyethylene (PE) plastic lining heat-bonded to the paper. This lining is what makes the cup waterproof — and what makes it impossible to recycle normally.' },
      { emoji: '🏭', title: 'Why It\'s Hard to Process', body: 'Separating the plastic lining from the paper requires specialist equipment that only a handful of UK facilities have. Most recycling plants simply cannot do it.' },
      { emoji: '📊', title: 'The Numbers', body: 'The UK uses approximately 2.5 billion disposable coffee cups per year. Less than 1% are currently recycled. The rest go to landfill or incineration.' },
      { emoji: '💡', title: 'The Solution', body: 'The most effective solution is a reusable cup. Many cafés offer a discount for bringing your own. One reusable cup eliminates 500+ disposable cups over its lifetime.', tip: 'Ask for a discount — most coffee shops offer 10-25p off.' },
    ],
  },

  'coffee-cups-takeaway-packaging-02': {
    id: 'coffee-cups-takeaway-packaging-02', partTitle: 'Plastic-Lined Packaging', chapterTitle: 'Coffee Cups & Takeaway Packaging',
    slides: [
      { emoji: '📦', title: 'Plastic-Lined Packaging Everywhere', body: 'Plastic linings are found in many types of food packaging: crisp packets, microwave meal bags, some milk cartons, and juice boxes all have plastic layers.' },
      { emoji: '🍟', title: 'Fast Food Containers', body: 'Many takeaway containers (burger boxes, chip bags) are coated or lined with grease-resistant plastic. These cannot be recycled kerbside and must go in general waste.' },
      { emoji: '🥛', title: 'Milk Cartons', body: 'Standard milk cartons (like 1L or 2L Tetra Pak-style) are lined with plastic and aluminium. Many councils accept them but check locally — not all do.' },
      { emoji: '✅', title: 'What You CAN Do', body: 'Separate what you can: plastic lids from cups, cardboard from packaging. Even if the main item can\'t be recycled, separating parts sometimes allows partial recycling.' },
      { emoji: '💡', title: 'Shop Smarter', body: 'Choose products with minimal packaging. Loose fruit and vegetables, products in glass or unlined cardboard, and items with recycling labels are better choices.', tip: 'The less packaging, the better — always.' },
    ],
  },

  'coffee-cups-takeaway-packaging-03': {
    id: 'coffee-cups-takeaway-packaging-03', partTitle: 'Correct Disposal', chapterTitle: 'Coffee Cups & Takeaway Packaging',
    slides: [
      { emoji: '🗑️', title: 'Where Does It All Go?', body: 'When you can\'t recycle something, there are responsible ways to dispose of it — and irresponsible ones. Getting this right still matters for the environment.' },
      { emoji: '♻️', title: 'In-Store Collection', body: 'Many coffee chains and fast food restaurants have their own collection schemes. Cups, trays, and packaging collected here go to specialist recyclers, not landfill.' },
      { emoji: '🏪', title: 'Supermarket Take-Backs', body: 'Some supermarkets now operate take-back schemes for hard-to-recycle items: flexible plastics, crisp packets, and coffee pods. Look for collection points near the entrance.' },
      { emoji: '🚫', title: 'Never Litter', body: 'Littering creates microplastic pollution, harms wildlife, and costs councils millions to clean up. Even non-recyclable items must always be disposed of in a bin.' },
      { emoji: '💡', title: 'HWRC as Last Resort', body: 'Household Waste Recycling Centres accept almost everything including non-recyclable packaging. Use them for items your kerbside collection won\'t take.', tip: 'Find your nearest HWRC at gov.uk/recycling-collections.' },
    ],
  },

  'greasy-food-soiled-items-01': {
    id: 'greasy-food-soiled-items-01', partTitle: 'Pizza Boxes', chapterTitle: 'Greasy & Food-Soiled Items',
    slides: [
      { emoji: '🍕', title: 'Pizza Box Rules Revisited', body: 'Pizza boxes are the most frequently asked-about recycling item. The key rule: the box is cardboard, and cardboard is recyclable — unless it\'s been contaminated with grease.' },
      { emoji: '🔬', title: 'Why Grease Is a Problem', body: 'Oil and grease from food contaminate the paper fibres during the pulping process, making them unable to bind together properly. This reduces the quality of recycled paper.' },
      { emoji: '✂️', title: 'Split the Box', body: 'The lid of a pizza box is usually clean. Tear it off and recycle it. The greasy base can go in your food waste bin or general waste.' },
      { emoji: '✅', title: 'Lightly Greasy = OK', body: 'A pizza box with only a small grease stain IS still recyclable. Heavily greasy, cheesy bases are the problem. Use your judgement — if it\'s mostly clean, recycle it.' },
      { emoji: '💡', title: 'Line Your Box', body: 'Placing a sheet of baking paper in the pizza box before the pizza arrives keeps the box clean. This simple hack makes the entire box recyclable.', tip: 'Baking paper in the box = clean box = recyclable.' },
    ],
  },

  'greasy-food-soiled-items-02': {
    id: 'greasy-food-soiled-items-02', partTitle: 'Greasy Paper', chapterTitle: 'Greasy & Food-Soiled Items',
    slides: [
      { emoji: '🧻', title: 'When Paper Gets Greasy', body: 'Paper bags, paper plates, and wrappers used for greasy food (chips, pastries, fried chicken) absorb oil and become non-recyclable through paper processing.' },
      { emoji: '🥐', title: 'Bakery Bags & Wrappers', body: 'Paper bags from bakeries and chip shops are often grease-lined or have absorbed oils. These cannot be recycled but CAN be composted — they break down quickly.' },
      { emoji: '🍟', title: 'Paper Napkins', body: 'Paper napkins and kitchen roll used for cleaning up food are NOT recyclable (the fibres are too short and they\'re often contaminated). Put them in food waste or compost.' },
      { emoji: '🌱', title: 'Composting Greasy Paper', body: 'Lightly greasy paper is actually excellent for composting. The grease adds carbon, and the paper provides structure. Tear it up before adding to your compost bin.' },
      { emoji: '💡', title: 'Reusable Alternatives', body: 'Use cloth napkins, beeswax wraps, and reusable kitchen towels instead of disposable paper. This eliminates the paper waste problem altogether.', tip: 'Cloth napkins last years and reduce waste to zero.' },
    ],
  },

  'greasy-food-soiled-items-03': {
    id: 'greasy-food-soiled-items-03', partTitle: 'Food Residue', chapterTitle: 'Greasy & Food-Soiled Items',
    slides: [
      { emoji: '🍔', title: 'Understanding Food Residue', body: 'Food residue on packaging — sauces, dairy, oil, and solid food — is the main cause of recycling contamination. It is almost entirely preventable.' },
      { emoji: '📊', title: 'Impact of Contamination', body: 'A contaminated recycling bin doesn\'t just ruin that one item — it can contaminate other items in the batch. One greasy item can affect a whole lorry load.' },
      { emoji: '⏱️', title: 'The 5-Second Rinse', body: 'Most food residue can be removed with a 5-second cold water rinse. This tiny action prevents your container from contaminating the whole batch.' },
      { emoji: '🍯', title: 'Stubborn Residue', body: 'Honey jars, peanut butter pots, and sauces with thick residue: fill with warm water, shake, pour out, then rinse. This usually removes enough to make recycling acceptable.' },
      { emoji: '💡', title: 'Lick It First', body: 'Scraping out yoghurt pots, licking out honey jars, and wiping out sauce containers with bread reduces waste AND makes rinsing much easier. Win-win.', tip: 'Scraped clean = easier to rinse = better for recycling.' },
    ],
  },

  'problem-plastics-01': {
    id: 'problem-plastics-01', partTitle: 'Plastic Bags', chapterTitle: 'Problem Plastics',
    slides: [
      { emoji: '🛍️', title: 'Why Plastic Bags Are a Problem', body: 'Carrier bags and plastic bags CANNOT go in your household recycling bin. They wrap around sorting machinery, causing breakdowns and costly repairs.' },
      { emoji: '🏪', title: 'Supermarket Drop-Offs', body: 'All major UK supermarkets now have soft plastic collection points. Bring clean, dry carrier bags, bread bags, and zip-lock bags for recycling here.' },
      { emoji: '✅', title: 'What Can Be Dropped Off', body: 'At supermarket soft plastic points: carrier bags, bread and cereal bags, pasta and rice bags, fresh produce bags, zip-lock bags, and bubble wrap.' },
      { emoji: '🌍', title: 'The Environmental Impact', body: 'Plastic bags that escape recycling end up in oceans and waterways. Marine animals mistake them for food, and they break into microplastics that enter the food chain.' },
      { emoji: '💡', title: 'Bags For Life', body: 'A single cotton or jute bag used 50+ times is more environmentally friendly than single-use bags. Keep bags near your door or in your car so you always have one.', tip: 'Jute or canvas bag = best long-term choice.' },
    ],
  },

  'problem-plastics-02': {
    id: 'problem-plastics-02', partTitle: 'Film & Wrap', chapterTitle: 'Problem Plastics',
    slides: [
      { emoji: '🎁', title: 'Plastic Film & Cling Wrap', body: 'Plastic cling film, stretch wrap, and plastic film covers on food trays are all soft plastics that cannot go in your household recycling bin.' },
      { emoji: '🧻', title: 'Cling Film Specifically', body: 'Standard cling film (PVC or PE) is generally not recyclable kerbside and should go in general waste. Some councils have started accepting it — check locally.' },
      { emoji: '🍱', title: 'Tray Film Lids', body: 'Plastic film lids on ready meal trays: the tray is often recyclable (if clean) but the film lid usually is not. Peel off the film for general waste, recycle the tray.' },
      { emoji: '🌿', title: 'Compostable Alternatives', body: 'Certified compostable cling film alternatives exist (made from plant starch). Beeswax wraps, silicone lids, and reusable containers eliminate the need entirely.' },
      { emoji: '💡', title: 'The Scrunch Test', body: 'Scrunch film plastic in your hand. If it holds its shape, take it to a soft plastic drop-off. If it\'s too thin or tears, it goes in general waste.', tip: 'Visit recyclenow.com to find local film plastic drop-offs.' },
    ],
  },

  'problem-plastics-03': {
    id: 'problem-plastics-03', partTitle: 'Black Plastic', chapterTitle: 'Problem Plastics',
    slides: [
      { emoji: '🖤', title: 'Black Plastic: The Full Story', body: 'Black plastic is one of the most problematic materials in the recycling stream. It is common, widely used, and almost impossible to sort with standard equipment.' },
      { emoji: '🔍', title: 'Why Sorting Fails', body: 'Recycling facilities use Near Infrared (NIR) technology to identify plastic types. Black plastic absorbs NIR light instead of reflecting it, rendering it invisible to scanners.' },
      { emoji: '🚫', title: 'Where It Ends Up', body: 'Despite being put in recycling bins, most black plastic ends up in landfill or incineration because it can\'t be sorted. It is a major source of avoidable plastic waste.' },
      { emoji: '✅', title: 'New Detectable Black Plastic', body: 'Some manufacturers now use "detectable black plastic" that reflects NIR. This is labelled as recyclable. Always check the recycling symbol on black plastic packaging.' },
      { emoji: '💡', title: 'Consumer Choice Matters', body: 'Choosing products NOT packaged in black plastic sends a market signal. Supermarkets have switched packaging due to consumer pressure — your choice has impact.', tip: 'Choose clear, white, or coloured trays over black ones.' },
    ],
  },

  // ─── LOCAL RULES ─────────────────────────────────────────────────────────

  'bin-colours-meanings-01': {
    id: 'bin-colours-meanings-01', partTitle: 'Recycling Bin', chapterTitle: 'Bin Colours & Meanings',
    slides: [
      { emoji: '♻️', title: 'The Recycling Bin (Usually Blue)', body: 'In most UK areas, the recycling bin is blue (though colours vary). This bin is for dry mixed recyclables: paper, cardboard, plastics, glass, and metals.' },
      { emoji: '✅', title: 'What Goes In', body: 'Paper, cardboard, plastic bottles and containers, glass bottles and jars, metal tins and cans, and aluminium foil (clean) all go in the recycling bin.' },
      { emoji: '❌', title: 'What Stays Out', body: 'Food waste, nappies, textiles, general rubbish, black plastic, soft plastics, and broken glass should NOT go in the recycling bin.' },
      { emoji: '🔵', title: 'Some Areas Have Split Bins', body: 'Some councils provide separate bins for paper and card vs. glass and metal. Always check your local council\'s guidance as arrangements vary significantly.' },
      { emoji: '💡', title: 'Keep It Dry', body: 'Always ensure your recycling bin lid is closed. Wet paper and cardboard cannot be recycled. A well-fitted bin lid is essential for maintaining recyclable quality.', tip: 'Dry = recyclable. Wet = usually not.' },
    ],
  },

  'bin-colours-meanings-02': {
    id: 'bin-colours-meanings-02', partTitle: 'General Waste Bin', chapterTitle: 'Bin Colours & Meanings',
    slides: [
      { emoji: '🗑️', title: 'The General Waste Bin (Usually Black/Grey)', body: 'The general waste bin is for residual waste that cannot be recycled. It should always be the bin you use least if you are recycling and composting effectively.' },
      { emoji: '✅', title: 'What Goes In', body: 'Non-recyclable plastics (soft film, black plastic), soiled packaging, nappies and hygiene products, broken items, and items not accepted locally.' },
      { emoji: '📊', title: 'How Much Should Be In It?', body: 'If you are recycling and composting properly, your general waste bin should only need collecting every two weeks. Reducing this further is the ultimate goal.' },
      { emoji: '🚫', title: 'What Should Never Go In', body: 'Batteries (fire hazard), electrical items (e-waste), chemicals, and medical waste should NEVER go in your general waste bin. Use specialist disposal routes.' },
      { emoji: '💡', title: 'Battery Safety', body: 'Batteries in general waste bins cause thousands of bin lorry fires every year in the UK. Take batteries to supermarket collection points — they\'re near every checkout.', tip: 'Battery fires are a real and serious hazard. Always recycle them.' },
    ],
  },

  'bin-colours-meanings-03': {
    id: 'bin-colours-meanings-03', partTitle: 'Food Waste Bin', chapterTitle: 'Bin Colours & Meanings',
    slides: [
      { emoji: '🥦', title: 'The Food Waste Bin (Usually Brown/Green)', body: 'The food waste bin is for all food scraps and organic waste. It is one of the most impactful bins in terms of reducing your environmental footprint.' },
      { emoji: '✅', title: 'What Goes In', body: 'All food waste: fruit and veg scraps, cooked and raw meat and fish, dairy, bread, teabags, coffee grounds, and eggshells.' },
      { emoji: '🛍️', title: 'Liners', body: 'Use compostable caddy liners (marked EN13432) or newspaper to line your indoor caddy. NEVER use standard plastic bags — they contaminate the entire food waste batch.' },
      { emoji: '🌡️', title: 'Managing Odours', body: 'Food waste can smell, especially in warm weather. Use a small indoor caddy with a lid for daily collections, and empty it into the outdoor bin every 1–2 days.' },
      { emoji: '💡', title: 'Clean Your Caddy', body: 'Rinse your indoor caddy weekly with hot soapy water. A sprinkle of bicarbonate of soda or a few drops of tea tree oil keeps odours at bay between cleans.', tip: 'Small caddy + daily emptying = no smell problem.' },
    ],
  },

  'accepted-items-by-postcode-01': {
    id: 'accepted-items-by-postcode-01', partTitle: 'What Your Area Accepts', chapterTitle: 'Accepted Items by Postcode',
    slides: [
      { emoji: '✅', title: 'Why Rules Vary By Area', body: 'Recycling rules vary across the UK because different councils have contracts with different recycling facilities. What one council accepts, another might not.' },
      { emoji: '🔍', title: 'How to Find Your Rules', body: 'Visit your local council website and search for "what can I recycle". Enter your postcode on Recycling Locator tools for personalised guidance.' },
      { emoji: '📱', title: 'Useful Apps & Websites', body: 'RecycleNow.com lets you search any item to find if it\'s recyclable in your area. The Recycle Coach app sends reminders and has a searchable database.' },
      { emoji: '📦', title: 'Common Accepted Items', body: 'Most UK councils accept: plastic bottles, cardboard, paper, glass bottles, metal cans, and food tins. Beyond this, acceptance varies significantly by area.' },
      { emoji: '💡', title: 'When In Doubt, Leave It Out', body: 'If you\'re unsure whether an item is accepted, put it in general waste rather than risk contaminating your recycling. Wishcycling does more harm than good.', tip: '"Wishcycling" = hoping something is recyclable. It often isn\'t.' },
    ],
  },

  'accepted-items-by-postcode-02': {
    id: 'accepted-items-by-postcode-02', partTitle: 'What Your Area Rejects', chapterTitle: 'Accepted Items by Postcode',
    slides: [
      { emoji: '❌', title: 'Universal Rejects', body: 'Some items are rejected by virtually all UK kerbside collection services regardless of location. Knowing these prevents wishcycling.' },
      { emoji: '🚫', title: 'Always Rejected Kerbside', body: 'Soft plastics, black plastic, Styrofoam, cling film, nappies, medical waste, electrical items, and textiles are universally rejected from kerbside recycling.' },
      { emoji: '⚠️', title: 'Hazardous Items', body: 'Batteries, chemicals, paint, motor oil, and electrical items require specialist disposal. Never put these in any household bin — they cause fires and environmental damage.' },
      { emoji: '🏪', title: 'Alternative Drop-Off Points', body: 'Many rejected items CAN be recycled elsewhere: textiles at charity shops, batteries at supermarkets, electricals at HWRC or retailers, and chemicals at council sites.' },
      { emoji: '💡', title: 'Check Before You Buy', body: 'Before purchasing products, check if the packaging is recyclable in your area. Choosing products with better packaging is the most powerful consumer action.', tip: 'Check packaging BEFORE buying, not after.' },
    ],
  },

  'accepted-items-by-postcode-03': {
    id: 'accepted-items-by-postcode-03', partTitle: 'Seasonal Changes', chapterTitle: 'Accepted Items by Postcode',
    slides: [
      { emoji: '📅', title: 'Why Recycling Rules Change', body: 'Recycling guidance and collection rules change as technology improves, new markets develop, and councils update their contracts. Staying informed matters.' },
      { emoji: '🎄', title: 'Christmas & Seasonal Changes', body: 'Many items are particularly relevant seasonally: Christmas wrapping paper (check if foil), advent calendar packaging, easter egg boxes, and gift packaging.' },
      { emoji: '🎁', title: 'Christmas Wrapping Paper', body: 'Plain paper wrapping paper IS recyclable. Foil, glitter, or plastic-coated paper is NOT. Do the scrunch test: if it holds its shape, it can\'t be recycled.' },
      { emoji: '📰', title: 'Stay Updated', body: 'Sign up for your council\'s newsletter or follow them on social media. Recycling rules can change with little public announcement.' },
      { emoji: '💡', title: 'Annual Check', body: 'Do a quick check of your local council\'s recycling rules once a year. Set a reminder on your phone — 10 minutes of reading could significantly improve your recycling accuracy.', tip: 'Annual recycling check = always up to date.' },
    ],
  },

  'collection-service-updates-01': {
    id: 'collection-service-updates-01', partTitle: 'Collection Days', chapterTitle: 'Collection & Service Updates',
    slides: [
      { emoji: '📅', title: 'Know Your Collection Schedule', body: 'UK councils typically collect recycling, general waste, and food waste on a weekly or fortnightly rotation. Knowing your schedule ensures bins are out on time.' },
      { emoji: '📱', title: 'Apps & Reminders', body: 'Most councils have apps or online tools where you can enter your postcode to see upcoming collection dates and set reminder notifications.' },
      { emoji: '🌙', title: 'When to Put Bins Out', body: 'Bins should be placed at the edge of your property by 7am on collection day. Many councils collect early — if your bin isn\'t out, it won\'t be collected.' },
      { emoji: '🌧️', title: 'Bin Collection in Bad Weather', body: 'Collections rarely stop for rain, but may be suspended for snow and ice. Check your council\'s website or Twitter for weather-related service updates.' },
      { emoji: '💡', title: 'Bank Holidays', body: 'Bank holidays typically shift collections by one day. Check your council website before each bank holiday to confirm whether your collection has moved.', tip: 'Council website = most reliable source for schedule changes.' },
    ],
  },

  'collection-service-updates-02': {
    id: 'collection-service-updates-02', partTitle: 'Missed Collections', chapterTitle: 'Collection & Service Updates',
    slides: [
      { emoji: '🚛', title: 'What To Do If Missed', body: 'If your bin was out on time and wasn\'t collected, report it to your council. Most councils aim to collect missed bins within 3 working days when reported.' },
      { emoji: '📞', title: 'How to Report', body: 'Report missed collections via your council website, app, or phone. Have your address ready. Most councils have an online form that takes under 2 minutes.' },
      { emoji: '⏰', title: 'Was the Bin Out in Time?', body: 'Before reporting, check your collection times. Bins must usually be out by 7am. If the bin was put out after the lorry passed, that\'s not a missed collection.' },
      { emoji: '❌', title: 'When Bins Get Left', body: 'Bins can be deliberately left if: they contain the wrong items (contamination), they\'re overloaded, or lids can\'t close. A sticker is usually left to explain why.' },
      { emoji: '💡', title: 'Overloaded Bins', body: 'If your bin is regularly overflowing, contact your council about additional capacity. Many councils provide extra sacks, larger bins, or more frequent collections.', tip: 'Recycling more = less general waste overflow.' },
    ],
  },

  'collection-service-updates-03': {
    id: 'collection-service-updates-03', partTitle: 'Service Disruptions', chapterTitle: 'Collection & Service Updates',
    slides: [
      { emoji: '⚠️', title: 'Common Service Disruptions', body: 'Collection services can be disrupted by severe weather, industrial action, vehicle breakdowns, and public holidays. Knowing how to respond reduces frustration.' },
      { emoji: '❄️', title: 'Winter Weather Disruptions', body: 'Snow and ice can prevent lorries accessing streets safely. When this happens, councils aim to catch up within 1–2 weeks. Don\'t leave bins out for days.' },
      { emoji: '📢', title: 'Industrial Action', body: 'During strikes, councils usually prioritise general waste and food waste collection over recycling. Watch for council announcements about priority services.' },
      { emoji: '📱', title: 'Staying Informed', body: 'Follow your council on Twitter/X for real-time updates. Sign up for email alerts. Check the council website before reporting issues — they may already know.' },
      { emoji: '💡', title: 'Storing Excess Recycling', body: 'During disruptions, store excess recycling in boxes or bags in a garage or shed rather than piling bags next to the bin. This keeps your area tidy and prevents litter.', tip: 'Keep spare boxes for disruption periods.' },
    ],
  },
};

export function getLesson(id: string): LessonPart | null {
  return LESSONS[id] ?? null;
}

export function getLessonIds(): string[] {
  return Object.keys(LESSONS);
}

export default LESSONS;