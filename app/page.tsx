"use client"

import { useState, useEffect, useRef } from "react"
import { PhotoBackground } from "@/components/photo-background"
import { FloatingHearts } from "@/components/floating-hearts"
import { ValentineQuestion } from "@/components/valentine-question"
import { LoveReveal } from "@/components/love-reveal"

export default function Page() {
  const [accepted, setAccepted] = useState(false)
  // Створюємо посилання на аудіо-елемент
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Цей ефект спрацює, коли accepted стане true
  useEffect(() => {
    if (accepted && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Browser blocked autoplay until interaction:", error)
      })
    }
  }, [accepted])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Невидимий елемент аудіо */}
      <audio ref={audioRef} src="/images/music.mp3" loop />
      
      <PhotoBackground showVideo={accepted} />
      <FloatingHearts />
      
      <div className="relative z-10 w-full max-w-3xl">
        {!accepted ? (
          // Важливо: перевір, чи пропс у ValentineQuestion називається onYes чи onAccept
          <ValentineQuestion onYes={() => setAccepted(true)} />
        ) : (
          <LoveReveal />
        )}
      </div>
    </main>
  )
}