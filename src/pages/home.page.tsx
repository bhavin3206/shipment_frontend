import { PageLayout } from "../components/page-layout";
export default function Home() {
  return (
    <PageLayout>
      <div className="relative flex flex-col  justify-center min-h-screen overflow-auto">
        <div className="flex flex-wrap">
          <div className="flex-1 mx-5 sm:mx-8 md:mx-16 lg:mx-28 xl:mx-32">
            <div className="text-left text-[28px] mb-8">Since 2014 We have</div>
            <div className="text-left text-[52px] font-bold mb-8">
              The Best Way to <span className="text-baseColor">Ship</span>
            </div>
            <div className="text-left text-lg">
              Ship with confidence knowing you’re getting savings of up to 84%
              off from top carriers like UPS, USPS, and DHL Express. Over
              130,000 merchants save more money, print faster, and spend less
              time shipping with ShipVerse.
            </div>
            <div className="mt-8 flex ml-auto justify-end align-center w-full">
              <button
                type="submit"
                className="w-52 px-4 py-4 tracking-wide text-xl -skew-x-6 whitespace-nowrap text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
                onClick={() => {
                  window.location.href = "/auth/signin";
                }}
              >
                <span>Get Start for Free</span>
              </button>
            </div>
          </div>
          <div className="xl:flex-1 md:flex">
            <img src="/home.png" alt="" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
