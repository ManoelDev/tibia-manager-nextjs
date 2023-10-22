"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"


const requestAtiveEmail = async () => {
  await fetch('/api/auth/active-email')
    .then((res) => {
      toast({
        title: 'Account Manager',
        description: (<div>Request has been sending email.</div>),
        variant: 'success'
      })
    })
    .catch(() => {
      toast({
        title: 'Account Manager',
        description: (<div>Failed request activation email.</div>),
        variant: 'destructive'
      })
    })
}

export default function ActiveEmailRequest({ disabled }: { disabled: boolean }) {
  return (<>
    <Button
      size={'sm'}
      variant={'green'}
      disabled={disabled}
      onClick={requestAtiveEmail}
    >
      {disabled ? 'Registered' : 'Request'}
    </Button>
  </>)
}