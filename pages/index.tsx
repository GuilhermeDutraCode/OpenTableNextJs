import { Inter } from 'next/font/google'
import NavBar from './components/NavBar';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import { Cuisine, Location, PRICE, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })
const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async () => {
  const allRestaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      created_at: true,
      updated_at: true
      
    }
  });

  const serializedRestaurants = allRestaurants.map((restaurant) => ({
    ...restaurant,
    created_at: restaurant.created_at.toString(),
    updated_at: restaurant.created_at.toString(),
    cuisine: {
      ...restaurant.cuisine,
      created_at: restaurant.cuisine.created_at.toString(),
      updated_at: restaurant.created_at.toString(),
    },
    location: {
      ...restaurant.location,
      created_at: restaurant.location.created_at.toString(),
      updated_at: restaurant.created_at.toString(),
    }
  }))

  return {
    props: {
      allRestaurants: serializedRestaurants,
    },
  };
};

interface HomeProps {
  allRestaurants: any[]; // Adjust the type as per your actual data structure
}

 export interface RestaurantCardType{
  id:number;
  name: string;
  main_image: string;
  cuisine: Cuisine,
  location: Location,
  price: PRICE
  slug: string
}

export default  function Home({ allRestaurants }: HomeProps) {
  
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
    <main className="max-w-screen-2xl m-auto bg-white">
      <NavBar/>
      <main>      
          <Header />        
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">          
          {/* <RestaurantCard />           */}
          {allRestaurants.map(restaurant => (
             <RestaurantCard restaurant = {restaurant} /> 
          ))}
        </div>       
      </main>
    </main>
  </main>
  
  )
}
