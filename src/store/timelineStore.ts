import { create } from "zustand";

export type TimelineObjectType = {
  id: number;
  title: string;
  description: string[];
  startDate: Date;
  endDate?: Date;
};

interface TimelineStore {
  timeline: TimelineObjectType[];
  setTimeline: (timeline: TimelineObjectType[]) => void;
}

const initialTimeline: TimelineObjectType[] = [
  {
    id: 0,
    title: "Software Engineering Intern at Govtech",
    description: [
      "Worked as a full-stack developer on the development of a project to rebuild Singapore's trade declaration system",
      "Developed and enhanced the UI component library, working in cross functional teams to deliver components that meet both design and engineering requirements",
      "Developed full-stack features using React, Typescript, GraphQL, Kotlin and Spring Boot",
    ],
    startDate: new Date("2025-05-01"),
    endDate: undefined,
  },
  {
    id: 1,
    title:
      "Exchange student at EPFL (Ecole Polytechnique Federale de Lausanne)",
    description: [
      "Studying Master level courses in Machine Learning, Information Theory and Information Security",
    ],
    startDate: new Date("2024-09-09"),
    endDate: new Date("2025-02-01"),
  },
  {
    id: 2,
    title: "Software Engineering Intern at Entroview",
    description: [
      "Worked as a frontend developer at Entroview, a deep tech startup in Paris, solely developing the frontend of a client-facing application from scratch",
      "Utilised React, Typescript and Material UI to develop the application, which involved complex data visualisation",
    ],
    startDate: new Date("2024-04-29"),
    endDate: new Date("2024-09-06"),
  },
  {
    id: 3,
    title: "Teaching Assistant at NUS",
    description: [
      "1 of 20 TAs for CG1111A - Engineering Principles and Practice I",
      "Mentored students and provided meaningful feedback on their labs and projects",
    ],
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-12-1"),
  },
  {
    id: 4,
    title: "StudyStash",
    description: [
      "Developed StudyStash, a web application which serves as a database for exam resources, where users can share cheatsheets, notes, past papers and solutions to aid others in revision",
      "Developed both frontend and backend sides, as well as making infrastructure decisions. Technologies used include NextJS, Prisma ORM, Planetscale SQL database and Google OAuth, as well as AWS S3 and Cloudfront",
      "Employed numerous software engineering principles, including CI/CD with Github Actions, unit testing with Jest and end-to-end testing with Cypress",
    ],
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-08-01"),
  },
  {
    id: 5,
    title: "Research Assistant",
    description: [
      "Wrote and published two research papers in collaboration with A*STAR Institute of High Performance Computing, where charge distribution profiles on plasmonic nanoparticles were used to predict induced optical torque",
      "Presented my work at a poster during an international conference (International Conference on Materials for Advanced Technologies 2019",
    ],
    startDate: new Date("2019-06-01"),
    endDate: new Date("2020-12-01"),
  },
];

export const useTimelineStore = create<TimelineStore>((set) => ({
  timeline: initialTimeline,
  setTimeline: (timeline) => set({ timeline }),
}));
