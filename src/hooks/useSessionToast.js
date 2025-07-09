"use client"

import { useEffect } from "react"
import { toast } from "sonner"



const toastKeys = {
  showLoginToast: "User Logged In Successfully",
  showLogoutToast: "User Logged Out !",
  showProjectCreationToast: "Project Created and Email Sent to Client Successfully",
  showSessionExpired: "Session got expired!",
}

const useSessionToast = () => {
  useEffect(() => {
    Object.entries(toastKeys).forEach(([key, message]) => {
      if (sessionStorage.getItem(key)) {
        if (key === "showSessionExpired" || key === "showLogoutToast" || key === "showUserNotPresent") {
          toast.error(message)
          sessionStorage.removeItem(key)
        }
        else {

          toast.success(message)
          sessionStorage.removeItem(key)
        }
      }
    })
  }, [])
}

export default useSessionToast