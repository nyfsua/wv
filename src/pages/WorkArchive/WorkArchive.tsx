import "./WorkArchive.css";
import goFreshThumb from "./thumbnails/go_fresh.png";
import eitdThumb from "./thumbnails/eitd.png";
import familyMeetingThumb from "./thumbnails/family_meeting.png";

type WorkItem = {
  id: string;          // "01", "02", etc.
  title: string;       // "LITTLE SIMZ 'FLOOD'"
  youtubeUrl: string;
  thumbUrl: string;    // thumbnail image URL or local import
};

const WORK_ITEMS: WorkItem[] = [

  {
    id: "01",
    title: "SEYI VIBEZ 'HOW ARE YOU'",
    youtubeUrl: "https://youtu.be/ZyXvPdVt474?si=4OZUiP1ABKRp4Vex",
    thumbUrl: "https://i.ytimg.com/vi/ZyXvPdVt474/hqdefault.jpg",
  },
  {
    id: "02",
    title: "GO FRESH 'AD'",
    youtubeUrl: "https://drive.google.com/file/d/1cEVf4BNNkqpozsat8VhCkbqsS-czzbsL/view?usp=sharing",
    thumbUrl: goFreshThumb,
  },
  {
    id: "03",
    title: "KASHCOMING 'BEBE FT LASMID'",
    youtubeUrl: "https://youtu.be/aPyJ3Q7q2ZE",
    thumbUrl: "https://i.ytimg.com/vi/aPyJ3Q7q2ZE/hqdefault.jpg",
  },
  {
    id: "04",
   title: "SEYI VIBEZ '+234'",
    youtubeUrl: "https://youtu.be/oTwuV0z8eqQ?si=oF2kZRwc4HIwRzcN",
    thumbUrl: "https://i.ytimg.com/vi/oTwuV0z8eqQ/hqdefault.jpg",
  },
  {
    id: "05",
    title: "BLACK FAB 'OYOYO FT TML VIBEZ'",
    youtubeUrl: "https://youtu.be/eVzNev-IScc",
    thumbUrl: "https://i.ytimg.com/vi/eVzNev-IScc/hqdefault.jpg",
  },
  {
    id: "06",
    title: "C KRAYNE 'NASO'",
    youtubeUrl: "https://youtu.be/YreajMAOK90?si=_iiRpp7peNGatWzT",
    thumbUrl: "https://i.ytimg.com/vi/YreajMAOK90/hqdefault.jpg",
  },
  {
    id: "07",
    title: "BARRY JAY 'KILONSO'",
    youtubeUrl: "https://youtu.be/CdcSsc_j9E8?si=lhwilNd0vWx9PKhG",
    thumbUrl: "https://i.ytimg.com/vi/CdcSsc_j9E8/hqdefault.jpg",
  },
  {
    id: "08",
    title: "TIMAYA 'PAYBACK'",
    youtubeUrl: "https://youtu.be/swL0Uo1Bj7s",
    thumbUrl: "https://i.ytimg.com/vi/swL0Uo1Bj7s/hqdefault.jpg",
  },
  {
    id: "09",
    title: "BAGETTI 'YORO'",
    youtubeUrl: "https://youtu.be/zHihK0o_pZU?si=mEJg8bcjlONpDTBp",
    thumbUrl: "https://i.ytimg.com/vi/zHihK0o_pZU/hqdefault.jpg",
  },
  {
    id: "10",
    title: "EVEN IN THE DAY 'TRAILER'",
    youtubeUrl: "https://drive.google.com/file/d/1Cqu6gIPFaywnb7gkt8UyvZxkUQHmLi2g/view?usp=sharing",
    thumbUrl: eitdThumb,
  },
  {
    id: "11",
    title: "FAMILY MEETING 'AD'",
    youtubeUrl: "https://drive.google.com/file/d/1cEVf4BNNkqpozsat8VhCkbqsS-czzbsL/view?usp=sharing",
    thumbUrl: familyMeetingThumb,
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="waCard">
      <div className="waCard__meta">
        <span className="waCard__id">{item.id}</span>
        <span className="waCard__title">{item.title}</span>
      </div>

      <a
        className="waCard__thumbLink"
        href={item.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} on YouTube`}
      >
        <img className="waCard__thumb" src={item.thumbUrl} alt={item.title} loading="lazy" />
        <span className="waCard__hover" aria-hidden="true" />
      </a>
    </article>
  );
}

export default function WorkArchive() {
  return (
    <main className="waPage" aria-label="Work archive">
     

      <section className="waGrid" aria-label="Archive items">
        {WORK_ITEMS.map((it) => (
          <WorkCard item={it} key={it.id} />
        ))}
      </section>
    </main>
  );
}