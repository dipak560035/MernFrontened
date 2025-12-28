
'use client'

import { Button } from "@/components/ui/button"

export default function ErrorPage({error,reset}: {error: Error, reset:() => void}) {
  return (
    <div>
        
        <h1>{error.message}</h1>
        <Button onClick = {reset}> try again</Button>
        
        </div>
  )
}

