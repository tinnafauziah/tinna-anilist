import { actions } from '~/store/auth';
describe('Store: auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const localStorageSetMock = jest.spyOn(localStorage.__proto__, 'setItem');
  it.each([[null], ['code1']])('should call requestToken properly with localStorage: %s', (code) => {
    const newCode = 'code2';
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue(code);
    actions.saveCode(null, newCode);

    expect(localStorageSetMock).toBeCalledWith('code', newCode);
  });
  it('should not call requestToken properly when localStorage code is already exist or fetch same code %s', () => {
    const existingCode = 'code1';
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue(existingCode);
    actions.saveCode(null, existingCode);

    expect(localStorageSetMock).not.toBeCalled();
  });
});
