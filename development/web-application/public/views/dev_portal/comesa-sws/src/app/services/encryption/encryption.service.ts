import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private baseUrl: string;
  private secretKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = AppSettings.base_url + '/api/sysadministration';
    this.secretKey = AppSettings.SecureKey;
  }

  /**
   * Encrypt data (supports strings and arrays)
   * @param data Data to encrypt
   * @returns Encrypted base64 string
   */
  OnEncryptData(data: string | any[] | object): string {
    try {
      // Convert arrays/objects to JSON string
      const dataToEncrypt = typeof data === 'string' 
        ? data 
        : JSON.stringify(data);

      // Generate a random IV
      const iv = CryptoJS.lib.WordArray.random(16);

      // Convert the key to CryptoJS format
      const key = CryptoJS.enc.Base64.parse(this.secretKey);

      // Encryption options
      const options = {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      };

      // Perform AES encryption
      let encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, options);
      encrypted = encrypted.toString();

      // Convert IV to Base64 format
      const ivBase64 = CryptoJS.enc.Base64.stringify(iv);

      // Calculate HMAC for integrity check
      const mac = CryptoJS.HmacSHA256(ivBase64 + encrypted, key).toString();

      // Prepare final result as JSON object
      const result = {
        iv: ivBase64,
        value: encrypted,
        mac: mac,
        type: typeof data // Store original type for decryption
      };

      // Convert result to a UTF-8 encoded string and then Base64 format
      let resultStr = JSON.stringify(result);
      resultStr = CryptoJS.enc.Utf8.parse(resultStr);

      return CryptoJS.enc.Base64.stringify(resultStr);
    } catch (error) {
      console.error('Encryption failed', error);
      return '';
    }
  }

  /**
   * Decrypt data (returns original type)
   * @param encryptStr Encrypted base64 string
   * @returns Decrypted data (string, array, or object)
   */
  OnDecryptData(encryptStr: string): string | any[] | object | null {
    try {
      // Base64 decode the input
      const encryptedData = CryptoJS.enc.Base64.parse(encryptStr);
      let decryptedStr = encryptedData.toString(CryptoJS.enc.Utf8);
      const encryptData = JSON.parse(decryptedStr);

      // Extract IV
      const iv = CryptoJS.enc.Base64.parse(encryptData.iv);
      
      // Decrypt using AES-CBC
      let decrypted = CryptoJS.AES.decrypt(encryptData.value, CryptoJS.enc.Base64.parse(this.secretKey), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      // Convert to UTF-8 string
      const decryptedContent = CryptoJS.enc.Utf8.stringify(decrypted);
      return JSON.parse(decryptedContent);
    } catch (error) {
      console.error('Decryption failed', error);
      return null;
    }
  }
}