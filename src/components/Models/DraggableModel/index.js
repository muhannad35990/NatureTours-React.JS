import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Draggable from "react-draggable";

function DraggableModel(props) {
  const draggleRef = React.createRef();
  const [draggable, setDraggable] = useState({
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  });
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setDraggable({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };
  return (
    <Modal
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (draggable.disabled) {
              setDraggable({
                disabled: false,
              });
            }
          }}
          onMouseOut={() => {
            setDraggable({
              disabled: true,
            });
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {props.name}
        </div>
      }
      visible={props.visible}
      footer={null}
      onCancel={props.onCancel}
      destroyOnClose={true}
      width={props.width}
      modalRender={(modal) => (
        <Draggable
          bounds={draggable.bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {props.children}
    </Modal>
  );
}

export default DraggableModel;
