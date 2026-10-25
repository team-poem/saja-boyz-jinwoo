// Naver의 HTML 마커는 React 트리 밖에서 SDK가 관리한다.
export function createArticleMarker(
  count: number,
  label: string,
  side: number,
) {
  const content = document.createElement('button');

  content.type = 'button';
  content.setAttribute('aria-label', label);
  content.textContent = String(count);
  content.className =
    'flex items-center justify-center rounded-full border-solid border-white/40 bg-brand/60 p-0 leading-none font-extrabold text-white';
  content.style.width = `${side}px`;
  content.style.height = `${side}px`;
  content.style.borderWidth = `${Math.min(1.5, side / 48)}px`;
  content.style.fontSize = `${Math.min(27, Math.max(14.4, side * 0.375), (side * 0.88) / (String(count).length * 0.65))}px`;
  content.style.boxShadow = `0 ${side / 12}px ${side / 4}px rgb(0 0 0 / 8%)`;

  const setSelected = (selected: boolean) => {
    content.setAttribute('aria-pressed', String(selected));
    content.classList.toggle('ring-2', selected);
    content.classList.toggle('ring-brand', selected);
    content.classList.toggle('ring-offset-2', selected);
  };

  setSelected(false);

  return { content, side, setSelected };
}
