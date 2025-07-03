import * as msal from '@azure/msal-browser';

/**
 * List the requested scopes (aka. the requested permissions)
 */
const requestedScopes = {
  scopes: ['User.Read', 'Mail.Read'],
};

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
});

export async function signInAndGetUser() {
  await msalInstance.initialize();
  const authResult = await msalInstance.loginPopup(requestedScopes);
  msalInstance.setActiveAccount(authResult.account);
  return authResult.account;
}

export async function getUserMails() {
  await msalInstance.initialize();
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw new Error('Aucun compte actif. Veuillez vous connecter.');
  }
  const response = await msalInstance.acquireTokenSilent({
    ...requestedScopes,
    account,
  });
  const accessToken = response.accessToken;
  const mailsResponse = await fetch(
    'https://graph.microsoft.com/v1.0/me/messages',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!mailsResponse.ok) {
    throw new Error('Erreur lors de la récupération des mails');
  }
  return await mailsResponse.json();
}

export async function getUserMailById(id) {
  await msalInstance.initialize();
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw new Error('Aucun compte actif. Veuillez vous connecter.');
  }
  const response = await msalInstance.acquireTokenSilent({
    ...requestedScopes,
    account,
  });
  const accessToken = response.accessToken;
  const mailResponse = await fetch(
    `https://graph.microsoft.com/v1.0/me/messages/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!mailResponse.ok) {
    throw new Error('Erreur lors de la récupération du mail');
  }
  return await mailResponse.json();
}

export function signOut() {
  msalInstance.logoutPopup();
}
