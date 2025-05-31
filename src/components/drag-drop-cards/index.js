import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// We will create the Card component in the next step
import Card from './Card';
import './style.css';

// Dummy data for initial cards
const INITIAL_CARDS = [
  { id: 1, text: 'Card 1' },
  { id: 2, text: 'Card 2' },
  { id: 3, text: 'Card 3' },
  { id: 4, text: 'Card 4' },
];

const DragDropCards = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);

  // Function to move a card
  // This will be updated later when the Card component is created
  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = cards[dragIndex];
    const updatedCards = [...cards];
    updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);
    setCards(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="drag-drop-container">
        <div className="card-list">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              id={card.id}
              text={card.text}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDropCards;
