import "./About.css";

// Replace these paths with your actual assets
import aboutMedia from "./about-img/IMG_1373.png"; // one image only
import aboutCopyDesktop from "./about-img/bottom.svg"; // the whole bottom row as ONE svg
import aboutCopyMobile from "./about-img/bottom-verto.svg"; // vertical alternative svg

export default function AboutPage() {
  return (
    <section className="wfAbout" aria-label="About">
      <div className="wfAbout__inner">
        <h1 className="wfAbout__title">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          We are shaping the future of creative execution. We engineer vision into culture-defining results.
        </h1>

        <div className="wfAbout__media" aria-label="About media">
          <img src={aboutMedia} alt="" />
        </div>

        <div className="wfAbout__copy" aria-label="About explanation">
          <img className="wfAbout__copyDesktop" src={aboutCopyDesktop} alt="" />
          <img className="wfAbout__copyMobile" src={aboutCopyMobile} alt="" />
        </div>
      </div>
    </section>
  );
}