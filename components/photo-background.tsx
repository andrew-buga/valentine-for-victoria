"use client"

import Image from "next/image"

const photos = [
  "/images/our-1.jpg",
  "/images/our-2.jpg",
  "/images/our-3.jpg",
  "/images/our-5.jpg",
  "/images/our-6.jpg",
  "/images/our-7.jpg",
]

interface PhotoBackgroundProps {
  showVideo?: boolean
}

export function PhotoBackground({ showVideo = false }: PhotoBackgroundProps) {
  const duplicated = [...photos, ...photos, ...photos, ...photos]

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      {!showVideo ? (
        <>
          {/* Ряди фотографій, які ми бачимо ДО натискання "Так" */}
          <div className="absolute top-0 left-0 flex h-1/2 w-max animate-carousel-left">
            {duplicated.map((src, i) => (
              <div key={`top-${i}`} className="relative h-full flex-shrink-0" style={{ width: "40vw", minWidth: "300px" }}>
                <Image src={src} alt="" fill className="object-cover" sizes="40vw" priority={i < 3} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 flex h-1/2 w-max animate-carousel-right">
            {[...duplicated].reverse().map((src, i) => (
              <div key={`bottom-${i}`} className="relative h-full flex-shrink-0" style={{ width: "40vw", minWidth: "300px" }}>
                <Image src={src} alt="" fill className="object-cover" sizes="40vw" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />
        </>
      ) : (
        /* ВІДЕО НА ВЕСЬ ФОН після натискання "Так" */
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src="/images/video.mov"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Легке затемнення, щоб текст LoveReveal було краще видно */}
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>
      )}
    </div>
  )
}