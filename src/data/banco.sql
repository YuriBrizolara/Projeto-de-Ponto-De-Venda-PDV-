CREATE TABLE usuarios(
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);

CREATE TABLE categorias(id serial primary key, descricao text);

INSERT INTO
    categorias (descricao)
VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

CREATE TABLE produtos(
	id serial primary key,
	descricao text not null,
	quantidade_estoque integer not null,
	valor integer not null,
	categoria_id integer not null references categorias(id)
);

CREATE TABLE clientes(
    id serial primary key,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    cep text,
    rua text,
    numero text,
    bairro text,
    cidade text,
    estado text
);

CREATE TABLE pedidos (
  id serial primary key,
  cliente_id integer not null references clientes(id),
  observacao text,
  valor_total integer
);

CREATE TABLE pedido_produtos (
  id serial primary key,
  pedido_id integer references pedidos(id),
  produto_id integer not null references produtos(id),
  quantidade_produto integer not null,
  valor_produto integer not null
);

ALTER TABLE produtos
ADD COLUMN produto_imagem text;
