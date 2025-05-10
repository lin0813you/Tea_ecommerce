import React from 'react';
import '../styles/components/HeroSection.scss';

const newsItems = [
  {
    title: "最新消息：春季飲品上市！",
    link: "#news1",
  },
  {
    title: "限時優惠：第二杯半價！",
    link: "#news2",
  },
  {
    title: "品牌故事：我們的堅持",
    link: "#news3",
  },
];

const HeroSection = () => {
  return (
    <div className="hero-section container mt-4">
      <div className="row">
        {/* Left Section: Animated Image */}
        <div className="col-md-7">
          <div className="animated-image-container">
            {/* This div will have the background image and animation via CSS */}
            <div className="animated-image"></div>
          </div>
        </div>

        {/* Right Section: News */}
        <div className="col-md-5">
          <div className="hero-section__news">
            <h2>最新消息</h2>
            <ul className="list-unstyled">
              {newsItems.map((news, index) => (
                <li key={index} className="mb-2">
                  <a href={news.link} className="news-link">
                    {news.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;