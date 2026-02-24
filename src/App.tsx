import { useEffect, useRef, useState } from "react";
import landingImage from "./assets/landing.png";
import landingImageMobile from "./assets/landing-mobile.png";

import AboutPage from "./pages/About/About";
import WorkPage from "./pages/Work/WorkPage";
import CareersPage from "./pages/Careers/Careers";
import ContactPage from "./pages/Contact/Contact";
import FooterPage from "./pages/Footer/Footer";

type Geo = {
  city?: string;
  timezone?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function formatHHMM(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function ExternalIcon({ size = 8 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 1.33333C0 0.596954 0.596954 0 1.33333 0H6.66667C7.40305 0 8 0.596954 8 1.33333V6.66667C8 7.40305 7.40305 8 6.66667 8H1.33333C0.596954 8 0 7.40305 0 6.66667V1.33333Z"
        fill="#ECEEEF"
      />
      <path
        d="M2.72727 2H6V5.27273H5.27273V3.45455H4.90909V3.81818H4.54545V4.18182H4.18182V4.54545H3.81818V4.90909H3.45455V5.27273H3.09091V5.63636H2.72727V6H2.36364V5.63636H2V5.27273H2.36364V4.90909H2.72727V4.54545H3.09091V4.18182H3.45455V3.81818H3.81818V3.45455H4.18182V3.09091H4.54545V2.72727H2.72727V2Z"
        fill="#1E1D1D"
      />
    </svg>
  );
}

// LOGO (unchanged)
const LOGO_SVG = (
  <svg
    width="266"
    height="24"
    viewBox="0 0 266 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="WAVFORMAT"
  >
    {/* ... your existing logo paths ... */}
    <path
      d="M0 0.436364H9.77583L12.2861 16.2078L14.5 0.436364H26.2092L28.4544 16.2545L30.949 0.436364H40.6469L36.0786 23.5792H22.3581L20.3468 10.7688L18.3667 23.5792H4.59948L0 0.436364Z"
      fill="#ECEEEF"
    />
    <path
      d="M46.5729 0.436364H61.1041L70.2095 23.5792H59.6385L58.4068 20.0727H48.896L47.6331 23.5792H37.5766L46.5729 0.436364ZM56.0369 13.2312L53.6826 6.52987L51.2815 13.2312H56.0369Z"
      fill="#ECEEEF"
    />
    <path
      d="M64.3016 0.436364H75.0597L80.3764 17.0182L85.6931 0.436364H95.9366L87.5173 23.5792H72.7522L64.3016 0.436364Z"
      fill="#ECEEEF"
    />
    <path
      d="M95.7976 0.436364H118.093V7.77662H104.965V9.81818H117.033V16.6597H104.965V23.5792H95.7976V0.436364Z"
      fill="#ECEEEF"
    />
    <path
      d="M133.281 24C128.946 24 125.688 23.6675 123.505 23.0026C121.322 22.3273 119.825 21.2104 119.014 19.6519C118.204 18.0831 117.798 15.787 117.798 12.7636V11.3922C117.798 8.36883 118.204 6.06234 119.014 4.47273C119.836 2.87273 121.338 1.72987 123.52 1.04416C125.714 0.348052 128.967 0 133.281 0C137.594 0 140.837 0.348052 143.01 1.04416C145.193 1.72987 146.689 2.86753 147.5 4.45714C148.311 6.04675 148.716 8.35844 148.716 11.3922V12.7636C148.716 15.787 148.311 18.0831 147.5 19.6519C146.7 21.2104 145.208 22.3273 143.025 23.0026C140.853 23.6675 137.605 24 133.281 24ZM133.281 16.4571C134.923 16.4571 136.123 16.3584 136.882 16.161C137.641 15.9636 138.161 15.5792 138.441 15.0078C138.732 14.4364 138.878 13.5377 138.878 12.3117V11.7039C138.878 10.4675 138.732 9.56883 138.441 9.00779C138.161 8.43636 137.641 8.05195 136.882 7.85455C136.134 7.65714 134.933 7.55844 133.281 7.55844C131.597 7.55844 130.37 7.65714 129.601 7.85455C128.842 8.05195 128.323 8.43117 128.042 8.99221C127.772 9.55325 127.637 10.4571 127.637 11.7039V12.3117C127.637 13.5481 127.777 14.4519 128.058 15.0234C128.349 15.5844 128.873 15.9636 129.632 16.161C130.401 16.3584 131.618 16.4571 133.281 16.4571Z"
      fill="#ECEEEF"
    />
    <path
      d="M149.466 0.436364H169.205C171.356 0.436364 173.024 0.690909 174.209 1.2C175.405 1.6987 176.231 2.41558 176.688 3.35065C177.146 4.27532 177.374 5.46493 177.374 6.91948V7.46493C177.374 9.01299 177.073 10.2286 176.47 11.1117C175.867 11.9948 174.916 12.5922 173.617 12.9039C174.802 13.1117 175.701 13.6104 176.314 14.4C176.938 15.1896 177.25 16.3532 177.25 17.8909V23.5792H167.77V18.7013C167.77 18.0779 167.723 17.6208 167.63 17.3299C167.536 17.0286 167.328 16.8156 167.006 16.6909C166.694 16.5558 166.201 16.4883 165.525 16.4883H158.945V23.5792H149.466V0.436364ZM166.195 9.98961C166.736 9.98961 167.126 9.9013 167.365 9.72468C167.604 9.54805 167.723 9.24156 167.723 8.80519V8.68052C167.723 8.23377 167.604 7.93247 167.365 7.77662C167.136 7.61039 166.746 7.52727 166.195 7.52727H158.945V9.98961H166.195Z"
      fill="#ECEEEF"
    />
    <path
      d="M178.124 0.436364H192.562L195.587 11.8442L198.627 0.436364H212.675V23.5792H203.32L203.616 8.49351L199.266 23.5792H191.47L187.214 8.52468L187.479 23.5792H178.124V0.436364Z"
      fill="#ECEEEF"
    />
    <path
      d="M221.454 0.436364H235.985L245.091 23.5792H234.52L233.288 20.0727H223.777L222.514 23.5792H212.458L221.454 0.436364ZM230.918 13.2312L228.564 6.52987L226.163 13.2312H230.918Z"
      fill="#ECEEEF"
    />
    <path
      d="M248.304 7.74545H239.978V0.436364H266V7.74545H257.721V23.5792H248.304V7.74545Z"
      fill="#ECEEEF"
    />
  </svg>
);

// --- Mobile overlay icon placeholders (unchanged shapes, JSX-safe attrs) ---
const OverlayInstagramSVG = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2483_234)">
<path d="M4.68672 0.0560112C3.83552 0.0961445 3.25425 0.232011 2.74605 0.431611C2.22019 0.636611 1.77439 0.911611 1.33085 1.35674C0.887388 1.80188 0.614188 2.24794 0.410721 2.77474C0.213788 3.28394 0.0803211 3.86574 0.0427211 4.71741C0.00512106 5.56908 -0.00321227 5.84288 0.000987726 8.01541C0.00512106 10.1878 0.0147211 10.4601 0.0559877 11.3136C0.0966544 12.1646 0.231988 12.7457 0.431654 13.2541C0.636988 13.78 0.911654 14.2256 1.35699 14.6693C1.80225 15.1129 2.24799 15.3855 2.77599 15.5893C3.28479 15.7859 3.86672 15.92 4.71825 15.9573C5.56979 15.9946 5.84385 16.0033 8.01572 15.9991C10.1876 15.9949 10.4611 15.9853 11.3143 15.9448C12.1676 15.9043 12.7456 15.768 13.2541 15.5693C13.7801 15.3635 14.226 15.0893 14.6693 14.6439C15.1127 14.1984 15.3857 13.752 15.589 13.2249C15.7861 12.7161 15.9201 12.1343 15.957 11.2833C15.9943 10.4294 16.0031 10.1568 15.999 7.98468C15.9948 5.81248 15.985 5.54014 15.9445 4.68701C15.9041 3.83388 15.7685 3.25454 15.569 2.74588C15.3634 2.21994 15.089 1.77468 14.6439 1.33068C14.1988 0.886678 13.752 0.613878 13.2252 0.411011C12.716 0.214011 12.1345 0.0798112 11.2829 0.0430112C10.4314 0.00621119 10.1573 -0.00332214 7.98465 0.000944527C5.81199 0.00507786 5.53999 0.0144112 4.68672 0.0560112ZM4.78019 14.5181C4.00019 14.4841 3.57665 14.3545 3.29439 14.2461C2.92065 14.1021 2.65439 13.928 2.37312 13.6494C2.09179 13.3709 1.91905 13.1037 1.77312 12.7307C1.66352 12.4485 1.53152 12.0254 1.49505 11.2454C1.45539 10.4024 1.44705 10.1493 1.44239 8.01341C1.43772 5.87761 1.44592 5.62474 1.48285 4.78141C1.51619 4.00208 1.64659 3.57808 1.75485 3.29594C1.89885 2.92174 2.07232 2.65594 2.35152 2.37488C2.63072 2.09374 2.89712 1.92061 3.27039 1.77468C3.55239 1.66461 3.97539 1.53374 4.75505 1.49661C5.59872 1.45661 5.85152 1.44861 7.98705 1.44394C10.1226 1.43928 10.3761 1.44728 11.2201 1.48448C11.9994 1.51834 12.4236 1.64748 12.7054 1.75648C13.0793 1.90048 13.3454 2.07341 13.6265 2.35314C13.9076 2.63274 14.0809 2.89821 14.2268 3.27228C14.337 3.55341 14.4679 3.97628 14.5047 4.75648C14.5449 5.60014 14.554 5.85315 14.5578 7.98848C14.5617 10.1238 14.5541 10.3774 14.5171 11.2205C14.4831 12.0005 14.3538 12.4241 14.2451 12.7067C14.1011 13.0803 13.9276 13.3467 13.6482 13.6277C13.3689 13.9087 13.1028 14.0817 12.7293 14.2277C12.4477 14.3376 12.0242 14.4688 11.2452 14.5059C10.4015 14.5456 10.1487 14.5539 8.01232 14.5586C5.87599 14.5633 5.62385 14.5546 4.78019 14.5181ZM11.302 3.72428C11.3023 3.91416 11.3589 4.09969 11.4647 4.2574C11.5705 4.4151 11.7206 4.53789 11.8962 4.61025C12.0717 4.68261 12.2648 4.70127 12.451 4.66389C12.6372 4.6265 12.8081 4.53475 12.9421 4.40022C13.0761 4.2657 13.1672 4.09446 13.2039 3.90815C13.2406 3.72184 13.2212 3.52883 13.1482 3.35355C13.0752 3.17826 12.9518 3.02856 12.7937 2.92338C12.6356 2.81821 12.4499 2.76228 12.26 2.76268C12.0054 2.76321 11.7615 2.8648 11.5819 3.04513C11.4022 3.22545 11.3016 3.46974 11.302 3.72428ZM3.89232 8.00801C3.89679 10.2768 5.73939 12.1118 8.00766 12.1075C10.2761 12.1032 12.1123 10.2608 12.1081 7.99201C12.1037 5.72321 10.2607 3.88768 7.99205 3.89214C5.72339 3.89661 3.88805 5.73948 3.89232 8.00801ZM5.33332 8.00515C5.33228 7.47773 5.48766 6.96186 5.77981 6.52275C6.07195 6.08364 6.48775 5.74103 6.97462 5.53823C7.46148 5.33543 7.99755 5.28156 8.51503 5.38343C9.03252 5.4853 9.50817 5.73833 9.88185 6.11052C10.2555 6.48272 10.5104 6.95736 10.6144 7.47444C10.7183 7.99151 10.6666 8.52779 10.4657 9.01546C10.2648 9.50313 9.92387 9.92028 9.48593 10.2142C9.04799 10.5081 8.53273 10.6655 8.00532 10.6665C7.65511 10.6673 7.30819 10.599 6.98437 10.4657C6.66055 10.3323 6.36616 10.1365 6.11804 9.88932C5.86991 9.64218 5.6729 9.34858 5.53826 9.02529C5.40362 8.702 5.33398 8.35535 5.33332 8.00515Z" fill="#1E1D1D"/>
</g>
<defs>
<clipPath id="clip0_2483_234">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

);

