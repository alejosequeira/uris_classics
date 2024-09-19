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
  };
  features: string[];
  history?: string;
  averageRating: number;
  reviews: Review[];
  isFavorite: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
