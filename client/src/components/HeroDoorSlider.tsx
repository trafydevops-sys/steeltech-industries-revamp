import { InfiniteSlider } from "@/components/core/infinite-slider";

const columnA = [
  { src: "/images/hero-doors/door-modern-black-glass.jpg", alt: "Modern black door with glass panels" },
  { src: "/images/hero-doors/door-black-glass-frame.jpg", alt: "Black wooden framed glass door" },
  { src: "/images/hero-doors/door-gray-wood.jpg", alt: "Gray wooden door entrance" },
  { src: "/images/hero-doors/door-with-window.jpg", alt: "Door with a glazed window panel" },
  { src: "/images/hero-doors/door-closed-brown-1.jpg", alt: "Closed brown wooden door" },
];

const columnB = [
  { src: "/images/hero-doors/door-modern-entrance.jpg", alt: "Modern black entrance with steps" },
  { src: "/images/hero-doors/door-black-welcome-mat.jpg", alt: "Black front door on a wooden porch" },
  { src: "/images/hero-doors/door-brown-wood.jpg", alt: "Brown wooden door detail" },
  { src: "/images/hero-doors/door-green-panel.jpg", alt: "Door with a green paneled design" },
  { src: "/images/hero-doors/door-closed-brown-2.jpg", alt: "Closed brown wooden door, wide" },
];

/** Two counter-scrolling columns of door photography for the hero's right side. Hidden below lg since the hero
 * text already needs the full width on small screens. */
export default function HeroDoorSlider() {
  return (
    <div className="hero-door-slider" aria-hidden="true">
      <InfiniteSlider direction="vertical" gap={14} duration={26} durationOnHover={60} className="hero-door-column">
        {columnA.map((door) => (
          <img key={door.src} src={door.src} alt={door.alt} loading="lazy" className="hero-door-image" />
        ))}
      </InfiniteSlider>
      <InfiniteSlider direction="vertical" reverse gap={14} duration={26} durationOnHover={60} className="hero-door-column">
        {columnB.map((door) => (
          <img key={door.src} src={door.src} alt={door.alt} loading="lazy" className="hero-door-image" />
        ))}
      </InfiniteSlider>
    </div>
  );
}
