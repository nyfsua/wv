import "./Contact.css";

type ContactPageProps = {
  id?: string;
};



export default function ContactPage({ id = "contact" }: ContactPageProps) {
  return (
    <section id={id} className="wfContact">

       

   

      <div className="wfContact__inner">
        <h2 className="wfContact__headline">
          WE AMPLIFY ARTISTRY THROUGH<br />
          OUR SPECIALISATION IN CREATIVE<br />
          THINKING AND DIRECTION
        </h2>

        <div className="wfContact__sub">
          <div className="wfContact__subMain">
            JUST ASK OUR RECENT CLIENTS
          </div>

          <div className="wfContact__subSmall">
            <a href="https://example.com/your-form" className="wfContact__contactLink"> 
            (WANNA WORK WITH US?)
            </a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="wfContact__marquee">
        <div className="wfContact__marqueeTrack">
          <span>SEYI VIBEZ</span>
          <span>KIDA KUDZ</span>
          <span>C KRAYNE</span>
          <span>VICTONY</span>
          <span>KASHCOMING</span>
          <span>TML VIBEZ</span>
          <span>TIMAYA</span>
          <span>BARRY JAY</span>

          {/* duplicate for seamless loop */}
          <span>SEYI VIBEZ</span>
          <span>KIDA KUDZ</span>
          <span>C KRAYNE</span>
          <span>VICTONY</span>
          <span>KASHCOMING</span>
          <span>TML VIBEZ</span>
          <span>TIMAYA</span>
          <span>BARRY JAY</span>
        </div>
      </div>
    </section>
  );
}