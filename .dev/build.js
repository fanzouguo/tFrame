import { cmd } from './sysCmd.js';
import fs from 'fs/promises';
import path from 'path';

const getPkg = async () => {
	const pkg = await fs.readFile(path.resolve(__dirname, '..', 'package.json'));
	console.log(pkg);
}

const exec = async () => {
	try {
		console.clear();
		await cmd('git add .');
		await cmd('git commit -m "自动提交测试"');
		await cmd('git push -u origin main');
		await getPkg();
	} catch (err) {
		console.error(err);
	}
};

exec();