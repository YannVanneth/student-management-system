import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const RuppLogo = ({ ...className }) => {
  return (
    <Link href="/">
      <div className={`${cn("flex items-center gap-2", className)}`}>
        <Image
          src={"https://www.rupp.edu.kh/logo/rupp_logo.png"}
          alt="Logo"
          className=" rounded-full object-contain"
          width={32}
          height={32}
        />
        <span className="text-base font-semibold line-clamp-1">
          Royal University Of Phnom Penh
        </span>
      </div>
    </Link>
  );
};

export default RuppLogo;
