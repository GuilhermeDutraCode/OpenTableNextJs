
import Link from "next/link"
import Header from "./components/Header"
import Title from "./components/Title"
import Rating from "./components/Rating"
import Description from "./components/Description"
import Images from "./components/Images"
import Reviews from "./components/Reviews"
import RestaurantNavBar from "./components/RestaurantNavBar"
import NavBar from "@/pages/components/NavBar"
import ReservationCard from "./components/ReservationCard"
import Head from "next/head"

export default function RestaurantDetails (){
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
             <Head><title>Restaurant | OpenTable</title></Head><div></div>
        <main className="max-w-screen-2xl m-auto bg-white">
            <NavBar/>          
            <Header />
             
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            <div className="bg-white w-[70%] rounded p-3 shadow">
                
              <RestaurantNavBar />
                
             <Title />
                {/* TITLE */} {/* RATING */}
                <Rating /> 
                {/* RATING */} {/* DESCRIPTION */}
                <Description />
                {/* DESCRIPTION */} {/* IMAGES */}
              <Images />
                {/* IMAGES */} {/* REVIEWS */}
                <div>
              
                <div>
                    {/* REVIEW CARD */}
               <Reviews />
                    {/* REVIEW CARD */}
                </div>
                </div>
                {/* REVIEWS */}
            </div>
            <div className="w-[27%] relative text-reg">
               <ReservationCard />
            </div>
            </div>
            {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */} {/* RESERVATION
            CARD PORTION */}
        </main>
        </main>
    )
}