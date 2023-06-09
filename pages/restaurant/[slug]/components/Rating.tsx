import { Review } from "@prisma/client";

export default function Rating ({ reviews }: { reviews: Review[] }){
    console.log(reviews)
    return(
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <p>*****</p>
                <p className="text-reg ml-3">4.9</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ||0 ? "": "s"}</p>
            </div>
        </div>
    )
}