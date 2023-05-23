import Header from "./components/Header";

export default function RestaurantLayout ({
    children,
    restaurant
}: {
    children: React.ReactNode;
    restaurant: {slug: string}
}){
    return(
        <main>
            <Header name={restaurant.slug}/>           
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </main>
    )
}