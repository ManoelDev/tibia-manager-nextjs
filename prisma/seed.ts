import { encryptPassword } from '@/utils/functions/criptoPassword';
import { randomKey } from '@/utils/functions/randomKey';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

const password = encryptPassword('12345678Aa!');
const key = randomKey();
export const samplePlayer = [
	{ id: 1, name: 'Rook Sample', group_id: 1, account_id: 1, level: 2, vocation: 0, health: 155, healthmax: 155, experience: 100, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 129, maglevel: 2, mana: 60, manamax: 60, manaspent: 5936, town_id: 1, comment: '', cap: 410, sex: 1, skill_club: 12, skill_club_tries: 155, skill_sword: 12, skill_sword_tries: 155, skill_axe: 12, skill_axe_tries: 155, skill_dist: 12, skill_dist_tries: 93 },
	{ id: 2, name: 'Sorcerer Sample', group_id: 1, account_id: 1, level: 8, vocation: 1, health: 185, healthmax: 185, experience: 4200, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 129, maglevel: 0, mana: 90, manamax: 90, manaspent: 0, town_id: 8, comment: '', cap: 470, sex: 1, skill_club: 10, skill_club_tries: 0, skill_sword: 10, skill_sword_tries: 0, skill_axe: 10, skill_axe_tries: 0, skill_dist: 10, skill_dist_tries: 0 },
	{ id: 3, name: 'Druid Sample', group_id: 1, account_id: 1, level: 8, vocation: 2, health: 185, healthmax: 185, experience: 4200, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 129, maglevel: 0, mana: 90, manamax: 90, manaspent: 0, town_id: 8, comment: '', cap: 470, sex: 1, skill_club: 10, skill_club_tries: 0, skill_sword: 10, skill_sword_tries: 0, skill_axe: 10, skill_axe_tries: 0, skill_dist: 10, skill_dist_tries: 0 },
	{ id: 4, name: 'Paladin Sample', group_id: 1, account_id: 1, level: 8, vocation: 3, health: 185, healthmax: 185, experience: 4200, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 129, maglevel: 0, mana: 90, manamax: 90, manaspent: 0, town_id: 8, comment: '', cap: 470, sex: 1, skill_club: 10, skill_club_tries: 0, skill_sword: 10, skill_sword_tries: 0, skill_axe: 10, skill_axe_tries: 0, skill_dist: 10, skill_dist_tries: 0 },
	{ id: 5, name: 'Knight Sample', group_id: 1, account_id: 1, level: 8, vocation: 4, health: 185, healthmax: 185, experience: 4200, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 129, maglevel: 0, mana: 90, manamax: 90, manaspent: 0, town_id: 8, comment: '', cap: 470, sex: 1, skill_club: 10, skill_club_tries: 0, skill_sword: 10, skill_sword_tries: 0, skill_axe: 10, skill_axe_tries: 0, skill_dist: 10, skill_dist_tries: 0 },
	{ id: 6, name: 'GOD', group_id: 6, account_id: 1, level: 2, vocation: 0, health: 155, healthmax: 155, experience: 100, lookbody: 113, lookfeet: 115, lookhead: 95, looklegs: 39, looktype: 75, maglevel: 0, mana: 60, manamax: 60, manaspent: 0, town_id: 8, comment: '', cap: 410, sex: 1, skill_club: 10, skill_club_tries: 0, skill_sword: 10, skill_sword_tries: 0, skill_axe: 10, skill_axe_tries: 0, skill_dist: 10, skill_dist_tries: 0 }
]

export const positions = [
	{ world_id: 1, id: 1, name: 'Venore', posx: 32957, posy: 32076, posz: 7 },
	{ world_id: 1, id: 2, name: 'Thais', posx: 32369, posy: 32241, posz: 7 },
	{ world_id: 1, id: 3, name: 'Kazordoon', posx: 32649, posy: 31925, posz: 11 },
	{ world_id: 1, id: 4, name: 'Carlin', posx: 32360, posy: 31782, posz: 7 },
	{ world_id: 1, id: 5, name: "Ab'Dendriel", posx: 32732, posy: 31634, posz: 7 },
	{ world_id: 1, id: 6, name: 'Rookgaard', posx: 32097, posy: 32219, posz: 7 },
	{ world_id: 1, id: 7, name: 'Liberty Bay', posx: 32317, posy: 32826, posz: 7 },
	{ world_id: 1, id: 8, name: 'Port Hope', posx: 32594, posy: 32745, posz: 7 },
	{ world_id: 1, id: 9, name: 'Ankrahmun', posx: 33194, posy: 32853, posz: 8 },
	{ world_id: 1, id: 10, name: 'Darashia', posx: 33213, posy: 32454, posz: 1 },
	{ world_id: 1, id: 11, name: 'Edron', posx: 33217, posy: 31814, posz: 8 },
	{ world_id: 1, id: 12, name: 'Svargrond', posx: 32212, posy: 31132, posz: 7 },
	{ world_id: 1, id: 13, name: 'Yalahar', posx: 32787, posy: 31276, posz: 7 },
	{ world_id: 1, id: 14, name: 'Farmine', posx: 33023, posy: 31521, posz: 11 },
	{ world_id: 1, id: 28, name: 'Gray Beach', posx: 33447, posy: 31323, posz: 9 },
	{ world_id: 1, id: 29, name: 'Roshamuul', posx: 33513, posy: 32363, posz: 6 },
	{ world_id: 1, id: 30, name: 'Rookgaard Tutorial Island', posx: 31976, posy: 32276, posz: 7 },
	{ world_id: 1, id: 31, name: 'Isle of Solitude', posx: 32316, posy: 31942, posz: 7 },
	{ world_id: 1, id: 32, name: 'Island Of Destiny', posx: 32091, posy: 32027, posz: 7 },
	{ world_id: 1, id: 33, name: 'Rathleton', posx: 33594, posy: 31899, posz: 6 },
	{ world_id: 1, id: 34, name: 'Krailos', posx: 33657, posy: 31665, posz: 8 },
	{ world_id: 1, id: 51, name: 'Dawnport', posx: 32070, posy: 31900, posz: 6 },
	{ world_id: 1, id: 52, name: 'Feyrist', posx: 33479, posy: 32230, posz: 7 },
	{ world_id: 1, id: 54, name: 'Vigintia', posx: 33491, posy: 31032, posz: 7 },
	{ world_id: 1, id: 55, name: 'Nostalgia', posx: 33545, posy: 31041, posz: 7 },
	{ world_id: 1, id: 62, name: 'Prision', posx: 31439, posy: 32568, posz: 6 },
	{ world_id: 1, id: 63, name: 'Issavi', posx: 33921, posy: 31477, posz: 5 },
	{ world_id: 1, id: 64, name: '15 island', posx: 31923, posy: 32448, posz: 7 },
	{ world_id: 1, id: 65, name: 'Castle', posx: 31322, posy: 32683, posz: 7 },
	{ world_id: 1, id: 66, name: 'Moonfall', posx: 33776, posy: 32754, posz: 5 },
	{ world_id: 1, id: 67, name: 'Silvertides', posx: 33799, posy: 32857, posz: 7 },
]

async function seed() {
	await prisma.accounts.createMany({
		data: [{ id: 1, name: 'god', email: 'jhondoe@example.com', key, email_verified: true, password, type: 6, create_date: dayjs().unix() }],
		skipDuplicates: true,
	});

	// await prisma.players.createMany({ data: samplePlayer, skipDuplicates: true });
	// await prisma.towns.createMany({ data: positions, skipDuplicates: true });

}

seed()
	.catch((error) => {
		console.log(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
