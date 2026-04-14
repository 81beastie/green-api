export class GreenApiService {
  constructor(idInstance, apiTokenInstance) {
    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
    this.apiBaseUrl = 'https://api.green-api.com';
    // Используем raw прокси, чтобы не менять структуру JSON
    this.proxyUrl = 'https://allorigins.win';
  }

  buildUrl(action) {
    const targetUrl = `${this.apiBaseUrl}/waInstance${this.idInstance}/${action}/${this.apiTokenInstance}`;
    // Кодируем URL, чтобы прокси корректно его воспринял
    return `${this.proxyUrl}${encodeURIComponent(targetUrl)}`;
  }

  async execute(action, method = 'GET', payload = null) {
    const url = this.buildUrl(action);
    
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...(payload && { body: JSON.stringify(payload) })
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status: ${response.status}. Details: ${errorText}`);
    }

    return response.json();
  }

  getSettings() { 
    return this.execute('getSettings'); 
  }
  
  getStateInstance() { 
    return this.execute('getStateInstance'); 
  }

  sendMessage(phoneNumber, message) {
    return this.execute('sendMessage', 'POST', {
      chatId: `${phoneNumber}@c.us`,
      message
    });
  }

  sendFileByUrl(phoneNumber, urlFile) {
    const fileName = urlFile.split('/').pop() || 'file';
    return this.execute('sendFileByUrl', 'POST', {
      chatId: `${phoneNumber}@c.us`,
      urlFile,
      fileName
    });
  }
}
