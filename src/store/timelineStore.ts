import { create } from "zustand";

export type TimelineObjectType = {
  id: number;
  title: string;
  description: string[];
  startDate: Date;
  endDate: Date;
};

interface TimelineStore {
  timeline: TimelineObjectType[];
  setTimeline: (timeline: TimelineObjectType[]) => void;
}

const initialTimeline: TimelineObjectType[] = [
  {
    id: 1,
    title: "Teaching Assistant at NUS",
    description: [
      "1 of 20 TAs for CG1111A - Engineering Principles and Practice I",
      "Mentored students and provided meaningful feedback on their labs and projects",
    ],
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 12, 1),
  },
  {
    id: 2,
    title: "StudyStash",
    description: [
      "Developed StudyStash, a web application which serves as a database for exam resources, where users can share cheatsheets, notes, past papers and solutions to aid others in revision",
      "Developed both frontend and backend sides, as well as making infrastructure decisions. Technologies used include NextJS, Prisma ORM, Planetscale SQL database and Google OAuth, as well as AWS S3 and Cloudfront",
      "Employed numerous software engineering principles, including CI/CD with Github Actions, unit testing with Jest and end-to-end testing with Cypress",
    ],
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 8, 1),
  },
  {
    id: 3,
    title: "Research Assistant",
    description: [
      "Wrote and published a research paper in collaboration with A*STAR Institute of High Performance Computing in journal SN Applied Sciences, where charge distribution profiles on plasmonic nanoparticles were used to predict induced optical torque",
      "Presented my work at a poster during an international conference (International Conference on Materials for Advanced Technologies 2019",
    ],
    startDate: new Date(2019, 6, 1),
    endDate: new Date(2020, 12, 1),
  },
];

export const useTimelineStore = create<TimelineStore>((set) => ({
  timeline: initialTimeline,
  setTimeline: (timeline) => set({ timeline }),
}));
