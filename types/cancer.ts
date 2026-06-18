export interface Cancer {
  id: string;
  name: string;
  color: string;
  image: string;
  shortDescription: string;
  description: string;
  epidemiology: string;
  riskPopulation: string;
  riskFactors: {
    modifiable: string[];
    nonModifiable: string[];
  };
  symptoms: {
    early: string[];
    advanced: string[];
    warningSign: string[];
  };
  screening: {
    primaryPrevention: string[];
    availableTests: string[];
    recommendations: {
      ageGroup: string;
      frequency: string;
      tests: string[];
    }[];
    resultsInterpretation: string;
    screeningCenters: string[];
  };
  testimonials: Testimonial[];
  resources: Resource[];
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  story: string;
  message: string;
  rating?: number;
  date: string;
  anonymous?: boolean;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'link' | 'pdf' | 'video';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedDate: string;
  readTime: number;
  category: string;
  tags: string[];
}
