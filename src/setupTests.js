import '@testing-library/jest-dom';

// —оздаем глобальный мок дл€ fetch
global.fetch = jest.fn();

// —брасываем моки перед каждым тестом
beforeEach(() => {
  fetch.mockClear();
});
