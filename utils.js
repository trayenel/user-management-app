export async function getData(path) {
  const res = await fetch(path);
  return res.json();
}
