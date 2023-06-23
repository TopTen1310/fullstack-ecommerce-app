import React from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { StarIcon as OutlineStar } from '@heroicons/react/outline'

export default function Review({ image }) {
    return (
        <div className="bg-white border-2 border-gray-800 border-solid rounded-lg p-6">
            <img src={image} alt="" className="h-32 w-32 rounded-full object-cover mx-auto" />
            <p className="text-lg text-gray-500 text-center font-medium capitalize leading-loose pt-6 pb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, vitae sequi numquam id quae animi!
                Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <div className="icons bg-gray-100 border-2 border-gray-800 border-solid rounded-lg flex items-center gap-1 py-2 px-3 w-44 mx-auto">
                <StarIcon className="w-7 h-7 fill-yellow-500" />
                <StarIcon className="w-7 h-7 fill-yellow-500" />
                <StarIcon className="w-7 h-7 fill-yellow-500" />
                <StarIcon className="w-7 h-7 fill-yellow-500" />
                <OutlineStar className="w-[1.6rem] h-[1.6rem] stroke-yellow-500" />
            </div>
            <h3 className="text-center pt-3 text-2xl text-gray-700 font-semibold capitalize">john deo</h3>
        </div>
    )
}
