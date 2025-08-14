# BletNinjaClose

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&text=BletNinjaClose&height=120&fontSize=28" />
</p>

**Extensão para Habblet** que fecha anúncios e popups automaticamente, seguindo a **Habblet Etiqueta** para uma navegação limpa.
Não remove anúncios, apenas minimiza e automatiza o fechamento, permitindo que o usuário tenha uma experiência mais agradável sem infringir regras.

---

## 🔹 Funcionalidades

* Fecha automaticamente anúncios antigos (`closeAd*`) e novos (`svg[aria-label*="fech"]`) visíveis.
* Remove `iframe` e `div` de anúncios identificados (`aswift_*`), mantendo conformidade.
* Popup de créditos com:

  * Fade in/out
  * Checkbox "Não mostrar novamente"
  * Fechamento automático em 10 segundos
* Funciona em desktops e mobile.
* Totalmente automático após carregamento da página, sem necessidade de intervenção manual.

---

## 🛠 Tecnologias Utilizadas

* **JavaScript** (lógica principal da extensão)
* **HTML/CSS** (popup de créditos e estilos inline)
* **Browser Extensions API** (content scripts e permissions)
* **MutationObserver** para monitorar mudanças no DOM

---

## 🚀 Como Usar

1. Clone ou baixe o repositório:

```bash
git clone https://github.com/Nathan7Dev/ads-extensions.git
```

2. Abra o navegador (Chrome/Edge) e vá em `Extensões > Carregar sem compactação`.
3. Selecione a pasta do repositório.
4. Ative a extensão.
5. Navegue no Habblet: os anúncios e popups serão fechados automaticamente.

---

## 🎬 Demonstração

Logs no console mostram quais anúncios foram fechados:

```text
[BletShield] Anúncio antigo fechado: <elemento>
[BletShield] Anúncio novo fechado.
[BletShield] Iframe/Div de anúncio removido.
```

O popup de créditos aparece uma vez e pode ser marcado "Não mostrar novamente".
---

## 📈 Roadmap

* [ ] Adicionar opções de configuração no popup (ativar/desativar tipos específicos de anúncios)
* [ ] Criar interface de controle na extensão
* [ ] Melhorar performance e compatibilidade com outros clones do Habbo
* [ ] Refatoração e modularização do código

---

## 📫 Contato

* **GitHub:** [Nathan7Dev](https://github.com/Nathan7Dev)
* **LinkedIn:** [Nathan Souza](https://www.linkedin.com/in/nathan-souza-3ab855313)
* **Email:** [nathangomesdesouza18@gmail.com](mailto:nathangomesdesouza18@gmail.com)

---

> Obs: A extensão **não remove anúncios**, apenas automatiza uma ação possível manualmente, mantendo compatibilidade com a Habblet Etiqueta.
