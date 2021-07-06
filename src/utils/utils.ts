export const DATA_SCENA_ELEMENT_ID = 'data-scena-element-id';

export function getId(el: HTMLElement | SVGElement) {
  return el.getAttribute(DATA_SCENA_ELEMENT_ID)!;
}

export function getIds(els: Array<HTMLElement | SVGElement>): string[] {
  return els.map((el) => getId(el));
}
