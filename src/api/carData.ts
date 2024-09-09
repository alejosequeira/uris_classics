import { Car } from '@/types/car';

const mockCars: Car[] = [
    {
        id: '1',
        make: 'Ford',
        model: 'Mustang',
        year: 1969,
        price: 38000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.7,
        reviews: [
            { id: '101', userId: 'user1', username: 'ClassicCarLover', rating: 5, comment: 'A true American classic!', date: '2023-05-15' },
            { id: '102', userId: 'user2', username: 'MustangFan', rating: 4, comment: 'Great condition, but a bit overpriced.', date: '2023-06-02' }
        ],
        isFavorite: false
    },
    {
        id: '2',
        make: 'Chevrolet',
        model: 'Camaro',
        year: 1970,
        price: 42000,
        imageUrl: '/images/chevrolet-camaro-1970.jpg',
        averageRating: 4.3,
        reviews: [
            { id: '201', userId: 'user3', username: 'MuscleCars4Life', rating: 5, comment: 'Powerful and beautiful!', date: '2023-05-20' },
            { id: '202', userId: 'user4', username: 'CarRestorer', rating: 3, comment: 'Needs some work, but has potential.', date: '2023-06-10' }
        ],
        isFavorite: false
    },
    {
        id: '3',
        make: 'Dodge',
        model: 'Charger',
        year: 1969,
        price: 45000,
        imageUrl: '/images/dodge-charger-1969.jpeg',
        averageRating: 4.8,
        reviews: [
            { id: '301', userId: 'user5', username: 'SpeedDemon', rating: 5, comment: 'A dream come true!', date: '2023-05-25' },
            { id: '302', userId: 'user6', username: 'VintageCars', rating: 4, comment: 'Excellent condition, fair price.', date: '2023-06-15' }
        ],
        isFavorite: false
    },
    {
        id: '4',
        make: 'Ford',
        model: 'F-150',
        year: 2020,
        price: 50000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.5,
        reviews: [
            { id: '401', userId: 'user7', username: 'TruckEnthusiast', rating: 5, comment: 'Best truck I´ve ever owned!', date: '2023-07-01' },
            { id: '402', userId: 'user8', username: 'DailyDriver', rating: 4, comment: 'Great for work and play.', date: '2023-07-15' },
        ],
        isFavorite: false
    },
    {
        id: '5',
        make: 'Chevrolet',
        model: 'Corvette',
        year: 2021,
        price: 65000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.9,
        reviews: [
            { id: '501', userId: 'user9', username: 'SpeedFreak', rating: 5, comment: 'Unbelievable performance!', date: '2023-08-01' },
            { id: '502', userId: 'user10', username: 'LuxuryCars', rating: 4, comment: 'A bit flashy, but so much fun to drive.', date: '2023-08-15' }
        ],
        isFavorite: false
    },
    {
        id: '6',
        make: 'Dodge',
        model: 'Viper',
        year: 2019,
        price: 80000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.6,
        reviews: [
            { id: '601', userId: 'user11', username: 'AdrenalineJunkie', rating: 5, comment: 'Raw power and aggression!', date: '2023-09-01' },
            { id: '602', userId: 'user12', username: 'TrackDayHero', rating: 4, comment: 'Handles like a dream on the track.', date: '2023-09-15' }
        ],
        isFavorite: false
    },
    {
        id: '7',
        make: 'Ford',
        model: 'Bronco',
        year: 2021,
        price: 35000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.4,
        reviews: [
            { id: '701', userId: 'user13', username: 'OffRoadWarrior', rating: 5, comment: 'Perfect for adventures!', date: '2023-10-01' },
            { id: '702', userId: 'user14', username: 'WeekendExplorer', rating: 3, comment: 'Good, but fuel economy could be better.', date: '2023-10-15' }
        ],
        isFavorite: false
    },
    {
        id: '8',
        make: 'Chevrolet',
        model: 'Impala',
        year: 1967,
        price: 30000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.2,
        reviews: [
            { id: '801', userId: 'user15', username: 'VintageCollector', rating: 5, comment: 'A piece of history!', date: '2023-11-01' },
            { id: '802', userId: 'user16', username: 'SundayCruiser', rating: 3, comment: 'Beautiful, but high maintenance.', date: '2023-11-15' }
        ],
        isFavorite: false
    },
    {
        id: '9',
        make: 'Dodge',
        model: 'Challenger',
        year: 2020,
        price: 45000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.7,
        reviews: [
            { id: '901', userId: 'user17', username: 'ModernMuscle', rating: 5, comment: 'The perfect blend of old and new!', date: '2023-12-01' },
            { id: '902', userId: 'user18', username: 'QuarterMileKing', rating: 4, comment: 'Fast in a straight line, decent in corners.', date: '2023-12-15' }
        ],
        isFavorite: false
    },
    {
        id: '10',
        make: 'Ford',
        model: 'GT',
        year: 2005,
        price: 250000,
        imageUrl: '/images/ford-mustang-1969.webp',
        averageRating: 4.9,
        reviews: [
            { id: '1001', userId: 'user19', username: 'ExoticCarFanatic', rating: 5, comment: 'A true supercar experience!', date: '2024-01-01' },
            { id: '1002', userId: 'user20', username: 'PerformanceGuru', rating: 4, comment: 'Incredible performance, but not for daily use.', date: '2024-01-15' }
        ],
        isFavorite: false
    },
];

export default mockCars;