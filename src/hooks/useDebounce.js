import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

export const useDebounce=(value,delay)=>{
    const [valueDebounce,setValueDebounce]=useState('')
    useEffect(()=>{
        const handle=setTimeout(()=>{
            setValueDebounce(value)
        },[delay])
        return()=>{
            clearTimeout(handle)
        }
    },[value])
    return valueDebounce
   
}