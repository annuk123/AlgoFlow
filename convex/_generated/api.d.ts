/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as a2zProblems from "../a2zProblems.js";
import type * as a2zProgress from "../a2zProgress.js";
import type * as algorithms from "../algorithms.js";
import type * as contact from "../contact.js";
import type * as feedback from "../feedback.js";
import type * as problems from "../problems.js";
import type * as progress_getProgress from "../progress/getProgress.js";
import type * as progress_saveProgess from "../progress/saveProgess.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  a2zProblems: typeof a2zProblems;
  a2zProgress: typeof a2zProgress;
  algorithms: typeof algorithms;
  contact: typeof contact;
  feedback: typeof feedback;
  problems: typeof problems;
  "progress/getProgress": typeof progress_getProgress;
  "progress/saveProgess": typeof progress_saveProgess;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
