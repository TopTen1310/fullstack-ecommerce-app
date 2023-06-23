import React from 'react'
import { Link } from 'react-router-dom'
import SecTitle from '../components/SecTitle'
import Review from '../components/Review'

export default function About() {
  return (
    <section className="section p-10">
      <div className="wrapper max-w-screen-xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="contactUs">
            <img src="/images/about-img-1.png" alt="" className="h-[30rem] object-cover mx-auto" />
            <h1 className="text-[1.7rem] font-semibold text-gray-800 text-center uppercase py-6">why choose us?</h1>
            <p className="text-lg text-gray-500 text-center font-medium capitalize leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, vitae sequi numquam id quae animi!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, odio consectetur nemo modi vitae molestias.
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </p>
            <Link to="/contact">
              <button className="py-4 px-10 bg-green-600 btn__style capitalize mt-6 block mx-auto">contact us</button>
            </Link>
          </div>

          <div className="ourShop">
            <img src="/images/about-img-2.png" alt="" className="h-[30rem] object-cover mx-auto" />
            <h1 className="text-[1.7rem] font-semibold text-gray-800 text-center uppercase py-6">what we provide?</h1>
            <p className="text-lg text-gray-500 text-center font-medium capitalize leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, vitae sequi numquam id quae animi!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, odio consectetur nemo modi vitae molestias.
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </p>
            <Link to="/shop">
              <button className="py-4 px-10 bg-green-600 btn__style capitalize mt-6 block mx-auto">our shop</button>
            </Link>
          </div>

        </div>

        <div className="reviews mt-20">
          <SecTitle name="clients reviews" />
          <div className="clientsReviews grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <Review image="/images/pic-1.png" />
            <Review image="/images/pic-2.png" />
            <Review image="/images/pic-3.png" />
            <Review image="/images/pic-4.png" />
            <Review image="/images/pic-5.png" />
            <Review image="/images/pic-6.png" />
            <Review image="/images/pic-2.png" />
            <Review image="/images/pic-1.png" />
          </div>
        </div>

      </div>
    </section>
  )
}
