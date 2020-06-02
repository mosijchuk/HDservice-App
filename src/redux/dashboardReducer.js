let initialState = {
  users: [
    {
      id: 532295,
      name: "Алексей Пряхин",
      baseAddress: "Лобненская улица, 12к4, Москва, Россия",
      holidays: ["четверг"]
    },
    {
      id: 525736,
      name: "Елена Паминская",
      baseAddress: "Ташкентская улица, 34к5, Москва, Россия",
      holidays: ["понедельник", "вторник", "среда"]
    }
  ]
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default dashboardReducer;
