
# Forest Key

Este projeto consiste em uma API (Interface de Programação de Aplicações) desenvolvida para fornecer funcionalidades relacionadas a um ponto de venda. O sistema inclui recursos de cadastro de usuários, autenticação, gerenciamento de perfil e outras operações essenciais.


## Documentação da API

## Requisitos de Infraestrutura

### Banco de Dados

Para armazenamento de dados, utilizamos um banco de dados online para garantir escalabilidade e disponibilidade. Atualmente, estamos utilizando [ElephantSQL](https://www.elephantsql.com/).

### Deploy da API

O deploy da API é realizado por meio de um processo automatizado que utiliza [cyclic](https://www.cyclic.sh/). Nossa aplicação está hospedada em um ambiente seguro e gerenciado e garantindo alta disponibilidade.
## Como Utilizar

Para interagir com a API, siga as instruções abaixo:

### Acesso à API

O acesso à API deve ser feito através de framework de envio de requisições como [insomnia](https://insomnia.rest/download) ou [postman](https://www.postman.com/downloads/).
Certifique-se de incluir os parâmetros de rota conforme descrito para cada endpoint.

```plaintext
Exemplo:
https://motionless-blue-chinchilla.cyclic.app/categoria
```
#### Listar categorias

#### `GET` `/categoria`

<https://motionless-blue-chinchilla.cyclic.app/categoria>

<img src="https://github.com/YuriBrizolara/ForestKey/assets/141869821/18717b83-759f-484a-900c-bf9c498491c6" width="1500" />

  | Descrição                           |
  | :---------------------------------- |
  | Retorna a lista de todas as categorias disponíveis no banco de dados  |



#### Cadastra o usuário no banco de dados e retorna a confirmação

#### `POST` `/usuario`
<https://motionless-blue-chinchilla.cyclic.app/usuario>

<img src="https://github.com/YuriBrizolara/ForestKey/assets/141869821/39090d01-6945-47ab-b7d0-1d8ac1cdd14a" width="1500" />

| Descrição                                   |
| :------------------------------------------ |
| Permite a criação de um novo usuário no sistema. Os campos obrigatórios incluem nome, email e senha. |

#### Efetua o login do usuário e retorna o token de autenticação

#### `POST` `/login`
<https://motionless-blue-chinchilla.cyclic.app/login>

<img src="https://github.com/YuriBrizolara/ForestKey/assets/141869821/82dc73bd-21ed-4d0f-a05a-423a276bfc7b" width="1500" />

| Descrição                           |
| :---------------------------------- |
| Permite que um usuário cadastrado faça login no sistema. O email e a senha são validados, e um token de autenticação é gerado e retornado. |

#### Detalhar informações do usuário

#### `GET` `/usuario`
<https://motionless-blue-chinchilla.cyclic.app/usuario>

<img src="https://github.com/YuriBrizolara/ForestKey/assets/141869821/55bb4af2-a5b1-4d71-b7de-2c5b32f695bd" width="1500" />

| Descrição                           |
| :---------------------------------- |
| Retorna os dados do perfil do usuário logado. Requer um token de autenticação no header para garantir acesso seguro. |

#### Retorna todos os itens

#### `PUT` `/usuario`
<https://motionless-blue-chinchilla.cyclic.app/usuario>

<img src="https://github.com/YuriBrizolara/ForestKey/assets/141869821/61636d2e-b8ef-4087-b3de-1034d8e62278" width="1500" />

| Descrição                           |
| :---------------------------------- |
| Permite que o usuário logado atualize as informações do seu próprio perfil. Campos obrigatórios como nome, email e senha devem ser fornecidos.  A nova senha será criptografada |

## Autores

- [Caio Kaway](https://github.com/CaioKWY)
- [Danilo Mabilia](https://github.com/DaniloMabilia)
- [Felipe Hora Lima](https://github.com/NyrioXX)
- [Veronica Bierhals](https://github.com/veronicabierhals)
- [Yuri Brizolara](https://github.com/YuriBrizolara)
