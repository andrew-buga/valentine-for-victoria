"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"

interface Confetti {
  id: number
  left: number
  delay: number
  duration: number
  color: string
}

export function LoveReveal() {
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const colors = [
      "hsl(346, 77%, 50%)",
      "hsl(350, 60%, 65%)",
      "hsl(20, 80%, 55%)",
      "hsl(350, 40%, 75%)",
      "hsl(0, 70%, 60%)",
    ]
    const pieces: Confetti[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setConfetti(pieces)

    const timer = setTimeout(() => setShowContent(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const photos = [
    { src: "/images/our-1.jpg", alt: "Я тебе кохаю!" },
    { src: "/images/our-2.jpg", alt: "Неймовірно сильно кохаю!" },
    { src: "/images/our-3.jpg", alt: "Твої обійми>>>" },
    { src: "/images/our-5.jpg", alt: "Твоя посмішка робить мене щасливим" },
    { src: "/images/our-6.jpg", alt: "Ти - моє світло" },
    { src: "/images/our-7.jpg", alt: "Назавжди разом" },
  ]

  return (
    <div className="relative flex flex-col items-center gap-8">
      {/* Confetti */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute top-0 h-3 w-3 rounded-full"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            }}
          />
        ))}
      </div>

      {showContent && (
        <div
          className="flex flex-col items-center gap-10"
          style={{ animation: "fade-in-up 1s ease-out forwards" }}
        >
          {/* Celebration header */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-3"
              style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
            >
              <Heart size={36} fill="hsl(346, 77%, 50%)" strokeWidth={0} className="text-primary" />
              <Heart size={48} fill="hsl(346, 77%, 50%)" strokeWidth={0} className="text-primary" />
              <Heart size={36} fill="hsl(346, 77%, 50%)" strokeWidth={0} className="text-primary" />
            </div>

            <h1 className="text-center font-serif text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-lg md:text-6xl text-balance">
              Я знав, що ти скажеш Так!
            </h1>

            <p className="max-w-lg text-center font-sans text-lg leading-relaxed text-primary-foreground/80 drop-shadow">
              З тобою чай стає смачнішим, а життя яскравішим. Ти найкраще що тряплялося зі мною у житті, і я мрію та хочу
              провести з тобою кожну секунду. Я тебе безмежно кохаю.
            </p>
          </div>

          {/* Photo gallery */}
          <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className="group relative overflow-hidden rounded-2xl border-4 border-primary-foreground/30 bg-card shadow-xl transition-all hover:border-primary hover:shadow-2xl"
                style={{
                  animation: `fade-in-up 0.8s ease-out ${0.3 + index * 0.2}s both`,
                }}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
              </div>
            ))}
          </div>

          {/* Love letter section */}
          <div className="w-full max-w-lg rounded-2xl border border-primary-foreground/20 bg-foreground/40 p-8 shadow-lg backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 text-center">
              <Heart size={24} fill="hsl(346, 77%, 50%)" strokeWidth={0} className="text-primary" />
              <p className="font-serif text-xl leading-relaxed text-primary-foreground italic">
                {'"У цілому світі немає серця для мене, як твоє. У цілому світі немає кохання для тебе, як моє."'}
              </p>
            </div>
          </div>

          {/* Romantic shimmer text */}
          <p
            className="text-center font-serif text-2xl font-bold md:text-3xl"
            style={{
              background: "linear-gradient(90deg, hsl(346, 77%, 50%), hsl(20, 80%, 55%), hsl(346, 77%, 50%))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Назавжди і Завжди
          </p>

          <div className="flex items-center gap-2 text-primary-foreground/70">
            <Heart size={14} fill="hsl(346, 77%, 50%)" strokeWidth={0} />
            <span className="text-sm font-sans">З Днем Святого Валентина, Кохана</span>
            <Heart size={14} fill="hsl(346, 77%, 50%)" strokeWidth={0} />
          </div>
        </div>
      )}
    </div>
  )
}
