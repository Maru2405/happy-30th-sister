import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Heart, Sparkles, Star, Sun } from "lucide-react";

// ------------------------------------------------------------------
// Personalize everything here
// ------------------------------------------------------------------
const SISTER_NAME = "Shrutika";
const FROM_NAME = "your youngest sibling"; // e.g. "Aanya"

const LETTER_PARAGRAPHS = [
  `${SISTER_NAME}, turning 30 feels like a milestone the whole family gets to celebrate — but for me, it’s extra special. With ten years between us, I’ve spent most of my life looking up to you. You were already a teenager when I was still figuring out how to tie my shoes, and somehow that gap only made you feel larger than life.`,
  `I remember watching you navigate school, friendships, and big decisions long before I had to face any of it myself. You made growing up look graceful, even when I know now that it wasn’t always easy. [Add a specific memory, inside joke, or piece of advice she gave you here.]`,
  `You’ve been my protector, my translator into the adult world, and the person whose approval always meant the most. From the big things to the small, you showed me what it means to be kind, strong, and unapologetically yourself.`,
  `Now, as you step into this new decade, I see not just the sister who looked out for me, but the woman you’ve become — confident, warm, magnetic, and someone I’m still learning from every single day.`,
  `Happy 30th birthday, ${SISTER_NAME}. Thank you for being my first role model, my safe place, and my friend. I love you more than words can hold.`,
];

const WISHES = [
  { icon: Sparkles, text: "That this year brings you the same joy you bring to everyone around you." },
  { icon: Star, text: "New adventures that make you feel alive, proud, and completely yourself." },
  { icon: Sun, text: "Moments of rest and sweetness in between the big wins." },
  { icon: Heart, text: "A year where every dream you whisper to yourself starts coming true." },
  { icon: Sparkles, text: "More laughter, more love, and more reasons to celebrate." },
];

const PHOTO_PLACEHOLDERS = [
  { label: "A childhood memory", prompt: "Replace with a childhood photo of the two of you" },
  { label: "A milestone together", prompt: "Replace with a graduation, trip, or celebration photo" },
  { label: "One of her biggest smiles", prompt: "Replace with a candid photo that captures her joy" },
  { label: "A recent favorite", prompt: "Replace with a recent photo you love" },
];

// ------------------------------------------------------------------
// Confetti
// ------------------------------------------------------------------
const CONFETTI_COLORS = [
  "#2E1A47",
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#C75B5B",
] as const;

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFiring, setIsFiring] = useState(true);

  useEffect(() => {
    if (!isFiring) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      r: number;
      dx: number;
      dy: number;
      dr: number;
      gravity: number;
      opacity: number;
      color: string;
      tilt: number;
      tiltAngle: number;
      tiltAngleIncr: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(180, Math.floor(window.innerWidth / 6));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.5 - window.innerHeight * 0.5,
          w: Math.random() * 8 + 6,
          h: Math.random() * 5 + 4,
          r: Math.random() * 360,
          dx: Math.random() * 4 - 2,
          dy: Math.random() * 3 + 2,
          dr: Math.random() * 6 - 3,
          gravity: Math.random() * 0.08 + 0.04,
          opacity: 1,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          tilt: Math.random() * 10,
          tiltAngle: Math.random() * 10,
          tiltAngleIncr: Math.random() * 0.1 + 0.05,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = false;

      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;

        p.tiltAngle += p.tiltAngleIncr;
        p.y += p.dy;
        p.x += p.dx + Math.sin(p.tiltAngle) * 0.5;
        p.dy += p.gravity;
        p.r += p.dr;
        p.opacity -= 0.0035;

        ctx.save();
        ctx.translate(p.x + p.tilt, p.y);
        ctx.rotate((p.r * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (alive) {
        animationId = requestAnimationFrame(draw);
      } else {
        setIsFiring(false);
      }
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", resize);

    const timer = setTimeout(() => {
      setIsFiring(false);
    }, 5500);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      clearTimeout(timer);
    };
  }, [isFiring]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: isFiring ? 1 : 0, transition: "opacity 1s ease" }}
    />
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Confetti />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 text-center">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-coral/40 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-56 w-56 rounded-full bg-teal/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-3xl" />
        </div>

        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium tracking-wide text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-coral" />
          A birthday letter
        </p>

        <h1 className="font-display text-[clamp(6rem,22vw,14rem)] font-black leading-[0.85] tracking-tight text-gradient">
          30
        </h1>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Happy Birthday, {SISTER_NAME}
        </h2>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
          From the youngest sibling who has looked up to you for as long as I can remember.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          Celebrate again
        </button>
      </section>

      {/* Letter */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12">
          <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-coral text-cream shadow-md">
            <Heart className="h-5 w-5 fill-current" />
          </div>

          <h3 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
            A letter to my big sister
          </h3>

          <div className="space-y-6 text-base leading-8 text-foreground/90 sm:text-lg">
            {LETTER_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-display text-xl italic text-plum">
              “Here’s to the woman you are — and all the magic still ahead.”
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              — {FROM_NAME}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Moments with you
            </h3>
            <p className="mt-3 text-muted-foreground">
              Four photo placeholders ready for your favorite memories together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PHOTO_PLACEHOLDERS.map((photo, index) => (
              <div
                key={index}
                className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/60 text-ink transition-colors group-hover:bg-coral group-hover:text-cream">
                  <Camera className="h-6 w-6" />
                </div>
                <p className="mt-4 font-display text-lg font-medium text-ink">
                  {photo.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{photo.prompt}</p>
                <span className="absolute bottom-4 right-4 text-xs font-semibold text-muted-foreground/60">
                  {index + 1}/4
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Wishes for your 30th year
            </h3>
            <p className="mt-3 text-muted-foreground">
              A few hopes for the decade ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WISHES.map((wish, index) => {
              const Icon = wish.icon;
              const colors = ["text-coral", "text-teal", "text-gold", "text-plum", "text-rose"];
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon className={`h-7 w-7 ${colors[index % colors.length]}`} />
                  <p className="mt-4 text-base leading-relaxed text-foreground/90">
                    {wish.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Cheers to 30 incredible years, {SISTER_NAME}.
          </p>
          <p className="mt-4 text-muted-foreground">
            With all my love,{" "}
            <span className="font-semibold text-ink">{FROM_NAME}</span>
          </p>
          <p className="mt-8 text-sm text-muted-foreground/70">
            Made with confetti, memories, and a whole lot of love.
          </p>
        </div>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `Happy 30th Birthday, ${SISTER_NAME}` },
      {
        name: "description",
        content: `A heartfelt birthday letter and photo celebration for ${SISTER_NAME}'s 30th birthday.`,
      },
      { property: "og:title", content: `Happy 30th Birthday, ${SISTER_NAME}` },
      {
        property: "og:description",
        content: `A heartfelt birthday letter and photo celebration for ${SISTER_NAME}'s 30th birthday.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
