import { useState, useEffect } from "react";
import "./Sales.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import { AddSalesModal } from "../../components/AddSalesModal/AddSalesModal";
import { EditSalesModal } from "../../components/EditSalesModal/EditSalesModal";
import isBetween from "dayjs/plugin/isBetween";

export const Sales = (): JSX.Element => {
  const [showAddSalesModal, setShowAddSalesModal] = useState(false);
  const [showEditSalesModal, setShowEditSalesModal] = useState(false);
  const [editSaleId, setEditSaleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sales = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(BACKEND_URL + "api/sales");
      dispatch({ type: "UPDATE_SALES", payload: response?.data?.sales });
    })();
  }, []);

  const handleRemoveItem = async (id: string) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(BACKEND_URL + "api/sales/" + id);
    dispatch({ type: "UPDATE_SALES", payload: response?.data?.sales });
  };

  dayjs.extend(isBetween);
  const filteredSales =
    startDate === "" || endDate === ""
      ? sales
      : sales.filter((sale) =>
          dayjs(sale.createdAt).isBetween(startDate, endDate)
        );

  return (
    <div className="sales">
      <AddSalesModal
        showAddSalesModal={showAddSalesModal}
        setShowAddSalesModal={setShowAddSalesModal}
      />
      <EditSalesModal
        showEditSalesModal={showEditSalesModal}
        setShowEditSalesModal={setShowEditSalesModal}
        editSaleId={editSaleId}
      />
      <div className="sales__actions">
        <div className="sales__actions__date">
          <label>
            Start Date{" "}
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          </label>

          <label>
            End Date{" "}
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
        <button
          className="sales__addBtn"
          onClick={() => setShowAddSalesModal(true)}
        >
          Add Sales
        </button>
      </div>
      <h3 className="sales__heading">Sales Report</h3>

      <table className="sales__table">
        <tr>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
        {filteredSales.map(
          ({
            _id,
            description,
            price,
            quantity,

            createdAt,
          }) => (
            <tr>
              <td>{description}</td>
              <td>Rs. {price}</td>
              <td>Rs. {quantity}</td>
              <td>Rs. {price * quantity}</td>
              <td>{dayjs(createdAt).format("DD/MM/YYYY")}</td>
              <td className="sales__table__actions">
                <button
                  className="sales__table__actionBtn"
                  onClick={() => {
                    setEditSaleId(_id);
                    setShowEditSalesModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="sales__table__actionBtn"
                  onClick={() => handleRemoveItem(_id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};