const OverlayMailSVG = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.7376 9.0672L8.0016 10.6152L10.184 9.1096L15.076 13.936C14.9472 13.9776 14.8096 14 14.6664 14H1.3336C1.1576 14 0.989601 13.9656 0.835201 13.904L5.7376 9.0672ZM16 5.1008V12.6664C16 12.864 15.9568 13.0512 15.88 13.22L11.0848 8.4888L16 5.1008ZM7.54882e-07 5.1432L4.8336 8.4488L0.0848008 13.1352C0.0285574 12.9853 -0.000169787 12.8265 7.54882e-07 12.6664V5.1432ZM14.6664 2C15.4024 2 16 2.5968 16 3.3336V3.8024L7.9984 9.3184L7.54882e-07 3.848V3.3336C7.54882e-07 2.5976 0.596801 2 1.3336 2H14.6664Z"
      fill="#1E1D1D"
    />
  </svg>
);

const OverlayTikTokSVG = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_2483_228)">
      <path
        d="M8.35138 0.0133333C9.22472 0 10.0914 0.00666667 10.958 0C11.0114 1.02 11.378 2.06 12.1247 2.78C12.8714 3.52 13.9247 3.86 14.9514 3.97333V6.66C13.9914 6.62667 13.0247 6.42667 12.1514 6.01333C11.7714 5.84 11.418 5.62 11.0714 5.39333C11.0647 7.34 11.078 9.28667 11.058 11.2267C11.0047 12.16 10.698 13.0867 10.158 13.8533C9.28472 15.1333 7.77138 15.9667 6.21805 15.9933C5.26472 16.0467 4.31138 15.7867 3.49805 15.3067C2.15138 14.5133 1.20472 13.06 1.06472 11.5C1.05138 11.1667 1.04472 10.8333 1.05805 10.5067C1.17805 9.24 1.80472 8.02667 2.77805 7.2C3.88472 6.24 5.43138 5.78 6.87805 6.05333C6.89138 7.04 6.85138 8.02667 6.85138 9.01333C6.19138 8.8 5.41805 8.86 4.83805 9.26C4.41805 9.53333 4.09805 9.95333 3.93138 10.4267C3.79138 10.7667 3.83138 11.14 3.83805 11.5C3.99805 12.5933 5.05138 13.5133 6.17138 13.4133C6.91805 13.4067 7.63138 12.9733 8.01805 12.34C8.14472 12.12 8.28472 11.8933 8.29138 11.6333C8.35805 10.44 8.33138 9.25333 8.33805 8.06C8.34472 5.37333 8.33138 2.69333 8.35138 0.0133333Z"
        fill="#1E1D1D"
      />
    </g>
    <defs>
      <clipPath id="clip0_2483_228">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const OverlayXSVG = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_2483_232)">
      <path
        d="M12.6007 0.765625H15.054L9.694 6.89229L16 15.2276H11.0627L7.196 10.1716L2.77067 15.2276H0.316L6.04933 8.67429L0 0.766292H5.06267L8.558 5.38763L12.6007 0.765625ZM11.74 13.7596H13.0993L4.324 2.15696H2.86533L11.74 13.7596Z"
        fill="#1E1D1D"
      />
    </g>
    <defs>
      <clipPath id="clip0_2483_232">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const OverlayMarkSVG = (
  <svg
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M24.8261 0H20.0516L15.25 5.15492L20.0516 9.90712L24.8261 5.15492L22.3574 2.60431L24.0394 0.9397L25.45 2.28213V0.590669L24.8261 0Z"
      fill="#1E1D1D"
    />
    <path d="M20 32L40 12.1858L38 10.2043L18 30.0186L20 32Z" fill="#1E1D1D" />
    <path d="M36 8.22291L34 6.24149L14 26.0557L16 28.0372L36 8.22291Z" fill="#1E1D1D" />
    <path
      d="M32 4.26006L30 2.27864L20 12.1858L18 14.1424L16 16.1486L14 18.13L12 20.0619L10 22.0929L12 24.0743L32 4.26006Z"
      fill="#1E1D1D"
    />
    <path
      d="M20 12.1858L10 2.27864L0 12.1858L10 22.0929L12 20.0619L14 18.13L16 16.1486L18 14.1424L20 12.1858Z"
      fill="#1E1D1D"
    />
  </svg>
);

