type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export async function getContributors(): Promise<Contributor[]> {
  const res = await fetch(
    "https://api.github.com/repos/afsar-dev/Nurui/contributors",
  );
  const data = await res.json();

  if (!res.ok) return [];
  return Array.isArray(data) ? data : [];
}
