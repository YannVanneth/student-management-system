import { cn } from "@/lib/utils";
import Link from "next/link";

const RuppLogo = ({ ...className }) => {
  return (
    <Link href="/">
      <div className={`${cn("flex items-center gap-2", className)}`}>
        <img
          src={"https://www.rupp.edu.kh/logo/rupp_logo.png"}
          alt="Logo"
          className="h-8 w-8 rounded-full object-contain"
        />
        <span className="text-base font-semibold line-clamp-1">
          Royal University Of Phnom Penh
        </span>
      </div>
    </Link>
  );
};

export default RuppLogo;
