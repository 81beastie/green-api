export class GreenApiService {
  constructor(idInstance, apiTokenInstance) {
    this.credentials = { idInstance, apiTokenInstance };
    this.baseUrl = 'https://green-api.com';
  }

  get requestUrl() {
    const { idInstance, apiTokenInstance } = this.credentials;
    return `${this.baseUrl}/waInstance${idInstance}/{action}/${apiTokenInstance}`;
  }

  async execute(action, method = 'GET', payload = null) {
    const url = this.requestUrl.replace('{action}', action);
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(payload && { body: JSON.stringify(payload) })
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
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
      fileName: urlFile.split('/').pop()
    });
  }
}
