"use client";

import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react"

export default function Form({
  slug, date, time, partySize 
}: {
  slug: string;
  date: string;
  time: string;
  partySize: string;
}){

  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);
  const {error, loading, createReservation} = useReservation()

  useEffect(() => {
    if(inputs.bookerFirstName && inputs.bookerLastName && inputs.bookerEmail && inputs.bookerPhone){
      return setDisabled(false)
    }
    return setDisabled(true)
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value,
    });
  }
    const handleClick = async () => {
      const booking = await createReservation({
        slug,
        partySize,
        time,
        date,
        bookerFirstName: inputs.bookerFirstName,
        bookerLastName: inputs.bookerLastName,
        bookerEmail: inputs.bookerEmail,
        bookerOccasion: inputs.bookerOccasion,
        bookerPhone: inputs.bookerPhone,
        bookerRequest: inputs.bookerRequest
      })
    }


    return (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="First name"
          value={inputs.bookerFirstName}
          name="bookerFirstName"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          value={inputs.bookerLastName}
          placeholder="Last name"
          name="bookerLastName"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          value={inputs.bookerPhone}
          placeholder="Phone number"
          name="bookerPhone"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          value={inputs.bookerEmail}
          placeholder="Email"
          name="bookerEmail"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          placeholder="Occasion (optional)"
          value={inputs.bookerOccasion}
          name="bookerOccasion"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="border rounded p-3 w-80 mb-4"
          value={inputs.bookerRequest}
          placeholder="Requests (optional)"
          name="bookerRequest"
          onChange={handleChangeInput}
        />
        <button
          disabled={disabled || loading}
          className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          onClick={handleClick}
        >
          {loading ? <CircularProgress color="inherit"/> : "Complete reservation"}
        </button>
        <p className="mt-4 text-sm">
          By clicking “Complete reservation” you agree to the OpenTable Terms
          of Use and Privacy Policy. Standard text message rates may apply.
          You may opt out of receiving text messages at any time.
        </p>
      </div>
    )
}