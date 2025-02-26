import { Car } from '@/types/car';

// En carData.ts

export interface CarouselCar {
    title: string;
    imageUrl: string;
    alt?: string;
    priority?: boolean;
}

interface CarGroup {
    cars: CarouselCar[];
}

export const carGroups: CarGroup[] = [
    {
        // Grupo Mustang
        cars: [
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Front View',
                priority: true 
            },
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Side View' 
            },
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Rear View' 
            },
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Interior View' 
            },
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Engine View' 
            },
            { 
                title: '1969 Ford Mustang', 
                imageUrl: '/images/ford-mustang-1969.webp',
                alt: '1969 Ford Mustang - Detail View' 
            }
        ]
    },
    {
        // Grupo Camaro
        cars: [
            { 
                title: '1970 Chevrolet Camaro ZL1', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1970 Chevrolet Camaro ZL1 - Front View',
                priority: false 
            },
            { 
                title: '1989 Chevrolet Camaro', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1989 Chevrolet Camaro - Side View' 
            },
            { 
                title: '1968 Chevrolet Camaro', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1968 Chevrolet Camaro - Rear View' 
            },
            { 
                title: '1965 Chevrolet Camaro', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1965 Chevrolet Camaro - Interior View' 
            },
            { 
                title: '1972 Chevrolet Camaro', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1972 Chevrolet Camaro - Engine View' 
            },
            { 
                title: '1975 Chevrolet Camaro', 
                imageUrl: '/images/chevrolet-camaro-1970.webp',
                alt: '1975 Chevrolet Camaro - Detail View' 
            }
        ]
    },
    {
        // Grupo Charger
        cars: [
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Front View',
                priority: true 
            },
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Side View' 
            },
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Rear View' 
            },
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Interior View' 
            },
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Engine View' 
            },
            { 
                title: '1969 Dodge Charger', 
                imageUrl: '/images/dodge-charger-1969.webp',
                alt: '1969 Dodge Charger - Detail View' 
            }
        ]
    }
 ];

// Función helper para obtener un grupo aleatorio (siempre devuelve las 6 imágenes del mismo auto)
export const getRandomCarouselCars = (): CarouselCar[] => {
    const randomIndex = Math.floor(Math.random() * carGroups.length);
    return carGroups[randomIndex].cars;
};

