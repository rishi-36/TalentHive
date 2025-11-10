import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Data Science",
    "Graphic Designer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='w-full px-4 sm:px-6 md:px-10 lg:px-16 my-12'>
            <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 text-[#6A38C2]">
                Browse Jobs by Category
            </h2>

            <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent className="flex items-center">
                    {
                        category.map((value, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2"
                            >
                                <Button
                                    onClick={() => searchJobHandler(value)}
                                    variant="outline"
                                    className="w-full text-xs sm:text-sm rounded-full border-gray-300 hover:border-[#6A38C2] hover:text-white hover:bg-[#6A38C2] transition py-2"
                                >
                                    {value}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>

                <CarouselPrevious className="-left-6 sm:-left-8" />
                <CarouselNext className="-right-6 sm:-right-8" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
