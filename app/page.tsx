"use client"
import { Button } from "@/components/ui/button"

import Hero from "@/components/marketing/Hero"
import Time from "@/components/Time"
import Footer from "@/components/marketing/Footer"

export default function Page() {
  

  return (
    <div className="">
      <Time />
      <Hero />
      <div>
        <div className="h-1/2 bg-white">
          <Button className="mt-12">Features</Button>
        </div>
      </div>

      <Footer />
    </div >
  )
}
