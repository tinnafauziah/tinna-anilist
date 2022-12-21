import { actions } from '~/store/auth';
describe('Store: auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const localStorageSetMock = jest.spyOn(localStorage.__proto__, 'setItem');
  it.each([[null], ['eyJ0eXAiOiA']])('should call requestToken properly with localStorage: %s', (token) => {
    const newHash = '#access_token=eyJ0eXAiOiJ&expired=123';
    const newToken = 'eyJ0eXAiOiJ';
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue(token);
    actions.saveToken(null, newHash);

    expect(localStorageSetMock).toBeCalledWith('token', newToken);
  });
  it('should not call requestToken properly when localStorage code is already exist or fetch same code %s', () => {
    const newHash = '#access_token=eyJ0eXAiOiL&expired=123';
    const existingToken = 'eyJ0eXAiOiL';
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue(existingToken);
    actions.saveToken(null, newHash);

    expect(localStorageSetMock).not.toBeCalled();
  });
});
