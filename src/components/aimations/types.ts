export type BoostedProps = {
  boostname: string | null;
  looktype: number;
  lookaddons: number;
  lookhead: number;
  lookbody: number;
  looklegs: number;
  lookfeet: number;
  lookmount: number | null;
};


export interface Outfit {
  looktype: number;
  lookhead?: number;
  lookbody?: number;
  looklegs?: number;
  lookfeet?: number;
  lookaddons?: number;
  mount?: number;
}
