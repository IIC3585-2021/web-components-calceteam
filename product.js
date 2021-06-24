const styles = /*css*/`
  p {
    margin: 0;
  }
  .container {
    border: 1px solid #b7b7b7;
    border-radius: 4px;
    width: 12vw;
    height: 30vh;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .image {
    max-width: 10vw;
    max-height: 18vh;
    margin: 1vh 1vw;
  }
  .info-container {
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: center;
    height: 10vh;
    width: 10vw;
    padding: 0 1vw;
    border-top: 1px solid #b7b7b7;
  }
  .price-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50%;
  }
  .left-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 75%;
    justify-content: center;
  }
  .discount {
    background-color: #b54a97;
    color: #ffffff;
    font-size: .9vw;
    border-radius: 3px;
    padding: 2px 3px;
  }
  .price {
    font-size: .7vw;
    color: #5e5e5e;
    display: inline;
  }
  .price-number {
    font-size: .7vw;
    color: #5e5e5e;
    text-decoration: line-through #9da1a3;
    margin-left: .1vw;
  }
  .new-price {
    color: #11b4f0;
    font-size: .9vw;
    font-weight: bold;
  }
  .name {
    color: #87898a;
    font-size: .8vw;
  }
  .star {
    width: .8vw;
  }
  .rate {
    font-size: .7vw;
    margin-left: .2vw;
    color: #5e5e5e;
    font-weight: bold;
  }
  .rating {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .old-price {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement('template');
template.innerHTML =/*html*/`
  <div class="container">
    <img src="" class="image" alt="product image" />
    <div class="info-container">
      <p class="name">'Nombre'</p>
      <div class="price-container">
        <div class="left-container">
          <p class="new-price">$0</p>
          <div class="old-price">
            <p class="price">Normal:</p>
            <p class="price-number">$0</p>
          </div>
        </div>
        <p class="discount">-100%</p>
      </div>
      <div class="rating">
      <img src="https://static.wikia.nocookie.net/roblox/images/1/11/Video_Star.png" class="star" alt="star rating" />
      <p class="rate">4.5</p>
      </div>
    </div>
  </div>
`;

class Product extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ 'mode': 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  static get observedAttributes() {
    return ['name', 'price', 'image', 'url', 'discount', 'rate', 'newprice'];
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === 'name') {
      this.shadowRoot.querySelector('.name').textContent = newValue;
      return;
    }
    if (attribute === 'price') {
      this.shadowRoot.querySelector('.price-number').textContent = `$${newValue}`;
      return;
    }
    if (attribute === 'rate') {
      this.shadowRoot.querySelector('.rate').textContent = newValue;
      return;
    }
    if (attribute === 'url') {
      this.shadowRoot.querySelector('.container').addEventListener('click', () => {
        window.location.href=newValue
      });
      return;
    }
    if (attribute === 'image') {
      this.shadowRoot.querySelector('.image').setAttribute('src', newValue);
      return;
    }
    if (attribute === 'discount') {
      this.shadowRoot.querySelector('.discount').textContent = `-${newValue}%`;
      return;
    }
    if (attribute === 'newprice') {
      this.shadowRoot.querySelector('.new-price').textContent = `$${newValue}`;
      return;
    }
  }

  conectedCallback() {}

  disconectedCallback() {
    this.shadowRoot.querySelector('.container').removeEventListener()
  }
}

window.customElements.define('sell-item', Product);
