import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import Link from "next/link";

export default function RestaurantCard (restaurant: any){
     //console.log(restaurant.restaurant.reviews)

    const clearCuisineName = () => {
        let cuisine = restaurant.restaurant.cuisine.name
        cuisine = cuisine.split("")
        cuisine[0] = cuisine[0].toUpperCase()
        cuisine = cuisine.join('')
        return cuisine
    }

    const clearLocationName = () => {
        let location = restaurant.restaurant.location.name
        location = location.split("")
        location[0] = location[0].toUpperCase()
        location = location.join("")
        return location
    }
    
    const clearPrice = () => {
        let price = restaurant.restaurant.price.toLowerCase()
        price = price.split("")
        price[0] = price[0].toUpperCase()
        price = price.join("")
        return price
    }
     
    const howManyDollarSigns = () => {
        if( restaurant.restaurant.price === "EXPENSIVE"){
            return "$$$$"
        } else if (restaurant.restaurant.price === "REGULAR"){
            return "$$$"
        } return "$"
    }
    let review:any = restaurant.restaurant.reviews

    const renderRatingText = () => {   
        const randomNumber = Math.random();
        const randomInteger = Math.ceil(randomNumber * 3);

        if(randomInteger === 3){
            return "Awesome"
        } else if (randomInteger === 2){
            return "Good"
        } else { 
            return "Bad"
        }
    }

    const ratingText = renderRatingText()
    return(
        <div className="border-b flex pb-5">    
            <img
                src={restaurant.restaurant.main_image}
                alt=""
                className="w-44 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.restaurant.name}</h2>
                <div className="flex items-start">
                <div className="flex mb-2">*****</div>
                <p className="ml-2 text-sm">{ratingText}</p>
                </div>
                <div className="mb-9">
                <div className="font-light flex text-reg">
                    <p className="mr-4">{howManyDollarSigns()}</p>
                    <p className="mr-4">{clearCuisineName()}</p>
                    <p className="mr-4">{clearLocationName()}</p>
                </div>
                </div>
                <div className="text-red-600">
                <Link href={`/restaurant/${restaurant.restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}