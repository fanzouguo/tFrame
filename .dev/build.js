import { cmd } from './sysCmd.js';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const pkgPath = path.resolve(process.cwd(), 'package.json');
const resetVer = async () => {
	const pkg = await fs.readFile(pkgPath);
	const _obj = JSON.parse(pkg.toString());
	const [a, b, c] = _obj.version.split('.');
	_obj.version = [a, b, +c + 1].join('.');
	await fs.writeFile(pkgPath, JSON.stringify(_obj, null, 2));
}

const getAnswer = question => {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(question, answer => {
			rl.close();
			resolve(answer);
		});
	});
}

const exec = async () => {
	try {
		console.clear();
		await cmd('git add .');
		const commitMemo = await getAnswer('请输入 git commit 提交备注：');
		await cmd(`git commit -m "${commitMemo}"`);
		await cmd('git push -u origin main');
		await resetVer();
		await cmd('npm publish');
	} catch (err) {
		console.error(err);
	}
};

exec();