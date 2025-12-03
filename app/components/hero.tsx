import Image from 'next/image'

export function Hero() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover opacity-10"
      />
    </div>
  )
}