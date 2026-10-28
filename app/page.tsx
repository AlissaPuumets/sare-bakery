
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
    symbol: "♡",
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
    symbol: "♡",
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
    symbol: "♡",
  },
  {
    name: "The Saré Box",
    type: "GIFT BOX",
    price: "€18.00",
    description: "A little box filled with our favourites.",
    symbol: "♡",
  },
];

const translations = {
  en: {
    language: "ET",
    languageLabel: "Switch language to Estonian",
    navMenu: "THE MENU",
    navOrder: "YOUR ORDER",
    eyebrow: "A SMALL BAKERY WITH A BIG HEART",
    tagline: "Love at first bite.",
    discover: "DISCOVER THE MENU ↓",
    heroBottom: "HANDMADE · FRESHLY BAKED · MADE WITH LOVE",
    menuEyebrow: "A LITTLE SOMETHING SWEET",
    menuTitle: "The Menu",
    menuSubtitle: "Find your new favourite.",
    cookie: "COOKIE",
    brownie: "BROWNIE",
    giftBox: "GIFT BOX",
    add: "ADD TO ORDER +",
    inOrder: "IN ORDER ✓",
    scrollHint: "SCROLL TO EXPLORE →",
    orderEyebrow: "MADE JUST FOR YOU",
    orderTitle: "A little sweetness, your way.",
    orderDescription:
      "Tell us what you're craving. Send an order request and we'll confirm the details with you.",
    thankYou: "Thank you!",
    successMessage: "Your order request has been sent to Saré.",
    successNotice:
      "We'll review your request and contact you by email. Your order is not confirmed until you hear from us.",
    backToForm: "BACK TO THE FORM",
    details: "Your details",
    treats: "Your treats",
    fullName: "Full name *",
    yourName: "Your name",
    phone: "Phone number *",
    email: "Email address *",
    chooseTreats: "Choose your treats *",
    chooseQuantity:
      "Choose how many pieces of each treat you'd like. Leave unwanted items at 0.",
    totalPieces: "Total pieces:",
    quantityLimit:
      "Minimum 2 pieces, maximum 24 pieces per order. Your total must be an even number.",
    pickupDate: "Preferred pickup date *",
    pickupLocation: "Pickup location",
    parcelTerminal: "Smartpost parcel terminal",
    pickupNotice:
      "We'll notify you by email when your sweets have been delivered and are ready to collect.",
    paymentTitle: "Payment by bank transfer",
    paymentDescription:
      "After reviewing your order, we'll email you the total price and payment instructions. Please wait for the invoice before sending payment.",
    specialNotes: "Allergies or special notes",
    notesPlaceholder: "Anything we should know?",
    requiredFields: "* Required fields",
    sending: "SENDING...",
    submit: "SEND ORDER REQUEST",
    disclaimer:
      "Your order is not confirmed until you receive a confirmation from Saré. Sending this form does not confirm your order.",
    alertQuantity:
      "Please choose between 2 and 24 pieces in total, with an even total quantity.",
    footerTagline: "Some things are worth the wait.",
    instagram: "FIND US ON INSTAGRAM ↗",
    backToTop: "BACK TO TOP ↑",
    quantityLabel: "Quantity of",
    piece: "piece(s)",
  },
  et: {
    language: "EN",
    languageLabel: "Switch language to English",
    navMenu: "MEIE MENÜÜ",
    navOrder: "SINU TELLIMUS",
    eyebrow: "VÄIKESEST KODUPAGARIKOJAST, JUST SINULE",
    tagline: "Armastus esimesest ampsust.",
    discover: "AVASTA MEIE MENÜÜ ↓",
    heroBottom: "KÄSITSI VALMISTATUD · VÄRSKELT KÜPSETATUD · ARMASTUSEGA",
    menuEyebrow: "MIDAGI MAGUSAT",
    menuTitle: "Meie menüü",
    menuSubtitle: "Leia oma uus lemmik.",
    cookie: "KÜPSIS",
    brownie: "BROWNIE",
    giftBox: "KINGIKARP",
    add: "LISA TELLIMUSSE +",
    inOrder: "TELLITUD ✓",
    scrollHint: "KERIMISEKS AVASTA →",
    orderEyebrow: "VALMISTATUD JUST SULLE",
    orderTitle: "Natuke magusust, just sinu moodi.",
    orderDescription:
      "Anna meile teada, mille järele sul isu on. Saada tellimuse päring ja kinnitame sinuga tellimuse üksikasjad.",
    thankYou: "Aitäh!",
    successMessage: "Sinu tellimuse päring on Saréle saadetud.",
    successNotice:
      "Vaatame sinu päringu üle ja võtame sinuga e-posti teel ühendust. Tellimus ei ole kinnitatud enne, kui oleme sulle vastanud.",
    backToForm: "TAGASI VORMI JUURDE",
    details: "Sinu andmed",
    treats: "Sinu maiustused",
    fullName: "Täisnimi *",
    yourName: "Sinu nimi",
    phone: "Telefoninumber *",
    email: "E-posti aadress *",
    chooseTreats: "Vali oma maiustused *",
    chooseQuantity:
      "Vali, mitu tükki igat maiustust soovid. Tooted, mida sa ei soovi, jäta kogusega 0.",
    totalPieces: "Tükke kokku:",
    quantityLimit:
      "Minimaalselt 2 ja maksimaalselt 24 tükki tellimuse kohta. Koguarv peab olema paarisarv.",
    pickupDate: "Soovitud kättesaamise kuupäev *",
    pickupLocation: "Kättesaamise asukoht",
    parcelTerminal: "Smartposti pakiautomaat",
    pickupNotice:
      "Anname sulle e-posti teel teada, kui maiustused on kohale jõudnud ja valmis kättesaamiseks.",
    paymentTitle: "Tasumine pangaülekandega",
    paymentDescription:
      "Pärast tellimuse ülevaatamist saadame sulle e-posti teel koguhinna ja maksejuhised. Palun oota arve saabumist enne makse tegemist.",
    specialNotes: "Allergiad või erisoovid",
    notesPlaceholder: "Kas peaksime midagi teadma?",
    requiredFields: "* Kohustuslikud väljad",
    sending: "SAADAME...",
    submit: "SAADA TELLIMUSE PÄRING",
    disclaimer:
      "Tellimus ei ole kinnitatud enne, kui oled saanud Sarélt kinnituse. Vormi saatmine ei tähenda tellimuse kinnitamist.",
    alertQuantity:
      "Palun vali kokku 2–24 tükki. Tükkide koguarv peab olema paarisarv.",
    footerTagline: "Mõned asjad on ootamist väärt.",
    instagram: "LEIA MEID INSTAGRAMIST ↗",
    backToTop: "TAGASI ÜLESSE ↑",
    quantityLabel: "Toote kogus:",
    piece: "tk",
  },
} as const;

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;

