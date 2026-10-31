import HomePage from '@/components/home/HomePage'
import { SITE } from '@/lib/site'

export const metadata = {
  title: { absolute: `${SITE.name} | Finance process ownership for controllers` },
  description: SITE.description,
  alternates: { canonical: SITE.url },
}

export default function Home() {
  return <HomePage />
}
