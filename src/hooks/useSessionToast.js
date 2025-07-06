"use client"

import { useEffect } from "react"
import { toast } from "sonner"



const toastKeys = {
    showLoginToast : "User Logged In Successfully",
    showProjectCreationToast: "Project Created Successfully"
}

const useSessionToast = () => {
  useEffect(()=>{
    Object.entries(toastKeys).forEach(([key,message])=>{
        if(sessionStorage.getItem(key)){
            toast.success(message)
            sessionStorage.removeItem(key)
        }
    })
  },[])
}

export default useSessionToast