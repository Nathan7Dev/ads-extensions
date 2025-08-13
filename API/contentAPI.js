export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');

  const contentScript = `
console.log('%cExtensão desenvolvida por Nathan - Sem fins de infringir a Habblet etiqueta.',
  'color: green; font-weight: bold; font-size: 14px;');

const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

function isVisible(elem) {
  return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
}

function isInsideFriendBar(el) {
  return el.closest('.friend-bar-item') !== null;
}

function closeOldAd() {
  document.querySelectorAll('[id^="closeAd"] a').forEach(btn => {
    if (isInsideFriendBar(btn)) return;
    if (btn.innerText.trim().toLowerCase() === 'x' && isVisible(btn) && typeof btn.click === 'function') {
      console.log("[AutoCloseAds] Anúncio antigo fechado:", btn);
      btn.click();
    }
  });
}

function closeNewAd() {
  document.querySelectorAll('svg[aria-label*="fech"][role="button"]').forEach(el => {
    if (isInsideFriendBar(el)) return;
    if (isVisible(el) && typeof el.click === 'function') {
      console.log('[AutoCloseAds] Anúncio novo fechado.', el);
      el.click();
    }
  });
}

function removeAdFrames() {
  document.querySelectorAll('div[id^="aswift_"], iframe[id^="aswift_"]').forEach(el => {
    if (isInsideFriendBar(el)) return;
    if (typeof el.remove === 'function') {
      console.log('[AutoCloseAds] Iframe/Div de anúncio removido.', el);
      el.remove();
    }
  });
}

function showCreditsPopup() {
  if (document.querySelector('.draggable-window.credit-popup')) return;

  const popupHTML = \`
    <div class="position-absolute draggable-window credit-popup" style="z-index: 10000; top: calc(-175px + 50vh); left: calc(-175px + 50vw); width: 350px; max-width: 95vw; max-height: 90vh; overflow: auto;">
      <div class="d-flex overflow-hidden position-relative flex-column nitro-card theme-primary-slim nitro-alert nitro-alert-motd">
        <div class="d-flex position-relative flex-column gap-2 align-items-center justify-content-center drag-handler container-fluid nitro-card-header">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <span class="nitro-card-header-text">Créditos</span>
            <div class="position-absolute end-0 nitro-card-header-close" style="cursor:pointer;">×</div>
          </div>
        </div>
        <div class="d-flex flex-grow-1 overflow-hidden flex-column justify-content-between container-fluid content-area text-black" style="font-size: 14px; line-height: 1.3;">
          <div class="d-flex h-100 overflow-auto" style="max-height: 180px; padding: 0 8px;">
            <div class="notification-text overflow-y-auto d-flex flex-column w-100" style="white-space: pre-wrap;">
              Extensão desenvolvida por Nathan.<br><br>
              Sem fins de infringir a Habblet etiqueta.<br><br>
              Este popup fecha automaticamente em 10 segundos ou ao clicar no botão abaixo.
            </div>
          </div>
          <div class="d-flex flex-column align-items-center" style="padding: 8px;">
            <hr class="my-2 w-100">
            <div class="d-flex align-items-center justify-content-center btn btn-primary btn-sm" style="cursor:pointer;">Fechar</div>
          </div>
        </div>
      </div>
    </div>
  \`;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = popupHTML.trim();
  const popupElement = tempDiv.firstChild;

  document.body.appendChild(popupElement);

  popupElement.querySelector('.nitro-card-header-close').addEventListener('click', () => {
    popupElement.remove();
  });

  popupElement.querySelector('.btn.btn-primary').addEventListener('click', () => {
    popupElement.remove();
  });

  setTimeout(() => {
    if (document.body.contains(popupElement)) {
      popupElement.remove();
    }
  }, 10000);
}

let isRunning = false;
function removeAds() {
  if (isRunning) return;
  isRunning = true;

  closeOldAd();
  closeNewAd();
  removeAdFrames();

  isRunning = false;
}

let debounceTimeout;
const debouncedRemoveAds = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(removeAds, 300);
};

const observer = new MutationObserver(debouncedRemoveAds);
observer.observe(document.body, { childList: true, subtree: true });

removeAds();
showCreditsPopup();
`;

  res.status(200).send(contentScript);
}