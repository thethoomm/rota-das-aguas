type Producer = {
  id: string;
  name: string;
  city: string;
  image: string;
  description: string;
  categories: string[];
  rating: {
    total: number;
    average: number;
  };
  photos?: string[];
  website?: string;
  location: string
};

export default Producer;
