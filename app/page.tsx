
"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./globals.css";

const products = [
  { name: "Chocolate Chip", type: "COOKIE", price: "€3.00", description: "Golden edges, soft centre, dark chocolate.", symbol: "✳" },
  { name: "Strawberry Cloud", type: "COOKIE", price: "€3.50", description: "White chocolate with a strawberry twist.", symbol: "♡" },
  { name: "Brown Butter Bliss", type: "COOKIE", price: "€3.50", description: "Brown butter and a touch of sea salt.", symbol: "✳" },
  { name: "Fudgy Brownie", type: "BROWNIE", price: "€3.00", description: "Rich, chocolatey, and perfectly fudgy.", symbol: "♡" },
  { name: "Vanilla Dream", type: "COOKIE", price: "€3.00", description: "A buttery vanilla cookie with white chocolate.", symbol: "✳" },
  { name: "The Saré Box", type: "GIFT BOX", price: "€18.00", description: "A little box filled with our favourites.", symbol: "♡" },
];

const flavours = products.map((product) => product.name);

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);


  const [state, handleSubmit, reset] = useForm("mjyyyzzd");

  function toggleFlavour(name: string) {
    setSelected((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  }


  const [minPickupDate, setMinPickupDate] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    const localDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setMinPickupDate(localDate);
  }, []);


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
        <p className="tagline">Little treats, made to make your day.</p>
        <a className="outline-button" href="#menu">DISCOVER THE MENU ↓</a>
        <p className="hero-bottom">HANDMADE · FRESHLY BAKED · MADE WITH LOVE</p>
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
              <p className="product-description">{product.description}</p>
              <button
                className="add-button"
                onClick={() => {
                  toggleFlavour(product.name);
                  document.getElementById("order")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {selected.includes(product.name) ? "SELECTED ✓" : "ADD TO ORDER +"}
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
          <p>Tell us what you're craving. Send an order request and we'll confirm the details with you.</p>
        </div>

        {state.succeeded ? (
          <div className="success">
            <div className="success-icon"></div>
            <h2>Thank you, lovely!</h2>
            <p>Your order request has been sent to Saré.</p>
            <p className="notice">
              We'll review your request and contact you by email.
              Your order is not confirmed until you hear from us.
            </p>

            <button
              className="outline-button"
              type="button"
              onClick={() => reset()}
            >
              BACK TO THE FORM
            </button>
          </div>
        ) : (
          <form
            className="order-form"
            onSubmit={(event) => {
              if (selected.length === 0) {
                event.preventDefault();
                alert("Please choose at least one bakery item.");
                return;
              }

              handleSubmit(event);
            }}
          >
            <input
              type="hidden"
              name="flavours"
              value={selected.join(", ")}
            />

            <input
              type="hidden"
              name="_subject"
              value="New Saré order request"
            />
            <div className="form-title"><span>01</span><h2>Your details</h2></div>

            <div className="fields">
              <label>
                Full name *
                <input name="name" placeholder="Your name" required />
              </label>
              <label>
                Phone number *
                <input name="phone" type="tel" placeholder="+372 ..." required />
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

            <div className="form-title"><span>02</span><h2>Your treats</h2></div>
            <fieldset className="flavours">
              <legend>Choose your flavours *</legend>
              <p className="small-note">Select all that apply.</p>
              <div className="flavour-grid">
                {flavours.map((flavour) => (
                  <label className="flavour" key={flavour}>
                    <input
                      type="checkbox"
                      checked={selected.includes(flavour)}
                      onChange={() => toggleFlavour(flavour)}
                    />
                    <span>{flavour}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="fields">
              <label>
                Number of sweets *
                <select name="quantity" defaultValue="" required>
                  <option value="" disabled>Choose quantity</option>
                  {Array.from({ length: 12 }, (_, i) => (i + 1) * 2).map((count) => (
                    <option key={count} value={count}>
                      {count} pieces
                    </option>
                  ))}
                </select>
              </label>

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
                <p><strong>Pickup location</strong></p>
                <p>Smartpost parcel terminal</p>
                <p>Pärnu mnt. 22, 10141 Tallinn, Estonia</p>
                <p className="small-note">
                  We'll notify you by email when your sweets have been delivered
                  and are ready to collect.
                </p>
              </div>

              <div className="wide payment-info">
                <p><strong>Payment by bank transfer</strong></p>
                <p>
                  After reviewing your order, we'll email you the total price
                  and payment instructions. Please wait for the invoice before
                  sending payment.
                </p>
              </div>
              <label className="wide">
                Allergies or special notes
                <textarea name="notes" rows={4} placeholder="Anything we should know?" />
              </label>
            </div>

            <p className="small-note">* Required fields</p>
            <ValidationError errors={state.errors} />

            <button
              className="submit-button"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? "SENDING..." : "SEND ORDER REQUEST"}
              {!state.submitting && <span> ↗</span>}
            </button>
            <p className="form-disclaimer">
              Your order is not confirmed until you receive a confirmation from Saré.
              Sending this form does not confirm your order.
            </p>
          </form>
        )}
      </section>

      <footer>
        <a className="footer-brand" href="#home" aria-label="Saré home">
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
