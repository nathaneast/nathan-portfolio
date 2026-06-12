export const ADMIN_PASSWORD_STATUS = {
  Valid: "valid",
  Invalid: "invalid",
  MissingConfig: "missing_config",
  Unavailable: "unavailable",
} as const;

export type AdminPasswordVerification =
  | { readonly status: typeof ADMIN_PASSWORD_STATUS.Valid }
  | { readonly status: typeof ADMIN_PASSWORD_STATUS.Invalid }
  | { readonly status: typeof ADMIN_PASSWORD_STATUS.MissingConfig }
  | { readonly status: typeof ADMIN_PASSWORD_STATUS.Unavailable };
