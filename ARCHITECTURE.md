# Arquitetura Completa de Logística

Este documento descreve a nova arquitetura desenhada para transformar a solução AppDelivery em um sistema completo para gerenciamento de logística, atendimento multi-clientes e gerenciamento de ordens.

## Novos Microserviços

| Microserviço        | Responsabilidade                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------------|
| **auth_api**        | Controla autenticação e perfis de usuários (já existente)                                        |
| **orders_api**      | Gerencia pedidos (atualização para movimentação logística)                                        |
| **delivery_api**    | Opera entrega de produtos aos destinatários (renomear para shipping)                             |
| **inventory_api**   | CRUD de produtos e controle de estoque nos armazéns                                              |
| **warehouse_api**   | Cadastro e gerenciamento de múltiplos armazéns                                                   |
| **shipping_api**    | Gera ordem de envios para transportadoras                                                        |
| **route_api**       | Cálculo e otimização de rotas, integração com Google Maps                                        |
| **billing_api**     | Gerenciamento de faturas, pagamentos e splits                                                   |
| **vendor_api**      | Cadastro de fornecedores e integração B2B                                                        |
| **analytics_api**   | Relatórios e dashboards logísticos                                                               |
| **notification_api**| Envio de notificações centralizadas                                                              |

## Esqueleto docker-compose Expandido
```yaml
services:
  # Existentes
  api-gateway:
    build:
      context: ./api-gateway
...
```

## Integração com APIs Externas
- **Google Maps:** Rotas e localização
- **APIs de Transportadoras:** Para rastreio de entregas
- **Pagamentos:** Para gerenciar cobranças e faturas via gateways como Stripe/Mercado Pago.

---

## Fluxos de Estoque e Pedidos com Telegram

### Cadastro e Movimentação de Estoque
```plantuml
@startuml
actor Usuario
participant Frontend
participant Telegram_Bot
participant inventory_api
participant warehouse_api

Usuario -> Frontend: Solicitação de cadastro ou movimentação
Usuario -> Telegram_Bot: Cadastro/movimentação via chatbot
Telegram_Bot -> inventory_api: Redireciona comando ao microserviço
Frontend -> inventory_api: Cria/Atualiza item em estoque
inventory_api -> warehouse_api: Atualiza armazém vinculado
inventory_api -> Banco_de_Dados_Estoque: Registrar detalhes
@enduml
```

### Criação de Pedido e Estoque Integrando Telegram
```plantuml
@startuml
actor Cliente
participant Frontend
participant Telegram_Bot
participant orders_api
participant inventory_api
participant warehouse_api
participant route_api
participant shipping_api
participant notification_api

Cliente -> Frontend: Faz o pedido
Cliente -> Telegram_Bot: Realiza pedido via chatbot
Telegram_Bot -> orders_api: Redireciona o comando ao microserviço
Frontend -> orders_api: Criar nova ordem
orders_api -> inventory_api: Reservar itens em estoque
orders_api -> warehouse_api: Separar no armazém
orders_api -> route_api: Obter rota otimizada
route_api -> shipping_api: Planejar envio
shipping_api -> notification_api: Enviar status ao cliente
@enduml
```

Use uma ferramenta como [PlantUML](https://plantuml.com/) ou [PlantText](https://www.planttext.com/) para visualizar os diagramas acima.