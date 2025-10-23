import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Quartz from "../assets/images/learnpage/quartz-learn.jpg";
import Mechanical from "../assets/images/learnpage/mechanical-learn.jpg";
import Tourbillon from "../assets/images/learnpage/tourbillon-learn.jpg";
import Chronograph from "../assets/images/learnpage/chronograph-learn.jpg";
import Perpetual from "../assets/images/learnpage/perpetual-learn.jpg";
import Cleaning from "../assets/images/learnpage/cleaning-learn.jpg";
import Storage from "../assets/images/learnpage/storage-learn.jpg";
import Automatic from "../assets/images/learnpage/automatic-learn.jpg";
import Replica from "../assets/images/learnpage/replica-learn.jpeg";
import WaterResistance from "../assets/images/learnpage/waterresistance-learn.jpg";

// Data (includes Mechanical Movement)
const learnItems = [
  {
    title: "Quartz Movement",
    img: Quartz,
    summary:
      "A quartz movement is an electronic mechanism powered by a battery and kept precise by a vibrating quartz crystal.",
    details: `
What It Is
Quartz watches use modern electronic components to keep perfect time. A small battery sends electricity through a quartz crystal, causing it to vibrate at a consistent rate. These vibrations move a small motor that turns the hands smoothly and accurately.

Why It Matters
Quartz watches are reliable, low-maintenance, and highly accurate. They’re also affordable, making them ideal for everyday wear without sacrificing precision.

How to Care for It
- Replace the battery every 1–2 years.
- Avoid exposing it to extreme temperatures or magnetic devices.
- Clean with a soft cloth regularly to maintain shine and clarity.
    `,
  },
  {
    title: "Automatic Movement",
    img: Automatic,
    summary:
      "Automatic watches wind themselves through your wrist’s natural motion, combining art and engineering.",
    details: `
What It Is
An automatic (or self-winding) movement is fully mechanical. Inside the case, a small rotor spins as you move, automatically winding the mainspring to store energy.

Why It Matters
It’s the perfect blend of tradition and convenience — no battery required, just motion. Many collectors love automatics for their craftsmanship and the graceful sweep of their second hand.

How to Care for It
- Wear it regularly or keep it in a watch winder.
- Avoid shocks and magnetic fields.
- If it stops after being unused, manually wind it about 30–40 turns.
    `,
  },
  {
    title: "Mechanical Movement",
    img: Mechanical,
    summary:
      "A mechanical movement is driven by a mainspring and crafted with gears, escapement, and skill — available in manual and automatic varieties.",
    details: `
What It Is
Mechanical watches are powered by a wound mainspring which releases energy through a regulated escapement and gear train. There are two main types:
- Manual (hand-wound): requires winding by the crown.
- Automatic (self-winding): uses a rotor to wind the mainspring via wrist motion.

Why It Matters
Mechanical movements are prized for craftsmanship, heritage, and the smooth sweep of the second hand. They showcase traditional watchmaking and can last for generations with proper care.

How to Care for It
- Service mechanical watches every 3–5 years.
- Keep them away from strong magnets and heavy shocks.
- If manual, wind gently and consistently; if automatic and not worn regularly, use a winder or manually wind before wear.
    `,
  },
  {
    title: "Tourbillon Complication",
    img: Tourbillon,
    summary:
      "A tourbillon is a rotating mechanical feature that fights gravity to keep time as accurate as possible.",
    details: `
What It Is
Invented by master watchmaker Abraham-Louis Breguet, the tourbillon places a watch’s balance wheel inside a rotating cage. This constant motion helps reduce tiny errors caused by gravity when the watch is in different positions.

Why It Matters
Tourbillons represent the height of watchmaking skill. They’re rare, visually stunning, and often found in luxury or collector-grade watches.

How to Care for It
- Handle it gently — tourbillons are delicate.
- Service it every 3–5 years.
- Avoid exposing it to impact or moisture.
    `,
  },
  {
    title: "Chronograph Function",
    img: Chronograph,
    summary:
      "A chronograph combines a watch and a stopwatch — perfect for timing events with precision.",
    details: `
What It Is
Chronographs feature buttons (called pushers) that start, stop, and reset a timing hand. Some can track minutes, hours, or even speed.

Why It Matters
They add a sporty look and serve practical uses — timing workouts, cooking, or even short journeys.

How to Use It
- Press the top button to start and stop timing.
- Press the bottom button to reset.
- Avoid using the chronograph underwater unless your watch is built for diving.
    `,
  },
  {
    title: "Perpetual Calendar",
    img: Perpetual,
    summary:
      "A perpetual calendar automatically keeps track of the date, month, and leap years — no manual correction needed.",
    details: `
What It Is
This advanced mechanism knows which months have 30 or 31 days and even adjusts for February in leap years.

Why It Matters
It’s a symbol of both intelligence and craftsmanship — keeping perfect time until the year 2100.

How to Care for It
- Have it serviced every few years by a professional.
- Avoid dropping or shaking it.
- Let experts handle time or date adjustments.
    `,
  },
  {
    title: "Water Resistance Ratings Explained",
    img: WaterResistance,
    summary:
      "Understanding water resistance helps you protect your watch from unwanted damage and costly repairs.",
    details: `
What It Is
Water resistance indicates how much moisture or pressure your watch can handle. It’s usually measured in ATM (atmospheres) or meters.

Common Ratings
- 3 ATM / 30m: Splash resistant (hand washing, rain).  
- 5 ATM / 50m: Suitable for showers or short swims.  
- 10 ATM / 100m: Ideal for swimming and snorkeling.  
- 20 ATM / 200m+ : Safe for diving and underwater activities.

Care Tips
Even if your watch is rated for water, avoid hot showers and steam, as heat can damage seals. Always make sure the crown is pushed or screwed in before getting it wet.
    `,
  },
  {
    title: "Why Replica Watches Exist",
    img: Replica,
    summary:
      "High-quality replicas make luxury design accessible to more people — but quality matters greatly.",
    details: `
Why They Exist
Not everyone can afford an original Rolex, Audemars Piguet, or Patek Philippe — but many people admire their design and craftsmanship. Quality replicas allow more people to enjoy similar aesthetics and mechanical performance at a fair price.

The Difference Between Bad and Good Replicas
- Low-end replicas: Cheaply made, inaccurate, and easily damaged.  
- High-quality replicas: Use solid materials, reliable movements, and look close to the originals.

How to Choose a Good Replica
- Buy from trusted sellers with transparency.  
- Check reviews, build quality, and weight.  
- Avoid ultra-cheap watches — if it looks too good to be true, it likely is.

At Kedar Watches, we focus on high-grade replicas built to last, giving you style, confidence, and precision without the luxury price tag.
    `,
  },
  {
    title: "Watch Care & Maintenance",
    img: Cleaning,
    summary:
      "Proper cleaning and regular maintenance keep your watch accurate, stylish, and long-lasting.",
    details: `
Cleaning Routine
Wipe your watch weekly with a microfiber cloth. For metal bands, use warm water with mild soap and a soft brush. Dry completely after cleaning.

Maintenance Tips
- Avoid moisture unless your watch is water-resistant.  
- Service mechanical watches every 3–5 years.  
- Change quartz batteries every 5–7 years.  
- Keep leather straps away from sweat and perfume.
    `,
  },
  {
    title: "Storage & Protection",
    img: Storage,
    summary:
      "How you store your watch can determine how well it ages over the years.",
    details: `
Proper Storage
Keep your watches in a cool, dry, and dark environment. Use a watch box lined with soft materials to prevent scratches.

Extra Tips
- Use a watch winder for automatics.  
- Keep away from magnets and humidity.  
- Rotate your watches occasionally to keep them active.  
- Keep original boxes for resale value or long-term storage.
    `,
  },
];

const Learn = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedItem(null);
      }
    };
    if (selectedItem) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
      {/* Header */}
      <section className="text-center py-20 px-6 md:px-20 bg-brand-light dark:bg-brand-lightdark transition-colors duration-300">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6"
        >
          Discover the World of Watches
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
        >
          Dive deep into horology — learn about precision movements, heritage craftsmanship,
          and expert care that make every timepiece a work of art.
        </motion.p>
      </section>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-28 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {learnItems.map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-brand-lightdark  rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
                {item.summary}
              </p>
              <button
                onClick={() => setSelectedItem(item)}
                className="mt-3 inline-block text-sm bg-brand-gold text-white rounded-md hover:bg-brand-darkgold transition px-5 py-2 duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div
                ref={modalRef}
                className="relative bg-white dark:bg-[#1d1d1d] text-gray-900 dark:text-gray-100 rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-serif">
                    {selectedItem.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {selectedItem.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Learn;
