function Contact() {
  return (
    <main className="page info-page">
      <span className="eyebrow">Contact</span>
      <h2>Need help with your order?</h2>
      <p>
        Send us a message and our support team will help with products, cart
        questions, or checkout issues.
      </p>
      <form className="form-stack contact-form">
        <input placeholder="Full name" />
        <input placeholder="Email address" />
        <input placeholder="Your message" />
        <button className="btn btn-primary" type="button">
          Send Message
        </button>
      </form>
    </main>
  );
}

export default Contact;
