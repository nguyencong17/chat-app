export function isActiveLink(href: string, pathname: string) {
  let active: boolean = false;
  if(href===pathname) active = true;
  return active;
}