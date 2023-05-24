import Link from "next/link";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import Head from "next/head";
import { useRouter } from "next/router";
import prisma from '../../lib/prisma'
import { serialize } from "v8";
import {Cuisine, Location } from "@prisma/client";


export default  function Search({ restaurant, location, cuisine }: { restaurant: any; location: Location[], cuisine: Cuisine[]}) {
  const router = useRouter();
  const query = router.query; // Get URL query
  const city = query.city;
  console.log(restaurant)
  return (
    <>
      <Head>
        <title>Search | OpenTable</title>
      </Head>
      <div>
        <main className="bg-gray-100 min-h-screen w-screen">
          <main className="max-w-screen-2xl m-auto bg-white">
            <NavBar />
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
              <SearchSideBar location={location} cuisine={cuisine} />
              <div className="w-5/6">
                {/* <RestaurantCard /> */}
                {restaurant.length ? (
                    restaurant.map((restaurantItem: any) => (
                        <RestaurantCard key={restaurantItem.id} restaurant={restaurantItem} />
                    ))
                ) : (
                    <p>Sorry, we could not find any matches in this area</p>
                )}
              </div>
            </div>
          </main>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { city } = query;
    
  try {
    const cuisine = await prisma.cuisine.findMany({
      select : {
        name: true
      }
    })

    const location = await prisma.location.findMany({
      select: {
        name: true
      }
    });

    const restaurant = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            location: {
              name: {
                equals: city.toLowerCase()
              }
            }
          },
          {
            cuisine: {
              name: {
                in: [city.toLowerCase()]
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        main_image: true,
        description: true,
        price: true,
        slug: true,
        cuisine: {
          select: {
            id: true,
            name: true
          }
        },
        location: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return {
     
      props: { location, restaurant, cuisine },
    };
  }
  
  catch (error) {
    console.error("An error occurred while fetching stuff:", error);
    return {
      props: { location: [], restaurant: [], cuisine: []}, // Return an empty array or handle the error accordingly
    };
  }

};

