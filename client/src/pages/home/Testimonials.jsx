/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Main Testimonial Image */}
        <div className="md:w-1/2">
          <img
            className="rounded-full w-full h-auto max-w-[500px]"
            src="/images/home/testimonials/testimonials.avif"
            alt="Happy customers at restaurant"
          />
        </div>

        {/* Testimonials Content */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at Foodie last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* Customer Avatars */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img 
                      src="/images/home/testimonials/testimonial1.png" 
                      alt="Customer profile 1" 
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img 
                      src="/images/home/testimonials/testimonial2.png" 
                      alt="Customer profile 2" 
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img 
                      src="/images/home/testimonials/testimonial3.png" 
                      alt="Customer profile 3" 
                    />
                  </div>
                </div>
              </div>

              {/* Ratings Section */}
              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text-[#807E7E]">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;