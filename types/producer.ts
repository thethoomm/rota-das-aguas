type Producer = {
  id: string;
  name: string;
  city: string;
  image: string;
  categories: string[];
  rating: {
    total: number;
    average: number;
  };
};

export default Producer;
