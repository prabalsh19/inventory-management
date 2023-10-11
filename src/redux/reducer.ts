export type Store = {
  inventory: {
    category: string;
    name: string;
    price: number;
    quantity: number;
    _id: string;
  }[];
  sales: {
    createdAt: Date;
    description: string;
    price: number;
    quantity: number;
    updatedAt: Date;
    _id: string;
  }[];
};
const initialState = {
  inventory: [],
  sales: [],
};
type InventoryAction = {
  type: "UPDATE_INVENTORY";
  payload: []; //Todo: Update with actual type
};
type SalesAction = {
  type: "UPDATE_SALES";
  payload: []; //Todo: Update with actual type
};
type Action = InventoryAction | SalesAction;

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "UPDATE_INVENTORY":
      return { ...state, inventory: action.payload };
    case "UPDATE_SALES":
      return { ...state, sales: action.payload };
    default:
      return state;
  }
};
