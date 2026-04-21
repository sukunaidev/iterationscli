import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Footer() {

  return (
    <footer className="w-full border-t mt-10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">IterationsCLI</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Building simple, fast, and modern web experiences.
            </p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 text-sm">
              <span className="font-medium">Product</span>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Docs
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <span className="font-medium">Company</span>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IterationsCLI. All rights reserved.</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
            <Button variant="ghost" size="sm">
              Terms
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
