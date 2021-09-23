export function isVisible(element) {
  return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

export function removeElement(element) {
  const parent = element.parentNode;

  parent.removeChild(element);
}

export function queryAll(selectors, context = document) {
  const queryContext = context || document;

  return Array.prototype.slice.call(queryContext.querySelectorAll(selectors));
}
