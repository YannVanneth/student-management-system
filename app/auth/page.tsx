import { LoginForm } from "@/components/login-form";
import RuppLogo from "@/components/rupp_logo";

const placeholder: string =
  "https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/460287114_10233138014129843_3303626461352372017_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEboQK7FAtCZgrxwKyI2NhgaiIOwCumvn5qIg7AK6a-fm5Cn87EaHggZaIhUcgY-Oybf6Wtah06iehqoaXJ9DRq&_nc_ohc=UNFEVn6_hVYQ7kNvwHazrNY&_nc_oc=AdlE-Xk7nBt17oMfyxLn1dJmlNWJHgVmgsqXXUhMe1UU7We9HgPWLYJ4bhLQ9sL0-TM&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=ltiode5SUtXT6mTXudS0ZA&oh=00_AfILsiXiLzsh8tJet3Hy6KP6-PifTc5kpOMHpUh96i97wA&oe=681F8176";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <RuppLogo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={placeholder}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
