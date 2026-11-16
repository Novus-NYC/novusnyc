export interface SchoolLogo {
  name: string;
  logo: string;
  brighten?: boolean;
  glow?: boolean;
}

export const collegeLogos: SchoolLogo[] = [
  { name: "Harvard University", logo: "/schools/logos/harvard.png" },
  { name: "Cornell University", logo: "/schools/logos/cornell.png" },
  { name: "University of Pennsylvania", logo: "/schools/logos/upenn.png" },
  { name: "Columbia University", logo: "/schools/logos/columbia-mark.png" },
  { name: "Purdue University", logo: "/schools/logos/purdue-mark.png" },
  { name: "Binghamton University", logo: "/schools/logos/binghamton.png" },
  { name: "Stony Brook University", logo: "/schools/logos/stony-brook.png" },
  { name: "Macaulay Honors College", logo: "/schools/logos/macaulay-mark.png" },
  { name: "Penn State University", logo: "/schools/logos/penn-state.png" },
  { name: "Baruch College", logo: "/schools/logos/baruch.png" },
  { name: "University of Rochester", logo: "/schools/logos/rochester-shield.png" },
  { name: "Stevens Institute of Technology", logo: "/schools/logos/stevens.png" },
];

export const featuredHighSchoolLogos: SchoolLogo[] = [
  { name: "Walter Payton College Preparatory High School", logo: "/schools/logos/payton.png" },
  { name: "Stuyvesant High School", logo: "/schools/logos/stuyvesant.png" },
  { name: "Brooklyn Technical High School", logo: "/schools/logos/brooklyn-tech.png", brighten: true },
  { name: "The Dalton School", logo: "/schools/logos/dalton-seal.png" },
  { name: "York Preparatory School", logo: "/schools/logos/york-prep-seal.png" },
  { name: "Dwight School", logo: "/schools/logos/dwight.png" },
  { name: "Staten Island Technical High School", logo: "/schools/logos/staten-island-tech.png" },
  { name: "Townsend Harris High School", logo: "/schools/logos/townsend-harris.png" },
  { name: "Syosset High School", logo: "/schools/logos/syosset-mark.png" },
  { name: "Thomas Jefferson High School for Science and Technology", logo: "/schools/logos/thomas-jefferson-mark.png" },
  { name: "Phillips Exeter Academy", logo: "/schools/logos/exeter-seal.png" },
  { name: "Phillips Academy Andover", logo: "/schools/logos/andover-mark.png", brighten: true },
];

export const otherHighSchoolLogos: SchoolLogo[] = [
  { name: "Bronx High School of Science", logo: "/schools/logos/bronx-science.png" },
  { name: "NEST+m", logo: "/schools/logos/nest-m-mark.png" },
  { name: "Academy for Mathematics, Science, and Engineering", logo: "/schools/logos/amse-emblem.png", glow: true },
  { name: "International Academy East", logo: "/schools/logos/international-academy-east.png" },
];
