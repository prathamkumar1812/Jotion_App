import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"


function Footer() {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50">Zotion
    <div className="md:ml-auto w-full justify-between md:justify-end flex item-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size={"sm"}>Private Policy</Button>
        <Button variant="ghost" size={"sm"}>Term & Conditions</Button>
        </div></div>
  )
}

export default Footer