const productDescriptions: Record<string, string> = {
  "Chocolate Chip": "Kuldsed servad, pehme sisu ja tume šokolaad.",
  "Strawberry Cloud": "Valge šokolaad maasikase nüansiga.",
  "Brown Butter Bliss": "Pruunistatud või ja pisut meresoola.",
  "Fudgy Brownie": "Rikkalik, šokolaadine ja mõnusalt mahlane.",
  "Vanilla Dream": "Võine vanilliküpsis valge šokolaadiga.",
  "The Saré Box": "Väike karp meie lemmikutest.",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("et");

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map((product) => [product.name, 0]))
  );

  const [minPickupDate, setMinPickupDate] = useState("");

  const [state, handleSubmit, reset] = useForm("mjyyyzzd");

  const t = (key: TranslationKey) => translations[language][key];

  const totalQuantity = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const orderDetails = products
    .filter((product) => quantities[product.name] > 0)
    .map(
      (product) =>
        `${product.name}: ${quantities[product.name]} ${t("piece")}`
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

  function toggleLanguage() {
    setLanguage((previous) => (previous === "en" ? "et" : "en"));
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Saré home">
          <img src="/sare-header-logo.png" alt="Saré home" />
        </a>

        <nav>
          <a href="#menu">{t("navMenu")}</a>
          <a href="#order">{t("navOrder")}</a>
        </nav>

        <button
          type="button"
          className="language-button"
          onClick={toggleLanguage}
          aria-label={t("languageLabel")}
          title={t("languageLabel")}
        >
          {t("language")}
        </button>
      </header>

      <section className="hero" id="home">
        <p className="eyebrow">{t("eyebrow")}</p>

        <div className="hero-wordmark">
          <img src="/sare-logo.png" alt="Saré bakery" />
        </div>

        <p className="tagline">{t("tagline")}</p>

        <a className="outline-button" href="#menu">
          {t("discover")}
        </a>

        <p className="hero-bottom">{t("heroBottom")}</p>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-title">
          <p className="eyebrow">{t("menuEyebrow")}</p>
          <h1>{t("menuTitle")}</h1>
          <p>{t("menuSubtitle")}</p>
        </div>

        <div className="menu-scroll">
          {products.map((product, index) => (
            <article className="product" key={product.name}>
              <div className={`product-art art-${index + 1}`}>
                <span>{product.symbol}</span>
                <small>SARÉ PATISSERIE</small>
              </div>

              <p className="product-type">
                {product.type === "COOKIE"
                  ? t("cookie")
                  : product.type === "BROWNIE"
                    ? t("brownie")
                    : t("giftBox")}
              </p>

              <div className="product-heading">
                <h2>{product.name}</h2>
                <span>{product.price}</span>
              </div>

              <p className="product-description">
                {language === "et"
                  ? productDescriptions[product.name]
                  : product.description}
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
                  ? `${quantities[product.name]} ${t("inOrder")}`
                  : t("add")}
              </button>
            </article>
          ))}
        </div>

        <p className="scroll-hint">{t("scrollHint")}</p>
      </section>

      <section className="order-section" id="order">
        <div className="order-intro">
          <p className="eyebrow">{t("orderEyebrow")}</p>
          <h1>{t("orderTitle")}</h1>
          <p>{t("orderDescription")}</p>
        </div>

        {state.succeeded ? (
          <div className="success">
            <div className="success-icon">♡</div>

            <h2>{t("thankYou")}</h2>

            <p>{t("successMessage")}</p>

            <p className="notice">{t("successNotice")}</p>

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
              {t("backToForm")}
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
                alert(t("alertQuantity"));
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
              <h2>{t("details")}</h2>
            </div>

            <div className="fields">
              <label>
                {t("fullName")}
                <input
                  name="name"
                  placeholder={t("yourName")}
                  required
                />
              </label>

              <label>
                {t("phone")}
                <input
                  name="phone"
                  type="tel"
                  placeholder="+372 ..."
                  required
                />
              </label>

              <label className="wide">
                {t("email")}
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
              <h2>{t("treats")}</h2>
            </div>

            <fieldset className="flavours">
              <legend>{t("chooseTreats")}</legend>

              <p className="small-note">{t("chooseQuantity")}</p>

              <div className="flavour-grid">
                {products.map((product) => (
                  <label className="flavour" key={product.name}>
                    <span>{product.name}</span>

                    <select
                      aria-label={`${t("quantityLabel")} ${product.name}`}
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
                  <strong>{t("totalPieces")}</strong> {totalQuantity}
                </p>

                <p className="small-note">{t("quantityLimit")}</p>
              </div>
            </fieldset>

            <div className="fields">
              <label>
                {t("pickupDate")}
                <input
                  name="pickupDate"
                  type="date"
                  min={minPickupDate}
                  required
                />
              </label>

              <div className="wide pickup-info">
                <p>
                  <strong>{t("pickupLocation")}</strong>
                </p>

                <p>{t("parcelTerminal")}</p>
                <p>Pärnu mnt. 67a, 10134 Tallinn, Estonia</p>

                <p className="small-note">{t("pickupNotice")}</p>
              </div>

              <div className="wide payment-info">
                <p>
                  <strong>{t("paymentTitle")}</strong>
                </p>

                <p>{t("paymentDescription")}</p>
              </div>

              <label className="wide">
                {t("specialNotes")}
                <textarea
                  name="notes"
                  rows={4}
                  placeholder={t("notesPlaceholder")}
                />
              </label>
            </div>

            <p className="small-note">{t("requiredFields")}</p>

            <ValidationError errors={state.errors} />

            <button
              className="submit-button"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? t("sending") : t("submit")}

              {!state.submitting && <span> ↗</span>}
            </button>

            <p className="form-disclaimer">{t("disclaimer")}</p>
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

        <p>{t("footerTagline")}</p>

        <a
          className="instagram"
          href="https://www.instagram.com/sarehomebakery/?utm_source=ig_web_button_share_sheet"
          target="_blank"
          rel="noreferrer"
        >
          {t("instagram")}
        </a>

        <div className="footer-bottom">
          <span>© SARÉ</span>
          <a href="#home">{t("backToTop")}</a>
        </div>
      </footer>
    </main>
  );
}
