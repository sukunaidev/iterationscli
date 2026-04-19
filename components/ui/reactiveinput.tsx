import { Input } from "./input";
import { cn } from "@/lib/utils"



export function ReactiveInput() {
    return (
        <div className="flex justify-between gap-1 focus-within:[&>span]:opacity-50">
            <span className="opacity-0 mt-2"> &gt;</span>

        </div>
    )
}

