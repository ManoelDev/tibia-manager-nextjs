import dayjs from "dayjs"

const fUnixToDate = (date: number) => dayjs.unix(date).format('MMM D YYYY h:mm')

interface Player {
  name: string;
  lastLogin: number;
}

function recentDate(players: Player[]): dayjs.Dayjs[] {
  const actualDate = dayjs();
  const date: dayjs.Dayjs[] = [];
  for (const player of players) {
    const lastLogin = dayjs.unix(player.lastLogin);
    date.push(lastLogin);
  }
  date.sort((a, b) => Math.abs(actualDate.diff(a, 'days')) - Math.abs(actualDate.diff(b, 'days')));
  return date;
}




export { fUnixToDate, recentDate }