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
import { PrismaClient } from "@prisma/client"

///////////////This is how you do a db query and render it to front end
const prisma = new PrismaClient();    //call Prisma

export const getServerSideProps = async ({ query }: { query: { slug: string } }) => {
    const { slug } = query;

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true
        }
    });
 ////Serialized is only needed if some of the info comes in a data type JSON doesnt support eg DATE
  
    return {props: { restaurant }} //return info requested
    
}

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
  }


interface RestaurantDetailsProps {   //created interface so TypeScript doesnt shit it self
    restaurant: Restaurant;
}


export default function RestaurantDetails({ restaurant }: RestaurantDetailsProps ){   //this is how you pass the props as a parameter
   
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
             <Head><title>Restaurant | OpenTable</title></Head><div></div>
        <main className="max-w-screen-2xl m-auto bg-white">
            <NavBar/>          
            <Header name = {restaurant.slug}/>
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            <div className="bg-white w-[70%] rounded p-3 shadow">
              <RestaurantNavBar slug = {restaurant.slug}/>
                <Title name = {restaurant.name}/>
                <Rating /> 
                <Description description = {restaurant.description}/>
                <Images images ={restaurant.images}/>
                <div>
                <div>
               <Reviews />
                </div>
                </div>
            </div>
            <div className="w-[27%] relative text-reg">
               <ReservationCard />
            </div>
            </div>
        </main>
        </main>
    )
}