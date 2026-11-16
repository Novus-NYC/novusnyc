export interface SchoolLogo {
  name: string;
  logo: string;
  brighten?: boolean;
  glow?: boolean;
}

export const collegeLogos: SchoolLogo[] = [
  { name: "Harvard University", logo: "/schools/logos/harvard-crest.png" },
  { name: "Yale University", logo: "/schools/logos/yale-seal.png" },
  { name: "Princeton University", logo: "/schools/logos/princeton-seal.png" },
  { name: "Columbia University", logo: "/schools/logos/columbia-arms.png" },
  { name: "University of Pennsylvania", logo: "/schools/logos/penn-banner.png" },
  { name: "Brown University", logo: "/schools/logos/brown-shield.png" },
  { name: "Dartmouth College", logo: "/schools/logos/dartmouth-shield.png", glow: true, brighten: true },
  { name: "Cornell University", logo: "/schools/logos/cornell-seal.png" },
  { name: "Massachusetts Institute of Technology", logo: "/schools/logos/mit-seal.png" },
  { name: "Stanford University", logo: "/schools/logos/stanford-seal.png" },
  { name: "California Institute of Technology", logo: "/schools/logos/caltech-seal.png" },
  { name: "University of Chicago", logo: "/schools/logos/uchicago-shield.png" },
  { name: "Duke University", logo: "/schools/logos/duke-seal.png" },
  { name: "Johns Hopkins University", logo: "/schools/logos/jhu-seal.png" },
  { name: "Northwestern University", logo: "/schools/logos/northwestern-seal.png" },
  { name: "Vanderbilt University", logo: "/schools/logos/vanderbilt-seal.png", glow: true, brighten: true },
  { name: "Rice University", logo: "/schools/logos/rice-seal.png" },
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
