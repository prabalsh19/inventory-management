import { useState } from "react";
import "./AddInventoryModel.scss";
import axios from "axios";
import { useDispatch } from "react-redux";

type AddInventoryModalProps = {
  showAddInventoryModal: boolean;
  setShowAddInventoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddInventoryModal = ({
  showAddInventoryModal,
  setShowAddInventoryModal,
}: AddInventoryModalProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const { name, quantity, price, category } = formData;

  const dispatch = useDispatch();

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}api/items`, {
        ...formData,
      });

      dispatch({
        type: "UPDATE_INVENTORY",
        payload: response?.data?.inventory,
      });
      setShowAddInventoryModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className={`overlay ${showAddInventoryModal ? "" : "hide"}`}
        onClick={() => setShowAddInventoryModal(false)}
      ></div>
      <div
        className={`addInventoryModal ${
          showAddInventoryModal ? "addInventoryModal--fade" : ""
        } `}
      >
        <div className="addInventoryModal__form">
          <form onSubmit={handleSubmit} autoComplete="off">
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
