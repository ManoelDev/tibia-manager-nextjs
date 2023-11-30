'use client'
import React from 'react';

import { BoostedProps } from './types';
import AnimatedOutfit from './AnimatedOutfit';

export function toProperCase(str: string) {
  return str
    .replace(/([A-Z])/g, (c) => ` ${c.toLowerCase()}`)
    .replace(/^./, (str) => str.toUpperCase());
}


interface BoostedComponentProps {
  kind: 'boss' | 'creature';
  boosted: BoostedProps | null;
}

const BoostedComponent = ({ kind, boosted }: BoostedComponentProps) => {
  if (!boosted) {
    return null;
  }

  return (
    <div
      className="ransition-all ease-in-out duration-300 hover:scale-110 rounded-token relative"
      data-tooltip={`Boosted ${toProperCase(kind)}: ${boosted.boostname ?? ''}`}
      data-offset="20"
    >
      <AnimatedOutfit outfit={boosted} alt={boosted.boostname ?? ''} className='w-16 h-16 right-4 -bottom-2' />
    </div>
  );
};

export default BoostedComponent;
