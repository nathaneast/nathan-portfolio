const ENV_CONFIG = {
  local: {
    label: "LOCAL",
    className: "bg-yellow-400/90 text-black",
  },
  dev: {
    label: "DEV",
    className: "bg-green-500/90 text-white",
  },
} as const;

type EnvironmentKey = keyof typeof ENV_CONFIG;

function normalizeEnvironment(value: string | undefined): EnvironmentKey | null {
  switch (value?.trim().toLowerCase()) {
    case "local":
      return "local";
    case "dev":
      return "dev";
    default:
      return null;
  }
}

function getEnvironmentKey(): EnvironmentKey | null {
  return normalizeEnvironment(process.env.NEXT_PUBLIC_APP_ENV);
}

export default function EnvironmentBadge() {
  const env = getEnvironmentKey();
  const config = env ? ENV_CONFIG[env] : null;

  if (!config) return null;

  return (
    <div
      className={`fixed left-3 top-3 z-50 rounded px-2 py-0.5 text-xs font-bold ${config.className}`}
    >
      {config.label}
    </div>
  );
}
