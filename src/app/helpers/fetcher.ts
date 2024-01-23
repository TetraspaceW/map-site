export const fetcher =
  (accessToken: string, refreshToken: string) => (url: string) =>
    fetch(url, {
      headers: { access_token: accessToken, refresh_token: refreshToken },
    }).then((res) => res.json());