// leave your big word svg as-is
const OverlayBigWordSVG = (
  <svg width="387" height="35" viewBox="0 0 387 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0.636364H14.2227L17.8748 23.6364L21.0959 0.636364H38.1315L41.3979 23.7045L45.0273 0.636364H59.1366L52.4903 34.3864H32.5286L29.6023 15.7045L26.7215 34.3864H6.69172L0 0.636364Z" fill="#1E1D1D"/>
<path d="M67.7583 0.636364H88.8996L102.147 34.3864H86.7673L84.9753 29.2727H71.1382L69.3008 34.3864H54.6698L67.7583 0.636364ZM81.5274 19.2955L78.1021 9.52273L74.6088 19.2955H81.5274Z" fill="#1E1D1D"/>
<path d="M93.5516 0.636364H109.203L116.939 24.8182L124.674 0.636364H139.577L127.328 34.3864H105.846L93.5516 0.636364Z" fill="#1E1D1D"/>
<path d="M139.375 0.636364H171.812V11.3409H152.713V14.3182H170.27V24.2955H152.713V34.3864H139.375V0.636364Z" fill="#1E1D1D"/>
<path d="M193.908 35C187.602 35 182.861 34.5152 179.686 33.5455C176.51 32.5606 174.332 30.9318 173.153 28.6591C171.973 26.3712 171.383 23.0227 171.383 18.6136V16.6136C171.383 12.2045 171.973 8.84091 173.153 6.52273C174.347 4.18939 176.533 2.52273 179.708 1.52273C182.899 0.507576 187.632 0 193.908 0C200.184 0 204.902 0.507576 208.063 1.52273C211.239 2.52273 213.416 4.18182 214.596 6.5C215.775 8.81818 216.365 12.1894 216.365 16.6136V18.6136C216.365 23.0227 215.775 26.3712 214.596 28.6591C213.431 30.9318 211.261 32.5606 208.086 33.5455C204.925 34.5152 200.199 35 193.908 35ZM193.908 24C196.298 24 198.044 23.8561 199.148 23.5682C200.252 23.2803 201.008 22.7197 201.417 21.8864C201.84 21.053 202.052 19.7424 202.052 17.9545V17.0682C202.052 15.2652 201.84 13.9545 201.417 13.1364C201.008 12.303 200.252 11.7424 199.148 11.4545C198.059 11.1667 196.313 11.0227 193.908 11.0227C191.458 11.0227 189.674 11.1667 188.555 11.4545C187.451 11.7424 186.695 12.2955 186.287 13.1136C185.893 13.9318 185.697 15.25 185.697 17.0682V17.9545C185.697 19.7576 185.901 21.0758 186.309 21.9091C186.733 22.7273 187.496 23.2803 188.6 23.5682C189.719 23.8561 191.489 24 193.908 24Z" fill="#1E1D1D"/>
<path d="M217.456 0.636364H246.174C249.304 0.636364 251.731 1.00758 253.455 1.75C255.194 2.47727 256.396 3.52273 257.062 4.88636C257.727 6.23485 258.06 7.9697 258.06 10.0909V10.8864C258.06 13.1439 257.621 14.9167 256.744 16.2045C255.867 17.4924 254.483 18.3636 252.593 18.8182C254.317 19.1212 255.625 19.8485 256.517 21C257.425 22.1515 257.878 23.8485 257.878 26.0909V34.3864H244.087V27.2727C244.087 26.3636 244.019 25.697 243.883 25.2727C243.746 24.8333 243.444 24.5227 242.975 24.3409C242.521 24.1439 241.803 24.0455 240.82 24.0455H231.248V34.3864H217.456V0.636364ZM241.796 14.5682C242.582 14.5682 243.149 14.4394 243.497 14.1818C243.845 13.9242 244.019 13.4773 244.019 12.8409V12.6591C244.019 12.0076 243.845 11.5682 243.497 11.3409C243.164 11.0985 242.597 10.9773 241.796 10.9773H231.248V14.5682H241.796Z" fill="#1E1D1D"/>
<path d="M259.151 0.636364H280.156L284.556 17.2727L288.98 0.636364H309.418V34.3864H295.808L296.239 12.3864L289.91 34.3864H278.568L272.375 12.4318L272.761 34.3864H259.151V0.636364Z" fill="#1E1D1D"/>
<path d="M322.191 0.636364H343.332L356.579 34.3864H341.2L339.408 29.2727H325.57L323.733 34.3864H309.102L322.191 0.636364ZM335.96 19.2955L332.534 9.52273L329.041 19.2955H335.96Z" fill="#1E1D1D"/>
<path d="M361.254 11.2955H349.141V0.636364H387V11.2955H374.955V34.3864H361.254V11.2955Z" fill="#1E1D1D"/>
</svg>

);

