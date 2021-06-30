/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class ProductLit extends LitElement {
  static get styles() {
    return css`
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
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      name: {type: String},
      price: {type: Number},
      image: {type: String},
      url: {type: String},
      discount: {type: Number},
      rate: {type: Number},
      newprice: {type: Number},
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.price = 0;
    this.image = '';
    this.url = '';
    this.discount = '';
    this.rate = 0;
    this.rate = '';
    this.newprice = 0;
  }

  render() {
    return html`
    <div class="container" @click=${this._onClick}>
      <img src=${this.image} class="image" alt="product image" />
      <div class="info-container">
        <p class="name">${this.name}</p>
        <div class="price-container">
          <div class="left-container">
            <p class="new-price">${this.newprice}</p>
            <div class="old-price">
              <p class="price">Normal:</p>
              <p class="price-number">$${this.price}</p>
            </div>
          </div>
          <p class="discount">-${this.discount}%</p>
        </div>
        <div class="rating">
        <img src="https://static.wikia.nocookie.net/roblox/images/1/11/Video_Star.png" class="star" alt="star rating" />
        <p class="rate">${this.rate}</p>
        </div>
      </div>
    </div>
    `;
  }

  _onClick() {
    window.location.href=this.url;
  }
}

window.customElements.define('sell-item-lit', ProductLit);





