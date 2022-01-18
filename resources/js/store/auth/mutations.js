import tokenRepository from '../repositories/tokenRepository';

export default {
  LOGIN: (state, { token }) => {
    tokenRepository.saveToken(token);
    state.isAuthenticated = true;
  },
  LOGOUT: (state) => {
    // todo fixme: This doesn't reset state ... wtf?
    tokenRepository.removeToken();
    state.isAuthenticated = false;
  },
};
