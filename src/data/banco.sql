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
