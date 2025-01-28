export interface Experience {
  id: string;
  athleteName: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    athleteName: "Cooper Flagg",
    title: "Virtual Meet & Greet",
    description:
      "One-on-one virtual meet and greet of up to 30 minutes with Duke University's Cooper Flagg",
    price: 199,
    imageUrl: "/images/athletes/cooper-flagg.jpg",
  },
  {
    id: "2",
    athleteName: "Ashton Jeanty",
    title: "2 Hours of Gaming",
    description:
      "Two Hours of Playing PS5 (College Football 25, Call of Duty, etc.) with Ashton Jeanty",
    price: 299,
    imageUrl: "/images/athletes/ashton-jeanty.jpg",
  },
];
