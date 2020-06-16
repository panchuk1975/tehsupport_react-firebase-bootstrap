import {
  SHOW_LOADER,
  ADD_CAR,
  ADD_DATES,
  FETCHED_CARS,
  REMOVE_CAR,
  REMOVE_LIST,
  REMOVE_ROUTE,
  CHANGE_CREATE,
  CHANGE_DATES,
  CHANGE_LIST,
  OPEN_CAR,
  ADD_LIST,
  FETCHED_LISTS,
  FETCHED_ROUTES,
  FETCHED_DATES,
  ADD_ROUTE,
  CHANGE_ROUTE,
  OPEN_ROUTE,
  OPEN_DENSITY,
  ADD_DENSITY,
  FETCHED_DENSITIES,
  FETCHED_USERINFO,
  CHANGE_INFO,
  ADD_USERINFO,
  CHANGE_USERINFO,
  REMOVE_DATES,
  REMOVE_USERINFOS,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [CHANGE_CREATE]: (state) => ({ ...state, create: !state.create }),

  [OPEN_DENSITY]: (state, { payload }) => ({
    ...state,
    cars: state.densities
      .filter((den) => den.id !== payload.id)
      .concat([payload]),
  }),
  [ADD_DENSITY]: (state, { payload }) => ({
    ...state,
    densities: [...state.densities, payload],
  }),
  [FETCHED_DENSITIES]: (state, { payload }) => ({
    ...state,
    densities: payload,
  }),
  [ADD_CAR]: (state, { payload }) => ({
    ...state,
    cars: [...state.cars, payload],
  }),
  [ADD_DATES]: (state, { payload }) => ({
    ...state,
    dates: [...state.dates, payload],
  }),
  [CHANGE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates
      .filter((date) => date.owner !== payload.owner)
      .concat([payload]),
  }),
  [FETCHED_DATES]: (state, { payload }) => ({
    ...state,
    dates: payload,
  }),
  [REMOVE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates.filter((date) => date.id !== payload),
  }),
  [FETCHED_CARS]: (state, { payload }) => ({
    ...state,
    cars: payload,
    loading: false,
  }),
  [REMOVE_CAR]: (state, { payload }) => ({
    ...state,
    cars: state.cars.filter((car) => car.id !== payload),
  }),
  [REMOVE_LIST]: (state, { payload }) => ({
    ...state,
    lists: state.lists.filter((list) => list.id !== payload),
  }),
  [OPEN_CAR]: (state, { payload }) => ({
    ...state,
    cars: state.cars.filter((car) => car.id !== payload.id).concat([payload]),
  }),
  [ADD_LIST]: (state, { payload }) => ({
    ...state,
    lists: [...state.lists, payload],
  }),
  [CHANGE_LIST]: (state, { payload }) => ({
    ...state,
    lists: state.lists
      .filter((list) => list.id !== payload.id)
      .concat([payload]),
  }),
  [FETCHED_LISTS]: (state, { payload }) => ({
    ...state,
    lists: payload,
    loading: false,
  }),
  [OPEN_ROUTE]: (state, { payload }) => ({
    ...state,
    lists: state.lists
      .filter((list) => list.id !== payload.id)
      .concat([payload]),
  }),
  [ADD_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: [...state.routes, payload],
  }),
  [FETCHED_ROUTES]: (state, { payload }) => ({
    ...state,
    routes: payload,
    loading: false,
  }),
  [REMOVE_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: state.routes.filter((route) => route.id !== payload),
  }),
  [CHANGE_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: state.routes
      .filter((route) => route.id !== payload.id)
      .concat([payload]),
  }),
  [CHANGE_INFO]: (state, { payload }) => ({ ...state, writeInfo: payload }),
  [FETCHED_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: payload,
  }),
  [ADD_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: [...state.routes, payload],
  }),
  [REMOVE_USERINFOS]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos.filter((info) => info.id !== payload),
  }),
  [CHANGE_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos
      .filter((info) => info.id !== payload.id)
      .concat([payload]),
  }),
  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
