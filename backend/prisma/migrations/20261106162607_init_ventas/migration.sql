-- CreateTable
CREATE TABLE "vendedores" (
    "vendedorId" TEXT NOT NULL,
    "nombreVendedor" TEXT NOT NULL,
    "comision" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "vendedores_pkey" PRIMARY KEY ("vendedorId")
);

-- CreateTable
CREATE TABLE "productos" (
    "productoId" TEXT NOT NULL,
    "nombreProducto" TEXT NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("productoId")
);

-- CreateTable
CREATE TABLE "ventas" (
    "ventaId" TEXT NOT NULL,
    "vendedorId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("ventaId")
);

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "vendedores"("vendedorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("productoId") ON DELETE CASCADE ON UPDATE CASCADE;
