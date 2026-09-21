type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/afsar-dev/Nurui/contributors",
    );
    if (!res.ok) {
      console.warn("Failed to fetch contributors from GitHub: status " + res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }
}
