import Image from 'next/image'
import RepairCenter from '@/components/repair-center'

export default function Home() {
  const heroImage = (
    <Image
      src="/images/hero-phone.svg"
      alt="Gallexy phone repair app showing common repairs: screen replacement, battery replacement, charging port repair and water damage service"
      width={657}
      height={942}
      priority
      fetchPriority="high"
      sizes="(max-width: 768px) 80vw, 420px"
      className="hero-phone-img"
    />
  )

  return <RepairCenter heroPhoneImage={heroImage} />
}
