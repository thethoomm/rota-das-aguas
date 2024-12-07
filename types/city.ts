type City = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: {
    total: number;
    average: number;
  };
};

export default City;
