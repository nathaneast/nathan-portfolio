const ENV_CONFIG: Record<string, { label: string; className: string }> = {
  local: {
    label: "LOCAL",
    className: "bg-yellow-400/90 text-black",
  },
  dev: {
    label: "DEV",
    className: "bg-blue-500/90 text-white",
  },
};

export default function EnvironmentBadge() {
  const env = process.env.NEXT_PUBLIC_APP_ENV;
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
