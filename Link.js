export default function link(route) {
  window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route } }));
}