export default function App() {
  // ✅ landing image selection based on viewport height
  const [isShortViewport, setIsShortViewport] = useState(false);

useEffect(() => {
  const check = () => {
    const shortHeight = window.innerHeight <= 720;
    const narrowWidth = window.innerWidth <= 720;

    // Decide what “mobile” really means for you:
    setIsShortViewport(shortHeight || narrowWidth);
  };

  check();
  window.addEventListener("resize", check, { passive: true });

  return () => {
    window.removeEventListener("resize", check);
  };
}, []);

const landingBg = isShortViewport ? landingImageMobile : landingImage;

  // ---------- Scroll % ----------
  const [scrollPct, setScrollPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
  const onScroll = () => {
    document.documentElement.classList.toggle("pastLander", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setScrollPct(Math.round(pct));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    }

  }, []);

  // ---------- Geo + time ----------
  const [geo, setGeo] = useState<Geo>({});
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: ac.signal });
        if (!res.ok) throw new Error("geo fetch failed");
        const data = (await res.json()) as Geo;
        setGeo({ city: data.city, timezone: data.timezone });
      } catch {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const guess = tz?.split("/")?.[1]?.replaceAll("_", " ");
        setGeo({ city: guess || "LOCAL", timezone: tz });
      }
    })();

    return () => ac.abort();
  }, []);

  const cityLabel = (geo.city || "LOCAL").toUpperCase();
  const timeLabel = formatHHMM(now);

  // ---------- Mobile menu overlay ----------
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page">

       <div
        className="landingBg"
        style={{
          backgroundImage: `url(${landingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
      </div>

      <div className="header">
      {/* ✅ Fixed landing background layer */}
     

      {/* Top-left logo */}
      <div className="logo">{LOGO_SVG}</div>

      {/* Desktop nav only */}
      <nav className="navButtons desktopOnly" aria-label="Primary">
        <a href="#about">ABOUT</a>
        <a href="#work">WORK</a>
        <a href="#careers">CAREERS</a>
        <a href="#contact">CONTACT</a>
        <a href="#solutions">SOLUTIONS</a>
      </nav>

      {/* Mobile menu button only */}
      <button
        className="menuButton mobileOnly"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        MENU <ExternalIcon />
      </button>

      

      {/* Bottom-right city + time */}
      <div className="status">
        {cityLabel}&nbsp;&nbsp;({timeLabel})
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="overlayClose" onClick={closeMenu} aria-label="Close menu">
            ×
          </button>

          <nav className="overlayNav" aria-label="Overlay navigation">
            <a href="#about" onClick={closeMenu}>
              ABOUT
            </a>
            <a href="#work" onClick={closeMenu}>
              WORK
            </a>
            <a href="#careers" onClick={closeMenu}>
              CAREERS
            </a>
            <a href="#contact" onClick={closeMenu}>
              CONTACT
            </a>
            <a href="#solutions" onClick={closeMenu}>
              SOLUTIONS
            </a>
          </nav>

          <div className="overlaySocial" aria-label="Social links">
            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              {OverlayInstagramSVG}
            </a>
            <a href="#" aria-label="Email" onClick={(e) => e.preventDefault()}>
              {OverlayMailSVG}
            </a>
            <a href="#" aria-label="TikTok" onClick={(e) => e.preventDefault()}>
              {OverlayTikTokSVG}
            </a>
            <a href="#" aria-label="X" onClick={(e) => e.preventDefault()}>
              {OverlayXSVG}
            </a>
          </div>

          <div className="overlayLegal">
            <a href="#" onClick={(e) => e.preventDefault()}>
              PRIVACY POLICY
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              TERMS &amp; CONDITIONS
            </a>
          </div>

          <div className="overlayAddresses" aria-label="Addresses">
            <div>LAG | SS2, HOUSE 11-15, JADEVILLE ESTATE, LEKKI</div>
            <div>LDN | 408, 8 DUNCANNON STREET, STRAND, WC2N 4JF</div>
            <div>DKR | 032, SQUARE FACE MARCHÉ HLM, GRAND-DAKAR</div>
          </div>

          <div className="overlayFooter" aria-label="Footer">
            <div className="overlayMark">{OverlayMarkSVG}</div>
            <div className="overlayRights">
              © 2026 90642 INC
              <br />
              ALL RIGHTS RESERVED
            </div>
          </div>

          <div className="overlayBigWord" aria-hidden="true">
            {OverlayBigWordSVG}
          </div>
        </div>
      )}
      </div>

      {/* Scroll readout (desktop only) */}
      <div className="scrollReadout desktopOnly">(SCROLL&nbsp;&nbsp;{scrollPct}%)</div>

      {/* Scroll content */}
      <main className="content">
        {/* spacer so the fixed landing bg has a "first screen" */}

        <section id="about" className="aboutScreen">
          <AboutPage />
        </section>

        <section id="work" className="section">
          <WorkPage />
        </section>

        <section id="careers" className="section">
          <CareersPage />
        </section>

        <section id="contact" className="section">
          <ContactPage />
        </section>

        <section id="solutions" className="section">
          <FooterPage />
        </section>
      </main>
    </div>
  );
}