import crypto from 'node:crypto';

export function encryptPassword(senha: string): string {
	const sha1 = crypto.createHash('sha1');
	sha1.update(senha);
	const senhaCriptografada = sha1.digest('hex');
	return senhaCriptografada;
}

export function comparePassword(password: string, encPassword: string): boolean {
	const senhaCriptografadaInput = encryptPassword(password);
	return encPassword === senhaCriptografadaInput;
}
