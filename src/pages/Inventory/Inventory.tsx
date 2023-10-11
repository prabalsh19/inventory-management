import { useEffect, useState } from "react";
import "./Inventory.scss";
import { AddInventoryModal } from "../../components/AddInventoryModal/AddInventoryModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EditInventoryModal } from "../../components/EditInventoryModal/EditInventoryModal";
import { Store } from "../../redux/reducer";

export const Inventory = (): JSX.Element => {
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [showEditInventoryModal, setShowEditInventoryModal] = useState(false);
  const [editItemId, setEditItemId] = useState("");
  const [category, setCategory] = useState("");

  const inventory = useSelector((state: Store) => state.inventory);
  console.log(useSelector((state) => state));
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(BACKEND_URL + "api/items");
      dispatch({
        type: "UPDATE_INVENTORY",
        payload: response?.data?.inventory,
      });
    })();
  }, []);

  const handleRemoveItem = async (_id: string) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(BACKEND_URL + "api/items/" + _id);
    dispatch({
      type: "UPDATE_INVENTORY",
      payload: response?.data?.inventory,
    });
  };

  const categories = inventory.reduce((acc: string[], cur) => {
    if (acc.includes(cur.category)) {
      return acc;
    }
    return [...acc, cur.category];
  }, []);
  const filteredInventory = inventory.filter((item) =>
    category === "" ? true : item.category === category
  );
  return (
    <>
      <AddInventoryModal
        showAddInventoryModal={showAddInventoryModal}
        setShowAddInventoryModal={setShowAddInventoryModal}
      />
      <EditInventoryModal
        showEditInventoryModal={showEditInventoryModal}
        setShowEditInventoryModal={setShowEditInventoryModal}
        editItemId={editItemId}
      />
      <div className="inventory">
        <div className="inventory__actions">
          <button
            className="inventory__actions__addBtn"
            onClick={() => setShowAddInventoryModal(true)}
          >
            Add Inventory
          </button>
          <br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="inventory__actions__select"
          >
            <option value="">Category</option>

            {categories.map((category: string) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <h3 className="inventory__heading">Inventory Report</h3>
        <table className="inventory__table">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
          {filteredInventory.map(({ _id, name, price, quantity, category }) => (
            <tr>
              <td>{name}</td>
              <td>{category}</td>
              <td>Rs. {price}</td>
              <td className="inventory__table__quantity">{quantity}</td>
              <td className="inventory__table__actions">
                <button
                  className="inventory__table__actionBtn"
                  onClick={() => {
                    setEditItemId(_id);
                    setShowEditInventoryModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="inventory__table__actionBtn"
                  onClick={() => handleRemoveItem(_id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};
