import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Work.css";

type WorkPanel = {
  title: string;
  subtitle: string;
  bgVideoSrc: string;
};

type WorkPageProps = {
  id?: string;
  zIndex?: number; // you asked for z-index 2
  panels?: WorkPanel[];
};

export default function WorkPage({
  id = "work",
  zIndex = 2,
  panels,
}: WorkPageProps) {
  const data = useMemo<WorkPanel[]>(
    () =>
      panels ?? [
        { title: "SEYI VIBEZ", subtitle: "HOW ARE YOU (MUSIC VIDEO)", bgVideoSrc: "/work/bg-1.mp4" },
        { title: "C KRAYNE", subtitle: "NASO (MUSIC VIDEO)", bgVideoSrc: "/work/bg-2.mp4" },
        { title: "KASHCOMING", subtitle: "BEBE FT LASMID (MUSIC VIDEO)", bgVideoSrc: "/work/bg-3.mp4" },
      ],
    [panels]
  );

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Preload videos early (best-effort)
  useEffect(() => {
    data.forEach((p) => {
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.src = p.bgVideoSrc;
    });
  }, [data]);

  // Active panel = closest to viewport center
  useEffect(() => {
    const els = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const mid = window.innerHeight / 2;
        let bestIdx = active;
        let bestDist = Infinity;

        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLDivElement;
          const idx = els.indexOf(el);
          if (idx < 0) continue;

          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        }

        setActive(bestIdx);
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  // Play only active video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      v.playsInline = true as any;
      v.loop = true;

      if (i === active) {
        const p = v.play();
        if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <section id={id} className="wfWork" style={{ zIndex, height: `${data.length * 100}vh` }}>
      {data.map((p, i) => (
        <div
          key={i}
          className={`wfWork__panel ${i === active ? "isActive" : ""}`}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          style={{ zIndex: data.length - i }}
        >
          <div className="wfWork__bg" aria-hidden="true">
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="wfWork__bgVideo"
              src={p.bgVideoSrc}
              preload="auto"
              muted
              playsInline
            />
            <div className="wfWork__shade" />
          </div>

          <div className="wfWork__text">
            <div className="wfWork__title">{p.title}</div>
            <div className="wfWork__subtitle">{p.subtitle}</div>
          </div>
        </div>
      ))}
    </section>
  );
}