import { readFileSync } from 'fs';
import path, { dirname } from 'path';

interface ConfigLua<T> {
	[key: string]: T;
}

const configDirectory = path.resolve(process.cwd(), "src/config")

export class readConfigLua {
	private jsonString: string;

	constructor() {
		try {
			this.jsonString = readFileSync(`${configDirectory}/config.lua`, 'utf8');
		} catch (error) {
			console.log(error);
			this.jsonString = '';
		}
	}

	private parseValue<T>(value: string): T | null {
		const parsedValue = value?.replace(/["']/g, '').trim();
		return parsedValue === '' ? null : (parsedValue as T);
	}

	public readLua<T>(): ConfigLua<T> {
		const result = this.jsonString.split('\n').map((item: string) => item.split(' = '));

		const configLua: ConfigLua<T | null> = {};

		result.forEach(([key, value]) => {
			if (key !== '') {
				configLua[key] = this.parseValue<T>(value);
			}
		});

		return configLua as ConfigLua<T>;
	}

	public getConfig(): ConfigLua<string> {
		return this.readLua<string>();
	}
}
