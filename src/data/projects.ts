import { Project } from '@/types';

export const projects: Project[] = [
    {
        id: '1',
        title: 'NuroStock - Stock Price Prediction Platform',
        description: 'Stock market prediction website that uses deep learning to forecast closing prices using historical data. Aimed at simplifying stock analysis for both novice and professional traders.',
        technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Flask', 'NumPy', 'TensorFlow', 'LSTM', 'Socket.io'],
        features: [
            'LSTM-based neural network for accurate time-series prediction',
            'Interactive data visualization with historical and predictive insights',
            'Secure user authentication and smart watchlist feature',
            'Real-time market stats, top gainers/losers, and smart notifications',
            'Simple and intuitive UI for easy navigation'
        ],
        githubUrl: 'https://github.com/yujanThulung/StockProject',
        imageUrl: '/images/projects/nurostock.png',
        category: 'ai'
    },
    {
        id: '2',
        title: 'Roomix - Room Rental Management System',
        description: 'Modern system for renting rooms and flats, built to simplify the process of finding and leasing accommodations. Multi-role platform for tenants, landlords, and admins.',
        technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap 5', 'JavaScript'],
        features: [
            'Full-stack system using PHP and MySQL for data handling',
            'Tenants can register, search rooms/flats by location & category',
            'Landlords can register and list properties with detailed room information',
            'Admin panel to manage users and property listings',
            'Responsive front-end designed with HTML, CSS, and Bootstrap 5'
        ],
        githubUrl: 'https://github.com/yujanThulung/Roomix-Collage-project',
        imageUrl: '/images/projects/roomix.png',
        category: 'web'
    },
    {
        id: '3',
        title: 'Food Delivery Website',
        description: 'React frontend project offering a fully responsive application for browsing, filtering, and ordering food with real-time cost calculation.',
        technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
        features: [
            'Responsive UI that adapts to all screen sizes',
            'Food Listing & Filtering by category and price',
            'Real-time Cost Calculation for food and delivery',
            'Component-Based Architecture with clean, reusable components'
        ],
        githubUrl: 'https://github.com/yujanThulung/food-delivery',
        liveUrl: 'https://food-delivery-yujan.vercel.app/',
        imageUrl: '/images/projects/food-delivery.png',
        category: 'web'
    }
];