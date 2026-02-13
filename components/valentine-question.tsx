"use client"

import { useState, useCallback, useRef } from "react"
import { Heart } from "lucide-react"

interface ValentineQuestionProps {
  onYes: () => void
}

export function ValentineQuestion({ onYes }: ValentineQuestionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noMoved, setNoMoved] = useState(false)
  const [noScale, setNoScale] = useState(1)
  const [yesScale, setYesScale] = useState(1)
  const [moveCount, setMoveCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const moveNoButton = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const maxX = rect.width - 120
    const maxY = rect.height - 60

    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setNoPosition({ x: newX, y: newY })
    setNoMoved(true)
    setMoveCount((prev) => prev + 1)
    
    // Кнопка "Ні" стає меншою
    setNoScale((prev) => Math.max(prev - 0.05, 0.2))
    
    // Кнопка "Так" росте БЕЗ ЛІМІТІВ (прибрав обмеження 2.5)
    setYesScale((prev) => prev + 0.2) 
  }, [])

  const noMessages = [
    "Ні",
    "Ти впевнена?",
    "Точно-точно?",
    "Подумай ще раз!",
    "Ну будь ласка!",
    "З вишенькою зверху?",
    "Я дам тобі шоколадку!",
    "Навіть ту з горішками?",
    "Ти розбиваєш мені серце!",
    "Від кохання не втечеш!",
  ]

  return (
    <div
        ref={containerRef}
        className="relative flex min-h-[400px] w-full max-w-2xl items-center justify-center gap-8"
      >
        {/* Кнопка ТАК - тепер вона під низом */}
        <button
          onClick={onYes}
          className="z-10 rounded-full bg-primary px-16 py-8 font-serif text-4xl font-bold text-primary-foreground shadow-2xl transition-all hover:shadow-[0_0_60px_hsl(346,77%,50%,0.6)] focus:outline-none md:px-20 md:py-10"
          style={{
            transform: `scale(${yesScale})`,
            transition: "transform 0.2s ease",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        >
          Так!
        </button>

        {/* Кнопка НІ - тепер вона ЗАВЖДИ зверху (z-[100]) */}
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="z-[100] rounded-full border-2 border-primary-foreground/30 bg-card/90 px-6 py-3 font-serif text-base font-semibold text-card-foreground shadow-xl backdrop-blur-md transition-all"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
            transition: noMoved ? "transform 0.3s ease" : "none",
            position: noMoved ? "absolute" : "relative",
          }}
        >
          {noMessages[Math.min(moveCount, noMessages.length - 1)]}
        </button>
      </div>
  )
}