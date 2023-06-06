import NavBar from "@/pages/components/NavBar"
import Link from "next/link"
import Header from "./components/Header"
import Form from "./components/Form"
import AuthContext from "@/pages/context/AuthContext"
import prisma from "@/lib/prisma"
import {notFound, useSearchParams} from "next/navigation"
import { Review } from "@prisma/client"
import { partySize } from "@/data"
import { convertToDisplayTime } from "@/utils/convertToDisplayTime"


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
          reviews: true,
          main_image: true,
          slug: true,
          open_time: true,
          close_time: true
      }
  });
////Serialized is only needed if some of the info comes in a data type JSON doesnt support eg DATE

return {
  props: {
    restaurant,
  },
};
  
}

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  reviews: Review [];
  description: string;
  slug: string;
  main_image: string;
  open_time: string;
  close_time: string;
}

interface RestaurantDetailsProps {   //created interface so TypeScript doesnt shit it self
  restaurant: Restaurant;
  
}

export default function Reserve({ restaurant }: RestaurantDetailsProps) {

  const getSearchParams = useSearchParams();
 
  const unCleanDateAndPartySize = getSearchParams.get('date');
  const fullPartySize = unCleanDateAndPartySize?.split('');
  let time : any = unCleanDateAndPartySize?.split("T");
  time = time[1].split('Z')
  time = time[0] + "Z"
  const partySize : any = fullPartySize?.pop()
  time = convertToDisplayTime(time);
  let date = unCleanDateAndPartySize?.split("T")[0];

  console.log(date)

    return (
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
          <main className="max-w-screen-2xl m-auto bg-white">
            <NavBar/>  
            <div className="border-t h-screen">
              <div className="py-9 w-3/5 m-auto">       
              <Header image={restaurant.main_image} name={restaurant.name} time={time} partySize={partySize} date={date}/>
              <Form
                date={date} 
                partySize={partySize}
                slug={restaurant.slug}
                time={time}
              />
              </div>
            </div>
          </main>
          </AuthContext>
        </main>
  )
}