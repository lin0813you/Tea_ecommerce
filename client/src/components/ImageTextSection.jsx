import React from 'react';
import '../styles/components/ImageTextSection.scss';

const ImageTextSection = () => {
  return (
    <section className="image-text-section container mt-5">
      <div className="row align-items-center">
        {/* Left Half: Text Content */}
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <div className="text-content">
            <h2>Made with care, served with heart.</h2>
            <p className="mt-3">專注做好每一杯茶，時間自會醞釀芬芳</p>
            <div className="mt-4">
              <a href="/about" className="btn btn-outline-dark">ABOUT</a>
            </div>
          </div>
        </div>

        {/* Right Half: Images */}
        <div className="col-lg-6 col-md-12">
          <div className="image-gallery d-flex justify-content-center justify-content-lg-start">
            <div className="image-wrapper image-wrapper--one">
              <img src="/images/image4.png" alt="image" className="img-fluid" />
            </div>
            <div className="image-wrapper image-wrapper--two">
              <img src="/images/image5.png" alt="image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;