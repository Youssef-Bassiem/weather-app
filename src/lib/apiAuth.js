import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase";

export async function signUp({ email, password, username }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: username,
  });
  await sendEmailVerification(user);
  await logout();
  return user;
}

export async function signIn(Provider) {
  return await signInWithPopup(auth, Provider);
}

export async function login({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  console.log("logoutApi");
  return await signOut(auth);
}

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? resolve(user) : resolve(null); // No user logged in
    }, reject);

    // Unsubscribe on cleanup
    return () => unsubscribe();
  });
}
