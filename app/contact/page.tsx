"use client";

import React from 'react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="container">
      <div className="front side">
        <div className="content">
          <h1>Second Round</h1>
          <p>
           Don't hesitate to contact me if you have any questions or need help with your order.
          </p>
        </div>
      </div>
      <div className="back side">
        <div className="content">
          <h1>Contact Me</h1>
          <form>
            <label htmlFor="name">Your Name :</label>
            <input type="text" id="name" placeholder="John Anderson" />

            <label htmlFor="email">Your E-mail :</label>
            <input type="email" id="email" placeholder="Example@mail.com" />

            <label htmlFor="message">Your Message :</label>
            <textarea id="message" placeholder="The Subject"></textarea>

            <input type="submit" value="Done" />
          </form>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          transform-style: preserve-3d;
          position: relative;
          background-color: #111;
          font-family: "Montserrat", sans-serif;
        }

        .container {
          width: 300px;
          height: 400px;
          border-radius: 20px;
          position: relative;
          transition: transform 1.5s ease-in-out;
          transform-style: preserve-3d;
        }

        .container:hover {
          transform: rotateY(180deg);
        }

        .side {
          position: absolute;
          text-align: center;
          width: 100%;
          height: 100%;
          padding: 20px 30px;
          color: #fff;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          border-radius: 20px;
        }

        .front {
          background-image: url('https://userscontent2.emaze.com/images/f9538183-0ff9-478f-b964-c8ab90421e3b/3d28e192fda5c17250f96a2779c84475.jpg');
          background-size: cover;
          background-position: center;
          z-index: 2;
        }

        .back {
          background-color: #333;
          transform: rotateY(180deg);
          background-image: url('https://userscontent2.emaze.com/images/f9538183-0ff9-478f-b964-c8ab90421e3b/3d28e192fda5c17250f96a2779c84475.jpg');
          background-size: cover;
          background-position: center;
          z-index: 1;
          padding-top: 40px;
        }

        .content h1 {
          position: relative;
          font-size: 1.5rem;
        }

        .content h1::before {
          content: "";
          position: absolute;
          bottom: -10px;
          height: 3px;
          background-color: #3e3;
          width: 70px;
          left: 50%;
          transform: translateX(-50%);
        }

        .content p {
          margin-top: 20px;
          line-height: 1.5em;
          font-size: 0.9rem;
        }

        form {
          text-align: left;
        }

        form label,
        form input,
        form textarea {
          display: block;
          width: 100%;
          margin-top: 10px;
          color: #fff;
        }

        form input,
        form textarea {
          background: transparent;
          border: 0;
          border-bottom: 2px solid #444;
          padding: 8px;
          color: #fff;
        }

        form textarea {
          resize: none;
          height: 80px;
        }

        form input[type="submit"] {
          margin: 20px auto 0;
          padding: 10px 20px;
          border: 3px solid #555;
          border-radius: 4px;
          background-color: transparent;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        form input[type="submit"]:hover {
          background-color: #555;
          color: #fff;
        }

        .white-mode {
          text-decoration: none;
          padding: 7px 10px;
          background-color: #122;
          border-radius: 3px;
          color: #fff;
          transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out;
          position: fixed;
          left: 15px;
          bottom: 15px;
          font-family: "Montserrat", sans-serif;
          display: inline-block;
        }

        .white-mode:hover {
          background-color: #fff;
          color: #122;
        }

        @media (max-width: 768px) {
          .container {
            width: 90%;
            height: auto;
          }

          .side {
            padding: 15px 20px;
          }

          .content h1 {
            font-size: 1.2rem;
          }

          .content p {
            font-size: 0.8rem;
          }

          form input,
          form textarea {
            padding: 6px;
          }

          form input[type="submit"] {
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;