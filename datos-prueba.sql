--
-- PostgreSQL database dump
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de vendedores
CREATE TABLE "vendedores" (
    "vendedorId" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "nombreVendedor" TEXT NOT NULL,
    "comision" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "vendedores_pkey" PRIMARY KEY ("vendedorId")
);

-- Tabla de productos
CREATE TABLE "productos" (
    "productoId" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "nombreProducto" TEXT NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("productoId")
);

-- Tabla de ventas (con relaciones y eliminación en cascada)
CREATE TABLE "ventas" (
    "ventaId" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "vendedorId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("ventaId"),
    CONSTRAINT "ventas_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "vendedores"("vendedorId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ventas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("productoId") ON DELETE CASCADE ON UPDATE CASCADE
);

\restrict G4ZfX39S4KXEIxHPWBiCMhoGh9KzYqVLq78iicDhBgwjAYMr6btkJjYrYH44TiA

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

-- Started on 2026-11-06 13:10:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3336 (class 0 OID 16401)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4b0cb6c6-fb0f-48c9-8ba1-4146d7c2e979', '6561740d3883e45f446655ecde5f94c6cccffbc510875635b2c8d4754765262d', '2026-11-06 11:26:07.165797-05', '20261106162607_init_ventas', NULL, NULL, '2026-11-06 11:26:07.141092-05', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('98297c64-dae5-4f0c-b013-48ce0c026a99', '6524c080f6f809e9c4a33428ade0c19718c4355456baf88a6c098e3ea92d447e', '2026-11-06 11:49:40.515816-05', '20261106164940_add_stock_to_producto', NULL, NULL, '2026-11-06 11:49:40.513065-05', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('af22552d-4d57-49a0-b7bb-283b6529a576', '4e2bfe6997c192542775581d4409c5e30b789466dc91c84a12572d8d49904419', '2026-11-06 11:50:50.91594-05', '20261106165050_add_cantidad_to_venta', NULL, NULL, '2026-11-06 11:50:50.913387-05', 1);


--
-- TOC entry 3338 (class 0 OID 16419)
-- Dependencies: 216
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.productos ("productoId", "nombreProducto", "valorUnitario", stock) VALUES ('34804f92-195f-4f00-8fd4-7e9818e6eea6', 'Gaseosa 1.5', 4000, 7);
INSERT INTO public.productos ("productoId", "nombreProducto", "valorUnitario", stock) VALUES ('4052390d-6d2c-4169-b2ac-921bc0049ba9', 'Papas Margarita', 1500, 7);


--
-- TOC entry 3337 (class 0 OID 16412)
-- Dependencies: 215
-- Data for Name: vendedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vendedores ("vendedorId", "nombreVendedor", comision) VALUES ('6831ec52-d90f-4ad2-94a5-f1d8e9054de4', 'Juan Pablo', 20);


--
-- TOC entry 3339 (class 0 OID 16426)
-- Dependencies: 217
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ventas ("ventaId", "vendedorId", "productoId", "valorTotal", cantidad) VALUES ('a23d42dc-2282-4b61-ada6-cc71dd650406', '6831ec52-d90f-4ad2-94a5-f1d8e9054de4', '4052390d-6d2c-4169-b2ac-921bc0049ba9', 1500, 1);
INSERT INTO public.ventas ("ventaId", "vendedorId", "productoId", "valorTotal", cantidad) VALUES ('f1e8315d-ed50-46bd-9bd4-298ddffa8789', '6831ec52-d90f-4ad2-94a5-f1d8e9054de4', '34804f92-195f-4f00-8fd4-7e9818e6eea6', 8000, 2);
INSERT INTO public.ventas ("ventaId", "vendedorId", "productoId", "valorTotal", cantidad) VALUES ('e986a214-ac63-4ec6-baee-fd749dbadaf2', '6831ec52-d90f-4ad2-94a5-f1d8e9054de4', '4052390d-6d2c-4169-b2ac-921bc0049ba9', 1500, 1);
INSERT INTO public.ventas ("ventaId", "vendedorId", "productoId", "valorTotal", cantidad) VALUES ('57f30322-1995-48a4-bfcd-8ad8e85cf861', '6831ec52-d90f-4ad2-94a5-f1d8e9054de4', '34804f92-195f-4f00-8fd4-7e9818e6eea6', 4000, 1);
INSERT INTO public.ventas ("ventaId", "vendedorId", "productoId", "valorTotal", cantidad) VALUES ('7a5f6227-c012-4878-9f6d-e86598d41b7a', '6831ec52-d90f-4ad2-94a5-f1d8e9054de4', '4052390d-6d2c-4169-b2ac-921bc0049ba9', 1500, 1);


-- Completed on 2026-11-06 13:10:04

--
-- PostgreSQL database dump complete
--

\unrestrict G4ZfX39S4KXEIxHPWBiCMhoGh9KzYqVLq78iicDhBgwjAYMr6btkJjYrYH44TiA

