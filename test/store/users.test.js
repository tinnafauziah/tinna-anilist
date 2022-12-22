import { actions, mutations, getters, state } from '~/store/users';
import Viewer from '~/test/mocks/api-mocks/current-user'
import { gql } from 'nuxt-graphql-request';
describe('Store: anime', () => {
  actions.$graphql = {
    default: {
      request: jest.fn().mockReturnValue({ Viewer }),
    }
  };
  const commit = jest.fn();
  jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue('eyJ0eXAiOiJ');

  it('should have deafult state value', () => {
    expect(state().currentUser).toBe(null);
  });
  it('should call getters getCurrentUser', () => {
    const testState = { getCurrentUser: Viewer };
    getters.getCurrentUser(testState);
    expect(testState.getCurrentUser).toEqual(Viewer);
  });
  it('should call mutations setCurrentUser properly', () => {
    const testState = { currentUser: null };
    mutations.setCurrentUser(testState, Viewer);
    expect(testState.currentUser).toStrictEqual(Viewer);
  });

  it('should call actions fetchCurrentUser properly', () => {
    const query = gql`
      query {
        Viewer {
          id
          name
        }
      }
    `;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer eyJ0eXAiOiJ",
      "Content-Type": "application/json",
    }
    actions.fetchCurrentUser({ commit }, {});
    expect(actions.$graphql.default.request).toBeCalledWith(query, {}, headers);
  });
  it('should call actions fetchCurrentUser properly', () => {
    actions.clearCurrentUser({ commit }, {});
    expect(commit).toBeCalledWith('setCurrentUser', null);
  });
});
