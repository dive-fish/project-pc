import MD5 from "crypto-js/md5";
import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";
import modeEcb from "crypto-js/mode-ecb";
import pkcs7 from "crypto-js/pad-pkcs7";
import JSEncrypt from "jsencrypt";

/**
 *
 * @param { String}  str  需要md5加密字符串
 * @returns String
 */
export function md5(str) {
  return MD5(str).toString();
}

/**
 * aes加密
 * @param { String } content 加密内容
 * @param { String } key 密钥
 * @returns String
 */
export function aesEncode(content, key) {
  const _key = encUtf8.parse(key);
  try {
    return AES.encrypt(content, _key, {
      mode: modeEcb,
      padding: pkcs7,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
}
/**
 *  aes解密
 * @param { String } decryptString aesEncode加密后的字符串
 * @param { String } key 密钥
 * @returns String
 */
export function aesDecode(decryptString, key) {
  try {
    const _key = encUtf8.parse(key);
    const decrypt = AES.decrypt(decryptString, _key, {
      mode: modeEcb,
      padding: pkcs7,
    });
    return encUtf8.stringify(decrypt).toString();
  } catch (error) {
    console.log(error);
    return "";
  }
}

/**
 * rsa加密,分段加密长字符串
 * @param { String } str 需要加密的数据
 * @param { String } key 密钥
 * @return  String
 * @public
 */
export function rsaEncode(str, key) {
  if (typeof str !== "string" || !str) {
    return "";
  }
  const MAXCHUNKLENGTH = 100;
  let output = "";
  let inOffset = 0;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  // 加上try catch 防止加密失败
  try {
    while (inOffset < str.length) {
      output += encrypt.encrypt(str.substring(inOffset, inOffset + MAXCHUNKLENGTH)) + "$";
      inOffset += MAXCHUNKLENGTH;
    }
  } catch (error) {
    console.log(error);
    return "";
  }
  return output;
}

/**
 * 长文本解密
 * @param { String } str 加密后的base64编码
 * @param { String } key 密钥
 * @return  String
 */
export function rsaDecode(str, key) {
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(key);
  // const maxChunkLength = 172;
  // let output = "";
  // let inOffset = 0;
  // 用$分割
  const arr = str.split("$");
  let output = "";
  // 加上try catch 防止解密失败
  try {
    // while (inOffset < str.length) {
    //   // console.log(string.substring(inOffset, inOffset + maxChunkLength));
    //   output += encrypt.decrypt(str.substring(inOffset, inOffset + maxChunkLength));
    //   inOffset += maxChunkLength;
    // }
    arr.forEach((item) => {
      output += encrypt.decrypt(item);
    });
  } catch (error) {
    console.log(error);
    return "";
  }
  return output;
}
