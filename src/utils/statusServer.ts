import { Socket } from 'node:net';

export class StatusServer {
	private client: Socket;

	constructor() {
		this.client = new Socket();
	}

	public async getStatus(host: string, port: number): Promise<boolean> {
		return new Promise<boolean>((resolve) => {

			this.client.setTimeout(300)

			this.client.connect(port, host, () => {
				resolve(true);
				this.client.end();
			});

			this.client.on('error', () => {
				resolve(false);
				this.client.end();
			});

			this.client.on('timeout', () => {
				resolve(false);
				this.client.end();
			});

		});
	}
}
