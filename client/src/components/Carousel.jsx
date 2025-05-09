// File: src/components/Carousel.jsx
import React from "react";
import BootstrapCarousel from "react-bootstrap/Carousel";
import '../styles/components/Carousel.scss';


const slides = [
  {
    imageUrl: "/images/image1.png",
    title: "當日現泡、只為沏一杯好茶",
    description: "",
  },
  {
    imageUrl: "/images/image2.png",
    title: "新鮮水果、產地直送",
    description: "",
  },
  {
    imageUrl: "/images/image3.png",
    title: "清新隨行、好心情",
    description: "",
  },
];

export default function Carousel() {
  return (
    <BootstrapCarousel className="carousel-component">
      {slides.map((slide, idx) => (
        <BootstrapCarousel.Item key={idx}>
          <img
            className="d-block w-100 carousel-component__image"
            src={slide.imageUrl}
            alt={slide.title}
          />
          <BootstrapCarousel.Caption className="carousel-component__caption">
            <h3>{slide.title}</h3>
            {/* <p>{slide.description}</p> */}
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}
