export async function fetchYoutubeThumbnail(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(
      `/api/youtube-thumbnail?url=${encodeURIComponent(url)}`
    );
    const data = (await res.json()) as { thumbnailUrl: string | null };
    return data.thumbnailUrl ?? undefined;
  } catch {
    return undefined;
  }
}
