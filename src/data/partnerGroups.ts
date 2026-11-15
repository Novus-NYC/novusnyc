export interface PartnerGroupEntry {
  name: string;
  detail: string;
  website: string;
}

export interface CityPartnerGroup {
  city: string;
  partners: PartnerGroupEntry[];
}

export const cityPartnerGroups: CityPartnerGroup[] = [
  {
    city: "Chicago",
    partners: [
      {
        name: "Chinese American Service League (CASL)",
        detail: "A Chicago community organization working with Novus as we grow our work in the city.",
        website: "https://casl.org/",
      },
    ],
  },
];

export const studentPipelinePartners: PartnerGroupEntry[] = [
  {
    name: "TKS (The Knowledge Society)",
    detail: "An innovation program for students and part of the network connecting young people with Novus.",
    website: "https://www.tks.world/",
  },
  {
    name: "Train & Earn",
    detail: "A youth career program we work with in collaboration with NYC's Department of Youth and Community Development (DYCD).",
    website: "https://www.nyc.gov/employment/programs/train-earn",
  },
];
