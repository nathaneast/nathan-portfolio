/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server";
import { anyApi } from "convex/server";
import type * as files from "../files.js";
import type * as personalPages from "../personalPages.js";
import type * as products from "../products.js";
import type * as profile from "../profile.js";

type FullApi = ApiFromModules<{
  files: typeof files;
  personalPages: typeof personalPages;
  products: typeof products;
  profile: typeof profile;
}>;

export const api = anyApi as unknown as FilterApi<
  FullApi,
  FunctionReference<any, "public">
>;

export const internal = anyApi as unknown as FilterApi<
  FullApi,
  FunctionReference<any, "internal">
>;
