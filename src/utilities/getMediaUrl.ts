/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  // Returns an empty text when there is no address.
  if (!url) return ''

  // Checks if cache tag is set and cache tag is not empty.
  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Returns the address with the cache tag when there is one.
  return cacheTag ? `${url}?${cacheTag}` : url
}
