import NavBar from "@/pages/components/NavBar"
import Header from "../components/Header"
import RestaurantNavBar from "../components/RestaurantNavBar"
import Menu from "../components/Menu"
import { Item, PrismaClient } from "@prisma/client";
import AuthContext from "@/pages/context/AuthContext";


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
            items: {
                select: {
                updated_at: false,
                created_at: false,
                name: true,
                price: true,
                description: true,           
                }
              },
            description: true,
            slug: true
        }
    });
    if(!restaurant){
        throw new Error
    }
 ////Serialized is only needed if some of the info comes in a data type JSON doesnt support eg DATE
  
    return {props: { restaurant }} //return info requested
    
}

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    items: Item[]
    slug: string;
  }


interface RestaurantDetailsProps {   //created interface so TypeScript doesnt shit it self
    restaurant: Restaurant;
}

export default function RestaurantMenu ({ restaurant }: RestaurantDetailsProps) {
    console.log(restaurant.items)
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <AuthContext>
        <main className="max-w-screen-2xl m-auto bg-white">
            {/* NAVBAR */}
                <NavBar/>
            {/* NAVBAR */} {/* HEADER */}
            <Header name = {restaurant.slug}/>           
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            <div className="bg-white w-[100%] rounded p-3 shadow">
                {/* RESAURANT NAVBAR */}
                <RestaurantNavBar slug = {restaurant.slug}/>
                {/* RESAURANT NAVBAR */} {/* MENU */}
              <Menu menu={restaurant.items}/>
                {/* MENU */}
            </div>
            </div>
            {/* DESCRIPTION PORTION */}
        </main>
        </AuthContext>
        </main>
    )
}