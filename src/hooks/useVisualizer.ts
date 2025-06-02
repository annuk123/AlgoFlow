
"use client";
import { useState, useEffect } from "react";

export function useVisualizer(algoName: string, array: number[]) {
  const [currentArray, setCurrentArray] = useState<number[]>(array);

  useEffect(() => {
    if (!algoName || array.length === 0) return;

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const bubbleSortAnimation = async (arr: number[]) => {
      const tempArray = [...arr];
      for (let i = 0; i < tempArray.length; i++) {
        for (let j = 0; j < tempArray.length - i - 1; j++) {
          if (tempArray[j] > tempArray[j + 1]) {
            [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
            setCurrentArray([...tempArray]);
            await delay(200);
          }
        }
      }
    };

    if (algoName.toLowerCase() === "bubble sort") {
      bubbleSortAnimation(array);
    }
  }, [algoName, array]); // ✅ now includes all necessary dependencies


  return { currentArray };
}
