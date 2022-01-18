import tokenRepository from '../repositories/tokenRepository';

export default {
  userIsAuthenticated: (state) => {
    // todo think: А нужен ли state.isAuthenticated???
    const hasToken = tokenRepository.getToken();

    return state.isAuthenticated || hasToken;
  },
  getToken: (_) => {
    return tokenRepository.getToken();
  },
};
