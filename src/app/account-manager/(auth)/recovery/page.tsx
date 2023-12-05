
import { Metadata } from "next"

import { UserRecoveryForm } from "./components/user-recovery-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Recover Password",
  description: "Login forms built using the components.",
}

export default function Recovery() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Recover by Email or Character Name</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <div className="text-xs space-y-2 border rounded p-2">
          <div>
            Welcome to the Lost Account Interface!
            If you have lost access to your account, this interface can help you. Of course, you need to prove that your claim to the account is justified. Enter the requested data and follow the instructions carefully. Please understand there is no way to get access to your lost account if the interface cannot help you. Further options to change account data are available if you have a registered account.
          </div>

          <div>
            By using the Lost Account Interface you can
          </div>

          <li>get a new password if you have lost the current password,</li>
          <li>get your account back if it has been hacked,</li>
          <li>change the email address of your account instantly (only possible with a valid recovery key or a valid recovery TAN),</li>
          <li>request a new recovery key/recovery TAN (only available to registered accounts),</li>
          <li>remove an authenticator app from your account (only possible with a valid recovery key or a valid recovery TAN),</li>
          <li>disable email code authentication for your account (only available to accounts with a valid recovery key).</li>
          <li>As a first step to use the Lost Account Interface, please enter the name of a character or the email address of your account and click on &quot;Submit&quot;.</li>
        </div>
        <div><UserRecoveryForm /></div>
      </CardContent>
    </Card>
  )
}