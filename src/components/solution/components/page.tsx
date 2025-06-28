"use clients";
import TwoSumApproaches from "@/components/problems/Approach/Approach1";
import Add2NumVisualizer from "@/components/problems/visualizer/AddTwoNumbers/Visualizer";
import AddTwoNumbersApproach from "@/components/problems/Approach/Approach2";
import LongestSubstringApproach from "@/components/problems/Approach/Approach3";
import MedianOfTwoSortedArraysApproach from "@/components/problems/Approach/Approach4";
import LongestPalindromeApproach from "@/components/problems/Approach/Approach5";
import ZigzagConversionApproach from "@/components/problems/Approach/Approach6";
import ReverseIntegerApproach from "@/components/problems/Approach/Approach7";
import AtoiApproach from "@/components/problems/Approach/Approach8";
import PalindromeApproach from "@/components/problems/Approach/Approach9";
import RegularExpressionApproach from "@/components/problems/Approach/Approach10";
import ContainerWithMostWaterApproach from "@/components/problems/Approach/Approach11";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import TwoSumVisualizer from "@/components/problems/visualizer/TwoSumVisualizer/TwoSumVisualizer";
import IntegerToRomanApproach from "@/components/problems/Approach/Approach12";
import RomanToIntegerApproach from "@/components/problems/Approach/Approach13";
import LongestCommonPrefixApproach from "@/components/problems/Approach/Approach14";
import ThreeSumApproach from "@/components/problems/Approach/Approach15";
import ThreeSumClosestApproach from "@/components/problems/Approach/Approach16";
import RemoveNthFromEndApproach from "@/components/problems/Approach/Approach19";
import ValidParenthesesApproach from "@/components/problems/Approach/Approach20";
import FourSumApproach from "@/components/problems/Approach/Approach18";
import LetterCombinationsApproach from "@/components/problems/Approach/Approach17";

export default function ApproachesPage() {
      const params = useParams();
      const problemId = params.id as string;
      const problem = useQuery(api.problems.getProblemBySlug, { slug: problemId });
return (
    <div>
     {problem?.slug === "two-sum" && (
        <div className="my-8">
          <TwoSumVisualizer />
          <TwoSumApproaches />
        </div>
      )}
    
      {problem?.slug === "add-two-numbers" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Add Two Numbers Visualizer
            </h1>
            <Add2NumVisualizer />
          </div>
          <div>
            <AddTwoNumbersApproach />
          </div>
        </div>
      )}
    
      {problem?.slug === "3-longest-substring-without-repeating-characters" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Longest Substring Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <LongestSubstringApproach />
          </div>
        </div>
      )}
    
      {problem?.slug === "4-median-of-two-sorted-arrays" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Median of Two Sorted Arrays Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <MedianOfTwoSortedArraysApproach />
          </div>
        </div>
      )}
    
        {problem?.slug === "5-longest-palindromic-substring" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Longest Palindromic Substring Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <LongestPalindromeApproach />
          </div>
        </div>
      )}
    
          {problem?.slug === "6-zigzag-conversion" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Zigzag Conversion Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ZigzagConversionApproach />
          </div>
        </div>
      )}
    
            {problem?.slug === "7-reverse-integer" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Reverse Integer Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ReverseIntegerApproach />
          </div>
        </div>
      )}
    
              {problem?.slug === "8-string-to-integer-atoi" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              String to Integer (Atoi) Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <AtoiApproach />
          </div>
        </div>
      )}
    
                {problem?.slug === "9-palindrome-number" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Palindrome Number Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <PalindromeApproach />
          </div>
        </div>
      )}
    
    {problem?.slug === "10-regular-expression-matching" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Regular Expression Matching Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <RegularExpressionApproach />
          </div>
        </div>
      )}
    
                    {problem?.slug === "11-container-with-most-water" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Container With Most Water Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ContainerWithMostWaterApproach />
          </div>
        </div>
      )}

                          {problem?.slug === "12-integer-to-roman" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Integer To Roman Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <IntegerToRomanApproach />
          </div>
        </div>
      )}

                          {problem?.slug === "13-roman-to-integer" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Roman To Integer Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <RomanToIntegerApproach />
          </div>
        </div>
      )}

                                {problem?.slug === "14-longest-common-prefix" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Longest SubString Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <LongestCommonPrefixApproach />
          </div>
        </div>
      )}



                                {problem?.slug === "15-3sum" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              3 Sum Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ThreeSumApproach />
          </div>
        </div>
      )}


                                      {problem?.slug === "16-3sum-closest" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              3 Sum Closest Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ThreeSumClosestApproach />
          </div>
        </div>
      )}

                                         {problem?.slug === "17-letter-combinations-of-a-phone-number" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Letter Combinations Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <LetterCombinationsApproach />
          </div>
        </div>
      )}

                                             {problem?.slug === "18-4sum" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              4 Sum Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <FourSumApproach />
          </div>
        </div>
      )}

                                                   {problem?.slug === "19-remove-nth-node-from-end-of-list" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Remove Nth From End Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <RemoveNthFromEndApproach />
          </div>
        </div>
      )}

      {problem?.slug === "20-valid-parentheses" && (
        <div>
          <div className="my-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-gradient bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent py-6 sm:py-10 mb-4">
              Vaild Parentheses Visualizer
            </h1>
            {/* <LongestSubstringVisualizer /> */}
          </div>
          <div>
            <ValidParenthesesApproach />
          </div>
        </div>
      )}


      </div>
);

}