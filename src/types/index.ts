export type NavLink = {
    label: string;
    href: string;
    active?: boolean;
};

export type DestinationType = {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    rating?: string | number;
};
