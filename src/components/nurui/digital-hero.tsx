"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "@/components/nurui/styles/digital-hero.css"; // Import custom styles

export default function DigitalHero() {
  const [, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }[] = [];

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: "#a3ff12",
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    let animationId: number;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 255, 18, ${p.alpha})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      }

      animationId = requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col justify-center min-h-screen bg-[#121212] rounded-2xl relative overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
      />

      {/* Green glow border effect */}
      <div className="absolute inset-0 border-[1px] border-[#a3ff12] shadow-[0_0_15px_#a3ff12] m-8 pointer-events-none"></div>

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-6">
        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-4 px-14">
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <div className="text-[#a3ff12] font-extrabold text-5xl md:text-6xl leading-none tracking-tighter">
              <div className="overflow-hidden">
                <div
                  className="transform transition-transform duration-1000"
                  style={{ transitionDelay: "300ms" }}
                >
                  DECENTRALIZED
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="transform transition-transform duration-1000"
                  style={{ transitionDelay: "500ms" }}
                >
                  NFT EXCHANGE
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="transform transition-transform duration-1000"
                  style={{ transitionDelay: "700ms" }}
                >
                  PLATFORM
                </div>
              </div>
            </div>

            <p
              className="text-gray-400 mt-8 text-sm leading-relaxed max-w-md transform transition-all duration-1000"
              style={{ transitionDelay: "900ms" }}
            >
              DIVE INTO THE WORLD OF DIGITAL ART. EASILY CREATE, SELL, AND BUY
              NFTS WITH THE SECURITY AND TRANSPARENCY OF BLOCKCHAIN TECHNOLOGY.
            </p>

            <div
              className="flex space-x-4 mt-8 transform transition-all duration-1000"
              style={{ transitionDelay: "1000ms" }}
            >
              <button
                className="px-6 py-2 bg-[#a3ff12] text-black font-bold hover:bg-opacity-90 transition-all relative group overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                }}
              >
                <span className="relative z-10">GET STARTED</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button
                className="px-6 py-2 border border-[#a3ff12] text-[#a3ff12] font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all relative group overflow-hidden"
                style={{
                  clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
                }}
              >
                <span className="relative z-10">LEARN MORE</span>
                <span className="absolute inset-0 bg-[#a3ff12] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            style={{ transitionDelay: "500ms" }}
          >
            {/* NFT Images */}
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  unoptimized
                  src="https://res.cloudinary.com/dz1fy2tof/image/upload/v1752574775/neon-shaman_gtwdwu.png"
                  alt="NFT Artwork"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>

              <div className="col-span-1 row-span-2 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  unoptimized
                  src="https://res.cloudinary.com/dz1fy2tof/image/upload/v1752574785/neon-zephyr_botsyr.png"
                  alt="NFT Artwork"
                  width={250}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>

              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  unoptimized
                  src="https://res.cloudinary.com/dz1fy2tof/image/upload/v1752574761/emerald-enforcer_mpzgko.png"
                  alt="NFT Artwork"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>
            </div>

            {/* Tech lines */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#a3ff12] opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#a3ff12] opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      {/* Green glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a3ff12] via-transparent to-transparent opacity-5 pointer-events-none"></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-[#a3ff12] opacity-10 scanline"></div>
      </div>
    </section>
  );
}
