import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";

export const CompletionEditionModal = ({
  completion,
  onClose,
  saveCompletion,
}) => {
  const [editedCompletion, setEditedCompletion] = useState(completion);

  const onWellNameChange = (e) => {
    setEditedCompletion({ ...editedCompletion, wellName: e.target.value });
  };

  const onSaveClick = () => {
    saveCompletion(editedCompletion);
    onClose();
  };

  return (
    <Modal show={true} centered={true}>
      <Modal.Header
        closeButton
        onHide={() => {
          onClose();
        }}
      >
        <Modal.Title>Completion edition</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Col className="justify-content-center p-2" sm={10}>
          <Row className="mb-4">
            <Form as={Col}>
              <Form.Group as={Row} controlId="formGridWellName">
                <Form.Label column sm="auto">
                  Well name:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Well name"
                    value={editedCompletion.wellName}
                    onChange={onWellNameChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} variant="danger">
          Cancel
        </Button>
        <Button onClick={onSaveClick} variant="success">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
