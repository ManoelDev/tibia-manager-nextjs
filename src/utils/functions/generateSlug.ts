function generateSlug(title: string) {
  const cleanedTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim();
  const slug = cleanedTitle.replace(/\s+/g, '-');

  return slug;
}

export { generateSlug }