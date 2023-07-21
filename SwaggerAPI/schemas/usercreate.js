const UserCreateRequest = {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Name of the user",
      },
      email: {
        type: "string",
        description: "email id of the user",
      },
      country: {
        type: "string",
        description: "location country",
      },
    },
  };

  export { UserCreateRequest };
  