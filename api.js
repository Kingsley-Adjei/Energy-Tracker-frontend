import Constants from "expo-constants";
export const API_URL = Constants.expoConfig.extra;

export const signUp = async (email, password) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};

export const signIn = async (email, password) => {
  const res = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};

export const signInWithOAuth = async (provider, idToken, userInfo) => {
  const res = await fetch(`${API_URL}/oauth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,
      idToken,
      email: userInfo?.user?.email,
      name: userInfo?.user?.name,
      profileImage: userInfo?.user?.photo,
    }),
  });
  return await res.json();
};
