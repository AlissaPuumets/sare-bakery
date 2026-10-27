
"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./globals.css";

const products = [
  {
    name: "Chocolate Chip",
    type: "COOKIE",
    price: "€3.00",
    description: "Golden edges, soft centre, dark chocolate.",
    symbol: "✳",
  },
  {
    name: "Strawberry Cloud",
    type: "COOKIE",
    price: "€3.50",
    description: "White chocolate with a strawberry twist.",
    symbol: "♡",
  },
  {
    name: "Brown Butter Bliss",
    type: "COOKIE",
    price: "€3.50",
    description: "Brown butter and a touch of sea salt.",
    symbol: "✳",
  },
  {
    name: "Fudgy Brownie",
    type: "BROWNIE",
    price: "€3.00",
    description: "Rich, chocolatey, and perfectly fudgy.",
    symbol: "♡",
  },
  {
    name: "Vanilla Dream",
    type: "COOKIE",
    price: "€3.00",
    description: "A buttery vanilla cookie with white chocolate.",
    symbol: "✳",
  },
  {
    name: "The Saré Box",
    type: "GIFT BOX",
    price: "€18.00",
    description: "A little box filled with our favourites.",
    symbol: "♡",
  },
];

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map((product) => [product.name, 0]))
  );

  const [minPickupDate, setMinPickupDate] = useState("");

  const [state, handleSubmit, reset] = useForm("mjyyyzzd");

  const totalQuantity = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const orderDetails = products
    .filter((product) => quantities[product.name] > 0)
    .map(
      (product) =>
        `${product.name}: ${quantities[product.name]} piece(s)`
    )
    .join("\n");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    const localDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setMinPickupDate(localDate);
  }, []);

  function updateQuantity(name: string, quantity: number) {
    setQuantities((previous) => ({
      ...previous,
      [name]: quantity,
    }));
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Saré home">
          <img src="/sare-logo.png" alt="Saré bakery logo" />
        </a>

        <nav>
          <a href="#menu">THE MENU</a>
          <a href="#order">YOUR ORDER</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <p className="eyebrow">A SMALL BAKERY WITH A BIG HEART</p>

        <div className="hero-wordmark">
          <img src="/sare-logo.png" alt="Saré bakery" />
        </div>

        <p className="tagline">
          Little treats, made to make your day.
        </p>

        <a className="outline-button" href="#menu">
          DISCOVER THE MENU ↓
        </a>

        <p className="hero-bottom">
          HANDMADE · FRESHLY BAKED · MADE WITH LOVE
        </p>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-title">
          <p className="eyebrow">A LITTLE SOMETHING SWEET</p>
          <h1>The Menu</h1>
          <p>Find your new favourite.</p>
        </div>

        <div className="menu-scroll">
          {products.map((product, index) => (
            <article className="product" key={product.name}>
              <div className={`product-art art-${index + 1}`}>
                <span>{product.symbol}</span>
                <small>SARÉ PATISSERIE</small>
              </div>

              <p className="product-type">{product.type}</p>

              <div className="product-heading">
                <h2>{product.name}</h2>
                <span>{product.price}</span>
              </div>

              <p className="product-description">
                {product.description}
              </p>

              <button
                type="button"
                className="add-button"
                onClick={() => {
                  updateQuantity(
                    product.name,
                    quantities[product.name] > 0 ? 0 : 2
                  );

                  document.getElementById("order")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {quantities[product.name] > 0
                  ? `${quantities[product.name]} IN ORDER ✓`
                  : "ADD TO ORDER +"}
              </button>
            </article>
          ))}
        </div>

        <p className="scroll-hint">SCROLL TO EXPLORE →</p>
      </section>

      <section className="order-section" id="order">
        <div className="order-intro">
          <p className="eyebrow">MADE JUST FOR YOU</p>
          <h1>A little sweetness, your way.</h1>
          <p>
            Tell us what you're craving. Send an order request and
            we'll confirm the details with you.
          </p>
        </div>

        {state.succeeded ? (
          <div className="success">
            <div className="success-icon"></div>

            <h2>Thank you!</h2>

            <p>Your order request has been sent to Saré.</p>

            <p className="notice">
              We'll review your request and contact you by email.
              Your order is not confirmed until you hear from us.
            </p>

            <button
              className="outline-button"
              type="button"
              onClick={() => {
                reset();
                setQuantities(
                  Object.fromEntries(
                    products.map((product) => [product.name, 0])
                  )
                );
              }}
            >
              BACK TO THE FORM
            </button>
          </div>
        ) : (
          <form
            className="order-form"
            onSubmit={(event) => {
              if (
                totalQuantity < 2 ||
                totalQuantity > 24 ||
                totalQuantity % 2 !== 0
              ) {
                event.preventDefault();

                alert(
                  "Please choose between 2 and 24 pieces in total, with an even total quantity."
                );

                return;
              }

              handleSubmit(event);
            }}
          >
            <input
              type="hidden"
              name="orderDetails"
              value={orderDetails}
            />

            <input
              type="hidden"
              name="totalQuantity"
              value={totalQuantity}
            />

            <input
              type="hidden"
              name="_subject"
              value="New Saré order request"
            />

            <div className="form-title">
              <span>01</span>
              <h2>Your details</h2>
            </div>

            <div className="fields">
              <label>
                Full name *
                <input
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Phone number *
                <input
                  name="phone"
                  type="tel"
                  placeholder="+372 ..."
                  required
                />
              </label>

              <label className="wide">
                Email address *
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="form-title">
              <span>02</span>
              <h2>Your treats</h2>
            </div>

            <fieldset className="flavours">
              <legend>Choose your treats *</legend>

              <p className="small-note">
                Choose how many pieces of each treat you'd like.
                Leave unwanted items at 0.
              </p>

              <div className="flavour-grid">
                {products.map((product) => (
                  <label className="flavour" key={product.name}>
                    <span>{product.name}</span>

                    <select
                      aria-label={`Quantity of ${product.name}`}
                      value={quantities[product.name]}
                      onChange={(event) =>
                        updateQuantity(
                          product.name,
                          Number(event.target.value)
                        )
                      }
                    >
                      {Array.from(
                        { length: 25 },
                        (_, index) => index
                      ).map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              <div className="order-total">
                <p>
                  <strong>Total pieces:</strong> {totalQuantity}
                </p>

                <p className="small-note">
                  Minimum 2 pieces, maximum 24 pieces per order.
                  Your total must be an even number.
                </p>
              </div>
            </fieldset>

            <div className="fields">
              <label>
                Preferred pickup date *
                <input
                  name="pickupDate"
                  type="date"
                  min={minPickupDate}
                  required
                />
              </label>

              <div className="wide pickup-info">
                <p>
                  <strong>Pickup location</strong>
                </p>

                <p>Smartpost parcel terminal</p>
                <p>Pärnu mnt. 22, 10141 Tallinn, Estonia</p>

                <p className="small-note">
                  We'll notify you by email when your sweets have
                  been delivered and are ready to collect.
                </p>
              </div>

              <div className="wide payment-info">
                <p>
                  <strong>Payment by bank transfer</strong>
                </p>

                <p>
                  After reviewing your order, we'll email you the
                  total price and payment instructions. Please wait
                  for the invoice before sending payment.
                </p>
              </div>

              <label className="wide">
                Allergies or special notes
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Anything we should know?"
                />
              </label>
            </div>

            <p className="small-note">* Required fields</p>

            <ValidationError errors={state.errors} />

            <button
              className="submit-button"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting
                ? "SENDING..."
                : "SEND ORDER REQUEST"}

              {!state.submitting && <span> ↗</span>}
            </button>

            <p className="form-disclaimer">
              Your order is not confirmed until you receive a
              confirmation from Saré. Sending this form does not
              confirm your order.
            </p>
          </form>
        )}
      </section>

      <footer>
        <a
          className="footer-brand"
          href="#home"
          aria-label="Saré home"
        >
          <img src="/tekst.png" alt="Saré" />
        </a>

        <p>Some things are worth the wait.</p>

        <a
          className="instagram"
          href="https://www.instagram.com/sarehomebakery/?utm_source=ig_web_button_share_sheet"
          target="_blank"
          rel="noreferrer"
        >
          FIND US ON INSTAGRAM ↗
        </a>

        <div className="footer-bottom">
          <span>© SARÉ</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
