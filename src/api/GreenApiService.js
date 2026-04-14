export class GreenApiService {
  constructor(idInstance, apiTokenInstance) {
    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
    this.apiBaseUrl = 'https://api.green-api.com';
  }

  buildUrl(action) {
    return `${this.apiBaseUrl}/waInstance${this.idInstance}/${action}/${this.apiTokenInstance}`;
  }

  async execute(action, method = 'GET', payload = null) {
    const url = this.buildUrl(action);
    
    // ВАЖНО: Мы НЕ ставим Content-Type, чтобы запрос оставался "простым"
    const options = {
      method: method
    };

    if (payload) {
      // Передаем как текст, чтобы браузер не делал OPTIONS запрос
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response.json();
  }

  getSettings() { return this.execute('getSettings'); }
  getStateInstance() { return this.execute('getStateInstance'); }

  sendMessage(phoneNumber, message) {
    return this.execute('sendMessage', 'POST', {
      chatId: `${phoneNumber}@c.us`,
      message
    });
  }

  sendFileByUrl(phoneNumber, urlFile) {
    return this.execute('sendFileByUrl', 'POST', {
      chatId: `${phoneNumber}@c.us`,
      urlFile,
      fileName: 'file'
    });
  }
}
