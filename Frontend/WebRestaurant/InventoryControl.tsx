import React, { useEffect, useState } from 'react';
import './InventoryControl.css';

const InventoryControl = () => {
  const [inventory, setInventory] = useState([]); // Estado para o estoque

  // Função para carregar o estoque
  useEffect(() => {
    fetch('/api/inventory')
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error('Erro ao carregar inventário:', error));
  }, []);

  // Função para ajustar o estoque
  const adjustQuantity = (id, adjustment) => {
    fetch(`/api/inventory/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adjustment }),
    })
      .then(response => {
        if (response.ok) {
          setInventory(inventory.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + adjustment } : item
          ));
        }
      })
      .catch(error => console.error('Erro ao ajustar quantidade:', error));
  };

  return (
    <div className="inventory-control">
      <h1>Controle de Estoque</h1>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => adjustQuantity(item.id, 1)}>Adicionar</button>
                <button onClick={() => adjustQuantity(item.id, -1)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryControl;