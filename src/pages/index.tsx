import { useState, useRef, useEffect } from "react";
import MapComponent from "@/components/MapComponent";
import Image from "next/legacy/image";
import { motion } from "framer-motion";

// تعریف نوع دسته‌بندی‌ها
type CategoryKey =
  | "demi-box"
  | "coffee"
  | "cold-brew"
  | "mocktail"
  | "hot-drinks"
  | "smoothie"
  | "shake"
  | "breakfast"
  | "lunch-snack";

// تعریف دسته‌بندی‌ها
const categories = [
  { id: "demi-box", name: "باکس دمی", icon: "/icons/demi-box.png" },
  { id: "coffee", name: "قهوه", icon: "/icons/coffee.png" },
  { id: "cold-brew", name: "سرد دم", icon: "/icons/cold-brew.png" },
  { id: "mocktail", name: "ماکتیل", icon: "/icons/mocktail.png" },
  { id: "hot-drinks", name: "گرم نوش", icon: "/icons/hot-drinks.png" },
  { id: "smoothie", name: "اسموتی", icon: "/icons/smoothie.png" },
  { id: "shake", name: "شیک", icon: "/icons/shake.png" },
  { id: "breakfast", name: "صبحانه", icon: "/icons/breakfast.png" },
  { id: "lunch-snack", name: "ناهار و عصرانه", icon: "/icons/lunch-snack.png" },
];


// تعریف آیتم‌های هر دسته‌بندی
const items: Record<
  CategoryKey,
  { id: number; name: string; price: number }[]
> = {
  "demi-box": [
    { id: 1, name: "دمی گرم", price: 78000, },
    { id: 2, name: "دمی با شیر", price: 115000 },
    { id: 3, name: "آیس دمی با شیر", price: 102000 },
  ],
  coffee: [
    { id: 4, name: "اسپرسو", price: 80000 },
    { id: 8, name: "آمریکانو", price: 87000 },
    { id: 12, name: "لاته", price: 119000 },
  ],
  "cold-brew": [
    { id: 15, name: "کلاسیک", price: 115000 },
    { id: 16, name: "بلک برو", price: 88000 },
    { id: 17, name: "کلدلمبو", price: 109000 },
    { id: 18, name: "آدامس", price: 125000 },
    { id: 19, name: "مرداب", price: 135000 },
    { id: 20, name: "انبه آلوورا", price: 120000 },
  ],
  mocktail: [
    { id: 21, name: "دریا", price: 107000 },
    { id: 22, name: "انبا", price: 137000 },
    { id: 23, name: "سینامون گرپس", price: 115000 },
    { id: 25, name: "لیموناد", price: 87000 },
    { id: 26, name: "موهیتو", price: 97000 },
    { id: 27, name: "ویمتو", price: 78000 },
    { id: 28, name: "آب پرتغال", price: 135000 },
    { id: 29, name: "آب انار", price: 170000 },
  ],
  "hot-drinks": [
    { id: 30, name: "هات چاکلت", price: 117000 },
    { id: 31, name: "وایت چاکلت", price: 98000 },
    { id: 32, name: "چای کرک", price: 117000 },
    { id: 33, name: "چای ماسالا", price: 117000 },
    { id: 34, name: "انبه ماچا", price: 160000 },
    { id: 35, name: "میلک نوتلا", price: 160000 },
  ],
  smoothie: [
    { id: 36, name: "چری بری", price: 156000 },
    { id: 37, name: "انبه آناناس", price: 160000 },
    { id: 38, name: "بنانا فرنگی", price: 166000 },
  ],
  shake: [
    { id: 39, name: "نسکافه", price: 145000 },
    { id: 40, name: "کوکی", price: 140000 },
    { id: 41, name: "لوتوس", price: 168000 },
    { id: 42, name: "نوتلا", price: 165000 },
    { id: 43, name: "موز شکلات", price: 160000 },
    { id: 44, name: "توت فرنگی", price: 160000 },
  ],
  breakfast: [
    { id: 45, name: "نیمرو کلاسیک", price: 156000 },
    { id: 46, name: "املت بی بی", price: 183000 },
    { id: 47, name: "کاسادیاس", price: 312000 },
    { id: 48, name: "پرشین دیش", price: 174000 },
    { id: 49, name: "بورک پنیر", price: 260000 },
    { id: 50, name: "دیش کمل", price: 206000 },
    { id: 51, name: "فرنچ تست", price: 341000 },
  ],
  "lunch-snack": [
    { id: 52, name: "سالاد شاهتوت و پنیر دودی", price: 245000 },
    { id: 53, name: "پاستا کمل", price: 394000 },
    { id: 54, name: "ساندویچ پپرونی", price: 165000 },
    { id: 55, name: "سالاد فتوش", price: 365000 },
    { id: 56, name: "استیک مرغ", price: 326000 },
    { id: 57, name: "سالاد سوخاری", price: 375000 },
    { id: 58, name: "پاستا ناچو", price: 309000 },
    { id: 59, name: "دیپ سالسا", price: 221000 },
    { id: 60, name: "ساندویچ مرغ گریل", price: 189000 },
    { id: 61, name: "چیکن پن", price: 239000 },
  ],
};


export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const sectionsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const categoryButtonsRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const setSectionRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionsRefs.current[key] = el;
  };

  const setCategoryButtonRef = (key: string) => (el: HTMLButtonElement | null) => {
    categoryButtonsRefs.current[key] = el;
  };

  const handleScroll = () => {
    const sections = Object.keys(sectionsRefs.current);
    for (const id of sections) {
      const section = sectionsRefs.current[id];
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveCategory(id as CategoryKey);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // اسکرول کردن دسته‌بندی فعال به کادر
  useEffect(() => {
    if (activeCategory) {
      const button = categoryButtonsRefs.current[activeCategory];
      button?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  return (
    <div className="bg-[#d7c3a3] min-h-screen">
<div className="flex justify-between items-center p-4 bg-[#d7c3a3] " dir="ltr">
  {/* لوگو سمت چپ */}
  <div className="flex items-center">
    <Image
      src="/logo.png"
      alt="لوگوی کافه"
      width={70}
      height={70}
      className="object-contain"
    />
  </div>

  {/* متن CAMEL سمت راست */}
 <div
  className="text-[#5a3b24] font-bold text-4xl"
  style={{ fontFamily: "'Playfair Display', serif" }}
>
  CAMEL
</div>


</div>





{/* دسته‌بندی‌ها */}
<div
  className="sticky top-4 mx-4 bg-white/50 backdrop-blur-lg shadow-lg z-10 p-4 rounded-xl"
  style={{
    transition: "transform 0.3s ease-in-out",
  }}
>
<div className="flex overflow-x-auto gap-4 scrollbar-hide justify-start md:justify-center">
  {categories.map((category) => (
    <button
      key={category.id}
      ref={setCategoryButtonRef(category.id)}
      onClick={() =>
        sectionsRefs.current[category.id]?.scrollIntoView({ behavior: "smooth" })
      }
      className={`flex flex-col items-center justify-center p-2 rounded-lg ${
        activeCategory === category.id
          ? "bg-[#5a3b24] text-white"
          : "bg-transparent text-[#5a3b24]"
      } hover:bg-[#5a3b24] hover:text-white transition duration-300`}
    >
      {/* آیکون دسته‌بندی */}
      <div className="relative w-8 h-8">
        <Image
          src={category.icon}
          alt={category.name}
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <span className="text-sm font-bold mt-1 leading-none whitespace-nowrap">
        {category.name}
      </span>
    </button>
  ))}
</div>
</div>





      {/* آیتم‌ها */}
      <div>
  {categories.map((category) => (
    <div key={category.id} id={category.id} ref={setSectionRef(category.id)} className="p-4">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {(items[category.id as CategoryKey] || []).map((item) => (
         <motion.div
         key={item.id}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="bg-white/30 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
       >
         {/* تصویر آیتم */}
         <div className="relative w-full aspect-square">
           <Image
             src={`/images/${item.id}.jpg`} // مسیر تصاویر
             alt={item.name}
             layout="fill"
             objectFit="cover"
             className="rounded-t-xl"
           />
         </div>
         {/* اطلاعات آیتم */}
         <div className="p-4 text-right">
           <h3 className="text-lg font-bold text-[#5a3b24]">{item.name}</h3>
           <p className="text-sm font-bold text-[#5a3b24] mt-2">
             {item.price.toLocaleString()} تومان
           </p>
         </div>
       </motion.div>     
        ))}
      </div>
    </div>
  ))}
</div>

<footer className="bg-[#5a3b24] text-white py-10">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* بخش اطلاعات تماس */}
    <div>
      <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <i className="fas fa-map-marker-alt text-[#FFD700] mt-1"></i>
          <span>بندرعباس، خیابان دانشگاه، نبش کوچه 11</span>
        </li>
        <li className="flex items-start gap-3">
          <i className="fas fa-phone text-[#FFD700] mt-1"></i>
          <a
            href="tel:09140825399"
            className="hover:underline hover:text-[#FFD700] transition-colors"
          >
            09140825399
          </a>
        </li>
        <li className="flex items-start gap-3">
          <i className="fas fa-clock text-[#FFD700] mt-1"></i>
          <span>ساعت کاری: 8 صبح - 12 شب</span>
        </li>
      </ul>
    </div>

    {/* بخش شبکه‌های اجتماعی */}
    <div className="text">
      <h3 className="text-xl font-bold mb-4">ما را دنبال کنید</h3>
      <ul className="flex justify gap-6">
        <li>
          <a
            href="https://instagram.com/camellcafe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-[#FFD700] transition-colors"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    </div>

    {/* نقشه */}
  <div>
            <h3 className="text-xl font-bold mb-4">موقعیت مکانی</h3>
            <MapComponent />
          </div>
  </div>

  {/* طراحی شده توسط */}
  <div className="text-center mt-8 border-t border-[#FFD700] pt-4">
    <p
      className="text-sm text-[#e0e0dc]"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: "12px",
        fontWeight: 400,
      }}
    >
      Designed by{" "}
      <a
        href="https://instagram.com/slpabbas"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FFD700] hover:underline"
      >
        SLP
      </a>
    </p>
  </div>
</footer>

    </div>
  );
}