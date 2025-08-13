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
      console.log("[BletShield] Anúncio antigo fechado:", btn);
      btn.click();
    }
  });
}

function closeNewAd() {
  document.querySelectorAll('svg[aria-label*="fech"][role="button"]').forEach(el => {
    if (isInsideFriendBar(el)) return;
    if (isVisible(el) && typeof el.click === 'function') {
      console.log('[BletShield] Anúncio novo fechado.', el);
      el.click();
    }
  });
}

function removeAdFrames() {
  document.querySelectorAll('div[id^="aswift_"], iframe[id^="aswift_"]').forEach(el => {
    if (isInsideFriendBar(el)) return;
    if (typeof el.remove === 'function') {
      console.log('[BletShield] Iframe/Div de anúncio removido.', el);
      el.remove();
    }
  });
}

// Cria o popup com animação, acessibilidade, checkbox "não mostrar", etc
function showCreditsPopup() {
  if (localStorage.getItem('bletCloseNoShowAgain') === 'true') return;
  if (document.querySelector('.credit-popup')) return;

  const popupHTML = `
    <div class="credit-popup-overlay" tabindex="-1" aria-modal="true" role="dialog" style="
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: Arial, sans-serif;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    ">
      <div class="credit-popup-box" role="document" style="
        background: white;
        border-radius: 8px;
        max-width: 360px;
        width: 90%;
        padding: 20px 25px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        text-align: center;
        color: #333;
        transform: translateY(-20px);
        transition: transform 0.3s ease;
      ">
        <h2 style="margin-top: 0; margin-bottom: 15px; font-weight: 600; font-size: 22px;">Créditos</h2>
        <p style="margin-bottom: 20px; line-height: 1.4; font-size: 15px;">
          Extensão desenvolvida por Nathan.<br><br>
          Sem fins de infringir a Habblet etiqueta.<br><br>
          Este popup fecha automaticamente em 10 segundos ou ao clicar no botão abaixo.
        </p>
        <label style="display: block; margin-bottom: 15px; font-size: 14px; cursor: pointer;">
          <input type="checkbox" id="dontShowAgain" style="margin-right: 8px; vertical-align: middle;">
          Não mostrar novamente
        </label>
        <button id="closeCreditPopupBtn" style="
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 15px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          outline-offset: 2px;
        ">
          Fechar
        </button>
        <div style="margin-top: 10px; font-size: 12px; color: #777;">Versão 1.0.0</div>
      </div>
    </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = popupHTML.trim();
  const overlay = tempDiv.firstChild;
  document.body.appendChild(overlay);

  const popupBox = overlay.querySelector('.credit-popup-box');
  const closeBtn = overlay.querySelector('#closeCreditPopupBtn');
  const checkbox = overlay.querySelector('#dontShowAgain');

  // Função pra fechar o popup com fade out
  function closePopup() {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    popupBox.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }

  // Fade in
  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    popupBox.style.transform = 'translateY(0)';
    closeBtn.focus(); // foco no botão para acessibilidade
  }, 10);

  // Evento fechar ao clicar no botão
  closeBtn.addEventListener('click', () => {
    if (checkbox.checked) {
      localStorage.setItem('bletCloseNoShowAgain', 'true');
    }
    closePopup();
  });

  // Fechar ao clicar fora da caixa
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (checkbox.checked) {
        localStorage.setItem('bletCloseNoShowAgain', 'true');
      }
      closePopup();
    }
  });

  // Botão com onmouseover/onmouseout via JS (melhor que inline)
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.backgroundColor = '#0056b3';
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.backgroundColor = '#007bff';
  });

  // Fecha automaticamente após 10s, se popup ainda existir e checkbox não estiver marcado
  setTimeout(() => {
    if (document.body.contains(overlay) && !checkbox.checked) {
      closePopup();
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

// Inicializações
removeAds();
showCreditsPopup();