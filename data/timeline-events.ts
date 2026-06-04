export type TimelineEvent = {
  id: string;
  date: string;
  chapter: string;
  title: string;
  description: string;
  future?: boolean;
  locked?: boolean;
};

export type TimelineMilestone = {
  id: string;
  month: string;
  title: string;
  description: string;
  locked?: boolean;
  future?: boolean;
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "new-years-eve",
    date: "December 31, 2025",
    chapter: "Two Trajectories Intersect",
    title: "The night they met",
    description:
      "Two people met on the final night of the year, not knowing the moment would change four lives forever.",
  },
  {
    id: "one-month",
    date: "January 31, 2026",
    chapter: "One Month Later",
    title: "Still here",
    description: "Thirty-one days later, the story was still unfolding.",
  },
  {
    id: "love-in-motion",
    date: "February–May 2026",
    chapter: "Love In Motion",
    title: "The connection deepened",
    description:
      "Memories gathered, conversations grew longer, and two separate paths became one shared journey.",
  },
  {
    id: "pregnancy-test",
    date: "June 1, 2026",
    chapter: "The Test That Changed Everything",
    title: "A new future appeared",
    description: "One small test changed the shape of everything ahead.",
  },
  {
    id: "twins",
    date: "June 2026",
    chapter: "The Future Doubled",
    title: "The future doubled",
    description:
      "The story was no longer about two people. It was becoming the beginning of four.",
  },
  {
    id: "january-edd",
    date: "January 2027",
    chapter: "The Beginning Of Everything",
    title: "Expected arrival",
    description: "Not the end of the timeline. The beginning of everything.",
  },
];

export const journeyToJanuaryMilestones: TimelineMilestone[] = [
  {
    id: "july-2026",
    month: "July 2026",
    title: "A little more real",
    description: "Space reserved for the next ultrasound, first notes, and small discoveries.",
    future: true,
    locked: true,
  },
  {
    id: "august-2026",
    month: "August 2026",
    title: "Growing quietly",
    description: "A place for bump photos, family messages, and the details they will want to remember.",
    future: true,
    locked: true,
  },
  {
    id: "september-2026",
    month: "September 2026",
    title: "The world begins to prepare",
    description: "Future memories can live here: plans, names, colors, tiny decisions.",
    future: true,
    locked: true,
  },
  {
    id: "october-2026",
    month: "October 2026",
    title: "Rooms become ready",
    description: "Reserved for nursery updates, keepsakes, and the first signs of their new rhythm.",
    future: true,
    locked: true,
  },
  {
    id: "november-2026",
    month: "November 2026",
    title: "The circle widens",
    description: "A future home for baby shower moments, blessings, and messages from loved ones.",
    future: true,
    locked: true,
  },
  {
    id: "december-2026",
    month: "December 2026",
    title: "One year since hello",
    description: "The timeline returns to December carrying more than either of them could have imagined.",
    future: true,
    locked: true,
  },
  {
    id: "january-2027",
    month: "January 2027",
    title: "Arrival month",
    description: "Ready for names, photos, birth times, weights, and the first portrait of four.",
    future: true,
    locked: true,
  },
];
