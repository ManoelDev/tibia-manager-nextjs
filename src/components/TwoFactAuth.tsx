import { Input } from "./ui/input";
import useDigitInput from 'react-digit-input';


export default function TwoFactAuth({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value,
    onChange,
  });

  const className = 'h-12 w-12 !text-xl text-center';

  return (
    <div className="flex flex-row p-4 justify-between">
      <Input className={className} name="2fa1" inputMode="decimal" {...digits[0]} autoFocus autoComplete="one-time-code" />
      <Input className={className} name="2fa2" inputMode="decimal" {...digits[1]} />
      <Input className={className} name="2fa3" inputMode="decimal" {...digits[2]} />
      <Input className={className} name="2fa4" inputMode="decimal" {...digits[3]} />
      <Input className={className} name="2fa5" inputMode="decimal" {...digits[4]} />
      <Input className={className} name="2fa6" inputMode="decimal" {...digits[5]} />
    </div>
  );
}
