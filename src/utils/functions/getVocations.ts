function getVocation(value: number): string | undefined {
  const vocationMap: { [key: number]: string } = {
    0: 'none',
    1: 'Sorcerer',
    2: 'Druid',
    3: 'Paladin',
    4: 'Knight',
    5: 'Master sorcerer',
    6: 'Elder druid',
    7: 'Royal paladin',
    8: 'Elite knight',
  };

  return vocationMap[value];
}

export { getVocation }