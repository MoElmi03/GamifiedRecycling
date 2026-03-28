import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { auth } from './firebase';

WebBrowser.maybeCompleteAuthSession();

// ─── Google ──────────────────────────────────────────────────────────────────

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '47059168227-588or4613b4v7b87ggkq611lql3106mt.apps.googleusercontent.com',
    webClientId: '47059168227-akuuapmjsjau59i2792i0ee8jgde9gio.apps.googleusercontent.com',
  });

  async function handleGoogleResponse() {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      await signInWithCredential(auth, credential);
    } else if (response?.type === 'error') {
      throw new Error(response.error?.message ?? 'Google sign-in failed');
    }
  }

  return { request, promptAsync, handleGoogleResponse, response };
}

// ─── Facebook ────────────────────────────────────────────────────────────────

export function useFacebookAuth() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '1261481449455449',
  });

  async function handleFacebookResponse() {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const credential = FacebookAuthProvider.credential(access_token);
      await signInWithCredential(auth, credential);
    } else if (response?.type === 'error') {
      throw new Error(response.error?.message ?? 'Facebook sign-in failed');
    }
  }

  return { request, promptAsync, handleFacebookResponse, response };
}


