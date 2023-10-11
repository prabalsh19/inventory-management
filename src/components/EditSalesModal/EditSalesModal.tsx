import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const EditSalesModal = ({
  showEditSalesModal,
  setShowEditSalesModal,
  editSaleId,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    quantity: 0,
  });
  const { description, price, quantity } = formData;
  const dispatch = useDispatch();

  const getSaleData = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(BACKEND_URL + "api/Sales/" + editSaleId);
    const sale = response?.data?.sale;
    const { description, price, quantity } = sale;
    setFormData({ description, price, quantity });
  };

  useEffect(() => {
    getSaleData();
  }, [showEditSalesModal]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(BACKEND_URL + "api/sales/" + editSaleId, {
      ...formData,
    });
    dispatch({
      type: "UPDATE_SALES",
      payload: response?.data?.sales,
    });
    setShowEditSalesModal(false);
  };
  return (
    <>
      <div
        className={`overlay ${showEditSalesModal ? "" : "hide"}`}
        onClick={() => setShowEditSalesModal(false)}
      ></div>
      <div
        className={`addSalesModal ${
          showEditSalesModal ? "addSalesModal--fade" : ""
        } `}
      >
        <div className="addSalesModal__form">
          <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
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
              Quantity <br />{" "}
              <input
                type="number"
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
