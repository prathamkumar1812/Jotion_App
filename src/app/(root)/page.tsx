import Image from "next/image";
import Heading from "./_components/Heading"
import Heros from "./_components/Heros";
import Footer from "./_components/Footer";

export default function root() {
  return (
    <div className=" min-h-full flex flex-col bg-red-300">
      <div className="flex flex-1 items-center justify-center md:justify-start text-center gap-y-8  px-6 pb-10">
       <Heading/>
       <Heros/>
      </div>
      <Footer/>
    </div>
  );
}
