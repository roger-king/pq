import jwt from 'jsonwebtoken';
import axios from 'axios';
import { API_URL } from '../constants';

export const AUTH_COOKIE_KEY = 'auth_doc_sess';

export async function handleAuthSSR(req: any): Promise<boolean> {
  if (req) {
    const cookie: string = req.headers.cookie;

    if (!cookie) {
      return false;
    }

    try {
      const { status } = await axios.get(`${API_URL}/api/token`, { headers: { Cookie: cookie } });

      if (status === 200) {
        return true;
      }
    } catch (err) {
      // in case of error
      // console.log(err.response.data.msg);
      console.log('redirecting back to main page');
    }
  }

  return false;
}

export function decodeToken(
  token: string,
):
  | string
  | {
      [key: string]: any;
    }
  | null {
  return jwt.decode(token);
}

export async function logout(): Promise<boolean> {
  const { status, data } = await axios.delete(`${API_URL}/api/logout`, { withCredentials: true });

  if (status === 200 && data.success) {
    return true;
  }

  return false;
}

export async function login(email: string, password: string): Promise<boolean> {
  const { status, data } = await axios.post(`${API_URL}/api/login`, { email, password }, { withCredentials: true });

  if (status === 200 && data.success) {
    return true;
  }

  return false;
}

export async function signup(input: { email: string; password: string; handle: string }): Promise<boolean> {
  const { status, data } = await axios.post(`${API_URL}/api/signup`, input, { withCredentials: true });

  if (status === 200 && data.success) {
    return true;
  }

  return false;
}
