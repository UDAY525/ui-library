import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'CARD'; // Define a type for the draggable item

const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);

  // useDrop hook for handling when a card is dropped on this card
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // useDrag hook for making the card draggable
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Attach the drag and drop refs to the card element
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="card-item" // Added className
      style={{
        backgroundColor: isDragging ? 'lightgreen' : undefined, // Dynamic background, undefined to let CSS take over
        opacity: isDragging ? 0.5 : 1, // Dynamic opacity
        // cursor: 'move' will be in CSS
      }}
    >
      {text}
    </div>
  );
};

export default Card;
