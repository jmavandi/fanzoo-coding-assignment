interface Athlete {
  id: string;
  name: string;
  team: string;
  sport: string;
  imageUrl: string;
}

export const athletes: Athlete[] = [
  {
    id: "1",
    name: "Cooper Flagg",
    team: "Duke Blue Devils",
    sport: "Basketball",
    imageUrl: "/images/athletes/cooper-flagg.jpg",
  },
  {
    id: "2",
    name: "Ashton Jeanty",
    team: "Boise State Broncos",
    sport: "Football",
    imageUrl: "/images/athletes/ashton-jeanty.jpg",
  },
];
