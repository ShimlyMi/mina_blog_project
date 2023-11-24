import CryptoJS from 'crypto-js'

/** 设置密钥和密钥偏移量 */
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("1889634875923645");
// 十六位十六进制数作为密钥偏移量
const SECRET_TV = CryptoJS.enc.Utf8.parse("1889634875923645");


/**
 * 加密方法
 * @param data
 * @returns {string}
 * */
export function __encrypt(data) {
    if (typeof data === 'object') {
        try {
            // eslint-disable-next-line no-param-reassign
            data = JSON.stringify(data);
        } catch (error) {
            console.log("encrypt error", error)
        }
    }
    let dataHex = CryptoJS.enc.Utf8.parse(data);
    //CipherOption,加密的一些选项：
    //mode:加密模式，可取值（CBC,CFB,CTR,CTRGladman,OFB,ECB),都在CryptoJS.mode对象下
    //padding:填充方式，可取值（Pkcs7,Ansix923,Iso10126,ZeroPadding,NoPadding),都在CryptoJS.pad对象下
    //iv:偏移量，mode===ECB时，不需要iv
    //返回的是一个加密对象
    let encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_TV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
};

/**
 * 解密方法
 * @param data
 * @returns string
 */
export function _decrypt(data) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    //返回的是解密后的对象
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_TV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //将解密对象转换成UTF8的字符串
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    //返回解密结果
    return  decryptedStr.toString();
}
