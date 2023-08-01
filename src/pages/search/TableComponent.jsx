import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import EditUserPage from "../EdituserPage/EditUserPage";
import { useDispatch } from "react-redux";
import { toggleRender } from "../../stateManagment/renderTableSlice";
import ViewUserPage from "../ViewUser/ViewUser";
import AddPage from "../addUser/addPage";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

function TableComponent({ data, onDelete, sortArr, handelSort, tableHeaders }) {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [addModalShow, setaddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleAction = (action, id) => {
    setSelectedUserId(id);
    if (action === "view") {
      setViewModalShow(true);
    } else if (action === "edit") {
      setEditModalShow(true);
    }
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedUserId);
    setShowDeleteConfirmation(false);
  };

  const handleEdit = () => {
    setEditModalShow(false);
    dispatch(toggleRender());
  };

  return (
    <>
      <div className="table-responsive">
        {data.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableHeaders.map(({ key, label }) => (
                  <th key={key} onClick={() => handelSort(key)}>
                    <div className="d-flex justify-content-between">
                      <span>{label}</span>
                      {key === "actions" ? null : (
                        <span>
                          {sortArr.includes(`-${key}`) && <HiArrowDown />}
                          {sortArr.includes(key) && <HiArrowUp />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  {tableHeaders.map(({ key }) => {
                    if (key === "actions") {
                      return (
                        <td
                          key={key}
                          className="d-flex justify-content-between"
                        >
                          <Button
                            variant="primary"
                            onClick={() => handleAction("view", item._id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handleAction("edit", item._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      );
                    }
                    return <td key={key}>{item[key]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        size="lg"
        show={addModalShow}
        onHide={() => setaddModalShow(false)}
      >
        {/* Add your modal content here */}
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setaddModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal
        size="lg"
        show={viewModalShow}
        onHide={() => setViewModalShow(false)}
      >
        {/* Add your modal content here */}
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewUserPage id={selectedUserId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserPage
            id={selectedUserId}
            handleCancelEdit={() => setEditModalShow(false)}
            handleEdit={handleEdit}
          />
        </Modal.Body>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableComponent;
