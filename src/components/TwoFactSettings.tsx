"use client"
import { useState } from 'react';
import { ErrorCode } from '../utils/ErrorCode';
import TwoFactAuth from './TwoFactAuth';
import { accounts } from '@prisma/client';
import { Switch } from './ui/switch';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import Image from 'next/image';
import useDisclosure from '@/hooks/useDisclosure';

enum SetupStep {
  ConfirmPassword,
  DisplayQrCode,
  EnterTotpCode,
}

const WithStep = ({ step, current, children }: { step: SetupStep; current: SetupStep; children: JSX.Element }) => {
  return step === current ? children : null;
};

const TwoFactSetupModal = ({ isOpen, onClose, onEnable }: { isOpen: boolean; onClose: () => void; onEnable: () => void }) => {
  const [dataUri, setDataUri] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(SetupStep.ConfirmPassword);

  async function handleSetup() {
    if (isSubmitting) return
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/accounts/two-factor/totp/setup`, {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      const body = await response.json();
      if (response.status === 200) {
        setDataUri(body.dataUri);
        setStep(SetupStep.DisplayQrCode);
        return;
      }
      if (body.error === ErrorCode.IncorrectPassword) {
        toast({
          title: "Error!",
          description: (<div>Incorrect Password</div>),
          variant: 'destructive'
        })
      } else if (body.error) {
        toast({
          title: "Error!",
          description: (<div>Sorry something went wrong</div>),
          variant: 'destructive'
        })
      }
    } catch (e) {
      toast({
        title: "Error!",
        description: (<div>Sorry something went wrong</div>),
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEnable(totpCode: string) {
    if (isSubmitting) return
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/accounts/two-factor/totp/enable`, {
        method: 'POST',
        body: JSON.stringify({ totpCode }),
      });
      const body = await response.json();
      if (body.error === ErrorCode.IncorrectTwoFactorCode) {
        return toast({
          title: "Error!",
          description: (<div>Incorrect code. Please try again</div>),
          variant: 'destructive'
        })
      } else if (body.error) {
        return toast({
          title: "Error!",
          description: (<div>Sorry something went wrong</div>),
          variant: 'destructive'
        })
      } else {
        onEnable();
        return toast({
          title: "Success!",
          description: (<div>Successfully enabled 2FA</div>),
          variant: 'success'
        })
      }
    } catch (e) {
      toast({
        title: "Error!",
        description: (<div>Sorry something went wrong</div>),
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  function HandleClose() {
    onClose()
    setDataUri('')
    setPassword('')
    setTotpCode('')
    setStep(SetupStep.ConfirmPassword)
  }

  return (<>
    <Dialog open={isOpen} onOpenChange={HandleClose}>

      <WithStep step={SetupStep.ConfirmPassword} current={step}>
        <DialogContent className='select-none'>
          <DialogHeader>
            <DialogTitle>Enable two-factor authentication</DialogTitle>
            <DialogDescription>Enter your password</DialogDescription>
          </DialogHeader>
          <div className='py-2'>
            <Input type={'password'} placeholder="*******" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} onClick={HandleClose}>Close</Button>
            </DialogClose>
            <Button disabled={isSubmitting} onClick={handleSetup}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </WithStep>

      <WithStep step={SetupStep.DisplayQrCode} current={step}>
        <DialogContent className='select-none'>
          <DialogHeader>
            <DialogTitle>Enable two-factor authentication</DialogTitle>
            <DialogDescription>Scan the image below with the authenticator app on your phone or manually enter the text code instead.</DialogDescription>
          </DialogHeader>

          <div className='flex justify-center items-center p-2'>
            <div className='border rounded '>
              <Image src={dataUri} alt='' width={200} height={200} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} onClick={HandleClose}>Close</Button>
            </DialogClose>
            <Button disabled={isSubmitting} onClick={() => setStep(SetupStep.EnterTotpCode)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </WithStep>

      <WithStep step={SetupStep.EnterTotpCode} current={step}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable two-factor authentication</DialogTitle>
            <DialogDescription>Enter your code to enable 2FA</DialogDescription>
          </DialogHeader>

          <TwoFactAuth value={totpCode} onChange={(val) => setTotpCode(val)} />

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} onClick={HandleClose}>Close</Button>
            </DialogClose>
            <Button disabled={isSubmitting} onClick={() => handleEnable(totpCode)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </WithStep>

    </Dialog>
  </>);
};

const DisableTwoFactSetupModal = ({ isOpen, onClose, onDisable }: { isOpen: boolean; onClose: () => void; onDisable: () => void }) => {
  const [totpCode, setTotpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDisable() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/accounts/two-factor/totp/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totpCode,
        }),
      });
      const body = await response.json();
      if (body.error === ErrorCode.IncorrectTwoFactorCode) {
        return toast({
          title: "Error!",
          description: (<div>Incorrect code. Please try again</div>),
          variant: 'destructive'
        })
      } else if (body.error) {
        return toast({
          title: "Error!",
          description: (<div>Sorry something went wrong1</div>),
          variant: 'destructive'
        })
      } else {
        onDisable();
        return toast({
          title: "Success!",
          description: (<div>Successfully disabled 2FA</div>),
          variant: 'success'
        })
      }
    } catch (e) {
      return toast({
        title: "Error!",
        description: (<div>Sorry something went wrong</div>),
        variant: 'destructive'
      })

    } finally {
      setIsSubmitting(false);
    }
  }

  function HandleClose() {
    onClose()
    setTotpCode('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={HandleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable two-factor authentication</DialogTitle>
          <DialogDescription>Enter your code to disable 2FA</DialogDescription>
        </DialogHeader>
        <div>
          <TwoFactAuth value={totpCode} onChange={(val) => setTotpCode(val)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSubmitting} onClick={onClose}>Close</Button>
          </DialogClose>
          <Button disabled={isSubmitting} onClick={handleDisable}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function TwoFactSettings({ user }: { user: accounts }) {
  const { isOpen: isOpenSetupModal, onOpen: onOpenSetupModal, onClose: onCloseSetupModal } = useDisclosure();
  const { isOpen: isOpenDisableModal, onOpen: onOpenDisableModal, onClose: onCloseDisableModal } = useDisclosure();
  const [isEnabled, setEnabled] = useState<boolean>(user.secret_status);

  function handleOnEnable() {
    setEnabled(true);
    onCloseSetupModal();
  }

  function handleOnDisable() {
    setEnabled(false);
    onCloseDisableModal();
  }

  return (<>
    <Switch checked={isEnabled} onCheckedChange={isEnabled ? onOpenDisableModal : onOpenSetupModal} />
    <TwoFactSetupModal isOpen={isOpenSetupModal} onClose={onCloseSetupModal} onEnable={handleOnEnable} />
    <DisableTwoFactSetupModal isOpen={isOpenDisableModal} onClose={onCloseDisableModal} onDisable={handleOnDisable} />
  </>);
}