const mockCars: Car[] = [
    {
        id: '1',
        make: 'Ford',
        model: 'Mustang Restomod',
        year: 1965,
        price: 85000,
        imageUrl: '/images/forsale/first-mustang/img1.jpg',
        images: [
            '/images/forsale/first-mustang/img2.jpg',
            '/images/forsale/first-mustang/img3.jpg',
            '/images/forsale/first-mustang/img4.jpg',
            '/images/forsale/first-mustang/img5.jpg',
            '/images/forsale/first-mustang/img6.jpg',
            '/images/forsale/first-mustang/img7.jpg',
            '/images/forsale/first-mustang/img8.jpg',
            '/images/forsale/first-mustang/img9.jpg',
            '/images/forsale/first-mustang/img10.jpg',
            '/images/forsale/first-mustang/img11.jpg',
            '/images/forsale/first-mustang/img12.jpg',
            '/images/forsale/first-mustang/img13.jpg',
            '/images/forsale/first-mustang/img14.jpg',
        ],
        description: 'Este Mustang no es solo un clásico, sino una obra maestra en la que la nostalgia se une a la innovación. Ideal para el entusiasta que busca lo mejor de ambos mundos: la estética original de un muscle car de los 60 con la potencia y fiabilidad de un auto moderno, sin perder el toque auténtico en su interior. No dejes escapar esta oportunidad única de ser dueño de un vehículo que combina historia y tecnología, creando una experiencia de conducción inigualable.',
        specifications: {
            engine: '289 V8',
            transmission: 'Automatic',
            mileage: 27700,
            exteriorColor: 'Red',
            interiorColor: 'Black',
            horsepower: '225 hp',
            topSpeed: '130 mph',
            acceleration: '6.9 seconds 0-60 mph',            
        },
        features: [
            'Luces traseras Shelby intermitentes secuenciales',
            'Parrilla delantera nueva',
            'Volante Shelby',
            'Radio retro bluetooth/FM y nuevos altavoces',
            'Alfombra especial de amortiguación de sonido',
            'Aire acondicionado nuevo',
            'Freno a disco delantero'
        ],
        history: 'Restomod profesional con mejoras modernas manteniendo la estética clásica original.',
        location: 'Miami, FL',
        engine: '289 V8 (225 hp)',
        transmission: 'Automatic, vin: 5F07F116739',
        mileage: 27700,
        averageRating: 4.9,
        reviews: [
            { id: '101', userId: 'user1', username: 'ClassicCarLover', rating: 5, comment: 'A true American classic!', date: '2023-05-15' },
            { id: '102', userId: 'user2', username: 'MustangFan', rating: 4.8, comment: 'Increíble combinación de clásico y moderno!', date: '2023-06-02' }
        ],
        isFavorite: false
    },
    {
        id: '2',
        make: 'Ford',
        model: 'Mustang',
        year: 1965,
        price: 95000,
        imageUrl: '/images/forsale/second-mustang/File5.jpg',
        images: [
            '/images/forsale/second-mustang/File1.jpg',
            '/images/forsale/second-mustang/File2.jpg',
            '/images/forsale/second-mustang/File3.jpg',
            '/images/forsale/second-mustang/File4.jpg',
            '/images/forsale/second-mustang/File6.jpg',
            '/images/forsale/second-mustang/File7.jpg',
            '/images/forsale/second-mustang/File8.jpg',
            '/images/forsale/second-mustang/File9.jpg',
            '/images/forsale/second-mustang/File10.jpg',
            '/images/forsale/second-mustang/File11.jpg',
            '/images/forsale/second-mustang/File12.jpg',
            '/images/forsale/second-mustang/File13.jpg',
            '/images/forsale/second-mustang/File14.jpg',
            '/images/forsale/second-mustang/File15.jpg',
        ],
        description: 'The 1965 Ford Mustang is an automotive icon, known for its sporty design and cultural impact. This classic pony car features a sleek body with muscular lines, a distinctive grille with the galloping horse emblem, and round headlights. The 1965 Mustang marked the beginning of a new era for American sports cars.',
        specifications: {
            engine: '289 V8',
            transmission: 'Automatic',
            mileage: 65670,
            exteriorColor: 'White',
            interiorColor: 'Red',
            horsepower: '225 hp',
            topSpeed: '120 mph',
            acceleration: '7.5 seconds 0-60 mph'
        },
        features: [
            'Power steering',
            'Power brakes',
            'Original radio',
            'Bucket seats',
            'Chrome wheels'
        ],
        history: 'Well-maintained classic with documented service history.',
        location: 'Miami, FL',
        engine: '289 V8 (225 hp)',
        transmission: 'Automatic',
        mileage: 65670,
        averageRating: 4.9,
        reviews: [
            { id: '201', userId: 'user3', rating: 5, username: 'MustangLover', comment: 'Beautiful classic in excellent condition!', date: '2023-04-20' },
            { id: '202', userId: 'user4', rating: 4.8, username: 'ClassicCarFan', comment: 'Iconic American muscle car. Drives like a dream.', date: '2023-05-10' }
        ],
        isFavorite: false
    },
    {
        id: '3',
        make: 'Chevrolet',
        model: 'Corvette Stingray',
        year: 1970,
        price: 95000,
        imageUrl: '/images/optimizadoback/corvette.webp',
        images: [
            '/images/forsale/corvette/File1.jpg',
            '/images/forsale/corvette/File2.jpg',
            '/images/forsale/corvette/File3.jpg',
            '/images/forsale/corvette/File4.jpg',
            '/images/forsale/corvette/File5.jpg',
            '/images/forsale/corvette/File6.jpg',
            '/images/forsale/corvette/File7.jpg',
            '/images/forsale/corvette/File8.jpg',
            '/images/forsale/corvette/File9.jpg',
            '/images/forsale/corvette/File10.jpg',
            '/images/forsale/corvette/File11.jpg',
            '/images/forsale/corvette/File12.jpg',
            '/images/forsale/corvette/File13.jpg',
            '/images/forsale/corvette/File14.jpg',
            '/images/forsale/corvette/File15.jpg',
        ],
        description: 'Present today is a true icon, and it takes shape with this lovely 1970 Chevrolet Corvette Convertible. This muscular classic from the ʼ70s guarantees thunderous performance and the best of the ʼ70s muscle car design to ensure you stand out from the crowd.',
        specifications: {
            engine: '454ci V8',
            transmission: '4-speed Manual',
            mileage: 64953,
            exteriorColor: 'Blue',
            interiorColor: 'Black',
            horsepower: '390 hp',
            topSpeed: '150 mph',
            acceleration: '5.3 seconds 0-60 mph'
        },
        features: [
            'Convertible top',
            'Power steering',
            'Power brakes',
            'AM/FM radio',
            'Chrome wheels',
            'T-top option'
        ],
        history: 'Numbers matching drivetrain with full restoration completed in 2018.',
        location: 'Miami, FL',
        engine: '454ci V8',
        transmission: '4-speed Manual',
        mileage: 64953,
        averageRating: 4.7,
        reviews: [
            { id: '301', userId: 'user5', username: 'VetteFanatic', rating: 5, comment: 'The ultimate American sports car. Absolute beast!', date: '2023-05-22' },
            { id: '302', userId: 'user6', username: 'ClassicCollector', rating: 4.4, comment: 'Phenomenal condition and performance. A real head-turner.', date: '2023-06-12' }
        ],
        isFavorite: false
    }

    // {
    //     id: '4',
    //     make: 'Ford',
    //     model: 'F-150',
    //     year: 2020,
    //     price: 50000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A modern and capable 2020 Ford F-150, perfect for work and play.',
    //     specifications: {
    //         engine: '302 V8',
    //         transmission: '3-speed automatic',
    //         mileage: 75000,
    //         exteriorColor: 'Red',
    //         interiorColor: 'Black',
    //         horsepower: '250 hp',
    //         topSpeed: '124 mph',
    //         acceleration: '7.1 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Four-wheel drive',
    //         'Towing package',
    //         'Heated seats',
    //         'Touchscreen navigation',
    //         'Backup camera',
    //     ],
    //     history: 'Regularly serviced and in excellent condition. Single owner.',
    //     location: 'Houston, TX',
    //     engine: '5.0L V8',
    //     transmission: '10-speed automatic',
    //     mileage: 15000,
    //     averageRating: 4.3,
    //     reviews: [
    //         { id: '401', userId: 'user7', username: 'TruckEnthusiast', rating: 5, comment: 'Best truck I\'ve ever owned!', date: '2023-07-01' },
    //         { id: '402', userId: 'user8', username: 'DailyDriver', rating: 4, comment: 'Great for work and play.', date: '2023-07-15' },
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '5',
    //     make: 'Chevrolet',
    //     model: 'Corvette',
    //     year: 2021,
    //     price: 65000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A stunning 2021 Chevrolet Corvette with exceptional performance and modern luxury.',
    //     specifications: {
    //         engine: '6.2L V8',
    //         transmission: '8-speed automatic',
    //         mileage: 12000,
    //         exteriorColor: 'Red',
    //         interiorColor: 'Black',
    //         horsepower: '495 hp',
    //         topSpeed: '194 mph',
    //         acceleration: '2.9 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Heated and ventilated seats',
    //         'Touchscreen infotainment system',
    //         'Heads-up display',
    //         'Premium audio system',
    //         'Rearview camera'
    //     ],
    //     history: 'One owner, meticulously maintained with all service records.',
    //     location: 'Dallas, TX',
    //     engine: '6.2L V8 (495 hp)',
    //     transmission: '8-speed automatic',
    //     mileage: 12000,
    //     averageRating: 4.9,
    //     reviews: [
    //         { id: '501', userId: 'user9', username: 'SpeedFreak', rating: 5, comment: 'Unbelievable performance!', date: '2023-08-01' },
    //         { id: '502', userId: 'user10', username: 'LuxuryCars', rating: 4, comment: 'A bit flashy, but so much fun to drive.', date: '2023-08-15' }
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '6',
    //     make: 'Dodge',
    //     model: 'Viper',
    //     year: 2019,
    //     price: 80000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A powerful 2019 Dodge Viper with raw performance and aggressive styling.',
    //     specifications: {
    //         engine: '8.4L V10',
    //         transmission: '6-speed manual',
    //         mileage: 9000,
    //         exteriorColor: 'Black',
    //         interiorColor: 'Red',
    //         horsepower: '645 hp',
    //         topSpeed: '206 mph',
    //         acceleration: '3.4 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Track-tuned suspension',
    //         'High-performance brakes',
    //         'Lightweight body panels',
    //         'Performance seats',
    //         'Backup camera'
    //     ],
    //     history: 'Always garage-kept, used mainly for track days. All original parts.',
    //     location: 'Las Vegas, NV',
    //     engine: '8.4L V10 (645 hp)',
    //     transmission: '6-speed manual',
    //     mileage: 9000,
    //     averageRating: 4.7,
    //     reviews: [
    //         { id: '601', userId: 'user11', username: 'AdrenalineJunkie', rating: 5, comment: 'Raw power and aggression!', date: '2023-09-01' },
    //         { id: '602', userId: 'user12', username: 'TrackDayHero', rating: 4, comment: 'Handles like a dream on the track.', date: '2023-09-15' }
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '7',
    //     make: 'Ford',
    //     model: 'Bronco',
    //     year: 2021,
    //     price: 35000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A rugged 2021 Ford Bronco built for adventure and off-road capabilities.',
    //     specifications: {
    //         engine: '2.7L V6 EcoBoost',
    //         transmission: '10-speed automatic',
    //         mileage: 10000,
    //         exteriorColor: 'Cactus Gray',
    //         interiorColor: 'Black',
    //         horsepower: '310 hp',
    //         topSpeed: '120 mph',
    //         acceleration: '7.2 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Four-wheel drive',
    //         'Removable roof and doors',
    //         'Terrain management system',
    //         'Trail cameras',
    //         'Heavy-duty suspension'
    //     ],
    //     history: 'One owner, regularly maintained with minimal off-road use.',
    //     location: 'Denver, CO',
    //     engine: '2.7L V6 EcoBoost (310 hp)',
    //     transmission: '10-speed automatic',
    //     mileage: 10000,
    //     averageRating: 4.8,
    //     reviews: [
    //         { id: '701', userId: 'user13', username: 'OffRoadWarrior', rating: 5, comment: 'Perfect for adventures!', date: '2023-10-01' },
    //         { id: '702', userId: 'user14', username: 'WeekendExplorer', rating: 3, comment: 'Good, but fuel economy could be better.', date: '2023-10-15' }
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '8',
    //     make: 'Chevrolet',
    //     model: 'Impala',
    //     year: 1967,
    //     price: 30000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A timeless 1967 Chevrolet Impala with classic American styling and comfort.',
    //     specifications: {
    //         engine: '427 V8',
    //         transmission: '3-speed automatic',
    //         mileage: 78000,
    //         exteriorColor: 'Black',
    //         interiorColor: 'Red',
    //         horsepower: '385 hp',
    //         topSpeed: '115 mph',
    //         acceleration: '7.0 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Power steering',
    //         'Classic bench seats',
    //         'AM/FM radio',
    //         'Original chrome accents',
    //         'Whitewall tires'
    //     ],
    //     history: 'Professionally restored in 2015. A true collector’s item.',
    //     location: 'Seattle, WA',
    //     engine: '427 V8 (385 hp)',
    //     transmission: '3-speed automatic',
    //     mileage: 78000,
    //     averageRating: 4.6,
    //     reviews: [
    //         { id: '801', userId: 'user15', username: 'VintageCollector', rating: 5, comment: 'A piece of history!', date: '2023-11-01' },
    //         { id: '802', userId: 'user16', username: 'SundayCruiser', rating: 3, comment: 'Beautiful, but high maintenance.', date: '2023-11-15' }
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '9',
    //     make: 'Dodge',
    //     model: 'Challenger',
    //     year: 2020,
    //     price: 45000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A modern 2020 Dodge Challenger combining retro style with cutting-edge performance.',
    //     specifications: {
    //         engine: '6.4L V8 HEMI',
    //         transmission: '8-speed automatic',
    //         mileage: 15000,
    //         exteriorColor: 'Plum Crazy Purple',
    //         interiorColor: 'Black',
    //         horsepower: '485 hp',
    //         topSpeed: '182 mph',
    //         acceleration: '4.2 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Performance suspension',
    //         'Brembo brakes',
    //         'Touchscreen infotainment',
    //         'Adaptive cruise control',
    //         'Launch control'
    //     ],
    //     history: 'Purchased new and meticulously maintained. Driven primarily on weekends.',
    //     location: 'Phoenix, AZ',
    //     engine: '6.4L V8 HEMI (485 hp)',
    //     transmission: '8-speed automatic',
    //     mileage: 15000,
    //     averageRating: 4.7,
    //     reviews: [
    //         { id: '901', userId: 'user17', username: 'ModernMuscle', rating: 5, comment: 'The perfect blend of old and new!', date: '2023-12-01' },
    //         { id: '902', userId: 'user18', username: 'QuarterMileKing', rating: 4, comment: 'Fast in a straight line, decent in corners.', date: '2023-12-15' }
    //     ],
    //     isFavorite: false
    // },
    // {
    //     id: '10',
    //     make: 'Ford',
    //     model: 'GT',
    //     year: 2005,
    //     price: 250000,
    //     imageUrl: '/images/chevrolet-camaro-1970.webp',
    //     images: [
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //         '/images/ford-mustang-1969.webp',
    //     ],
    //     description: 'A legendary 2005 Ford GT with supercar performance and timeless design.',
    //     specifications: {
    //         engine: '5.4L Supercharged V8',
    //         transmission: '6-speed manual',
    //         mileage: 7000,
    //         exteriorColor: 'Heritage Blue',
    //         interiorColor: 'Black',
    //         horsepower: '550 hp',
    //         topSpeed: '205 mph',
    //         acceleration: '3.5 seconds 0-60 mph'
    //     },
    //     features: [
    //         'Carbon fiber body panels',
    //         'Brembo brakes',
    //         'Leather-trimmed seats',
    //         'Performance gauges',
    //         'Push-button start'
    //     ],
    //     history: 'Low-mileage collector’s car. Always stored in a climate-controlled garage.',
    //     location: 'Miami, FL',
    //     engine: '5.4L Supercharged V8 (550 hp)',
    //     transmission: '6-speed manual',
    //     mileage: 7000,
    //     averageRating: 4.9,
    //     reviews: [
    //         { id: '1001', userId: 'user19', username: 'ExoticCarFanatic', rating: 5, comment: 'A true supercar experience!', date: '2024-01-01' },
    //         { id: '1002', userId: 'user20', username: 'PerformanceGuru', rating: 4, comment: 'Incredible performance, but not for daily use.', date: '2024-01-15' }
    //     ],
    //     isFavorite: false
    // },
];

export default mockCars;