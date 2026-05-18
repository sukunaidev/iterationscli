"use client"

import Hero from "@/components/marketing/Hero"
import Features from "@/components/marketing/Features"
import Time from "@/components/Time"
import Footer from "@/components/marketing/Footer"
export default function Page() {
  return (
    <div className="">
      <div className=" bg-black flex justify-center">
        <div className="flex-col ">
          <Time />
        </div>
      </div>
      <Hero />
        <div className="h-1/2 bg-white">
          <Features />
        </div>
      <Footer />
    </div >
  )
}
