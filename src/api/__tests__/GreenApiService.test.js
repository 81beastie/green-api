import { GreenApiService } from '../GreenApiService';

describe('GreenApiService', () => {
  const service = new GreenApiService('1101', 'token123');

  test('getSettings performs correct GET request', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ stateInstance: 'authorized' }),
    });

    const data = await service.getSettings();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/getSettings/token123'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(data.stateInstance).toBe('authorized');
  });

  test('sendMessage performs correct POST request', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ idMessage: 'abc' }),
    });

    await service.sendMessage('79990000000', 'Hello');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/sendMessage/token123'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ chatId: '79990000000@c.us', message: 'Hello' })
      })
    );
  });
});
