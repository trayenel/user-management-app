export async function getData(path) {
  const res = await fetch(path);
  return res.json();
}

export function getQueryParam(param) {
  return Number(new URLSearchParams(window.location.search).get(param));
}
