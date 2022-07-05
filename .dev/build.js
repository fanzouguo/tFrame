import { cmd } from './sysCmd.js';

const exec = async () => {
	console.clear();
	await cmd('git add .');
	await cmd('git commit -m "自动提交测试"');
	await cmd('git push -u origin main');
};

exec();
