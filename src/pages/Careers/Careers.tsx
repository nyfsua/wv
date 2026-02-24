import  { useMemo, useState } from "react";
import "./Careers.css";

type Person = {
  name: string;
  roles: string;
  linkLabel?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type CareersPageProps = {
  id?: string;
  headline?: string;

  /** External form URL for marquee click */
  formHref?: string;

  /** Text repeated in marquees */
  marqueeText?: string;

  people?: Person[];
};

function ExternalIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0H10C11.1046 0 12 0.895431 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895431 12 0 11.1046 0 10V2Z"
        fill="#989898"
      />
      <path
        d="M4.09091 3H9V7.90909H7.90909V5.18182H7.36364V5.72727H6.81818V6.27273H6.27273V6.81818H5.72727V7.36364H5.18182V7.90909H4.63636V8.45455H4.09091V9H3.54545V8.45455H3V7.90909H3.54545V7.36364H4.09091V6.81818H4.63636V6.27273H5.18182V5.72727H5.72727V5.18182H6.27273V4.63636H6.81818V4.09091H4.09091V3Z"
        fill="#1E1D1D"
      />
    </svg>
  );
}

function MarqueeStrip({
  href,
  text,
  direction = "left",
  className = "",
}: {
  href: string;
  text: string;
  direction?: "left" | "right";
  className?: string;
}) {
  // duplicate enough times to always fill
  const items = new Array(10).fill(text);

  return (
    <a
      className={`wfCareers__marquee ${direction === "right" ? "isRight" : "isLeft"} ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
    >
      <div className="wfCareers__marqueeTrack" aria-hidden="true">
        {items.map((t, i) => (
          <span className="wfCareers__marqueeItem" key={i}>
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function CareersPage({
  id = "careers",
  headline = "The most interesting African creatives are on our roster.",
  formHref = "https://example.com/your-form", // <-- replace
  marqueeText = "WANNA WORK WITH US?",
  people,
}: CareersPageProps) {
  const data = useMemo<Person[]>(
    () =>
      people ?? [
        {
          name: "Hassaniofafrica",
          roles: "FOUNDER, PRODUCER",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/hassaniofafrica/",
          imageSrc: "src/pages/Careers/img/hassan.png",
          imageAlt: "Hassan",
        },
        {
          name: "Banx",
          roles: "FOUNDER, DIRECTOR",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/banx9figures/",
          imageSrc: "src/pages/Careers/img/banx.png",
          imageAlt: "Banx",
        },
        {
          name: "Walterbanks",
          roles: "PHOTOGRAPHER, DIRECTOR",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/walterbanks_/",
          imageSrc: "src/pages/Careers/img/walter.jpg",
          imageAlt: "Walterbanks",
        },
        {
          name: "Jodan",
          roles: "DIRECTOR",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/whoknowsjodan/",
          imageSrc: "src/pages/Careers/img/jodan.png",
          imageAlt: "Jodan",
        },
        {
          name: "Boy Cam",
          roles: "PHOTOGRAPHER",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/just_boycam/",
          imageSrc: "src/pages/Careers/img/cam.png",
          imageAlt: "Cam",
        },
        {
          name: "Karo Daniels",
          roles: "DIRECTOR",
          linkLabel: "VIEW WORK",
          href: "https://www.instagram.com/karodaniels/",
          imageSrc: "src/pages/Careers/img/karo.png",
          imageAlt: "KD",
        },
      ],
    [people]
  );

  const [active, setActive] = useState(0);
  const activePerson = data[Math.min(active, data.length - 1)];

  return (
    <section id={id} className="wfCareers" aria-label="Careers">
      <header className="wfCareers__header">
        <h2 className="wfCareers__headline">{headline}</h2>
      </header>

      {/* two green marquees */}
     <div className="wfCareers__marqueeStack" aria-label="Work with us marquee">
  <MarqueeStrip href={formHref} text={marqueeText} direction="left" className="wfCareers__marqueeTop" />
  <MarqueeStrip href={formHref} text={marqueeText} direction="right" className="wfCareers__marqueeBottom" />
</div>

      <div className="wfCareers__body">
        {/* left preview */}
        <div className="wfCareers__preview">
          <div className="wfCareers__previewFrame">
            {activePerson?.imageSrc ? (
              <img
                src={activePerson.imageSrc}
                alt={activePerson.imageAlt ?? activePerson.name}
                className="wfCareers__previewImg"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <div className="wfCareers__previewPlaceholder" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* right roster */}
        <div className="wfCareers__roster" role="list" aria-label="Roster">
          {data.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className={`wfCareers__row ${i === active ? "isActive" : ""}`}
              role="listitem"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <div className="wfCareers__rowTop">
                <div className="wfCareers__name">{p.name}</div>
                <div className="wfCareers__roles">{p.roles}</div>
              </div>

              <div className="wfCareers__rowBottom">
                {p.href ? (
                  <a className="wfCareers__view" href={p.href}>
                    {p.linkLabel ?? "VIEW WORK"}{" "}
                    <span className="wfCareers__viewIcon">
                      <ExternalIcon size={12} />
                    </span>
                  </a>
                ) : (
                  <span className="wfCareers__view">
                    {p.linkLabel ?? "VIEW WORK"}{" "}
                    <span className="wfCareers__viewIcon">
                      <ExternalIcon size={12} />
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}