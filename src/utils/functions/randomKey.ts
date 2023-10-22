export function randomKey() {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let code = '';

	for (let i = 0; i < 20; i++) {
		if (i > 0 && i % 5 === 0) {
			const random = Math.floor(Math.random() * caracteres.length);
			code += '-' + caracteres[random];
		} else {
			const random = Math.floor(Math.random() * caracteres.length);
			code += caracteres[random];
		}
	}

	return code;
}


export function formatStringWithHyphens(input: string) {
	if (input.length !== 20) {
		return input;
	}

	return input.slice(0, 5) + "-" + input.slice(5, 10) + "-" + input.slice(10, 15) + "-" + input.slice(15, 20);
}