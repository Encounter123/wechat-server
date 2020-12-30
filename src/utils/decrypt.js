const crypto = require('crypto');

function decryptFuntion(obj){
	let aesKey = Buffer.from(obj.AESKey + '=', 'base64');
	const cipherEncoding = 'base64';
	const clearEncoding = 'utf8';
	const cipher = crypto.createDecipheriv('aes-256-cbc',aesKey,aesKey.slice(0, 16));
	cipher.setAutoPadding(false); // 是否取消自动填充 不取消
	let this_text = cipher.update(obj.text, cipherEncoding, clearEncoding) + cipher.final(clearEncoding);
	return {
		noncestr: this_text.substring(0, 16),
		msg_len: this_text.substring(16, 20),
		msg: this_text.substring(20, this_text.lastIndexOf("}") + 1)
	}
}

module.exports = {
	Decrypt: decryptFuntion
}