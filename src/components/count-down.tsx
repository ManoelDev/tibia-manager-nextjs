"use client"
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"



interface CountdownProps {
  hour: number;
  min: number;
  sec?: number;
}


function calculateTimeRemaining({ hour = 0, min = 0, sec = 0 }: CountdownProps) {
  const now = new Date();
  const targetTime = new Date(now);

  targetTime.setHours(hour, min, sec, 0);

  if (now >= targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeRemaining = targetTime.getTime() - now.getTime();

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function Countdown({ hour, min, sec = 0 }: CountdownProps) {

  const [countdown, setCountdown] = useState(calculateTimeRemaining({ hour, min, sec }));

  const formattedCountdown = useMemo(() => {
    return {
      hours: countdown.hours.toString().padStart(2, '0'),
      minutes: countdown.minutes.toString().padStart(2, '0'),
      seconds: countdown.seconds.toString().padStart(2, '0'),
    };
  }, [countdown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateTimeRemaining({ hour, min, sec }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hour, min, sec]);


  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-center">Server Save</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className={`text-center p-2 text-xl border rounded-sm `}>
          {`${formattedCountdown.hours}:${formattedCountdown.minutes}:${formattedCountdown.seconds}`}
        </div>
      </CardContent>
    </Card>

  );
}

export default Countdown;

