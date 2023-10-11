import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type EditInventoryModalType = {
  showEditInventoryModal: boolean;
  setShowEditInventoryModal: Dispatch<SetStateAction<boolean>>;
  editItemId: string;
};

export const EditInventoryModal = ({
  showEditInventoryModal,
  setShowEditInventoryModal,
  editItemId,
}: EditInventoryModalType) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const { name, quantity, price, category } = formData;
  const dispatch = useDispatch();

  const getItemData = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(BACKEND_URL + "api/items/" + editItemId);
    const item = response?.data?.item;
    const { name, quantity, price, category } = item;
    setFormData({ name, quantity, price, category });
  };

  useEffect(() => {
    getItemData();
  }, [showEditInventoryModal]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        BACKEND_URL + "api/items/" + editItemId,
        {
          ...formData,
        }
      );
      console.log(response);
      dispatch({
        type: "UPDATE_INVENTORY",
        payload: response?.data?.inventory,
      });
      setShowEditInventoryModal(false);
    } catch (e) {
      console.error(e);
    }
  };
  console.log(category);
  return (
    <>
      <div
        className={`overlay ${showEditInventoryModal ? "" : "hide"}`}
        onClick={() => setShowEditInventoryModal(false)}
      ></div>
      <div
        className={`addInventoryModal ${
          showEditInventoryModal ? "addInventoryModal--fade" : ""
        } `}
      >
        <div className="addInventoryModal__form">
          <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <label>
              Name <br />{" "}
              <input
                type="text"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="name"
                value={name}
              />
            </label>
            <label>
              Quantity <br />{" "}
              <input
                type="number"
                min={1}
                max={10000}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="quantity"
                value={quantity}
              />
            </label>
            <label>
              Price <br />{" "}
              <input
                type="number"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="price"
                value={price}
              />
            </label>
            <label>
              Category <br />{" "}
              <input
                type="text"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="category"
                value={category}
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
