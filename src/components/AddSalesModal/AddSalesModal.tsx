import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddSalesModal.scss";

type AddSalesModalProps = {
  showAddSalesModal: boolean;
  setShowAddSalesModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddSalesModal = ({
  showAddSalesModal,
  setShowAddSalesModal,
}: AddSalesModalProps): JSX.Element => {
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    quantity: 0,
  });

  const { description, price, quantity } = formData;

  const dispatch = useDispatch();

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}api/sales`, {
        ...formData,
      });

      dispatch({
        type: "UPDATE_SALES",
        payload: response?.data?.sales,
      });
      setShowAddSalesModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className={`overlay ${showAddSalesModal ? "" : "hide"}`}
        onClick={() => setShowAddSalesModal(false)}
      ></div>
      <div
        className={`addSalesModal ${
          showAddSalesModal ? "addSalesModal--fade" : ""
        } `}
      >
        <div className="addSalesModal__form">
          <form onSubmit={handleSubmit} autoComplete="off">
            <label>
              Description <br />{" "}
              <textarea
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                name="description"
                value={description}
              />
            </label>
            <label>
              Price (Rs.) <br />{" "}
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
              Quantity (Rs.) <br />{" "}
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
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
