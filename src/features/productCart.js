import { createSlice } from "@reduxjs/toolkit";

const initialState = [[]];
for (let i = 0; i < 100; i++) {
  initialState.push([]);
}

export const userSlice = createSlice({
  name: "product cart",
  initialState: { value: initialState },
  reducers: {
    addProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`) || "[]"
      );
      state.value[action.payload.idUser] = [...dataShoppingCart];
      let totalAmount;
      action.payload.productCart.sales
        ? (totalAmount =
            +action.payload.productCart.amount *
            +action.payload.productCart.sales)
        : (totalAmount =
            +action.payload.productCart.amount *
            +action.payload.productCart.price);
      action.payload.productCart = {
        ...action.payload.productCart,
        totalAmount,
      };
      let check;
      if (state.value[action.payload.idUser].length > 0) {
        for (let i = 0; i < state.value[action.payload.idUser].length; i++) {
          if (
            state.value[action.payload.idUser][i].id ===
              action.payload.productCart.id &&
            state.value[action.payload.idUser][i].option ===
              action.payload.productCart.option
          ) {
            check = [i];
            break;
          }
        }
      }

      if (check) {
        state.value[action.payload.idUser][check].totalAmount += totalAmount;
        state.value[action.payload.idUser][check].amount +=
          action.payload.productCart.amount;
      } else {
        state.value[action.payload.idUser] = [
          ...dataShoppingCart,
          action.payload.productCart,
        ];
      }

      localStorage.setItem(
        `shoppingCart${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
    },

    removeProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`)
      );

      state.value[action.payload.idUser] = [...dataShoppingCart];
      state.value[action.payload.idUser].splice(action.payload.index, 1);

      localStorage.setItem(
        `shoppingCart${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
    },

    addQuantityProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`)
      );

      state.value[action.payload.idUser] = [...dataShoppingCart];
      if (
        state.value[action.payload.idUser][action.payload.index].amount <
        state.value[action.payload.idUser][action.payload.index].max
      ) {
        state.value[action.payload.idUser][action.payload.index].amount++;

        let data = state.value[action.payload.idUser][action.payload.index];
        data.sales
          ? (data.totalAmount += data.sales)
          : (data.totalAmount += data.price);
        state.value[action.payload.idUser][action.payload.index] = data;

        localStorage.setItem(
          `shoppingCart${[action.payload.idUser]}`,
          JSON.stringify(state.value[action.payload.idUser])
        );
      }
    },

    minusQuantityProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`)
      );

      state.value[action.payload.idUser] = [...dataShoppingCart];
      if (state.value[action.payload.idUser][action.payload.index].amount > 1) {
        state.value[action.payload.idUser][action.payload.index].amount--;

        let data = state.value[action.payload.idUser][action.payload.index];
        data.sales
          ? (data.totalAmount -= data.sales)
          : (data.totalAmount -= data.price);
        state.value[action.payload.idUser][action.payload.index] = data;

        localStorage.setItem(
          `shoppingCart${[action.payload.idUser]}`,
          JSON.stringify(state.value[action.payload.idUser])
        );
      }
    },

    updateQuantityProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`)
      );

      state.value[action.payload.idUser] = [...dataShoppingCart];
      let data = state.value[action.payload.idUser][action.payload.index];
      data.sales
        ? (data.totalAmount = data.sales * action.payload.newAmount)
        : (data.totalAmount = data.price * action.payload.newAmount);
      state.value[action.payload.idUser][action.payload.index].amount =
        action.payload.newAmount;
      state.value[action.payload.idUser][action.payload.index] = data;
      localStorage.setItem(
        `shoppingCart${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
    },

    updateProductCart: (state, action) => {
      let dataShoppingCart = JSON.parse(
        localStorage.getItem(`shoppingCart${action.payload.idUser}`)
      );
      console.log(action.payload.color);
      state.value[action.payload.idUser] = [...dataShoppingCart];
      state.value[action.payload.idUser][action.payload.index].option =
        action.payload.color;
      localStorage.setItem(
        `shoppingCart${[action.payload.idUser]}`,
        JSON.stringify(state.value[action.payload.idUser])
      );
    },
  },
});

export const {
  addProductCart,
  removeProductCart,
  addQuantityProductCart,
  minusQuantityProductCart,
  updateQuantityProductCart,
  updateProductCart,
} = userSlice.actions;

export default userSlice.reducer;
