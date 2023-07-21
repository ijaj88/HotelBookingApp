const HotelCreateRequest = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Name of the hotel",
    },
    type: {
      type: "string",
      description: "Type of the hotel",
    },
  },
};

export default HotelCreateRequest;