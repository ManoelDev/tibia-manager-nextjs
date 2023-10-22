import { Separator } from "@/components/ui/separator";
import { TicketForm } from "./components/user-ticket-form";

export default function Tickets() {
  return (
    <main>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tickets</h2>

        </div>
        <TicketForm />
      </div>

      <Separator className="my-4" />

    </main>
  )
}