const surchargeCodes = [
  {
    code: "100",
    description: "Additional Handling",
  },
  {
    code: "110",
    description: "Cod",
  },
  {
    code: "120",
    description: "Delivery Confirmation",
  },
  {
    code: "121",
    description: "Ship Delivery Confirmation",
  },
  {
    code: "190",
    description: "Extended Area",
  },
  {
    code: "199",
    description: "Haz Mat ",
  },
  {
    code: "200",
    description: "Dry Ice",
  },
  {
    code: "201",
    description: "Isc Seeds",
  },
  {
    code: "202",
    description: "Isc Perishables",
  },
  {
    code: "203",
    description: "Isc Tobacco",
  },
  {
    code: "204",
    description: "Isc Plants",
  },
  {
    code: "205",
    description: "Isc Alcoholic Beverages",
  },
  {
    code: "206",
    description: "Isc Biological Substances",
  },
  {
    code: "207",
    description: "Isc Special Exceptions",
  },
  {
    code: "220",
    description: "Hold For Pickup",
  },
  {
    code: "240",
    description: "Origin Certificate",
  },
  {
    code: "250",
    description: "Print Return Label",
  },
  {
    code: "258",
    description: "Export License Verification",
  },
  {
    code: "260",
    description: "Print N Mail",
  },
  {
    code: "270",
    description: "Residential Address",
  },
  {
    code: "280",
    description: "Return Service 1attempt",
  },
  {
    code: "290",
    description: "Return Service 3attempt",
  },
  {
    code: "300",
    description: "Saturday Delivery",
  },
  {
    code: "310",
    description: "Saturday International Processing Fee",
  },
  {
    code: "350",
    description: "Electronic Return Label",
  },
  {
    code: "374",
    description: "Ups Prepared Sed Form",
  },
  {
    code: "375",
    description: "Fuel Surcharge",
  },
  {
    code: "376",
    description: "Delivery Area",
  },
  {
    code: "377",
    description: "Large Package",
  },
  {
    code: "378",
    description: "Shipper Pays Duty Tax",
  },
  {
    code: "379",
    description: "Shipper Pays Duty Tax Unpaid",
  },
  {
    code: "380",
    description: "Express Plus Surcharge",
  },
  {
    code: "400",
    description: "Insurance",
  },
  {
    code: "401",
    description: "Ship Additional Handling",
  },
  {
    code: "402",
    description: "Shipper Release",
  },
  {
    code: "403",
    description: "Check To Shipper",
  },
  {
    code: "405",
    description: "German Pickup",
  },
  {
    code: "406",
    description: "German Road Tax",
  },
  {
    code: "407",
    description: "Extended Area Pickup",
  },
  {
    code: "410",
    description: "Return Of Document",
  },
  {
    code: "430",
    description: "Peak/demand Season",
  },
  {
    code: "431",
    description: "Large Package Seasonal Surcharge",
  },
  {
    code: "432",
    description: "Additional Handling Seasonal Surcharge ",
  },
  {
    code: "440",
    description: "Ship Large Package",
  },
  {
    code: "441",
    description: "Carbon Neutral",
  },
  {
    code: "444",
    description: "Import Control",
  },
  {
    code: "445",
    description: "Commercial Invoice Removal",
  },
  {
    code: "446",
    description: "Import Control Electronic Label",
  },

  {
    code: "447",
    description: "Import Control Print Label",
  },
  {
    code: "448",
    description: "Import Control Print and Mail Label",
  },
  {
    code: "449",
    description: "Import Control One Pick Up Attempt Label",
  },
  {
    code: "450",
    description: "Import Control Three Pick Up Attempt Label",
  },
  {
    code: "452",
    description: "Refrigeration",
  },
  {
    code: "464",
    description: "Exchange Print Return Label",
  },
  {
    code: "470",
    description: "Committed Delivery Window",
  },
  {
    code: "480",
    description: "Security Surcharge",
  },
  {
    code: "492",
    description: "Customer Transaction Fee",
  },
  {
    code: "500",
    description: "Shipment Cod",
  },
  {
    code: "510",
    description: "Lift Gate for Pickup",
  },
  {
    code: "511",
    description: "Lift Gate for Delivery",
  },
  {
    code: "512",
    description: "Drop Off at UPS Facility",
  },
  {
    code: "515",
    description: "UPS Premium Care",
  },
  {
    code: "520",
    description: "Oversize Pallet",
  },
  {
    code: "530",
    description: "Freight Delivery Surcharge",
  },
  {
    code: "531",
    description: "Freight Pickup Surcharge",
  },
  {
    code: "540",
    description: "Direct to Retail",
  },
  {
    code: "541",
    description: "Direct Delivery Only",
  },
  {
    code: "541",
    description: "No Access Point",
  },
  {
    code: "542",
    description: "Deliver to Addressee Only",
  },
  {
    code: "543",
    description: "Direct to Retail Cod",
  },
  {
    code: "544",
    description: "Retail Access Point",
  },
  {
    code: "546",
    description: "Electronic Package Release Authentication",
  },
  {
    code: "547",
    description: "Pay at Store",
  },
  {
    code: "549",
    description: "Inside Delivery",
  },
  {
    code: "550",
    description: "Item Disposal",
  },
  {
    code: "551",
    description: "UK Border Fee",
  },
  {
    code: "555",
    description: "UPS Premier Silver",
  },
  {
    code: "556",
    description: "UPS Premier Gold",
  },
  {
    code: "557",
    description: "UPS Premier Platinum",
  },
  {
    code: "558",
    description: "Ddu Oversize",
  },
];
export function getDescriptionFromSurchargeCode(code: string) {
  if (!code) return "";
  return surchargeCodes.find((item) => item.code === code)?.description ?? "";
}
