import React from "react";
import { BodyContainer, ContactContainer } from "./contact.styles";

const ContactPage = () => (
  <ContactContainer>
    <h5>GOT A QUESTION?</h5>
    <h1 style={{ textAlign: "center" }}>Contact FashionOrb</h1>
    <p>
      We’re here to help and answer any question you might have. We look forward
      to hearing from you{" "}
      <span role="img" aria-label="emoji">
        🙂
      </span>
    </p>
    <BodyContainer>
      <div className="card">
        <p>
          Email:{" "}
          <b>
            <a href="mailto:example@gmail.com">example@gmail.com</a>
          </b>
        </p>
        <p>
          Twitter:{" "}
          <b>
            <a href="#home">Twitter Profile</a>
          </b>
        </p>
        <p>
          LinkedIn:{" "}
          <b>
            <a href="#home">Linked Profile</a>
          </b>
        </p>
      </div>
    </BodyContainer>
    <iframe
      title="GoogleMap"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.449330021458!2d90.3993155844375!3d23.873680384528818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c59f42d61cf7%3A0xc440f706d8c5513e!2sFashion%20ORB!5e0!3m2!1siw!2sil!4v1586175686396!5m2!1siw!2sil"
      width="450"
      height="600"
      frameborder="0"
      style={{ border: 0, width: "100%" }}
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  </ContactContainer>
);

export default ContactPage;
