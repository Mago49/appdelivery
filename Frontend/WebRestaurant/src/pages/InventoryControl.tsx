import React, { useEffect, useState } from "react";

const InventoryControl = () => {
  const [inventory, setInventory] = useState([]); // Estado: Carrega itens do estoque

  // Carregar itens ao abrir página
  useEffect(() => {
    fetch("http://localhost:8080/api/inventory") // Endereço da API do estoque
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error("Erro ao carregar inventário:", error));
  }, []);

  // Função para ajustar quantidade (exemplo: +1 ou -1 no estoque):
  const adjustQuantity = (id, adjustment) => {
    fetch(`http://localhost:8080/api/inventory/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adjustment }),
    })
      .then(() => {
        // Atualizar localmente o array de inventário
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + adjustment }
              : item
          )
        );
      })
      .catch((error) => console.error("Erro ao ajustar quantidade:", error));
  };

  return (
    <div>
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
          {inventory.map((item) => (
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