import ShipperLocation from "../components/pagecontents/shipperlocation-no-need.component";

export default function Profile() {
  return (
    <div
      className="flex  p-4 justify-center min-h-screen overflow-auto"
      style={{ minHeight: "calc(100vh - 700px)", overflow: "hidden" }}
    >
      <div className="flex flex-wrap  w-1/2 justify-center items-start">
        <ShipperLocation />
      </div>
    </div>
  );
}
