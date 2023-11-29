import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

export const PageFooter = () => (
  <footer className="h-[624px] bg-[#242424] flex flex-col justify-center items-center text-white">
    <p className="text-3xl mt-20">Getting Started Today For Free</p>
    <p className="text-[22px] text-[#A7A7A7] text-center mt-7">
      Everything you need for professional-grade shipping + deep discounts{" "}
      <br></br>from top carriers.
    </p>
    <div className="flex">
      <button
        type="submit"
        className="w-[250px] h-[50px] mt-[53px] tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
      >
        <span>Start Shipping Now</span>
      </button>
      <button
        type="submit"
        className="w-[250px] h-[50px] mt-[53px] ml-[26px] tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-[#242424] border border-[#E3E3E3] rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
      >
        <span>Schedule Demo</span>
      </button>
    </div>
    <hr className="border border-[#E3E3E3] h-[1px] w-4/5 my-4 mx-2 mt-[70px] opacity-40 bg-opacity-55 bg-gray-400" />{" "}
    <div className="flex">
      <div className="list-container">
        <p className="text-[20px] text-white mt-7">Online Business Suite</p>
        <ul className="list-disc mt-3">
          <li className="list-inside">Quick Quotes</li>
          <li className="list-inside">Quick Quotes Spot</li>
          <li className="list-inside">Schedule</li>
          <li className="list-inside">Booking</li>
          <li className="list-inside">Tracking</li>
        </ul>
      </div>
      <div className="list-container ml-[140px]">
        <p className="text-[20px] text-white  mt-7">Carrier</p>
        <ul className="list-disc mt-3">
          <li className="list-inside">Working ShipVerse</li>
          <li className="list-inside">Working on Board</li>
          <li className="list-inside">Apprenticeship</li>
        </ul>
      </div>
      <div className="ml-[140px] space-x-4 items-start">
        <p className="text-[20px] text-white mt-7">Find us on</p>
        <div className="flex mt-3 space-x-3">
          <a href="#">
            <Facebook fontSize="large" style={{ color: "#1877F2" }} />
          </a>
          <a href="#">
            <Twitter fontSize="large" style={{ color: "#41A1F2" }} />
          </a>
          <a href="#">
            <LinkedIn fontSize="large" style={{ color: "#007AB9" }} />
          </a>
          <a href="#">
            <YouTube fontSize="large" style={{ color: "#FF0000" }} />
          </a>
          <a href="#">
            <Instagram fontSize="large" style={{ color: "#C13584" }} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
