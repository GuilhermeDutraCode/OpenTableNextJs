export default function Header ({name}: {name : string}) {
    let cleanName : any = name.replaceAll("-", " ") // remove dashes 

    cleanName =  cleanName.split(" ") //turn it into array

    let cityIndex = cleanName.pop()
    cityIndex = cityIndex.padEnd((cityIndex.length + 1), ")")
    cityIndex = cityIndex.padStart((cityIndex.length + 1), "(")
    
    cleanName.push(cityIndex)
    let names = cleanName.join(" ")

    //Here we removed the - and added () in the city name and then return it to be rendered 


    return(
        <div className="h-96 overflow-hidden">
            <div
                className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
            >
                <h1 className="text-7xl text-white capitalize text-shadow text-center">
                {names}
                </h1>
            </div>
            </div>
    )
}