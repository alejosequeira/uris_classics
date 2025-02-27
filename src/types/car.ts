export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  images: string[];
  description: string;
  specifications: {
      engine: string;
      transmission: string;
      mileage: number;
      exteriorColor: string;
      interiorColor: string;
      horsepower: string;
      vin: string;
  };
  features: string[];
  history: string;
  location: string;
  engine: string;
  transmission: string;
  mileage: number;
  averageRating: number;
  reviews: {
      id: string;
      userId: string;
      username: string;
      rating: number;
      comment: string;
      date: string;
  }[];
  isFavorite: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
