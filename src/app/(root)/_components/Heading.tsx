import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
function Heading() {
  return (
    <div className="max-w-3xl space-y-4"
    >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">        Your Ideas ,Documents, & Plan. Unified. Welcome to <span className=" underline">Zotion</span>
        </h1>
        <Button>
          Enter Zotion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
    </div>
  )
}

export default Heading