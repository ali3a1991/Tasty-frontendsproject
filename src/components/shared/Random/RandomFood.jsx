import React, { useEffect, useState } from "react"
import { randomApi } from "../../../utilities/randomApi"
import DetailRandomFood from "../DetailRandomFood/DetailRandomFood"
import "./RandomFood.css"

function RandomFood() {
  const date = new Date()
  const now =
    date.getDate().toString() +
    date.getMonth().toString() +
    date.getFullYear().toString()

  const [randomId, setRandomId] = useState("")
  const [localId, setLocaleId] = useState("")

  useEffect(() => {
    fetch(randomApi)
      .then((res) => res.json())
      .then((data) => setRandomId(data.meals[0].idMeal))
  }, [])

  useEffect(() => {
    if (randomId) {
      if (localId === null) {
        localStorage.setItem(`${now}`, randomId)
        setLocaleId(randomId)
      } else {
        setLocaleId(localStorage.getItem(`${now}`))
      }
    }
  }, [randomId])

  if (localId === "") {
    return <div className="loader"></div>
  }

  return (
    <div className="random-food">
      <h1 className="random-food-title">Meal of the Day</h1>
      <DetailRandomFood localId={localId ? localId : randomId} />
    </div>
  )
}

export default RandomFood
