import { COMPANIES_LANDING } from "@/constants";
import Marquee from "react-fast-marquee";

const Companies = () => {
  return (
    <div className="relative h-[calc(100vh-60vh-4rem)]">
      <Marquee loop={0} speed={20} pauseOnHover={true}>
        {COMPANIES_LANDING.map((company, index) => {
          return (
            <div key={index} className="mt-14">
              <company.logo className="h-10 w-10 lg:w-16 lg:h-16 text-slate-600 mr-20 md:mr-40 lg:mr-48" />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Companies;
