
import { useEffect, useState } from "react"


export function useScrollTop(threshold: number = 100) {
    const [scrolled, setScrolled] = useState<Boolean>(false);
    useEffect(()=>{
        const handler=()=>{
            if(window.scrollY>threshold){
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        

        }
        window.addEventListener('scroll',handler)
        return()=>window.removeEventListener('scroll',handler)
    },[threshold])
  return scrolled
}
