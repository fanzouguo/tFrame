import { exec } from 'child_process';
const decodeer = new TextDecoder('gbk');
const BINARY_ENCODING = 'binary';
const fmtStdStream = stdSome => decodeer.decode(Buffer.from(stdSome, BINARY_ENCODING));

export const cmd = cmdStr => {
	return new Promise((resovle, reject) => {
		exec(cmdStr, {
			encoding: BINARY_ENCODING
		}, (err, stdout, stderr) => {
			if (err) {
				reject(fmtStdStream(err.message));
			} else if (stderr.length) {
				reject(fmtStdStream(stderr));
			} else {
				resovle(fmtStdStream(Buffer.from(stdout)));
			}
		});
	});
};
