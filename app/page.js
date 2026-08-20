import StampBook from "@/components/StampBook";
import MunichScallops from "@/components/stamps/MunichScallops";
import AustralianNatives from "@/components/stamps/AustralianNatives";
import Yugoslavia from "@/components/stamps/Yugoslavia";
import NetherlandsMaze from "@/components/stamps/NetherlandsMaze";
import MunichTrack from "@/components/stamps/MunichTrack";
import Hero from "@/components/Hero";

const items = [
  {
    id: "munich-scallops",
    tone: "cream",
    front: <MunichScallops />,
    back: {
      country: "Australia",
      year: "1972",
      title: "Munich Olympics — Judo",
      value: "7c",
      catalogNo: "AU-1972-07",
      description:
        "One of a set issued for the Munich Games, its scalloped colour bands echo the striped identity system designed for the 1972 Olympics.",
    },
  },
  {
    id: "australian-natives",
    tone: "ivory",
    front: <AustralianNatives />,
    back: {
      country: "Australia",
      year: "1971",
      title: "Australian Natives' Association",
      value: "6c",
      catalogNo: "AU-1971-06",
      description:
        "Designed by Richard Beck to mark the Association's centenary, pairing a bold two-tone field with a scatter of stars.",
    },
  },
  {
    id: "yugoslavia-youth",
    tone: "cream",
    front: <Yugoslavia />,
    back: {
      country: "Yugoslavia",
      year: "1970s",
      title: "World Youth for World Peace",
      value: "20 din",
      catalogNo: "YU-197X-20",
      description:
        "Issued for a Zagreb youth congress, the diagonal ribbon and globe motif point outward toward international exchange.",
    },
  },
  {
    id: "netherlands-maze",
    tone: "ivory",
    front: <NetherlandsMaze />,
    back: {
      country: "Netherlands",
      year: "1970s",
      title: "Labyrinth Semi-Postal",
      value: "40+20c",
      catalogNo: "NL-197X-40",
      description:
        "A charity surtax issue built from a single continuous square spiral, printed in high-contrast green and yellow.",
    },
  },
  {
    id: "munich-track",
    tone: "cream",
    front: <MunichTrack />,
    back: {
      country: "Australia",
      year: "1972",
      title: "Munich Olympics — Athletics",
      value: "7c",
      catalogNo: "AU-1972-07B",
      description:
        "Companion stamp to the judo issue, trading the scallop bands for a nested running track rendered in green and red.",
    },
  },
];

export default function Home() {
  return (
    <div>
      {/* <StampBook items={items} /> */}
      <Hero />
    </div>
  );
}
