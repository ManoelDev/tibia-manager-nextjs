"use client"
import { Button } from "@/components/ui/button";
import { cancelOrder, captureOrder } from "../components/actions";

export function CancelOrderButton({ order }: { order: string }) {
  return (<>
    <Button
      variant={'destructive'}
      className="text-xs py-1 px-2 line-clamp-1 h-auto w-full text-left"
      onClick={async () => {
        await cancelOrder({ order })
      }}
    >
      CANCEL
    </Button>
  </>)
}