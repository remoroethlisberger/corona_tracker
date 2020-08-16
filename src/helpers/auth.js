import JwtDecode from 'jwt-decode';
import { easeCircleOut } from 'd3';

const cookieName = '_ctlogin';

const auth = {
  decode: (jwt) => {
    return JwtDecode(jwt);
  },
  login: (token) => {
    document.cookie = cookieName + '=' + token + ';expires=' + ';path=/';
  },
  getCookie: () => {
    let cookies = document.cookie.match(
      '(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)'
    );
    return cookies ? cookies.pop() : false;
  },
  isValid: () => {
    let jwt = auth.getCookie();
    if (!jwt) {
      return false;
    }
    let token = auth.decode(jwt);

    if (token.exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
  },
};

export default auth;
