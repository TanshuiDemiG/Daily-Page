type TerrafluxLogoProps = {
  className?: string
}

function TerrafluxLogo({ className }: TerrafluxLogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="1.5" y="1.5" width="125" height="125" rx="26" stroke="currentColor" opacity="0.15" />
      <path
        d="M22 84C31.8333 72.6667 39.6667 61.3333 45.5 50C52.1667 59.3333 58.8333 66 65.5 70C73.8333 60 82.6667 48.6667 92 36C96 54 103.333 70 114 84"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 96C34 93.3333 48.6667 91 62 89C77.3333 86.3333 93.3333 82.6667 110 78"
        stroke="#6D8A92"
        strokeOpacity="0.72"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M26 28C43 17.3333 61.3333 14.3333 81 19C93.6667 22.3333 104.667 28.6667 114 38"
        stroke="#B18B54"
        strokeOpacity="0.84"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 8"
      />
      <circle cx="88" cy="20" r="3.5" fill="#B18B54" fillOpacity="0.86" />
    </svg>
  )
}

export default TerrafluxLogo
