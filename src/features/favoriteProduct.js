import { createSlice } from "@reduxjs/toolkit";

const initialState = [[], [], [], [], [], [], []];

const favoriteSlice = createSlice({
  name: "favorite product",
  initialState: { value: initialState },
  reducers: {
    addFavoriteCart: (state, action) => {
      let dataFavoriteProduct = JSON.parse(
        localStorage.getItem(`favoriteProduct${action.payload.idUser}`) || "[]"
      );
      state.value[action.payload.idUser] = [...dataFavoriteProduct];
      let check = false;
      let indexCheck = -1;
      state.value[action.payload.idUser].forEach((item, index) => {
        if (item.id === action.payload.favoriteProduct.id) {
          check = true;
          indexCheck = index;
        }
      });
      if (check) {
        state.value[action.payload.idUser] = [...dataFavoriteProduct];
        state.value[action.payload.idUser].splice(indexCheck, 1);
      } else {
        state.value[action.payload.idUser] = [
          ...dataFavoriteProduct,
          action.payload.favoriteProduct,
        ];
      }
      localStorage.setItem(
        `favoriteProduct${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
      console.log(state.value[action.payload.idUser]);
    },

    removeFavoriteCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`favoriteProduct${action.payload.idUser}`)
      );

      state.value[action.payload.idUser] = [...dataShoppingCart];
      state.value[action.payload.idUser].splice(action.payload.index, 1);

      localStorage.setItem(
        `favoriteProduct${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
    },
  },
});

export const { addFavoriteCart, removeFavoriteCart } = favoriteSlice.actions;

export default favoriteSlice.reducer;
